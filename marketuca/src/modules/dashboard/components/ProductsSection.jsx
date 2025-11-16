import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Heart } from "lucide-react";

const ProductsSection = ({
                             products,
                             loading,
                             hasMore,
                             loadMoreProducts,
                             activeCategory,
                             onProductClick,    // <-- Nombre estándar del prop
                             favorites,
                             toggleFavorite,
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
        <div className="container px-4 py-12 mx-auto z-10">
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
                                className={`absolute top-2 right-2 rounded-full p-2 bg-white/80 backdrop-blur-sm ${
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
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-gray-800">{product.title}</h3>
                                <p className="text-lg font-bold text-[#0056b3]">${product.price?.toFixed(2) ?? "0.00"}</p>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-gray-500"><span>{product.seller}</span></div>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                                <span>{product.condition}</span>
                                <span className="mx-2">•</span>
                                <div className="flex items-center">
                                    <span className="text-yellow-500">★</span>
                                    <span className="ml-1">{product.rating ?? "4.5"}</span>
                                </div>
                            </div>
                            <div className="flex mt-4">

                                <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                                    <button
                                        className="bg-gradient-to-r from-[#0056b3] to-[#339CFF] hover:from-[#339CFF] hover:to-[#0056b3] text-white px-3 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onProductClick(product) // <<

                                        }}
                                    >
                                        Ver detalles
                                    </button>
                                </motion.div>
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
            {!loading && !hasMore && products.length > 0 && (
                <div className="text-center py-4 text-gray-500">No hay más productos para mostrar.</div>
            )}
        </div>
    );
};

export default ProductsSection;
