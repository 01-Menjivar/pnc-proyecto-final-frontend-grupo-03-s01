import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-8 bg-gray-100 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      style={{ zIndex: 10 }}
    >
      <div className="container px-4 mx-auto text-center">
        <p className="text-sm text-gray-600">© 2025 MarketPlace UCA. Todos los derechos reservados.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;