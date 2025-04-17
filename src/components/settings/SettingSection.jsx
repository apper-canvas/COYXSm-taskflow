import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function SettingSection({ 
  children, 
  icon, 
  title, 
  description,
  defaultOpen = true
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-6 bg-white rounded-xl border border-surface-200 overflow-hidden shadow-sm">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 bg-surface-50 hover:bg-surface-100 transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3 text-primary">{icon}</span>}
          <div className="text-left">
            <h3 className="text-lg font-medium text-surface-900">{title}</h3>
            {description && <p className="text-sm text-surface-500">{description}</p>}
          </div>
        </div>
        <span className="text-surface-500">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-5">
          {children}
        </div>
      )}
    </div>
  )
}