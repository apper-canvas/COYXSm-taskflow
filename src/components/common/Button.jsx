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
  const baseStyle = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark/90 shadow-sm',
    secondary: 'bg-white text-surface-700 border border-surface-200 hover:border-surface-300 hover:bg-surface-50 shadow-sm',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm',
    ghost: 'bg-transparent text-surface-600 hover:bg-surface-100 hover:text-surface-800'
  }
  
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-2.5 text-base',
    xl: 'px-6 py-3 text-base'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : ''
  
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