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
    <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink 
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
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
        
        <div className="mt-10 px-4">
          <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Support
          </h2>
          <ul className="mt-2 space-y-1">
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <span className="mr-3"><Settings size={20} /></span>
                Settings
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <span className="mr-3"><HelpCircle size={20} /></span>
                Help & Support
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}