
import { motion, AnimatePresence } from "framer-motion";
import { IconTrash, IconMessageReply, IconChevronDown, IconChevronUp, IconEdit } from '@tabler/icons-react';
import { useCommentsContext } from '../context/CommentsContext.jsx';

export const CommentItem = ({ comment, depth = 0 }) => {
    const {
        user,
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
        loadingReplies,
        editingCommentId,
        editText,
        setEditText,
        handleEditClick,
        handleEditSubmit,
    } = useCommentsContext();
    const replies = repliesMap[comment.id] || [];
    const hasReplies = (comment.responseCount && comment.responseCount > 0) || replies.length > 0;
    const isExpanded = expandedReplies[comment.id];
    const isReplying = replyingToId === comment.id;
    const isLoadingReplies = loadingReplies[comment.id];
    const isEditing = editingCommentId === comment.id;

    return (
        <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={`bg-gray-50 p-4 rounded-lg shadow transition-all ${
                    comment.username === user?.email ? "border-l-4 border-blue-500" : ""
                } ${depth > 0 ? "ml-8 border-l-2 border-gray-200" : ""}`}
            >
                {isEditing ? (
                    <div className="mb-2">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring text-sm"
                            rows="3"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleEditSubmit(comment.id)}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => handleEditClick(null)}
                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-800 mb-2">{comment.comment}</p>
                )}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">— {comment.username}</span>
                        
                        {/* Botón para responder */}
                        <button
                            onClick={() => handleReplyClick(comment.id)}
                            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                        >
                            <IconMessageReply className="h-3 w-3" stroke={1.5} />
                            Responder
                        </button>

                        {/* Botón para ver respuestas si existen */}
                        {hasReplies && (
                            <button
                                onClick={() => toggleReplies(comment.id)}
                                className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
                            >
                                {isExpanded ? (
                                    <>
                                        <IconChevronUp className="h-3 w-3" stroke={1.5} />
                                        Ocultar {replies.length || comment.responseCount} {(replies.length || comment.responseCount) === 1 ? 'respuesta' : 'respuestas'}
                                    </>
                                ) : (
                                    <>
                                        <IconChevronDown className="h-3 w-3" stroke={1.5} />
                                        Ver {comment.responseCount} {comment.responseCount === 1 ? 'respuesta' : 'respuestas'}
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {comment.username === user?.email && !isEditing && (
                        <div className="flex gap-2">
                            <motion.button
                                onClick={() => handleEditClick(comment)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IconEdit className="h-4 w-4" stroke={1.5} />
                            </motion.button>
                            <motion.button
                                onClick={() => handleDelete(comment.id)}
                                disabled={deletingCommentId === comment.id}
                                className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                                    deletingCommentId === comment.id
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                }`}
                                whileHover={deletingCommentId === comment.id ? {} : { scale: 1.05 }}
                                whileTap={deletingCommentId === comment.id ? {} : { scale: 0.95 }}
                            >
                            {deletingCommentId === comment.id ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Eliminando...
                                </>
                            ) : (
                                <IconTrash className="h-4 w-4" stroke={1.5} />
                            )}
                        </motion.button>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isReplying && (
                    <motion.div
                        className={`${depth > 0 ? "ml-8" : ""}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring text-sm"
                                rows="2"
                                placeholder={`Responder a ${comment.username}...`}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                autoFocus
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleReplySubmit(comment.id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
                                >
                                    Enviar
                                </button>
                                <button
                                    onClick={() => handleReplyClick(null)}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                    >
                        {isLoadingReplies ? (
                            <div className="ml-8 flex items-center gap-2 text-sm text-gray-500">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Cargando respuestas...
                            </div>
                        ) : (
                            replies.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    depth={depth + 1}
                                />
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};