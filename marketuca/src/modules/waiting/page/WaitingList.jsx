import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import AcceptList from "../modules/PendingProducts.jsx";
import PendingProducts from "../modules/PendingProducts.jsx";

const WaitingList = ({isAdmin}) => {

    return(
      <div className={`${isAdmin ? "visible" : "hidden"} px-4 py-2 text-gray-700`}>
          <Navbar isAdmin={true}/>
          <PendingProducts/>
          <Footer/>
      </div>

    )
}
export default WaitingList;