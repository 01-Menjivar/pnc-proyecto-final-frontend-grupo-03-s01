import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Book, Star, MessageCircle, Edit, Trash2 } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import { getUserInfo, getProductsByEmail } from "../services/UserProfileService.js";
import { 
    getReviewsBySellerEmail, 
    postReview, 
    deleteReviewById, 
    updateReviewById,
    getReviewsByUser 
} from "../../profile/services/profileService.js";
import ProductCarousel from "../component/ProductCarousel.jsx";
import Whatsapp from "../../utils/ui/Whatsapp.jsx";

const Profile = () => {
    const { token, user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [activeTab, setActiveTab] = useState("products");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editText, setEditText] = useState("");
    const [editRating, setEditRating] = useState(5);
    const [loading, setLoading] = useState(false);
    
    const { email } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userInfo, userProducts, sellerReviews, userReviews] = await Promise.all([
                    getUserInfo(email, token),
                    getProductsByEmail(email, token),
                    getReviewsBySellerEmail(email),
                    getReviewsByUser()
                ]);
                
                setUser(userInfo.data);
                setProducts(userProducts);
                setReviews(sellerReviews);
                setMyReviews(userReviews);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, [email, token]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!reviewText.trim() || loading) return;
        
        setLoading(true);
        try {
            const newReview = await postReview(email, rating, reviewText);
            setReviews([newReview, ...reviews]);
            setReviewText("");
            setRating(5);
            setShowReviewForm(false);
        } catch (error) {
            console.error("Error al enviar reseña:", error);
            alert("No se pudo enviar la reseña. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReviewById(reviewId);
            setReviews(reviews.filter(r => r.id !== reviewId));
        } catch (error) {
            console.error("Error al eliminar reseña:", error);
            alert("No se pudo eliminar la reseña.");
        }
    };

    const handleEditClick = (review) => {
        setEditingReviewId(review.id);
        setEditText(review.comment);
        setEditRating(review.rating);
    };

    const handleUpdateReview = async (reviewId) => {
        if (!editText.trim()) return;
        
        try {
            const updated = await updateReviewById(email, reviewId, editRating, editText);
            setReviews(reviews.map(r => r.id === reviewId ? updated : r));
            setEditingReviewId(null);
            setEditText("");
            setEditRating(5);
        } catch (error) {
            console.error("Error al actualizar reseña:", error);
            alert("No se pudo actualizar la reseña.");
        }
    };

    const handleWhatsappClick = () => {
        const phone = "+503" + (user?.phoneNumber || "77777777");
        const message = `Hola ${user?.name}, me interesa contactarte desde Marketuca.`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / reviews.length).toFixed(1);
    };

    const renderStars = (rating, interactive = false, onRatingChange = null) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${
                            star <= rating 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300"
                        } ${interactive ? "cursor-pointer" : ""}`}
                        onClick={() => interactive && onRatingChange && onRatingChange(star)}
                    />
                ))}
            </div>
        );
    };

    const isMyReview = (review) => {
        return myReviews.some(mr => mr.id === review.id);
    };

    if (!user.name) return <p className="text-center py-10">Cargando usuario...</p>;

    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-lg bg-blue-800 text-white p-6 flex items-center gap-4 mb-6"
            >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold text-2xl">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        {renderStars(Math.round(parseFloat(calculateAverageRating())))}
                        <span className="text-sm">({reviews.length} reseñas)</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="w-full bg-white rounded-lg shadow-md p-6 min-h-[600px]"
            >
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
                            activeTab === "products"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        <Book className="w-4 h-4" />
                        Productos
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
                            activeTab === "reviews"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        <MessageCircle className="w-4 h-4" />
                        Reseñas
                    </button>
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
                            activeTab === "info"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                    >
                        <User className="w-4 h-4" />
                        Información
                    </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "products" && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-[450px]"
                        >
                            <h2 className="text-2xl font-bold mb-4">Productos Disponibles</h2>
                            {products.length > 0 ? (
                                <ProductCarousel products={products} />
                            ) : (
                                <p className="text-gray-500">No hay productos disponibles.</p>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "reviews" && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 min-h-[450px]"
                        >
                            <h2 className="text-2xl font-bold mb-4">Reseñas del Vendedor</h2>
                            
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        {editingReviewId === review.id ? (
                                            <div>
                                                <div className="mb-3">
                                                    <label className="block text-sm font-medium mb-2">Calificación</label>
                                                    {renderStars(editRating, true, setEditRating)}
                                                </div>
                                                <textarea
                                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring"
                                                    rows="3"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                />
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        onClick={() => handleUpdateReview(review.id)}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingReviewId(null)}
                                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            {renderStars(review.rating)}
                                                            <span className="text-sm text-gray-500">
                                                                por {review.reviewerUsername}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-800 mb-2">{review.comment}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {new Date(review.createdAt).toLocaleDateString('es-ES', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    {isMyReview(review) && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleEditClick(review)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteReview(review.id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Aún no hay reseñas.</p>
                            )}

                            {/* Formulario de nueva reseña */}
                            {showReviewForm ? (
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
                                    <h3 className="font-semibold mb-3">Escribe tu reseña</h3>
                                    <form onSubmit={handleSubmitReview}>
                                        <div className="mb-3">
                                            <label className="block text-sm font-medium mb-2">Calificación</label>
                                            {renderStars(rating, true, setRating)}
                                        </div>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring"
                                            rows="4"
                                            placeholder="Escribe tu opinión sobre este vendedor..."
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            disabled={loading}
                                        />
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`bg-blue-600 text-white px-4 py-2 rounded-lg ${
                                                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                                                }`}
                                            >
                                                {loading ? "Enviando..." : "Publicar Reseña"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowReviewForm(false);
                                                    setReviewText("");
                                                    setRating(5);
                                                }}
                                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : currentUser?.email !== email && (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-medium mt-4"
                                >
                                    Dejar una reseña
                                </button>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "info" && (
                        <motion.div
                            key="info"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="min-h-[450px]"
                        >
                            <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full">
                                        <User className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Nombre</p>
                                        <p className="font-semibold text-gray-800">{user.name}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full">
                                        <Mail className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Correo</p>
                                        <p className="font-semibold text-gray-800">{user.email}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full">
                                        <Book className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Facultad</p>
                                        <p className="font-semibold text-gray-800">{user.facultyName}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full">
                                        <Phone className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <p className="font-semibold text-gray-800">{user.phoneNumber}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full">
                                        <Star className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Calificación Promedio</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-800">{calculateAverageRating()}</p>
                                            {renderStars(Math.round(parseFloat(calculateAverageRating())))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full">
                                        <MessageCircle className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Reseñas Totales</p>
                                        <p className="font-semibold text-gray-800">{reviews.length}</p>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleWhatsappClick}
                                className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] transition-all duration-300 flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-white font-medium shadow-lg cursor-pointer hover:shadow-xl"
                            >
                                <Whatsapp className="w-6 h-6" />
                                <span>Contáctame por WhatsApp</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Profile;
