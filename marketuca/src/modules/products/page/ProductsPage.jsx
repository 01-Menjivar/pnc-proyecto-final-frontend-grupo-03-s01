import ProductGrid from "../components/ProductCarousel";
import Navbar from "../../utils/navbar/Navbar";
import Footer from "../../utils/footer/Footer";
import { useContext} from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";

export default function ProductsPage() {

    const {user} = useContext(AuthContext);

    return (
        <>
            <Navbar isAdmin={user?.role === "ADMIN"} />
            <div className="min-h-screen bg-gray-50 py-8">
                <ProductGrid />
            </div>
            <Footer />
        </>
    );
}