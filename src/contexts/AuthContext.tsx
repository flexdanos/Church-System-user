import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any; member?: any }>
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

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in with:', email)
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    console.log('Sign in result:', { error, data })
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

        return { error: null, member: memberData }
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
