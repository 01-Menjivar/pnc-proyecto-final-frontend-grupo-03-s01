import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { getMyProducts } from "../../profile/services/profileService.js";
import {Link} from "react-router-dom";
import { IconMoodEmpty } from '@tabler/icons-react';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getMyProducts(token);
                const activeProducts = Array.isArray(result)
                    ? result.filter(p => p.active)
                    : [];
                setProducts(activeProducts);
                console.log("Productos obtenidos:", activeProducts);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, [token]);

    const productVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, type: "spring", stiffness: 80, damping: 15 },
        },
    };

    const handleProductClick = (product) => {
        console.log("Producto clickeado:", product);
        // Puedes redirigir o abrir un modal aquí
    };

    return (
        <div className="relative max-w-screen-xl min-h-screen mx-auto px-4 py-8">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-gray-800 mb-6 text-center"
            >
                Mis productos
            </motion.h2>

            {
                products.length === 0 && (
                    <>
                    <p className="text-center text-gray-500 mt-10">No tienes productos activos.</p>
                    <div className="flex justify-center mt-6">
                        <IconMoodEmpty className="w-16 h-16 text-gray-300" />
                    </div>
                    </>
                )
            }

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <Link to={`/product/${product.id}`}>
                        <motion.div
                            key={`${product.id}-${index}`}
                            className="bg-white border border-gray-200 rounded-xl hover:shadow-xl group cursor-pointer"
                            variants={productVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.3}}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 10px 20px rgba(0, 86, 179, 0.15)",
                                borderColor: "#339CFF",
                            }}
                            onClick={() => handleProductClick(product)}
                        >
                            <div
                                className="relative overflow-hidden aspect-square">
                                <motion.img
                                    src={product.images?.[0] || "/placeholder.jpg"}
                                    alt={product.product}
                                    className="object-cover w-full h-full"
                                    whileHover={{scale: 1.05}}
                                    transition={{duration: 0.3}}
                                />
                            </div>
                            <div className="p-4">
                                <div
                                    className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-gray-800">{product.product}</h3>
                                    <p className="text-lg font-bold text-[#0056b3]">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                                <div
                                    className="flex items-center mt-2 text-sm text-gray-500">
                                    <span>{product.condition}</span>
                                </div>
                                <div
                                    className="flex items-center justify-between mt-4">
                                    <span
                                        className="text-sm text-gray-600">{product.userName}</span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))
                }
            </div>
        </div>
    )

};

export default ProductGrid;
