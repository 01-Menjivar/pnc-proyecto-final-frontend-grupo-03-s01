import { useEffect, useState, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { getCommentByProductId, postComment, getRelevantCommentsByProductId } from "../services/productService.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { CommentsProvider, useCommentsContext } from "../context/CommentsContext.jsx";
import { CommentItem } from "./CommentItem.jsx";
import { CommentFilter } from "./CommentFilter.jsx";

// Componente interno que contiene la lógica de comentarios
const ProductCommentsContent = ({ productId, token }) => {
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingComments, setLoadingComments] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    
    const { comments, setComments, setRepliesMap } = useCommentsContext();

    // Obtiene los comentarios del producto cada vez que cambia el productId o el filtro
    useEffect(() => {
        const fetchComments = async () => {
            setLoadingComments(true);
            try {
                const data = activeFilter === 'relevant' 
                    ? await getRelevantCommentsByProductId(productId)
                    : await getCommentByProductId(productId, token);
                setComments(data);
                setRepliesMap({});
            } catch (e) {
                console.error("error fetching comments: ", e);
                setComments([]);
            } finally {
                setLoadingComments(false);
            }
        };
        fetchComments();
    }, [productId, token, activeFilter, setComments, setRepliesMap]);

    // Maneja el envío de un nuevo comentario
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!newComment.trim() || loading) return;
        setLoading(true);

        try {
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
    }, [newComment, loading, productId, token, setComments]);

    return (
        // Contenedor principal con animación de entrada
        <motion.div
            className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow relative z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-xl font-bold mb-4">Comentarios</h2>

            <CommentFilter 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
            />

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
                            depth={0}
                        />
                    ))
                )}
            </div>
        </motion.div>
    );
};

// Componente wrapper que provee el contexto
const ProductComments = ({ productId, token }) => {
    const { user } = useContext(AuthContext);
    
    return (
        <CommentsProvider user={user}>
            <ProductCommentsContent productId={productId} token={token} />
        </CommentsProvider>
    );
};

export default ProductComments;
