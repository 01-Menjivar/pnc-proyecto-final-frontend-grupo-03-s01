// components/ProductCard.jsx
import { motion } from "framer-motion";

const ProductCard = ({ product, onApprove, onReject }) => {
    const { title, description, price, condition, image, approved } = product;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 , y: 30}}
            animate={{ opacity: 1, scale: 1 , y:0}}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-100 shadow-lg rounded-xl p-4 flex flex-col gap-4 max-w-sm"
        >
            <img
                src={image}
                alt={title}
                className="h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-600">{description}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">${price}</span>
                <span className="text-sm text-gray-500">{condition}</span>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onApprove(product.id)}
                    className="flex-1 bg-green-400 hover:bg-green-600 text-white py-2 rounded"
                >
                    Aceptar
                </button>
                <button
                    onClick={() => onReject(product.id)}
                    className="flex-1 bg-red-400 hover:bg-red-600 text-white py-2 rounded"
                >
                    Denegar
                </button>
            </div>
            {approved !== undefined && (
                <p className={`text-sm mt-2 ${approved ? "text-green-600" : "text-red-600"}`}>
                    {approved ? "Producto aprobado" : "Producto denegado"}
                </p>
            )}
        </motion.div>
    );
};

export default ProductCard;
