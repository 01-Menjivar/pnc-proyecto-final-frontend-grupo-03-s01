import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Heart } from "lucide-react";

const ProductsSection = ({
                             products,
                             loading,
                             hasMore,
                             loadMoreProducts,
                             activeCategory,
                             onProductClick,   
                             favorites,
                             onLike,
                                isLiking

                         }) => {
    const productVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, type: "spring", stiffness: 80, damping: 15, willChange: "opacity, transform" },
        },
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 86, 179, 0.2)" },
        tap: { scale: 0.95 },
    };

    const heartVariants = {
        initial: { scale: 1 },
        animate: {
            scale: [1, 1.2, 0.9, 1],
            transition: { duration: 0.3 },
        },
    };

    const loadMoreRef = useRef(null);
    const isInView = useInView(loadMoreRef, { once: true });

    useEffect(() => {
        if (isInView && hasMore && !loading) {
            loadMoreProducts();
        }
    }, [isInView, hasMore, loading, loadMoreProducts]);

    return (
        <div className="container px-4 pb-12 mx-auto z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    {activeCategory === "all" ? "Todos los productos" : activeCategory}
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-xl group cursor-pointer"
                        variants={productVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 86, 179, 0.15)", borderColor: "#339CFF" }}
                        onClick={() => onProductClick(product)}
                    >
                        <div className="relative overflow-hidden aspect-square">
                            <motion.img
                                src={product.image}
                                alt={product.title}
                                className="object-cover w-full h-full"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />
                            <button
                                type="button"
                                disabled={isLiking}
                                className={`absolute top-2 right-2 rounded-full p-2 bg-white/80 backdrop-blur-sm cursor-pointer ${
                                    favorites.some((f) => f.productId === product.id)
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onLike(product.id);
                                }}
                            >
                                <motion.div
                                    variants={heartVariants}
                                    initial="initial"
                                    animate={favorites.some((f) => f.productId === product.id) ? "animate" : "initial"}
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.some((f) => f.productId === product.id) ? "fill-current" : ""}`}
                                    />
                                </motion.div>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-white bg-gradient-to-t from-black/70 to-transparent">
                                {product.location}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">{product.title}</h3>
                            
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600 font-medium">{product.seller}</span>
                                <div className="flex items-center">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span className="text-sm text-gray-600">{product.rating ?? "4.5"}</span>
                                </div>
                            </div>

                            <hr className="border-gray-200 mb-3" />
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-bold text-blue-800">${product.price?.toFixed(2) ?? "0.00"}</p>
                                <motion.button
                                    className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-all duration-300 cursor-pointer"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onProductClick(product);
                                    }}
                                >
                                    Ver detalles
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {loading && <div className="text-center py-4">Cargando...</div>}
            {!loading && hasMore && (
                <div ref={loadMoreRef} className="text-center py-4">
                    <motion.button
                        className="bg-[#0056b3] text-white px-4 py-2 rounded hover:bg-[#339CFF] transition-colors"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={loadMoreProducts}
                    >
                        Mostrar más productos
                    </motion.button>
                </div>
            )}


            {products.length === 0 && (
                <div className="text-center py-4 text-gray-500">No hay productos para mostrar.</div>
            )}


        </div>
    );
};

export default ProductsSection;
