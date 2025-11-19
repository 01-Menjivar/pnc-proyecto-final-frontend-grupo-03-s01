import { useState } from "react"
import { Heart, MessageSquare, Share2, ShoppingCart, Star } from "lucide-react"
import { Button } from "../../../utils/ui/button"
import { Modal } from "../modal/modal"
import { motion } from "framer-motion"
import Whatsapp from "../../../utils/ui/Whatsapp.jsx";
import { Link } from "react-router-dom";
import ProductComments from "../../../product/components/ProductComments.jsx";

export function ProductDetail({ product, isOpen, onClose, token }) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState("details") // Nueva state para las pestañas
  // Galería de imágenes: usa todas las del producto si existen
  const productImages = product?.images && product.images.length > 0
      ? product.images
      : [
        product?.image || "/placeholder.svg?height=200&width=200&text=Vista+principal",
        "/placeholder.svg?height=200&width=200&text=Vista+frontal",
        "/placeholder.svg?height=200&width=200&text=Vista+trasera",
      ]

  const handleWhatsappClick = () => {
    const phone = "+503"+product?.phoneNumber || "77777777"
    const message = `Hola, estoy interesado en el producto: ${product.title}. ¿Podrías darme más información?`
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!product) return null

  return (
      <Modal isOpen={isOpen} onClose={onClose} title={product.title}>
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
              activeTab === "details"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Star className="w-4 h-4" />
            Detalles del producto
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
              activeTab === "comments"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Comentarios
          </button>
        </div>
        {activeTab === "details" ? (
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
                <div className="flex items-center gap-1">
                </div>
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
               
                  <div
                      className="w-10 h-10 rounded-full bg-[#E0EEFF] flex items-center justify-center text-[#0056b3] font-bold">
                    {product.seller ? product.seller.charAt(0) : ""}
                  </div>
                
                <div>
                  <Link to={`/user/${product.seller}`}><p className="font-medium hover:text-blue-900 transition transform duration-150">{product.seller}</p>
                  </Link>
                </div>
              </div>
              <div className={"flex items-center justify-left mt-4"}>
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(37, 211, 102, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsappClick}
                    className={"bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] transition-all duration-300 flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-lg cursor-pointer hover:shadow-xl"}
                >
                  <Whatsapp className="w-5 h-5" />
                  <span>Contactar por WhatsApp</span>
                </motion.button>
              </div>
            </div>

            {/* Botón de añadir al carrito y acciones extra */}

          </div>
        </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <ProductComments productId={product.id} token={token} />
          </div>
        )}
      </Modal>
  )
}
