import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    getCommentByProductId, postComment
} from "../services/productService.js";

// Componente que gestiona los comentarios de un producto específico.
// Permite ver comentarios existentes y publicar nuevos, con animaciones y manejo de estados de carga.
const ProductComments = ({ productId, token }) => {
    // Estado para la lista de comentarios obtenidos del backend
    const [comments, setComments] = useState([]);
    // Estado para el texto del nuevo comentario a publicar
    const [newComment, setNewComment] = useState("");
    // Estado para mostrar spinner al publicar un comentario
    const [loading, setLoading] = useState(false);
    // Estado para mostrar spinner al cargar los comentarios
    const [loadingComments, setLoadingComments] = useState(true);

    // Obtiene los comentarios del producto cada vez que cambia el productId
    useEffect(() => {
        const fetchComments = async () => {
            setLoadingComments(true);
            try {
                // Llama al servicio para obtener comentarios por producto
                const data = await getCommentByProductId(productId, token);
                setComments(data);
            } catch (e) {
                console.error("error fetching comments: ", e);
                setComments([]);
            } finally {
                setLoadingComments(false);
            }
        };
        fetchComments();
    }, [productId,token]);

    // Maneja el envío de un nuevo comentario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || loading) return;
        setLoading(true);

        try {
            // Publica el comentario usando el servicio y lo agrega al estado local
            const newCom = await postComment(productId, newComment, token);
            const commentToAdd = {
                code: newCom.code,
                comment: newCom.comment,
                username: newCom.username,
            };
            setComments((prev) => [commentToAdd, ...prev]);
            setNewComment("");
        } catch (error) {
            alert("No se pudo publicar el comentario. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Contenedor principal con animación de entrada
        <motion.div
            className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow relative z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-xl font-bold mb-4">Comentarios</h2>

            {/* Formulario para publicar un nuevo comentario */}
            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring"
                    rows="3"
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={loading}
                />
                <motion.button
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    disabled={loading}
                    className={`mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Publicando..." : "Publicar"}
                </motion.button>
            </form>

            {/* Listado de comentarios existentes */}
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
                {loadingComments ? (
                    // Spinner y mensaje mientras se cargan los comentarios
                    <motion.div
                        className="flex justify-center text-blue-600 py-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        Cargando comentarios...
                    </motion.div>
                ) : comments.length === 0 ? (
                    <p className="text-gray-500">Aún no hay comentarios.</p>
                ) : (
                    // Renderiza cada comentario con animación
                    comments.map((comment) => (
                        <motion.div
                            key={comment.code}
                            className="bg-gray-50 p-4 rounded-lg shadow"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                        >
                            <p className="text-gray-800">{comment.comment}</p>
                            <span className="text-sm text-gray-500">— {comment.username}</span>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default ProductComments;
