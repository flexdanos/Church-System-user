import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface MemberProfile {
  profile_picture?: {
    base64: string
    name: string
  }
}

export const Header: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Load user profile picture only once
  useEffect(() => {
    const loadProfilePicture = async () => {
      if (!user?.email || profilePicture) return // Don't refetch if already loaded
      
      try {
        const { data, error } = await supabase
          .from('members')
          .select('profile_picture')
          .eq('email', user.email)
          .single()

        if (error) {
          console.error('Error loading profile picture:', error)
          return
        }

        if (data?.profile_picture?.base64) {
          setProfilePicture(data.profile_picture.base64)
        }
      } catch (error) {
        console.error('Error loading profile picture:', error)
      }
    }

    loadProfilePicture()
  }, [user?.email]) // Only depend on user email, not profilePicture

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = () => {
    signOut()
    setIsProfileMenuOpen(false)
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setIsProfileMenuOpen(false)
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm z-40 sticky top-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-burgundy-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Church System</h1>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.email?.split('@')[0]}
                </p>              
              </div>
              <div className="w-10 h-10 bg-burgundy-100 rounded-full overflow-hidden flex items-center justify-center">
                {profilePicture ? (
                  <img 
                    src={profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-6 h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <button
                    onClick={handleProfileClick}
                    className="text-sm font-medium text-gray-900 hover:text-burgundy-600 transition-colors cursor-pointer break-words max-w-[180px] sm:max-w-none"
                  >
                    {user?.email}
                  </button>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v4m6 4h2a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2h2z" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
