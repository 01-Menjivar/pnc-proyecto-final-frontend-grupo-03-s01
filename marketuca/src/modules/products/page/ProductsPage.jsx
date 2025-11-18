import ProductGrid from "../components/ProductCarousel";
import Navbar from "../../utils/navbar/Navbar";
import Footer from "../../utils/footer/Footer";

export default function ProductsPage() {
    return (
        <>
            <Navbar isAdmin={true} />
            <div className="min-h-screen bg-gray-50 py-8">
                <ProductGrid />
            </div>
            <Footer />
        </>
    );
}