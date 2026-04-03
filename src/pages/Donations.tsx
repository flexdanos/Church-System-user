import React from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { Header } from '../components/Header'

export const Donations: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-burgundy-50 via-white to-burgundy-100 pb-16 md:pb-0">
      <Header />
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20">
            <div className="px-6 py-8 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Donation Management</h2>
                <p className="text-sm sm:text-base text-gray-600">Track and manage all donations, tithes, and offerings. Generate reports and send receipts to donors.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Total Donations</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-burgundy-600">$12,450</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">This month</p>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Donors</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">89</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Active donors</p>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Average Gift</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">$140</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Per donation</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 space-y-4">
                <div className="bg-white/80 p-4 rounded-lg border border-burgundy-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-900">Recent Donations</h4>
                    <span className="text-xs text-gray-500">Last 7 days</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">John Smith</span>
                      <span className="text-sm font-medium text-green-600">$250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mary Johnson</span>
                      <span className="text-sm font-medium text-green-600">$100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">David Brown</span>
                      <span className="text-sm font-medium text-green-600">$75</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <button className="w-full sm:w-auto bg-burgundy-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-burgundy-700 transition-colors touch-manipulation">
                  Record Donation
                </button>
                <button className="w-full sm:w-auto bg-white/80 text-burgundy-600 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-white transition-colors border border-burgundy-200 touch-manipulation">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}
