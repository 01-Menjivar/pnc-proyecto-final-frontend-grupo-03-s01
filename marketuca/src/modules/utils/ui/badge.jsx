export function Badge({ children, className = "", ...props }) {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 ${className}`}
        {...props}
      >
        {children}
      </span>
    )
  }
  