import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface MemberProfile {
  full_name: string
  email: string
  phone_number: string
  date_of_birth: string
  address: string
  membership_status: string
  group_affiliation: string
  roles: string
  profile_picture?: {
    base64: string
    name: string
  }
}

const FormInput: React.FC<{
  name: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
  required?: boolean
}> = ({ name, label, type, placeholder, value, onChange, icon, required }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-3 py-3 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-burgundy-500/20 focus:border-burgundy-500 appearance-none text-gray-800 font-medium transition-all outline-none touch-manipulation"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
    </div>
  </div>
)

export const Profile: React.FC = () => {
  const { user, isProfileComplete, checkProfileCompletion } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<MemberProfile>({
    full_name: '',
    email: user?.email || '',
    phone_number: '',
    date_of_birth: '',
    address: '',
    membership_status: '',
    group_affiliation: '',
    roles: '',
    profile_picture: undefined
  })

  // Load member data on component mount
  useEffect(() => {
    const loadMemberData = async () => {
      if (!user?.email) return
      
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('email', user.email)
          .single()

        if (error) {
          console.error('Error loading member data:', error)
          // If no member record exists, we'll use default values
          return
        }

        if (data) {
          setFormData({
            full_name: data.full_name || '',
            email: data.email || user.email || '',
            phone_number: data.phone_number || '',
            date_of_birth: data.date_of_birth || '',
            address: data.address || '',
            membership_status: data.membership_status || '',
            group_affiliation: data.group_affiliation || '',
            roles: data.roles || '',
            profile_picture: data.profile_picture || undefined
          })
        }
      } catch (error) {
        console.error('Error loading member data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMemberData()
  }, [user?.email])

  const handleGoBack = () => {
    navigate('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profile_picture: {
            base64: reader.result as string,
            name: file.name
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const errors: string[] = []

    // Check required fields
    if (!formData.full_name.trim()) {
      errors.push('Full Name is required')
    }
    if (!formData.email.trim()) {
      errors.push('Email Address is required')
    }
    if (!formData.phone_number.trim()) {
      errors.push('Phone Number is required')
    }
    if (!formData.date_of_birth.trim()) {
      errors.push('Date of Birth is required')
    }
    if (!formData.address.trim()) {
      errors.push('Address is required')
    }
    if (!formData.membership_status.trim()) {
      errors.push('Membership Status is required')
    }

    // Check if profile picture is uploaded
    if (!formData.profile_picture?.base64) {
      errors.push('Profile Picture is required')
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }

    if (!user?.email) {
      console.error('No user email available')
      return
    }

    setIsSaving(true)
    
    try {
      // Prepare data for Supabase
      const memberData = {
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        membership_status: formData.membership_status,
        group_affiliation: formData.group_affiliation,
        roles: formData.roles,
        profile_picture: formData.profile_picture,
        updated_at: new Date().toISOString()
      }

      // Check if member record exists
      const { data: existingMember } = await supabase
        .from('members')
        .select('id')
        .eq('email', user.email)
        .single()

      let result
      if (existingMember) {
        // Update existing member
        result = await supabase
          .from('members')
          .update(memberData)
          .eq('email', user.email)
          .select()
          .single()
      } else {
        // Create new member record
        result = await supabase
          .from('members')
          .insert({
            ...memberData,
            date_joined: new Date().toISOString().split('T')[0]
          })
          .select()
          .single()
      }

      if (result.error) {
        console.error('Error saving member data:', result.error)
        throw result.error
      }

      console.log('Profile saved successfully:', result.data)
      // Clear validation errors on successful save
      setValidationErrors([])
      // Show success message
      setSuccessMessage('Profile updated successfully!')
      // Re-check profile completion status
      await checkProfileCompletion()
      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000)
      
      // If this was a first-time user, redirect to home after successful profile completion
      if (!isProfileComplete) {
        setTimeout(() => {
          navigate('/')
        }, 2000) // Wait 2 seconds to show success message before redirecting
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleGoBack}
                disabled={!isProfileComplete}
                className={`p-2 rounded-md transition-colors ${
                  isProfileComplete 
                    ? 'hover:bg-gray-100' 
                    : 'opacity-50 cursor-not-allowed bg-gray-100'
                }`}
                title={isProfileComplete ? 'Go back to dashboard' : 'Complete your profile first'}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Member Profile</h1>
                {!isProfileComplete && (
                  <p className="text-sm text-amber-600 font-medium mt-1">
                    Please complete your profile to continue
                  </p>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Please complete the following required fields:</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc list-inside space-y-1">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 1: Personal Information */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  {/* Profile Picture */}
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                      {formData.profile_picture?.base64 ? (
                        <img
                          src={formData.profile_picture.base64}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <input
                      id="profile_picture"
                      name="profile_picture"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                      onChange={handleFileChange}
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                    <p className="text-sm text-gray-600">Basic member details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    name="full_name"
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={handleChange}
                    icon={<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>}
                    required
                  />

                  <FormInput
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>}
                    required
                  />

                  <FormInput
                    name="phone_number"
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone_number}
                    onChange={handleChange}
                    icon={<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>}
                    required
                  />

                  <FormInput
                    name="date_of_birth"
                    label="Date of Birth"
                    type="date"
                    placeholder=""
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    icon={<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>}
                    required
                  />

                  <div className="md:col-span-2">
                    <FormInput
                      name="address"
                      label="Address"
                      type="text"
                      placeholder="123 Church St, City, Country"
                      value={formData.address}
                      onChange={handleChange}
                      icon={<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>}
                      required
                    />
                  </div>
                </div>
              </section>

              <div className="border-t border-gray-100" />

              {/* Section 2: Church Details */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-burgundy-500 to-burgundy-700 rounded-xl text-white shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Church Details</h3>
                    <p className="text-sm text-gray-600">Roles and membership information</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Custom Select for Membership Status */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Status <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="membership_status"
                        value={formData.membership_status}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-burgundy-500/20 focus:border-burgundy-500 appearance-none text-gray-800 font-medium transition-all outline-none"
                        required
                      >
                        <option value="" disabled className="text-gray-400">Select status</option>
                        <option value="member">Member</option>
                        <option value="visitor">Visitor</option>
                        <option value="church worker">Church Worker</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <FormInput
                    name="group_affiliation"
                    label="Group Affiliation"
                    type="text"
                    placeholder="e.g. Choir, Ushering"
                    value={formData.group_affiliation}
                    onChange={handleChange}
                    icon={<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>}
                  />

                  <div className="md:col-span-2">
                    <FormInput
                      name="roles"
                      label="Church Roles"
                      type="text"
                      placeholder="e.g. Deacon, Sunday School Teacher"
                      value={formData.roles}
                      onChange={handleChange}
                      icon={<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>}
                    />
                  </div>

                  </div>
              </section>

              <div className="pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-4 sm:py-4 bg-gradient-to-r from-burgundy-600 via-burgundy-700 to-burgundy-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-burgundy-500/30 hover:from-burgundy-700 hover:via-burgundy-800 hover:to-burgundy-900 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-burgundy-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group touch-manipulation min-h-[56px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>updating profile...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-bold">Update Profile</span>
                      <svg className="transform -rotate-90 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
