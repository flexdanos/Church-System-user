import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isFirstTimeUser: boolean
  isProfileComplete: boolean
  checkProfileCompletion: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: any; isFirstTime?: boolean }>
  signUp: (email: string, password: string) => Promise<{ error: any; member?: any; isFirstTime?: boolean }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)

  const checkProfileCompletion = async () => {
    if (!user?.email) return

    try {
      const { data, error } = await supabase
        .from('members')
        .select('full_name, phone_number, date_of_birth, address, membership_status, profile_picture')
        .eq('email', user.email)
        .single()

      if (error) {
        console.error('Error checking profile completion:', error)
        setIsProfileComplete(false)
        return
      }

      if (data) {
        // Check if all required fields are filled
        const requiredFields = [
          data.full_name,
          data.phone_number,
          data.date_of_birth,
          data.address,
          data.membership_status,
          data.profile_picture?.base64
        ]

        const allFieldsFilled = requiredFields.every(field => 
          field && field.toString().trim() !== ''
        )

        setIsProfileComplete(allFieldsFilled)
        
        // Don't reset isFirstTimeUser here - let it persist for actual first-time users
        // Only signOut should reset it
      }
    } catch (error) {
      console.error('Error checking profile completion:', error)
      setIsProfileComplete(false)
    }
  }

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await checkProfileCompletion()
      }
      
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await checkProfileCompletion()
      } else {
        setIsProfileComplete(false)
        // Only reset first-time user flag on sign out, not on profile completion
        // setIsFirstTimeUser(false)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [user?.email])

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in with:', email)
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    console.log('Sign in result:', { error, data })
    
    // Check if user has incomplete profile
    if (!error && data.user) {
      await checkProfileCompletion()
      return { error, isFirstTime: !isProfileComplete }
    }
    
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    try {
      // First create the user in auth
      const { error: authError, data } = await supabase.auth.signUp({ email, password })
      
      if (authError) {
        return { error: authError }
      }

      // If auth signup was successful, create member record
      if (data.user) {
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .insert({
            email: email,
            full_name: '',
            membership_status: 'member',
            date_joined: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
          })
          .select()
          .single()

        if (memberError) {
          // If member creation fails, we should handle it but not fail the auth
          console.error('Error creating member record:', memberError)
          return { error: memberError }
        }

        // Set first-time user flag only for actual signups
        setIsFirstTimeUser(true)
        setIsProfileComplete(false)

        return { error: null, member: memberData, isFirstTime: true }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setIsFirstTimeUser(false)
    setIsProfileComplete(false)
  }

  const value = {
    user,
    session,
    loading,
    isFirstTimeUser,
    isProfileComplete,
    checkProfileCompletion,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
