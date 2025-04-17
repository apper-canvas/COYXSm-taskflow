export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyle = 'inline-flex items-center rounded-full font-medium'
  
  const variants = {
    default: 'bg-surface-100 text-surface-700',
    primary: 'bg-primary/10 text-primary-dark',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
    purple: 'bg-violet-100 text-violet-700'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm'
  }
  
  const badgeClasses = `
    ${baseStyle}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim()
  
  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  )
}