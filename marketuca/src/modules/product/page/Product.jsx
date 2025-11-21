import {motion} from 'framer-motion';
import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext.jsx';

const Product = () => {
    const {isAdmin} = useContext(AuthContext);
  return(
      <motion.div>
          <Navbar isAdmin={isAdmin}/>
          <ProductDetail/>
          <Footer/>
      </motion.div>
  )
}
export default Product