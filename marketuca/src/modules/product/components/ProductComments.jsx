import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getCommentByProductId, postComment, getCommentReplies, replyComment
} from "../services/productService.js";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { DeleteCommentById } from "../services/productService.js";
import { CommentItem } from "./CommentItem.jsx";

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
    // Estado para controlar qué comentario se está eliminando
    const [deletingCommentId, setDeletingCommentId] = useState(null);
    // Estado para controlar qué comentario está siendo respondido
    const [replyingToId, setReplyingToId] = useState(null);
    // Estado para el texto de la respuesta
    const [replyText, setReplyText] = useState("");
    // Estado para controlar qué respuestas están expandidas
    const [expandedReplies, setExpandedReplies] = useState({});
    // Estado para almacenar las respuestas de cada comentario
    const [repliesMap, setRepliesMap] = useState({});
    // Estado para controlar la carga de respuestas
    const [loadingReplies, setLoadingReplies] = useState({});
    
    const {user} = useContext(AuthContext);

    // Obtiene los comentarios del producto cada vez que cambia el productId
    useEffect(() => {
        const fetchComments = async () => {
            setLoadingComments(true);
            try {
                // Llama al servicio para obtener comentarios padre por producto
                const data = await getCommentByProductId(productId, token);
                
                // La API ahora solo devuelve comentarios padre
                setComments(data);
                // Inicializar repliesMap vacío ya que las respuestas se cargan bajo demanda
                setRepliesMap({});
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
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!newComment.trim() || loading) return;
        setLoading(true);

        try {
            // Publica el comentario usando el servicio y lo agrega al estado local
            const newCom = await postComment(productId, newComment, token);
            const commentToAdd = {
                id: newCom.id,
                comment: newCom.comment,
                username: newCom.username,
                productId: newCom.productId,
                parentId: newCom.parentId || null
            };
            setComments((prev) => [commentToAdd, ...prev]);
            setNewComment("");
        } catch {
            alert("No se pudo publicar el comentario. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [newComment, loading, productId, token]);

    const handleDelete = useCallback(async (id) => {
        console.log("Deleting comment with id:", id);
        setDeletingCommentId(id);
        try {
            await DeleteCommentById(id);
            // Eliminar de comentarios principales
            setComments((prev) => prev.filter(comment => comment.id !== id));
            // Eliminar de respuestas si está en alguna
            setRepliesMap(prev => {
                const newMap = { ...prev };
                Object.keys(newMap).forEach(parentId => {
                    newMap[parentId] = newMap[parentId].filter(reply => reply.id !== id);
                });
                // También eliminar si el comentario eliminado tiene respuestas
                delete newMap[id];
                return newMap;
            });
        } catch (err) {
            console.error("Error al eliminar comentario:", err);
            alert("No se pudo eliminar el comentario. Intenta de nuevo.");
        } finally {
            setDeletingCommentId(null);
        }
    }, []);

    // Función para cargar respuestas de un comentario específico
    const loadReplies = useCallback(async (commentId) => {
        // Si ya existen respuestas cargadas, no hacer nada
        if (repliesMap[commentId]) return;
        
        setLoadingReplies(prev => ({ ...prev, [commentId]: true }));
        try {
            const replies = await getCommentReplies(commentId);
            setRepliesMap(prev => ({ ...prev, [commentId]: replies }));
        } catch (err) {
            console.error("Error al cargar respuestas:", err);
            setRepliesMap(prev => ({ ...prev, [commentId]: [] }));
        } finally {
            setLoadingReplies(prev => ({ ...prev, [commentId]: false }));
        }
    }, [repliesMap]);

    // Función para alternar la expansión de respuestas
    const toggleReplies = useCallback((commentId) => {
        setExpandedReplies(prev => {
            const isExpanded = !prev[commentId];
            if (isExpanded && !repliesMap[commentId]) {
                loadReplies(commentId);
            }
            return { ...prev, [commentId]: isExpanded };
        });
    }, [repliesMap, loadReplies]);

    // Función para iniciar el modo de respuesta
    const handleReplyClick = useCallback((commentId) => {
        setReplyingToId(commentId);
        setReplyText("");
    }, []);

    // Función para enviar una respuesta
    const handleReplySubmit = useCallback(async (parentId) => {
        if (!replyText.trim()) return;
        
        try {
            const newReply = await replyComment(parentId, replyText);
            // Actualizar el mapa de respuestas localmente
            setRepliesMap(prev => ({
                ...prev,
                [parentId]: [...(prev[parentId] || []), {
                    id: newReply.id,
                    comment: newReply.comment,
                    username: newReply.username,
                    parentId: newReply.parentId,
                    productId: newReply.productId
                }]
            }));
            setReplyText("");
            setReplyingToId(null);
            // Asegurar que las respuestas estén expandidas
            setExpandedReplies(prev => ({ ...prev, [parentId]: true }));
        } catch (err) {
            console.error("Error al enviar respuesta:", err);
            alert("No se pudo enviar la respuesta. Intenta de nuevo.");
        }
    }, [replyText]);

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
                ) : comments.filter(c => !c.parentId).length === 0 ? (
                    <p className="text-gray-500">Aún no hay comentarios.</p>
                ) : (
                    comments.filter(comment => !comment.parentId).map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            user={user}
                            deletingCommentId={deletingCommentId}
                            handleDelete={handleDelete}
                            replyingToId={replyingToId}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            handleReplyClick={handleReplyClick}
                            handleReplySubmit={handleReplySubmit}
                            expandedReplies={expandedReplies}
                            toggleReplies={toggleReplies}
                            repliesMap={repliesMap}
                            loadingReplies={loadingReplies}
                        />
                    ))
                )}
            </div>
        </motion.div>
    );
};


export default ProductComments;
