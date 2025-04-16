import { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}, ref) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'
  }
  
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  const buttonClasses = `
    ${baseStyle}
    ${variants[variant]}
    ${sizes[size]}
    ${widthClass}
    ${disabledClass}
    ${className}
  `.trim()
  
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button