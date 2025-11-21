import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext.jsx";
import {
    getProductsByEmail
} from "../services/UserProfileService.js";
import {Link, useParams} from "react-router-dom";

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(AuthContext);
    const {email} = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProductsByEmail(email,token);
                const activeProducts = Array.isArray(result)
                    ? result.filter(p => p.active)
                    : [];
                setProducts(activeProducts);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, [token,email]);

    const productVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, type: "spring", stiffness: 80, damping: 15 },
        },
    };


    if (products.length === 0) {
        return (
            <div className="min-h-[calc(100vh-128px)] flex items-center justify-center">
                <p className="text-gray-500 text-lg">Este usuario no tiene productos publicados.</p>
            </div>
        );
    }

    return (
        <div className="relative max-w-screen-xl  mx-auto px-4 py-8">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-gray-800 mb-6 text-center"
            >
                Sus productos
            </motion.h2>

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
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
