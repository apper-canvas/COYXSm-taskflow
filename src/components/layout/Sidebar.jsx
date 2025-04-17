import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Layout, 
  CheckSquare, 
  Calendar, 
  Settings, 
  HelpCircle 
} from 'lucide-react'

export default function Sidebar() {
  const navLinks = [
    { to: '/', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/projects', icon: <Layout size={20} />, text: 'Projects' },
    { to: '/tasks', icon: <CheckSquare size={20} />, text: 'Tasks' },
  ]

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-surface-200 shadow-sm">
      <div className="p-5 border-b border-surface-200">
        <h1 className="text-xl font-bold text-primary">TaskFlow</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink 
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-surface-700 hover:bg-surface-100'
                  }`
                }
                end={link.to === '/'}
              >
                <span className="mr-3">{link.icon}</span>
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-10 px-6">
          <h2 className="px-2 text-xs font-semibold text-surface-500 uppercase tracking-wider">
            Support
          </h2>
          <ul className="mt-3 space-y-1 px-3">
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-surface-700 hover:bg-surface-100'
                  }`
                }
              >
                <span className="mr-3"><Settings size={20} /></span>
                Settings
              </NavLink>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2.5 text-sm font-medium text-surface-700 rounded-xl hover:bg-surface-100 transition-colors"
              >
                <span className="mr-3"><HelpCircle size={20} /></span>
                Help & Support
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-surface-200">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-surface-800">John Doe</p>
            <p className="text-xs text-surface-500">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}