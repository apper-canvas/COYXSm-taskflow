import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { Moon, Sun, Home as HomeIcon, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 glass-effect border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="text-primary dark:text-primary-light font-bold text-2xl"
            >
              TaskFlow
            </motion.div>
          </div>
          
          <nav className="flex-1 max-w-xs mx-8">
            <ul className="flex justify-center space-x-2">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light' 
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`
                  }
                >
                  <HomeIcon size={18} className="mr-1" />
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light' 
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`
                  }
                >
                  <BarChart size={18} className="mr-1" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-surface-600" />
            )}
          </motion.button>
        </div>
      </header>
      
      <main className="pt-16 pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="border-t border-surface-200 dark:border-surface-800 py-4 text-center text-surface-500">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App