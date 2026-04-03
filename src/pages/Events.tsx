import React from 'react'
import { BottomNavigation } from '../components/BottomNavigation'

export const Events: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-burgundy-50 via-white to-burgundy-100 pb-16 md:pb-0">
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20">
            <div className="px-6 py-8 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Events & Calendar</h2>
                <p className="text-sm sm:text-base text-gray-600">Schedule and manage all church events, services, and activities. Keep your congregation informed and engaged.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Upcoming Events</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-burgundy-600">8</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">This month</p>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Attendees</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">156</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Registered for events</p>
                </div>
                
                <div className="bg-white/90 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-burgundy-100 hover:shadow-lg sm:hover:shadow-xl transition-shadow backdrop-blur-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burgundy-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Next Service</h3>
                  <p className="text-lg sm:text-xl font-bold text-blue-600">Sunday</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">10:00 AM Worship</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 space-y-4">
                <div className="bg-white/80 p-4 rounded-lg border border-burgundy-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Sunday Service</h4>
                  <p className="text-sm text-gray-600 mb-2">Join us for our weekly worship service</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-burgundy-100 text-burgundy-700 px-2 py-1 rounded">Sunday, 10:00 AM</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Main Sanctuary</span>
                  </div>
                </div>
                
                <div className="bg-white/80 p-4 rounded-lg border border-burgundy-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Bible Study</h4>
                  <p className="text-sm text-gray-600 mb-2">Mid-week fellowship and study</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-burgundy-100 text-burgundy-700 px-2 py-1 rounded">Wednesday, 7:00 PM</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Fellowship Hall</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <button className="w-full sm:w-auto bg-burgundy-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-burgundy-700 transition-colors touch-manipulation">
                  Create New Event
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
