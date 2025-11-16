import { useState, useEffect, useContext } from "react";
import Navbar from "../../utils/navbar/Navbar.jsx";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import ProductsSection from "../components/ProductsSection";
import Footer from "../../utils/footer/Footer.jsx";
import { ProductDetail } from "../components/modal/product-detail";
import { SellProductModal } from "../components/modal/sell-product-modal";
import ParticlesDashboard from "../../utils/ui/ParticlesDashboard.jsx";
import {
  Book,
  Briefcase,
  Coffee,
  Gamepad2,
  Heart,
  Home,
  Laptop,
  MessageSquare,
  ShoppingBag,
  ShoppingCart,
  User,
  ShirtIcon,
  RulerIcon,
} from "lucide-react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import {
  dislikeProduct,
  getAllProducts,
  likeProduct,
  getLikes,
} from "../services/dashboardService.js";

export default function Dashboard() {
  const { token, isAuthenticated } = useContext(AuthContext);

  const categories = [
    { id: "all", name: "Todo", icon: <Home className="w-5 h-5" /> },
    { id: "Libros", name: "Libros", icon: <Book className="w-5 h-5" /> },
    { id: "Tecnologia", name: "Tecnologia", icon: <Laptop className="w-5 h-5" /> },
    { id: "Servicios", name: "Servicios", icon: <Briefcase className="w-5 h-5" /> },
    { id: "Entretenimiento", name: "Entretenimiento", icon: <Gamepad2 className="w-5 h-5" /> },
    { id: "Comida", name: "Comida", icon: <Coffee className="w-5 h-5" /> },
    { id: "Ropa", name: "Ropa", icon: <ShirtIcon className="w-5 h-5" /> },
    { id: "Otros", name: "Otros", icon: <RulerIcon /> },
  ];

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [likingProductIds, setLikingProductIds] = useState(new Set());


  // Cargar productos y likes al inicio
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsData = await getAllProducts(token);
        const likedProductIds = await getLikes(token);

        setProducts(productsData);
        setFavorites(likedProductIds);
      } catch (err) {
        console.error("Error al obtener productos o likes:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated, token]);

  // Filtro de productos
  const filteredProducts = products.filter((p) => {
    const matchCategory =
        activeCategory === "all" || p.categoryName === activeCategory;
    const matchSearch =
        !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Acciones
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    setIsProductDetailOpen(false);
  };

  const handleOpenSellModal = () => setIsSellModalOpen(true);
  const handleCloseSellModal = () => setIsSellModalOpen(false);
  const handleAddToCart = (product) => setCart((prev) => [...prev, product]);

  const handleLike = async (productId) => {
    if (likingProductIds.has(productId)) return; // Evita múltiples clics simultáneos

    setLikingProductIds((prev) => new Set(prev).add(productId));

    try {
      const like = favorites.find((f) => f.productId === productId);

      if (like) {
        const res = await dislikeProduct(like.likeId, token);
        if (!res) return;
      } else {
        const res = await likeProduct(productId, token);
        if (!res) return;
      }

      const updatedLikes = await getLikes(token);
      setFavorites(updatedLikes);
    } catch (error) {
      console.error("Error al actualizar like:", error);
    } finally {
      setLikingProductIds((prev) => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }
  };
  return (
      <div className="relative min-h-screen">
        <ParticlesDashboard />
        <Navbar
            cartCount={cart.length}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isAdmin={true}
        />
        <HeroSection onSellClick={handleOpenSellModal} />
        <CategoriesSection
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        />
        <ProductsSection
            products={filteredProducts}
            loading={loading}
            onProductClick={handleProductClick}
            favorites={favorites}
            toggleFavorite={() => {}}
            onLike={handleLike}
            isLiking={likingProductIds.has(selectedProduct?.id)}

        />
        <Footer />
        <ProductDetail
            product={selectedProduct}
            isOpen={isProductDetailOpen}
            onClose={handleCloseProductDetail}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.some((f) => f.productId === selectedProduct?.id)}
            onToggleFavorite={handleLike}
            onLike={handleLike}
            isLiking={likingProductIds.has(selectedProduct?.id)}
        />
        <SellProductModal
            isOpen={isSellModalOpen}
            onClose={handleCloseSellModal}
            categories={categories}
        />
      </div>
  );
}