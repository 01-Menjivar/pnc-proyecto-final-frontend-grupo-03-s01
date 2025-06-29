// pages/PendingProducts.jsx
import {useContext, useEffect, useState} from "react";
import ProductCard from "../modules/ProductCard.jsx";
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {getAllInactiveProducts} from "../services/waitlistService.js";


const PendingProducts = () => {
    const { token, isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const handleApprove = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const handleReject = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {

                const productsData = await getAllInactiveProducts(token)
                setProducts(productsData);
            } catch (err) {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) fetchProducts();
    }, [isAuthenticated, token]);

    return (
        <div className="min-h-screen relative">
            <ParticlesBackground />
            <div className="relative z-20 p-4">
                {loading ? (
                    <div className="flex items-center justify-center h-96 text-blue-600 text-lg font-medium animate-pulse">
                        <svg className="animate-spin h-6 w-6 mr-3 text-blue-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        Cargando productos pendientes...
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500">No hay productos pendientes por aprobar.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                onApprove={handleApprove}
                                product={product}
                                onReject={handleReject}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingProducts;
