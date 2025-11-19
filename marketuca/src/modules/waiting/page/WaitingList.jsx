import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import AcceptList from "../modules/PendingProducts.jsx";
import PendingProducts from "../modules/PendingProducts.jsx";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";

const WaitingList = ({isAdmin}) => {

  const {user} = useContext(AuthContext);

    return(
      <div className={`${isAdmin ? "visible" : "hidden"} px-4 py-2 text-gray-700`}>
          <Navbar isAdmin={user?.role === "ADMIN"}/>
          <PendingProducts/>
          <Footer/>
      </div>

    )
}
export default WaitingList;