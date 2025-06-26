export function DropdownMenu({ children }) {
    return <div className="relative inline-block text-left">{children}</div>
  }
  
  export function DropdownMenuTrigger({ children, asChild }) {
    return <>{children}</>
  }
  
  export function DropdownMenuContent({ children, align = "center", className = "", onClose }) {
    return (
      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          align === "end" ? "right-0" : align === "start" ? "left-0" : "left-1/2 -translate-x-1/2"
        } ${className}`}
      >
        <div className="py-1">{children}</div>
      </div>
    )
  }
  
  export function DropdownMenuItem({ children, className = "", ...props }) {
    return (
      <button
        className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  