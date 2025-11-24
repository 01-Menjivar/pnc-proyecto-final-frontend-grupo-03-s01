import React, {useContext, useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Book, Lock, Smartphone, Star, MessageCircle, Edit, Trash2 } from "lucide-react";
import ParticlesBackground from "../../utils/ParticlesBackground";
import ChangePasswordModal from "../modals/ChangePasswordModal.jsx";
import EditUserModal from "../modals/EditUserData.jsx";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {getUserInfo} from "../services/profileService.js";
import { 
    getReviewsBySellerEmail, 
    deleteReviewById, 
    updateReviewById
} from "../services/profileService.js";


const Profile = () => {
    const {token} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("info"); // 'info' | 'config' | 'reviews'
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editText, setEditText] = useState("");
    const [editRating, setEditRating] = useState(5);
    const email = localStorage.getItem("email");
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data } = await getUserInfo(email, token);
                setUser(data);
                setUserData(data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        fetchUserInfo();
    }, [email, token]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const sellerReviews = await getReviewsBySellerEmail(email);
                setReviews(sellerReviews);
            } catch (error) {
                console.error("Error al obtener reseñas:", error);
            }
        };

        if (activeTab === "reviews") {
            fetchReviews();
        }
    }, [email, activeTab]);

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

    if (!user) return <p>Cargando usuario...</p>;

    return (
        <div className="relative min-h-screen bg-gray-50">
            <ParticlesBackground />
            <div className="relative z-10 p-8 w-screen flex flex-col items-center">
                <div className="max-w-4xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-lg bg-blue-800 text-white p-6 flex items-center gap-4 mb-6"
                    >
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-800 font-bold text-2xl">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{user.name || "Usuario"}</h1>
                        </div>
                    </motion.div>

                  
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="bg-white rounded-lg shadow-md p-6"
                    >
                        <div className="flex border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setActiveTab("info")}
                                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
                                    activeTab === "info"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                <User className="w-4 h-4" />
                                Información personal
                            </button>
                            <button
                                onClick={() => setActiveTab("config")}
                                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors cursor-pointer ${
                                    activeTab === "config"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-600 hover:text-gray-800"
                                }`}
                            >
                                <Lock className="w-4 h-4" />
                                Configuración
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
                        </div>

                  
                        {activeTab === "info" && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              
                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <User className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Nombre</p>
                                            <p className="font-semibold text-gray-800">{user.name || "Sin nombre"}</p>
                                        </div>
                                    </div>

                               
                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <Mail className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Correo</p>
                                            <p className="font-semibold text-gray-800">{user.email || "Sin correo"}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <Phone className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Teléfono</p>
                                            <p className="font-semibold text-gray-800">{user.phoneNumber || "Sin teléfono"}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-100 border border-blue-800 p-4 rounded-lg flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-full">
                                            <Book className="w-6 h-6 text-blue-800" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Facultad</p>
                                            <p className="font-semibold text-gray-800">{user.facultyName || "No especificada"}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "config" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="w-full bg-white border border-gray-200 p-4 rounded-lg flex items-start gap-3 text-left hover:shadow transition-shadow"
                                >
                                    <div className="p-2 bg-blue-50 rounded-full">
                                        <Lock className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Cambiar contraseña</p>
                                        <p className="text-sm text-gray-500">Actualiza tu contraseña de forma segura</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="w-full bg-white border border-gray-200 p-4 rounded-lg flex items-start gap-3 text-left hover:shadow transition-shadow"
                                >
                                    <div className="p-2 bg-blue-50 rounded-full">
                                        <Smartphone className="w-6 h-6 text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Cambiar número de contacto</p>
                                        <p className="text-sm text-gray-500">Actualiza tu número de contacto nuevo</p>
                                    </div>
                                </button>
                            </motion.div>
                        )}

                        {activeTab === "reviews" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="min-h-[450px]"
                            >
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {calculateAverageRating()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {reviews.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center py-12 text-gray-500"
                                        >
                                            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>Aún no has recibido reseñas</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-4"
                                        >
                                            {reviews.map((review) => {
                                                const currentUserEmail = localStorage.getItem("email");
                                                const isOwner = review.reviewerEmail === currentUserEmail;

                                                return (
                                                    <div
                                                        key={review.id}
                                                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <p className="font-semibold text-gray-800">
                                                                    {review.reviewerUsername}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    {editingReviewId === review.id ? (
                                                                        renderStars(editRating, true, setEditRating)
                                                                    ) : (
                                                                        renderStars(review.rating)
                                                                    )}
                                                                    <span className="text-xs text-gray-500">
                                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {isOwner && (
                                                                <div className="flex gap-2">
                                                                    {editingReviewId === review.id ? (
                                                                        <>
                                                                            <button
                                                                                onClick={() => handleUpdateReview(review.id)}
                                                                                className="text-green-600 hover:text-green-700"
                                                                            >
                                                                                Guardar
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    setEditingReviewId(null);
                                                                                    setEditText("");
                                                                                    setEditRating(5);
                                                                                }}
                                                                                className="text-gray-600 hover:text-gray-700"
                                                                            >
                                                                                Cancelar
                                                                            </button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <button
                                                                                onClick={() => handleEditClick(review)}
                                                                                className="text-blue-600 hover:text-blue-700"
                                                                            >
                                                                                <Edit className="w-4 h-4" />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteReview(review.id)}
                                                                                className="text-red-600 hover:text-red-700"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {editingReviewId === review.id ? (
                                                            <textarea
                                                                value={editText}
                                                                onChange={(e) => setEditText(e.target.value)}
                                                                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                                                                rows="3"
                                                            />
                                                        ) : (
                                                            <p className="text-gray-700 mt-2">{review.comment}</p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
            <ChangePasswordModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <EditUserModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                user={userData}
            />
        </div>
    );
};

export default Profile;
