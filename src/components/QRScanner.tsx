import React, { useState, useRef, useEffect } from 'react'
import QrScanner from 'qr-scanner'
import { supabase } from '../lib/supabase'

interface QRScannerProps {
  isOpen: boolean
  onClose: () => void
  onScan: (result: string) => void
  user: any
}

export const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onScan, user }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; eventTitle?: string } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const qrScannerRef = useRef<QrScanner | null>(null)

  const processQRScan = async (qrData: string) => {
    if (!user) {
      throw new Error('Please log in to register attendance')
    }

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
        throw new Error('You have already checked in for this event')
      }

      // Create attendance record
      const { error: attendanceError } = await supabase
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

      // Success! Set the result with welcome message
      setScanResult({
        success: true,
        message: `Welcome to "${eventData.title}"!`,
        eventTitle: eventData.title
      })

      // Call the parent callback
      onScan(qrData)

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)

    } catch (error) {
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (!isOpen || !videoRef.current) return

    const startScanner = async () => {
      try {
        setError(null)
        setIsScanning(true)
        
        if (!videoRef.current) {
          throw new Error('Video element not found')
        }
        
        const qrScanner = new QrScanner(
          videoRef.current,
          async (result: any) => {
            // Stop scanning immediately
            if (qrScannerRef.current) {
              qrScannerRef.current.stop()
            }
            
            setIsProcessing(true)
            setScanResult(null)
            setError(null)

            try {
              await processQRScan(result.data)
            } catch (error) {
              console.error('QR scan processing failed:', error)
              setError(error instanceof Error ? error.message : 'Failed to process QR code')
              setIsProcessing(false)
              // Restart scanner on error
              if (qrScannerRef.current && videoRef.current) {
                qrScannerRef.current.start()
              }
            }
          },
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        )

        qrScannerRef.current = qrScanner
        await qrScanner.start()
      } catch (err) {
        console.error('Failed to start QR scanner:', err)
        setError('Failed to start camera. Please check permissions.')
        setIsScanning(false)
      }
    }

    startScanner()

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop()
        qrScannerRef.current.destroy()
        qrScannerRef.current = null
      }
      setIsScanning(false)
    }
  }, [isOpen, onScan, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Scan QR Code</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Scan the QR code to register for attendance
          </p>
        </div>

        <div className="p-4">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        ) : scanResult?.success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Attendance Registered!</h3>
            <p className="text-green-800 font-medium">{scanResult.message}</p>
            <p className="text-sm text-green-600 mt-2">This window will close automatically...</p>
          </div>
        ) : isProcessing ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Registering Attendance...</h3>
            <p className="text-blue-800">Please wait while we process your check-in</p>
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-64 bg-black rounded-lg"
              playsInline
              muted
            />
            {!isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <div className="text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-sm">Starting camera...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Position QR code within the frame</span>
          </div>
        </div>
      </div>
    </div>
  )
}
