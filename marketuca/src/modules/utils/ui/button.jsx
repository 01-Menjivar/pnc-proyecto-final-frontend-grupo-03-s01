"use client"

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#339CFF] disabled:opacity-50"

  const variants = {
    default: "bg-[#0056b3] text-white hover:bg-[#339CFF]",
    outline: "border border-[#0056b3] text-[#0056b3] bg-transparent hover:bg-[#0056b3]/10",
    ghost: "bg-transparent text-[#0056b3] hover:bg-[#0056b3]/10",
  }

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-0",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
