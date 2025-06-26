import {useState, useEffect, useContext} from "react";
import axios from "axios";
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
  ShirtIcon, RulerIcon,
} from "lucide-react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import useAuth from "../../../hooks/useAuth.js";
import {getAllProducts} from "../services/dashboardService.js";

export default function Dashboard() {
  const { token, isAuthenticated } = useContext(AuthContext);
  const categories = [
    { id: "all", name: "Todo", icon: <Home className="w-5 h-5" /> },
    { id: "libros", name: "Libros", icon: <Book className="w-5 h-5" /> },
    { id: "tecnologia", name: "Tecnología", icon: <Laptop className="w-5 h-5" /> },
    { id: "servicios", name: "Servicios", icon: <Briefcase className="w-5 h-5" /> },
    { id: "entretenimiento", name: "Entretenimiento", icon: <Gamepad2 className="w-5 h-5" /> },
    { id: "comida", name: "Comida", icon: <Coffee className="w-5 h-5" /> },
    { id: "ropa", name: "Ropa", icon: <ShirtIcon className="w-5 h-5" /> },
    { id: "otros", name: "Otros", icon: <RulerIcon/> }
  ];

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {

        const productsData = await getAllProducts(token);
        setProducts(productsData);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated, token]);


  const filteredProducts = products.filter(p => {
    const matchCategory =
        activeCategory === "all" ||
        p.category === activeCategory;
    const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

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
  const handleAddToCart = (product) => setCart(prev => [...prev, product]);
  const toggleFavorite = (productId) => setFavorites(prev =>
      prev.includes(productId)
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
  );


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
            toggleFavorite={toggleFavorite}
        />
        <Footer />
        <ProductDetail
            product={selectedProduct}
            isOpen={isProductDetailOpen}
            onClose={handleCloseProductDetail}
            onAddToCart={handleAddToCart}
            isFavorite={favorites.includes(selectedProduct?.id)}
            onToggleFavorite={toggleFavorite}
        />
        <SellProductModal
            isOpen={isSellModalOpen}
            onClose={handleCloseSellModal}
            categories={categories}
        />

      </div>

  );
}
