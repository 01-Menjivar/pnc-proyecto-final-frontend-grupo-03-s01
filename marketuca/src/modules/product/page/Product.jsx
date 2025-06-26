import {motion} from 'framer-motion';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbar from "../../utils/navbar/Navbar.jsx";
import Footer from "../../utils/footer/Footer.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import useAuth from "../../../hooks/useAuth.js";
import {getProductById} from "../services/productService.js";



const Product = () => {




  return(
      <motion.div>

          <Navbar isAdmin={true}/>
          <ProductDetail/>
          <Footer/>
      </motion.div>
  )
}
export default Product