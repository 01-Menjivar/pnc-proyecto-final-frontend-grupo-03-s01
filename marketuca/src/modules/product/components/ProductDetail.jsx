import { motion } from "framer-motion";
import ProductComments from "./ProductComments.jsx";
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";
import Whatsapp from "../../utils/ui/Whatsapp.jsx";
import {useContext, useEffect, useState} from "react";
import {getProductById} from "../services/productService.js";
import {useParams} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext.jsx";

const ProductDetail = ( ) => {
    const { token, isAuthenticated } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const {id} = useParams();




    const handleContact = () => {
        // Si el phoneNumber ya incluye el +503 perfecto, si no, puedes agregarlo aquí.
        if (product.phoneNumber) {
            // Remueve espacios y caracteres que no sean números o +
            const cleaned = product.phoneNumber.replace(/\D/g, '');
            window.open(`https://wa.me/503${cleaned}`, "_blank");
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id, token);
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

    if (loading) return <div>Cargando...</div>;
    if (!product) return <div>No se encontró el producto</div>;

   return (
        <motion.div
            className="min-h-screen py-8 my-4 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ParticlesBackground />
            <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
                {/* Imagen del producto */}
                <motion.div
                    className="flex-1"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-auto object-contain rounded-lg"
                    />
                </motion.div>

                {/* Detalles del producto */}
                <div className="flex-1 flex flex-col gap-4">
                    <motion.h1
                        className="text-3xl font-bold text-gray-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {product.title}
                    </motion.h1>

                    <motion.p
                        className="text-2xl text-green-600 font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        ${product.price}
                    </motion.p>

                    <motion.span
                        className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {product.condition}
                    </motion.span>

                    <motion.div
                        className="mt-4 text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                        <p className="leading-relaxed">{product.description}</p>
                    </motion.div>

                    <motion.div
                        className="mt-auto text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <p><strong>Categoría:</strong> {product.category}</p>
                        <p><strong>Vendedor:</strong> {product.seller}</p>
                        {product.phoneNumber && (
                            <p><strong>Teléfono:</strong> {product.phoneNumber}</p>
                        )}
                    </motion.div>

                    <div className={"w-auto"}>
                        <motion.button
                            onClick={handleContact}
                            initial={{ scale: 1, y: 30 }}
                            whileInView={{ scale: 1, y: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className={
                                "bg-[#25D366] rounded-xl hover:bg-[#128C7E] transition transition-colors duration-150 flex gap-2 p-2 items-center justify-center text-center w-auto"
                            }
                        >
                            <Whatsapp />
                            <span className="text-md text-gray-100">Contactame</span>
                        </motion.button>
                    </div>
                </div>
            </div>
            {/* Pasa el productId a comentarios, si necesitas */}
            <ProductComments productId={id} token={token}/>
        </motion.div>
    );
};

export default ProductDetail;
