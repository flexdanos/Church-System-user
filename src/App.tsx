import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LoadingProvider, useLoading } from './contexts/LoadingContext'
import { BeautifulAuth } from './components/BeautifulAuth'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { SetupWarning } from './components/SetupWarning'
import { Members } from './pages/Members'
import { Events } from './pages/Events'
import { Donations } from './pages/Donations'
import { Reports } from './pages/Reports'
import { Profile } from './pages/Profile'
import { Loader } from './components/Loader'

function AppContent() {
  const { user, loading, isProfileComplete, isFirstTimeUser } = useAuth()
  const { isLoading, loadingText } = useLoading()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if Supabase is properly configured
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
                               import.meta.env.VITE_SUPABASE_ANON_KEY &&
                               import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co'

  // Only redirect actual first-time users to profile page (but not if already on profile)
  useEffect(() => {
    if (user && isFirstTimeUser && !isProfileComplete && location.pathname !== '/profile') {
      navigate('/profile', { replace: true })
    }
  }, [user, isFirstTimeUser, isProfileComplete, navigate, location.pathname])

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-burgundy-50 via-white to-burgundy-100 flex items-center justify-center p-4">
        <SetupWarning />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-burgundy-50 via-white to-burgundy-100">
        <Loader size="lg" text="Initializing application..." />
      </div>
    )
  }

  if (!user) {
    return <BeautifulAuth />
  }

  return (
    <>
      {isLoading && <Loader fullScreen text={loadingText} />}
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LoadingProvider>
  )
}

export default App
