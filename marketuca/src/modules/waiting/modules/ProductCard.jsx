import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import {
    deleteProduct,
    setProductActive
} from "../services/waitlistService.js";

const ProductCard = ({ product, onApprove, onReject }) => {
    const { token } = useContext(AuthContext);
    const { title, description, price, condition, image } = product;

    const handleApprove = async () => {
        try {
            await setProductActive(product.id, token);
            onApprove(product.id); // ✅ Notifica al padre para quitar el producto
        } catch (err) {
            console.error("Error al aprobar producto:", err);
            alert("No se pudo aprobar el producto.");
        }
    };
    const handleReject = async () => {
        try {
            await deleteProduct(product.id, token);
            onReject(product.id);
        }catch (err){
            console.error("Error al eliminar producto:", err);
            alert("No se pudo eliminar el producto.");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-100 shadow-lg rounded-xl p-4 flex flex-col gap-4 max-w-sm"
        >
            <img src={image} alt={title} className="h-48 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-600">{description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">${price}</span>
                <span className="text-sm text-gray-500">{condition}</span>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={handleApprove}
                    className="flex-1 bg-green-400 hover:bg-green-600 text-white py-2 rounded"
                >
                    Aceptar
                </button>
                <button
                    onClick={handleReject}
                    className="flex-1 bg-red-400 hover:bg-red-600 text-white py-2 rounded"
                >
                    Denegar
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
