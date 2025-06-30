
import Footer from "../../utils/footer/Footer.jsx";
import LoginForm from "../components/LoginForm.jsx";
import NavbarNoAuth from "../../utils/navbar/NavBarNoAuth.jsx";

const login = () => {
    return(
        <div>
            <NavbarNoAuth/>
            <LoginForm/>
            <Footer/>

        </div>
    )

}
export default login;