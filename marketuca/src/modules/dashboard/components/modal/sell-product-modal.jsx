"use client"

import { useContext, useState, useRef } from "react"
import { Upload, Package, FileText, CheckCircle, X } from "lucide-react"
import { Button } from "../../../utils/ui/button"
import { Input } from "../../../utils/ui/input"
import { AuthContext } from "../../../../context/AuthContext.jsx"
import {
  postProduct
} from "../../services/dashboardService.js"

export function SellProductModal({ isOpen, onClose, categories }) {
  const { token } = useContext(AuthContext)
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isPublishing, setIsPublishing] = useState(false)
  const totalSteps = 3

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    categoryName: "",
    condition: "",
    description: "",
  })

  const steps = [
    {
      id: 1,
      title: "Información del producto",
      subtitle: "Agrega detalles para atraer compradores",
      icon: Package,
      color: "bg-[#0056b3] border-[#0056b3]",
      bgColor: "bg-blue-50/50",
      borderColor: "border-[#0056b3]/30"
    },
    {
      id: 2,
      title: "Descripción y fotos",
      subtitle: "Cuéntanos qué estás vendiendo",
      icon: FileText,
      color: "bg-purple-600 border-purple-600",
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-400/30"
    },
    {
      id: 3,
      title: "Revisión final",
      subtitle: "Verifica que todo esté correcto antes de publicar",
      icon: CheckCircle,
      color: "bg-green-600 border-green-600",
      bgColor: "bg-green-50/50",
      borderColor: "border-green-400/30"
    }
  ]

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setIsPublishing(true)
    try {
      if (!token) {
        alert("Debes iniciar sesión")
        return
      }
      if (images.length === 0) {
        alert("Debes seleccionar al menos una imagen.")
        return
      }
      console.log(formData);
      await postProduct(formData, images, token)
      setFormData({
        title: "",
        price: "",
        categoryName: "",
        condition: "",
        description: "",
      })
      setImages([])
      setCurrentStep(1)
      if (fileInputRef.current) fileInputRef.current.value = ""
      onClose()
    } catch (err) {
      console.error("Error publicando producto:", err)
      alert("Error publicando producto.")
    } finally {
      setIsPublishing(false)
    }
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.price && formData.categoryName && formData.condition
      case 2:
        return formData.description && images.length > 0
      case 3:
        return true
      default:
        return false
    }
  }

  const currentStepData = steps.find(step => step.id === currentStep)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-[#0056b3] to-[#003875] px-6 py-4 rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Vender un producto</h2>
              <p className="text-blue-200 text-sm">Paso {currentStep} de {totalSteps}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto relative">
          {isPublishing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0056b3] mb-4"></div>
                <p className="text-[#0056b3] font-medium">Publicando producto...</p>
                <p className="text-gray-500 text-sm mt-1">Por favor espera un momento</p>
              </div>
            </div>
          )}
          
          <div className="p-6">
       
            <div className="flex gap-2 mb-6">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index + 1}
                  className={`flex-1 h-2 rounded-full ${
                    index + 1 <= currentStep ? 'bg-[#0056b3]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

        
            <div className={`rounded-lg border-2 p-4 mb-6 ${currentStepData.bgColor} ${currentStepData.borderColor}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${currentStepData.color} text-white`}>
                  <currentStepData.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{currentStepData.title}</h3>
                  <p className="text-sm text-gray-600">{currentStepData.subtitle}</p>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {currentStep === 1 && (
                <div className="space-y-4 pb-6">
                  {/* Título */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Título del producto *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ej: MacBook Pro 2019"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Precio *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="pl-7"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                      Condición *
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#339CFF]"
                      required
                    >
                      <option value="" disabled>
                        Selecciona una condición
                      </option>
                      <option value="Nuevo">Nuevo</option>
                      <option value="Como nuevo">Como nuevo</option>
                      <option value="Buen estado">Buen estado</option>
                      <option value="Usado">Usado</option>
                      <option value="Para reparar">Para reparar</option>
                    </select>
                  </div>
                  
                  {/* Categoría */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      id="categoryName"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleChange}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#339CFF]"
                      required
                    >
                      <option value="" disabled>
                        Selecciona una categoría
                      </option>
                      {categories.slice(1).map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
          
              {currentStep === 2 && (
                <div className="space-y-4 pb-6">
                  {/* Descripción */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción detallada *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#339CFF]"
                      placeholder="Describe tu producto, incluye detalles importantes, estado, características especiales, razón de venta..."
                      required
                    />
                  </div>
                  
           
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fotos del producto *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="mx-auto flex justify-center">
                        <Upload className="h-10 w-10 text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Arrastra y suelta imágenes aquí o haz clic para seleccionar</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="fileInput"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      >
                        Seleccionar imágenes
                      </Button>
                      {images.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-green-600 font-medium">
                            {images.length} imagen(es) seleccionada(s): {images.map(img => img.name).join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

       
              {currentStep === 3 && (
                <div className="space-y-4 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <h4 className="font-semibold text-gray-800 mb-4">Previsualización de tu publicación</h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                 
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Imágenes</h5>
                        {images.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {images.slice(0, 4).map((img, idx) => (
                              <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                alt={`Product ${idx + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                            ))}
                            {images.length > 4 && (
                              <div className="w-full h-24 bg-gray-200 rounded-lg border flex items-center justify-center">
                                <span className="text-gray-500 text-sm">+{images.length - 4} más</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-24 bg-gray-200 rounded-lg border flex items-center justify-center">
                            <span className="text-gray-500">Sin imágenes</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Título:</span>
                          <p className="font-semibold text-gray-800">{formData.title || "Sin título"}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Precio:</span>
                          <p className="text-lg font-bold text-blue-600">
                            ${formData.price || "0.00"}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Condición:</span>
                            <p className="text-sm">{formData.condition || "No especificada"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Categoría:</span>
                            <p className="text-sm">{formData.categoryName || "No especificada"}</p>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Descripción:</span>
                          <p className="text-sm text-gray-700 mt-1">
                            {formData.description ? 
                              (formData.description.length > 100 ? 
                                formData.description.substring(0, 100) + "..." : 
                                formData.description
                              ) : "Sin descripción"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-gray-200 bg-white p-6 rounded-b-lg">
          <div className="flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={isPublishing}
                >
                  Anterior
                </Button>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isPublishing}
              >
                Cancelar
              </Button>
              
              {currentStep < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!validateStep(currentStep) || isPublishing}
                  className="bg-[#0056b3] hover:bg-[#339CFF] text-white disabled:bg-gray-300"
                >
                  Siguiente
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
                  disabled={!validateStep(currentStep) || isPublishing}
                >
                  {isPublishing ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publicando...
                    </>
                  ) : (
                    "Publicar producto"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
