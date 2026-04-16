import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BottomNavigation } from '../components/BottomNavigation'
import { QRScanner } from '../components/QRScanner'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
// import { BackgroundImage } from './BackgroundImage'

export const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [attendanceMessage, setAttendanceMessage] = useState<string>('')

  const handleQRScan = async (qrData: string) => {
    if (!user) {
      setAttendanceStatus('error')
      setAttendanceMessage('Please log in to register attendance')
      return
    }

    setAttendanceStatus('processing')
    setAttendanceMessage('Processing attendance...')

    try {
      // Parse QR code data - expecting format: "event_id:UUID" or just UUID
      let eventId: string
      
      if (qrData.includes(':')) {
        // Format: "event_id:12345678-1234-1234-1234-123456789012"
        eventId = qrData.split(':')[1]
      } else {
        // Direct UUID format
        eventId = qrData
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(eventId)) {
        throw new Error('Invalid QR code format')
      }

      // Check if event exists and is active
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('id, title, date, time, location')
        .eq('id', eventId)
        .single()

      if (eventError || !eventData) {
        throw new Error('Event not found')
      }

      // Check if user already checked in for this event
      const { data: existingAttendance } = await supabase
        .from('attendance')
        .select('id')
        .eq('event_id', eventId)
        .eq('user_id', user.id)
        .single()

      if (existingAttendance) {
        setAttendanceStatus('error')
        setAttendanceMessage('You have already checked in for this event')
        return
      }

      // Create attendance record
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .insert({
          event_id: eventId,
          user_id: user.id,
          check_in_method: 'qr_scan'
        })
        .select('id, check_in_time')
        .single()

      if (attendanceError) {
        throw new Error(attendanceError.message)
      }

      // Success!
      setAttendanceStatus('success')
      setAttendanceMessage(`Successfully checked in for "${eventData.title}" at ${new Date(attendanceData.check_in_time).toLocaleTimeString()}`)

      // Reset status after 5 seconds
      setTimeout(() => {
        setAttendanceStatus('idle')
        setAttendanceMessage('')
      }, 5000)

    } catch (error) {
      console.error('Attendance registration failed:', error)
      setAttendanceStatus('error')
      setAttendanceMessage(error instanceof Error ? error.message : 'Failed to register attendance')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setAttendanceStatus('idle')
        setAttendanceMessage('')
      }, 5000)
    }
  }

  return (
    <>
      <QRScanner 
        isOpen={isQRScannerOpen} 
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleQRScan}
        user={user}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-burgundy-50 via-white to-burgundy-100 pb-16 md:pb-0">
        <div className="relative z-10 pt-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
            <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20">
              <div className="px-6 py-8 sm:p-8">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard</h2>
                  <p className="text-sm sm:text-base text-gray-600">Manage your church activities and connect with your community.</p>
                </div>

                {/* QR Scanner Button - Main Action */}
                <div className="mb-8">
                  {attendanceStatus !== 'idle' && (
                    <div className={`mb-4 p-4 rounded-lg border ${
                      attendanceStatus === 'success' 
                        ? 'bg-green-50 border-green-200' 
                        : attendanceStatus === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center">
                        {attendanceStatus === 'processing' && (
                          <svg className="w-5 h-5 text-blue-600 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {attendanceStatus === 'success' && (
                          <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {attendanceStatus === 'error' && (
                          <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <p className={`text-sm font-medium ${
                          attendanceStatus === 'success' 
                            ? 'text-green-800' 
                            : attendanceStatus === 'error'
                            ? 'text-red-800'
                            : 'text-blue-800'
                        }`}>
                          {attendanceMessage}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setIsQRScannerOpen(true)}
                    disabled={attendanceStatus === 'processing'}
                    className="w-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white py-4 sm:py-6 px-6 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl shadow-lg hover:shadow-burgundy-500/30 hover:from-burgundy-700 hover:to-burgundy-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-burgundy-500/20 flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span>{attendanceStatus === 'processing' ? 'Processing...' : 'Scan to Register for Attendance'}</span>
                  </button>
                </div>

                {/* Admin Information Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements & Information</h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-amber-900 mb-2">Important Updates</h4>
                        <div className="space-y-2 text-sm text-amber-800">
                          <p>Church service this Sunday at 10:00 AM - Main Auditorium</p>
                          <p>Prayer meeting every Wednesday at 7:00 PM - Fellowship Hall</p>
                          <p>Youth fellowship this Saturday at 5:00 PM - Youth Center</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forms Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Forms & Resources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Membership Form</h4>
                          <p className="text-sm text-gray-600">Become a church member</p>
                        </div>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Volunteer Form</h4>
                          <p className="text-sm text-gray-600">Join our volunteer team</p>
                        </div>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Event Registration</h4>
                          <p className="text-sm text-gray-600">Register for upcoming events</p>
                        </div>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Donation Form</h4>
                          <p className="text-sm text-gray-600">Make a contribution</p>
                        </div>
                      </div>
                    </a>
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
      </div>
      
      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation />
    </>
  )
}
