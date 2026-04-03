import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BottomNavigation } from './BottomNavigation'
import { Link } from 'react-router-dom'
// import { BackgroundImage } from './BackgroundImage'

export const Dashboard: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-burgundy-50 via-white to-burgundy-100 pb-16 md:pb-0">
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20">
            <div className="px-6 py-8 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard</h2>
                <p className="text-sm sm:text-base text-gray-600">Manage your church activities and connect with your community.</p>
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">User Profile</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      <span className="font-medium">ID:</span> {user?.id?.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">PWA Features</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Offline Support
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Installable
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Supabase Integration</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Authentication
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Real-time Database
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Quick Actions - Hidden on Mobile */}
              <div className="mt-6 sm:mt-8 bg-burgundy-50/90 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm hidden md:block">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <Link 
                    to="/members"
                    className="block bg-white/80 text-burgundy-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-white transition-colors border border-burgundy-200 backdrop-blur-sm text-sm sm:text-base touch-manipulation text-center"
                  >
                    Members
                  </Link>
                  <Link 
                    to="/events"
                    className="block bg-white/80 text-burgundy-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-white transition-colors border border-burgundy-200 backdrop-blur-sm text-sm sm:text-base touch-manipulation text-center"
                  >
                    Events
                  </Link>
                  <Link 
                    to="/donations"
                    className="block bg-white/80 text-burgundy-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-white transition-colors border border-burgundy-200 backdrop-blur-sm text-sm sm:text-base touch-manipulation text-center"
                  >
                    Donations
                  </Link>
                  <Link 
                    to="/reports"
                    className="block bg-white/80 text-burgundy-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium hover:bg-white transition-colors border border-burgundy-200 backdrop-blur-sm text-sm sm:text-base touch-manipulation text-center"
                  >
                    Reports
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation />
    </div>
  )
}
