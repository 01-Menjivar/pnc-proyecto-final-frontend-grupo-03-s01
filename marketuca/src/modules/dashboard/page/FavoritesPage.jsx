import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { getAllProducts, getLikes } from "../services/dashboardService.js";
import Navbar from "../../utils/navbar/Navbar.jsx";
import ParticlesDashboard from "../../utils/ui/ParticlesDashboard.jsx";
import { ProductDetail } from "../components/modal/product-detail";

export default function FavoritesPage() {
  const { token, isAuthenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await getAllProducts(token);
        const likesArray = await getLikes(token); // esto ya es un array

        setProducts(productsData);
        setFavorites(likesArray.map((like) => like.productId).filter(Boolean));
      } catch (error) {
        console.error("Error al obtener productos o likes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated, token]);
console.log(products);
console.log(favorites);
  const filteredFavorites = products.filter(
      (product) =>
          favorites.includes(product.id) &&
          (!searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
      <div className="relative min-h-screen">
        <ParticlesDashboard />
        <Navbar
            cartCount={0}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />

        <div className="container px-4 py-12 mx-auto z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Tus productos favoritos</h2>

          {loading && <p className="text-center">Cargando...</p>}

          {!loading && filteredFavorites.length === 0 && (
              <p className="text-center text-gray-500">No tienes productos favoritos.</p>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredFavorites.map((product) => (
                <motion.div
                    key={product.id}
                    className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-xl cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-[#0056b3] font-bold">${product.price?.toFixed(2)}</p>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>

        <ProductDetail
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            isFavorite={true}
            onToggleFavorite={() => {}}
            onAddToCart={() => {}}
        />
      </div>
  );
}
