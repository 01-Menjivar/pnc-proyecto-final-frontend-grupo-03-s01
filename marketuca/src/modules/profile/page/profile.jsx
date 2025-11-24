import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import Profile from "../component/Profile.jsx";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";


const ProfilePage = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Navbar
                isAdmin={user?.role === "ADMIN"
                }
            />
            <Profile/>
            <Footer />
        </div>
    )

}
export default ProfilePage;