import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import Profile from "../component/Profile.jsx";
import ProductCarousel from "../component/ProductCarousel.jsx";
import { useContext} from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";


const UserProfile = () => {

    const {user} = useContext(AuthContext);

    return (
        <div>
            <Navbar
                isAdmin={user?.role === "ADMIN"
                }
            />
            <div className="flex justify-center px-4 py-8 min-h-screen bg-gray-50">
                <div className="w-full max-w-6xl">
                    <Profile/>
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default UserProfile;