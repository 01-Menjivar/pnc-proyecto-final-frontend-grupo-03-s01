import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import Profile from "../component/Profile.jsx";
import ProductCarousel from "../component/ProductCarousel.jsx";
import { useState } from "react";


const UserProfile = () => {

    return (
        <div>
            <Navbar
                isAdmin={true
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