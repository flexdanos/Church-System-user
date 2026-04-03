import React from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { Header } from '../components/Header'

export const Reports: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-burgundy-50 via-white to-burgundy-100 pb-16 md:pb-0">
      <Header />
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20">
            <div className="px-6 py-8 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h2>
                <p className="text-sm sm:text-base text-gray-600">Generate comprehensive reports on membership, donations, events, and church growth. Track trends and make data-driven decisions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8m5-4h4" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Monthly Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">Complete monthly overview</p>
                  <button className="w-full bg-burgundy-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-burgundy-700 transition-colors text-sm touch-manipulation">
                    Generate
                  </button>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Financial Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">Donations and expenses</p>
                  <button className="w-full bg-burgundy-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-burgundy-700 transition-colors text-sm touch-manipulation">
                    Generate
                  </button>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Membership Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">Member growth and stats</p>
                  <button className="w-full bg-burgundy-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-burgundy-700 transition-colors text-sm touch-manipulation">
                    Generate
                  </button>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-3">
                  <div className="bg-white/80 p-4 rounded-lg border border-burgundy-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="font-medium text-gray-900">March 2024 Monthly Report</h4>
                      <p className="text-xs text-gray-600">Generated on March 31, 2024</p>
                    </div>
                    <button className="text-burgundy-600 hover:text-burgundy-700 font-medium text-sm touch-manipulation">
                      Download PDF
                    </button>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg border border-burgundy-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Q1 2024 Financial Summary</h4>
                      <p className="text-xs text-gray-600">Generated on April 1, 2024</p>
                    </div>
                    <button className="text-burgundy-600 hover:text-burgundy-700 font-medium text-sm touch-manipulation">
                      Download PDF
                    </button>
                  </div>
                  
                  <div className="bg-white/80 p-4 rounded-lg border border-burgundy-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="font-medium text-gray-900">Easter Service Attendance</h4>
                      <p className="text-xs text-gray-600">Generated on March 31, 2024</p>
                    </div>
                    <button className="text-burgundy-600 hover:text-burgundy-700 font-medium text-sm touch-manipulation">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <button className="w-full sm:w-auto bg-burgundy-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-burgundy-700 transition-colors touch-manipulation">
                  Create Custom Report
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
