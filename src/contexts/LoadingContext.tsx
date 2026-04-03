import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
  loadingText: string
  showLoader: (text?: string) => void
  hideLoader: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Loading...')

  const showLoader = (text = 'Loading...') => {
    setLoadingText(text)
    setIsLoading(true)
  }

  const hideLoader = () => {
    setIsLoading(false)
  }

  const value = {
    isLoading,
    loadingText,
    showLoader,
    hideLoader
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}
