import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const ProductCarousel = ({ products, handleProductClick, favorites, toggleFavorite }) => {
    const scrollRef = useRef(null);
    const SCROLL_AMOUNT = 320; // Tamaño estimado de un producto + margen


    // Simular infinito: duplicamos productos
    const loopedProducts = [...products];

    // Reiniciar scroll al inicio al llegar al final virtual
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const halfway = container.scrollWidth / 2;
            if (container.scrollLeft >= halfway) {
                container.scrollLeft = 0;
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    };

    const productVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, type: "spring", stiffness: 80, damping: 15 },
        },
    };

    const heartVariants = {
        initial: { scale: 1 },
        animate: {
            scale: [1, 1.2, 0.9, 1],
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="relative max-w-screen-xl mx-auto px-4">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-gray-800 mb-6 text-center"
            >
                Mis productos
            </motion.h2>
            {/* Botón izquierdo */}
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 ml-2"
            >
                ‹
            </button>

            {/* Carrusel de productos */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-5 px-12 py-6 scrollbar-hide justify-center"
            >
                {loopedProducts.map((product, index) => (
                    <motion.div
                        key={`${product.id}-${index}`}
                        className="min-w-[300px] max-w-[300px] flex-shrink-0 bg-white border border-gray-200 rounded-xl hover:shadow-xl group cursor-pointer"
                        variants={productVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{
                            scale: 1.03,
                            boxShadow: "0 10px 20px rgba(0, 86, 179, 0.15)",
                            borderColor: "#339CFF",
                        }}
                        onClick={() => handleProductClick(product)}
                    >
                        <div className="relative overflow-hidden aspect-square">
                            <motion.img
                                src={product.image}
                                alt={product.title}
                                className="object-cover w-full h-full"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.button
                                className={`absolute top-2 right-2 rounded-full p-2 bg-white/80 backdrop-blur-sm ${
                                    favorites.includes(product.id) ? "text-red-500" : "text-gray-500"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(product.id);
                                }}
                                variants={heartVariants}
                                initial="initial"
                                animate={favorites.includes(product.id) ? "animate" : "initial"}
                            >
                                <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                            </motion.button>
                            <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-white bg-gradient-to-t from-black/70 to-transparent">
                                {product.location}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-gray-800">{product.title}</h3>
                                <p className="text-lg font-bold text-[#0056b3]">${product.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                                <span>{product.condition}</span>
                                <span className="mx-2">•</span>
                                <div className="flex items-center">
                                    <span className="text-yellow-500">★</span>
                                    <span className="ml-1">{product.rating}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-sm text-gray-600">{product.seller}</span>
                                <button
                                    className="bg-gradient-to-r from-[#0056b3] to-[#339CFF] hover:from-[#339CFF] hover:to-[#0056b3] text-white px-3 py-1 rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProductClick(product);
                                    }}
                                >
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Botón derecho */}
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2 mr-2"
            >
                ›
            </button>
        </div>
    );
};

export default ProductCarousel;
