import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    getCommentByProductId, postComment
} from "../services/productService.js";

const ProductComments = ({ productId, token}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () =>{
            try {
                const data = await getCommentByProductId(productId,token);
                setComments(data);
            }
            catch (e) {
                console.error("error fetching comments: ", e);
                setComments([])
            }
        }
        fetchComments();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setLoading(true);

        try {
            const newCom = await postComment(productId, newComment, token);
            // Mapea el comentario devuelto al formato local
            const commentToAdd = {
                code: newCom.code,
                comment: newCom.comment,
                username: newCom.username,
            };
            setComments((prev) => [commentToAdd, ...prev]);
            setNewComment("");
        } catch (err) {
            alert("No se pudo publicar el comentario. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow relative z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-xl font-bold mb-4">Comentarios</h2>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="mb-6">
        <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring"
            rows="3"
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
        />
                <motion.button
                    inital={{scale: 1, y: 30}}
                    whileInView={{scale: 1, y: 0}}
                    whileHover={{scale: 1.1}}
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transitio"
                >
                    {loading ? "Publicando..." : "Publicar"}
                </motion.button>
            </form>

            {/* Lista de comentarios con scroll vertical */}
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2 ">
                {comments.length === 0 ? (
                    <p className="text-gray-500">Aún no hay comentarios.</p>
                ) : (
                    comments.map((comment) => (
                        <motion.div
                            key={comment.code}
                            className="bg-gray-50 p-4 rounded-lg shadow"
                            initial={{ opacity: 0, y:30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 , type: "spring" ,
                            bounce:0.2}}
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
