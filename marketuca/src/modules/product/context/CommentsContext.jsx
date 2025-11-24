import { createContext, useContext, useState, useCallback } from 'react';
import { getCommentReplies, replyComment, updateCommentById, DeleteCommentById } from '../services/productService.js';

const CommentsContext = createContext(null);

export const useCommentsContext = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error('useCommentsContext must be used within CommentsProvider');
    }
    return context;
};

export const CommentsProvider = ({ children, user }) => {
    const [deletingCommentId, setDeletingCommentId] = useState(null);
    const [replyingToId, setReplyingToId] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [expandedReplies, setExpandedReplies] = useState({});
    const [repliesMap, setRepliesMap] = useState({});
    const [loadingReplies, setLoadingReplies] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [comments, setComments] = useState([]);

    const handleDelete = useCallback(async (id) => {
        setDeletingCommentId(id);
        try {
            await DeleteCommentById(id);
            setComments((prev) => prev.filter(comment => comment.id !== id));
            setRepliesMap(prev => {
                const newMap = { ...prev };
                Object.keys(newMap).forEach(parentId => {
                    newMap[parentId] = newMap[parentId].filter(reply => reply.id !== id);
                });
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

    const loadReplies = useCallback(async (commentId) => {
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

    const toggleReplies = useCallback((commentId) => {
        setExpandedReplies(prev => {
            const isExpanded = !prev[commentId];
            if (isExpanded && !repliesMap[commentId]) {
                loadReplies(commentId);
            }
            return { ...prev, [commentId]: isExpanded };
        });
    }, [repliesMap, loadReplies]);

    const handleReplyClick = useCallback((commentId) => {
        setReplyingToId(commentId);
        setReplyText("");
    }, []);

    const handleReplySubmit = useCallback(async (parentId) => {
        if (!replyText.trim()) return;
        
        try {
            const newReply = await replyComment(parentId, replyText);
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
            setExpandedReplies(prev => ({ ...prev, [parentId]: true }));
        } catch (err) {
            console.error("Error al enviar respuesta:", err);
            alert("No se pudo enviar la respuesta. Intenta de nuevo.");
        }
    }, [replyText]);

    const handleEditClick = useCallback((comment) => {
        setEditingCommentId(comment.id);
        setEditText(comment.comment);
    }, []);

    const handleEditSubmit = useCallback(async (commentId) => {
        if (!editText.trim()) return;
        
        try {
            const updatedComment = await updateCommentById(commentId, editText);
            
            setComments((prev) => 
                prev.map(comment => 
                    comment.id === commentId 
                        ? { ...comment, comment: updatedComment.comment, updatedAt: updatedComment.updatedAt }
                        : comment
                )
            );
            
            setRepliesMap(prev => {
                const newMap = { ...prev };
                Object.keys(newMap).forEach(parentId => {
                    newMap[parentId] = newMap[parentId].map(reply => 
                        reply.id === commentId
                            ? { ...reply, comment: updatedComment.comment, updatedAt: updatedComment.updatedAt }
                            : reply
                    );
                });
                return newMap;
            });
            
            setEditingCommentId(null);
            setEditText("");
        } catch (err) {
            console.error("Error al editar comentario:", err);
            alert("No se pudo editar el comentario. Intenta de nuevo.");
        }
    }, [editText]);

    const value = {
        user,
        comments,
        setComments,
        deletingCommentId,
        handleDelete,
        replyingToId,
        replyText,
        setReplyText,
        handleReplyClick,
        handleReplySubmit,
        expandedReplies,
        toggleReplies,
        repliesMap,
        setRepliesMap,
        loadingReplies,
        editingCommentId,
        editText,
        setEditText,
        handleEditClick,
        handleEditSubmit,
    };

    return (
        <CommentsContext.Provider value={value}>
            {children}
        </CommentsContext.Provider>
    );
};
