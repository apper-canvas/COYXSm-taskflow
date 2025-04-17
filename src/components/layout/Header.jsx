import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Menu, 
  Search, 
  Bell, 
  X, 
  LogOut 
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-surface-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-surface-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-surface-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-surface-200 rounded-xl leading-5 bg-surface-50 placeholder-surface-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 sm:text-sm transition-colors"
                  type="search"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="p-1.5 text-surface-500 hover:text-surface-700 focus:outline-none rounded-full hover:bg-surface-100 transition-colors"
              >
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
              </button>
              
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="text-sm font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-dropdown bg-white ring-1 ring-surface-200 z-10">
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-surface-700 hover:bg-surface-100 transition-colors flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-surface-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block px-3 py-2 rounded-xl text-base font-medium text-surface-900 bg-surface-100"
            >
              Dashboard
            </a>
            <a
              href="/projects"
              className="block px-3 py-2 rounded-xl text-base font-medium text-surface-700 hover:bg-surface-100 transition-colors"
            >
              Projects
            </a>
            <a
              href="/tasks"
              className="block px-3 py-2 rounded-xl text-base font-medium text-surface-700 hover:bg-surface-100 transition-colors"
            >
              Tasks
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-surface-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <span className="text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-surface-800">
                  {user?.name || 'User'}
                </div>
                <div className="text-sm font-medium text-surface-500">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-surface-700 hover:bg-surface-100 transition-colors flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}