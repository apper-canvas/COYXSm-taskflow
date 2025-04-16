export default function Card({
  children,
  className = '',
  padding = 'normal',
  hover = false,
  ...props
}) {
  const baseClass = 'bg-white border border-gray-200 rounded-lg shadow-sm'
  const paddingClass = {
    'none': '',
    'small': 'p-3',
    'normal': 'p-4',
    'large': 'p-6'
  }
  const hoverClass = hover ? 'transition-all duration-200 hover:shadow-md' : ''
  
  const cardClasses = `
    ${baseClass}
    ${paddingClass[padding]}
    ${hoverClass}
    ${className}
  `.trim()
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}