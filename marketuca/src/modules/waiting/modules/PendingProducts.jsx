// pages/PendingProducts.jsx
import { useState } from "react";
import ProductCard from "../modules/ProductCard.jsx";
import ParticlesBackground from "../../utils/ParticlesBackground.jsx";

const mockProducts = [
    {
        id: 1,
        title: "Laptop Dell",
        description: "Laptop en excelente estado, poco uso.",
        price: 450.00,
        condition: "Usado",
        image: "https://picsum.photos/400/300?random=1",
        user_id: 12,
        category_id: 3,
        approved: undefined
    },
    {
        id: 2,
        title: "iPhone 13",
        description: "Nuevo, sellado de fábrica.",
        price: 850.00,
        condition: "Nuevo",
        image: "https://picsum.photos/400/300?random=2",
        user_id: 8,
        category_id: 1,
        approved: undefined
    }
];

const PendingProducts = () => {
    const [products, setProducts] = useState(mockProducts);

    const handleApprove = (id) => {
        setProducts(products.map(p => p.id === id ? { ...p, approved: true } : p));
    };

    const handleReject = (id) => {
        setProducts(products.map(p => p.id === id ? { ...p, approved: false } : p));
    };

    return (
        <div className={"min-h-screen relative"}>
            <ParticlesBackground/>
            <div
                className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ))}
            </div>
        </div>
    );
};

export default PendingProducts;
