import { motion } from "framer-motion";
import ProductComments from "./ProductComments.jsx";
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";
import Whatsapp from "../../utils/ui/Whatsapp.jsx";
import { useContext, useEffect, useState } from "react";
import { getProductById } from "../services/productService.js";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { DeleteProductById } from "../services/productService.js";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { token, isAuthenticated } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = async () => {
        if (!isAuthenticated) {
            alert("Debes estar autenticado para eliminar un producto.");
            return;
        }
    
        await DeleteProductById(id);
        alert("Producto eliminado correctamente.");
        navigate("/products"); 
    }

    const handleContact = () => {
        if (product.phoneNumber) {
            // Remueve espacios y caracteres que no sean números o +
            const cleaned = product.phoneNumber.replace(/\D/g, '');
            window.open(`https://wa.me/503${cleaned}`, "_blank");
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (e) {
                console.error("Error fetching product:", e);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return (
        <motion.div
            className="flex items-center justify-center h-screen text-[#0056b3] text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.svg
                className="animate-spin h-6 w-6 mr-3 text-[#0056b3]"
                viewBox="0 0 24 24"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </motion.svg>
            Cargando producto...
        </motion.div>
    );
    if (!product) return (
        <motion.div
            className="flex flex-col items-center justify-center h-96 text-gray-600"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.img
                src="/placeholder.svg?height=120&width=120&text=No+encontrado"
                alt="Producto no encontrado"
                className="mb-4 opacity-70"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ delay: 0.2 }}
            />
            <motion.p className="text-lg font-medium mb-1">No se encontró el producto</motion.p>
            <motion.p
                className="text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Verifica la información o selecciona otro producto.
            </motion.p>
        </motion.div>
    );


    return (
        <motion.div
            className="min-h-screen py-8 my-4 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ParticlesBackground />
            <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-xl p-6 border border-gray-200">
             
                <motion.div
                    className="w-full max-w-md mx-auto h-[350px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-auto h-auto object-contain rounded-lg"
                    />
                </motion.div>

               
                <div className="flex-1 flex flex-col gap-4">
           
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                {product.category
                                    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
                                    : ""}
                            </span>
                        </div>
                        <motion.h1
                            className="text-2xl font-bold mt-1 text-gray-900"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {product.title}
                        </motion.h1>
                        <motion.p
                            className="text-3xl font-bold text-[#0056b3] mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            ${product.price?.toFixed(2) ?? "0.00"}
                        </motion.p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                            <span>Condición: </span>
                            <motion.span
                                className="ml-1 font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {product.condition}
                            </motion.span>
                        </div>
                    </div>

                    <motion.div
                        className="bg-gray-50 p-4 rounded-lg mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="font-medium mb-2">Descripción</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {product.description || `Este ${product.title} está en ${product.condition} y disponible para entrega inmediata. Ideal para estudiantes universitarios que buscan productos de calidad a buen precio.`}
                        </p>
                    </motion.div>

                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <h3 className="font-medium mb-2">Vendedor</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#E0EEFF] flex items-center justify-center text-[#0056b3] font-bold">
                                {product.seller ? product.seller.charAt(0) : ""}
                            </div>
                            <div>
                                <Link to={`/user/${product.seller}`}>
                                    <p className="font-medium hover:text-blue-900 transition transform duration-150">
                                        {product.seller}
                                    </p>
                                </Link>
                                {product.phoneNumber && (
                                    <p className="text-sm text-gray-500">Teléfono: {product.phoneNumber}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                        <motion.button
                            onClick={handleContact}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(37, 211, 102, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] transition-all duration-300 flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-lg cursor-pointer hover:shadow-xl justify-center"
                        >
                            <Whatsapp className="w-5 h-5" />
                            <span>Contactar por WhatsApp</span>
                        </motion.button>

                        {isAuthenticated && (
                            <motion.button
                                onClick={handleDelete}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-600 hover:bg-red-700 transition-colors duration-300 flex gap-2 p-3 items-center justify-center text-center rounded-full text-white font-medium shadow-lg hover:shadow-xl"
                            >
                                <Trash2 className="w-5 h-5" />
                                <span>Eliminar producto</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
            
            <motion.div
                className="relative z-20 max-w-6xl mx-auto mt-8 bg-white rounded-lg shadow-xl p-6 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <motion.div
                        className="w-8 h-8 bg-[#0056b3] rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <span className="text-white text-sm">💬</span>
                    </motion.div>
                    Comentarios del producto
                </h3>
                <ProductComments productId={id} token={token}/>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetail;
