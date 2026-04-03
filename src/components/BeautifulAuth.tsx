import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BackgroundImage } from './BackgroundImage'

export const BeautifulAuth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isSignUp) {
      const { error } = await signUp(email, password)
      
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Account created successfully! Please sign in to continue.')
        // Switch to sign-in mode after successful signup
        setIsSignUp(false)
        // Clear password field for security
        setPassword('')
      }
    } else {
      const { error } = await signIn(email, password)
      
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Welcome back to Church System!')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-4">
      <BackgroundImage />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-xl sm:shadow-2xl border-2 border-white/20">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-burgundy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">Church System</h1>
          <p className="text-white/90 text-base sm:text-lg drop-shadow-md">Welcome to our faith community</p>
          <p className="text-white/80 mt-1 text-sm sm:text-base drop-shadow-sm">Connect, worship, and grow together</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-6 sm:p-8 border border-white/20">
          {/* Tab Navigation */}
          <div className="flex mb-6 sm:mb-8 bg-gray-100/50 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium rounded-md transition-all duration-200 text-sm sm:text-base ${
                !isSignUp 
                  ? 'bg-burgundy-600 text-white shadow-md' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/70'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium rounded-md transition-all duration-200 text-sm sm:text-base ${
                isSignUp 
                  ? 'bg-burgundy-600 text-white shadow-md' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-white/70'
              }`}
            >
              Join Community
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 4 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent transition-all text-gray-900 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-transparent transition-all text-gray-900 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                  placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center touch-manipulation"
                >
                  {showPassword ? (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563 3.669A10.055 10.055 0 0112 19z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 011.563 3.669A10.055 10.055 0 0112 19z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="text-xs sm:text-sm text-gray-600">
                <p>By signing up, you agree to our:</p>
                <div className="mt-2 space-y-1">
                  <label className="flex items-start sm:items-center">
                    <input type="checkbox" className="mr-2 mt-0.5 sm:mt-0 rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500" />
                    <span className="text-xs sm:text-sm">I agree to the Terms of Service</span>
                  </label>
                  <label className="flex items-start sm:items-center">
                    <input type="checkbox" className="mr-2 mt-0.5 sm:mt-0 rounded border-gray-300 text-burgundy-600 focus:ring-burgundy-500" />
                    <span className="text-xs sm:text-sm">I want to receive church updates</span>
                  </label>
                </div>
              </div>
            )}

            {message && (
              <div className={`p-3 sm:p-4 rounded-lg text-xs sm:text-sm backdrop-blur-sm ${
                message.includes('success') || message.includes('Welcome') 
                  ? 'bg-green-50/90 text-green-700 border border-green-200/50' 
                  : 'bg-red-50/90 text-red-700 border border-red-200/50'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg shadow-lg backdrop-blur-sm touch-manipulation"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                isSignUp ? 'Join Our Community' : 'Sign In to Worship'
              )}
            </button>
          </form>

          {/* Additional Options */}
          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : "New to our community?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 font-semibold text-burgundy-600 hover:text-burgundy-700 transition-colors touch-manipulation"
                >
                  {isSignUp ? 'Sign in here' : 'Join us here'}
                </button>
              </p>
            </div>
            
            {!isSignUp && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-xs sm:text-sm text-burgundy-600 hover:text-burgundy-700 font-medium transition-colors touch-manipulation"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs text-white/70 drop-shadow-sm">
            © 2024 Church System. Building faith communities online.
          </p>
        </div>
      </div>
    </div>
  )
}
