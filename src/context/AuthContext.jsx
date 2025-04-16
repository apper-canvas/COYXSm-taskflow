import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com'
  })
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Auto-create a demo user
      const demoUser = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com'
      }
      localStorage.setItem('user', JSON.stringify(demoUser))
    }
    setIsAuthenticated(true)
    setIsLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    const demoUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com'
    }
    setUser(demoUser)
    localStorage.setItem('user', JSON.stringify(demoUser))
    // We keep authenticated status true to maintain dashboard access
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