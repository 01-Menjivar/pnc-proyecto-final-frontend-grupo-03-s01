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
            <div className={"flex flex-row min-h-screen"}>
                <Profile/>
                <ProductCarousel/>
            </div>
            <Footer />
        </div>
    )

}
export default UserProfile;