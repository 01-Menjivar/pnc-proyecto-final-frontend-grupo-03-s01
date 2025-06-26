import NavbarNoAuth from "../../utils/navbar/NavBarNoAuth.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

const register = () => {


    return(
        <div>
            <NavbarNoAuth/>
            <RegisterForm/>
            <Footer/>
        </div>
    );

}
export default register;