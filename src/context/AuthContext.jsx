import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = (userData) => {
    // In a real app, this would validate credentials with an API
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = (userData) => {
    // In a real app, this would send registration data to an API
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}