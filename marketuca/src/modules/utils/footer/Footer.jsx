import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-8 bg-blue-50 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      style={{ zIndex: 10 }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/buho.png"
                alt="MarketPlace UCA Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-gray-900 font-montserrat">
                Marketplace UCA
              </span>
            </div>
            <p className="text-sm text-gray-600 text-center md:text-left max-w-md font-montserrat">
              La plataforma de compra y venta más confiable para estudiantes universitarios
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 font-montserrat">
              © 2025 MarketPlace UCA. Todos los derechos reservados.
            </p>
          </div>
          
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;