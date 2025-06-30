import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import Profile from "../component/Profile.jsx";
import ProductCarousel from "../component/ProductCarousel.jsx";
import { useState } from "react";


const profile = () => {

    return (
        <div>
            <Navbar
                isAdmin={true
                }
            />
            <Profile/>
            <ProductCarousel/>
            <Footer />
        </div>
    )

}
export default profile;