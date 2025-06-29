"use client"

import { useState } from "react"
import { Heart, MessageSquare, Share2, ShoppingCart, Star } from "lucide-react"
import { Button } from "../../../utils/ui/button"
import { Modal } from "../modal/modal"
import { motion } from "framer-motion"
import Whatsapp from "../../../utils/ui/Whatsapp.jsx";
import { Link } from "react-router-dom";

export function ProductDetail({ product, isOpen, onClose, onAddToCart, isFavorite, onToggleFavorite, isLiking }) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  // Galería de imágenes: usa todas las del producto si existen
  const productImages = product?.images && product.images.length > 0
      ? product.images
      : [
        product?.image || "/placeholder.svg?height=200&width=200&text=Vista+principal",
        "/placeholder.svg?height=200&width=200&text=Vista+frontal",
        "/placeholder.svg?height=200&width=200&text=Vista+trasera",
      ]
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleWhatsappClick = () => {
    const phone = "+503"+product?.phoneNumber || "77777777"
    const message = `Hola, estoy interesado en el producto: ${product.title}. ¿Podrías darme más información?`
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!product) return null

  return (
      <Modal isOpen={isOpen} onClose={onClose} title={product.title}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Galería de imágenes */}
          <div>
            <div className="overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                  src={productImages[activeImage] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-64 object-contain"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                  <button
                      key={index}
                      className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${activeImage === index ? "border-[#0056b3]" : "border-gray-200"
                      }`}
                      onClick={() => setActiveImage(index)}
                  >
                    <img
                        src={img || "/placeholder.svg"}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                  </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex flex-col">
            <div className="mb-4">
              <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {product.category
                    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
                    : ""}
              </span>
              </div>
              <h1 className="text-2xl font-bold mt-1">{product.title}</h1>
              <p className="text-3xl font-bold text-[#0056b3] mt-2">${product.price?.toFixed(2) ?? "0.00"}</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span>Condición: {product.condition}</span>
                <span className="mx-2">•</span>

              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Descripción</h3>
              <p className="text-sm text-gray-600">
                {product.description ||
                    `Este ${product.title} está en ${product.condition} y disponible para entrega inmediata. 
              Ideal para estudiantes universitarios que buscan productos de calidad a buen precio.`}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Vendedor</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E0EEFF] flex items-center justify-center text-[#0056b3] font-bold">
                  {product.seller ? product.seller.charAt(0) : ""}
                </div>
                <div>
                  <p className="font-medium">{product.seller}</p>
                </div>
              </div>
              <div className={"flex items-center justify-left mt-2 gap-5"}>
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleWhatsappClick}
                    className={"bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-150 flex gap-1 p-2 rounded-xl text-white shadow-md"}
                >
                  <Whatsapp />
                  Contactame
                </motion.button>
                <Link to={`/product/${product.id}`}>
                  <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className={"bg-[#0056b3] hover:bg-[#339CFF] transition-colors duration-150 flex gap-1 p-2 rounded-xl text-white shadow-md font-montserrat"}
                  >
                    Mas detalles
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Botón de añadir al carrito y acciones extra */}

          </div>
        </div>
      </Modal>
  )
}
