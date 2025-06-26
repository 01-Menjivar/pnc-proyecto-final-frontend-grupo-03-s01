import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../utils/navbar/Navbar.jsx";
import { ProductDetail } from "../components/modal/product-detail";
import ParticlesDashboard from "../../utils/ui/ParticlesDashboard.jsx";

// Simula fetch a productos (puedes cambiar a API real o contexto si quieres)
const getAllProducts = async () => {
  // Aquí podrías usar fetch o axios para traer productos
  // o podrías pasarlos por props si tu dashboard los sube a un context global
  try {
    const response = await fetch("/products.json");
    return await response.json();
  } catch {
    return [];
  }
};

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]); // IDs de productos favoritos
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  // Simula paginación/infinite scroll
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [hasMore, setHasMore] = useState(true);

  // Obtener todos los productos al cargar
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Opcional: cargar favoritos de localStorage si lo quieres persistente
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Filtrar productos favoritos y aplicar búsqueda
  const filteredFavorites = products
      .filter(p => favorites.includes(p.id))
      .filter(p =>
          !searchQuery ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, page * itemsPerPage);

  // Paginación/infinite scroll
  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef, { once: false });

  useEffect(() => {
    if (isInView && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [isInView, hasMore, loading]);

  useEffect(() => {
    setHasMore(filteredFavorites.length < products.filter(p => favorites.includes(p.id)).length);
  }, [filteredFavorites, favorites, products]);

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
        prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
    );
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleAddToCart = (product) => setCart(prev => [...prev, product]);

  // Animaciones
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, type: "spring", stiffness: 80, damping: 15 },
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

  return (
      <div className="relative min-h-screen">
        <Navbar
            cartCount={cart.reduce((total, item) => total + (item.quantity || 1), 0)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />
        <ParticlesDashboard />
        <div className="container px-4 py-12 mx-auto z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Favoritos</h2>
            <button
                onClick={() => (window.location.href = "/dashboard")}
                className="bg-[#0056b3] text-white px-4 py-2 rounded hover:bg-[#339CFF] transition-colors"
            >
              Volver a Menu Principal
            </button>
          </div>
          {filteredFavorites.length === 0 && !loading && (
              <div className="text-center py-4 text-gray-500">No tienes productos favoritos.</div>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredFavorites.map((product) => (
                <motion.div
                    key={product.id}
                    className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-xl group cursor-pointer"
                    variants={productVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 86, 179, 0.15)", borderColor: "#339CFF" }}
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
                        className={`absolute top-2 right-2 rounded-full p-2 bg-white/80 backdrop-blur-sm text-red-500`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        variants={heartVariants}
                        initial="initial"
                        animate="animate"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </motion.button>
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-xs font-medium text-white bg-gradient-to-t from-black/70 to-transparent">
                      {product.location}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-800">{product.title}</h3>
                      <p className="text-lg font-bold text-[#0056b3]">${product.price?.toFixed(2) ?? "N/A"}</p>
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
                      <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <button
                            className="bg-gradient-to-r from-[#0056b3] to-[#339CFF] hover:from-[#339CFF] hover:to-[#0056b3] text-white px-3 py-1 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(product);
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
                    onClick={() => setPage(p => p + 1)}
                >
                  Mostrar más favoritos
                </motion.button>
              </div>
          )}
          {!loading && !hasMore && filteredFavorites.length > 0 && (
              <div className="text-center py-4 text-gray-500">No hay más favoritos para mostrar.</div>
          )}
        </div>
        <ProductDetail
            product={selectedProduct}
            isOpen={isProductDetailOpen}
            onClose={() => setIsProductDetailOpen(false)}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.includes(selectedProduct?.id)}
            onToggleFavorite={() => toggleFavorite(selectedProduct?.id)}
        />
      </div>
  );
};

export default FavoritesPage;
