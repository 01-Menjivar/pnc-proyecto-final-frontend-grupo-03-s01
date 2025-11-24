import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import AcceptAdmin from "../components/AcceptAdmin.jsx";

const AdminManager = ({isAdmin}) => {

  return(
      <div className={`${isAdmin ? "visible" : "hidden"} px-4 py-2 z-100`}>
          <Navbar isAdmin={isAdmin} />
          <AcceptAdmin/>
          <Footer/>

      </div>
  );
}
export default AdminManager;