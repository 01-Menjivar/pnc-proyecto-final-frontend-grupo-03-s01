import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "../../../utils/ui/button"

export function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null)

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Cerrar al hacer clic fuera del modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-xl m-4 border border-[#0056b3]/20"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-[#0056b3]/30">
          <h2 className="text-xl font-semibold text-[#0056b3]">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-[#339CFF]/20 text-[#0056b3]"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
