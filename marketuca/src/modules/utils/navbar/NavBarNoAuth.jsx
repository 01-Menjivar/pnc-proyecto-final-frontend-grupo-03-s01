
import { motion} from "framer-motion";
import { Link } from "react-router-dom";

const NavbarNoAuth = () => {
    // Animación para el búho (solo la imagen)
    const owlVariants = {
        animate: {
            rotate: [0, -10, 0, 10, 0],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
            }
        },
        hover: { scale: 1.05, transition: { duration: 0.3 } }
    };
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50 bg-white border-b-white shadow-sm"
        >
            <div className="container flex items-center justify-between h-16 px-2 mx-auto">
                <Link to={"/"}>
                    <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >

                        <motion.img
                            variants={owlVariants}
                            animate="animate"
                            className="h-8 w-8 sm:h-10 sm:w-10"
                            src="/buho.png"
                            alt="MarketPlace UCA Logo"
                        />

                        { /*<img src="/buho.png" alt="Logo búho" className="w-6 h-6" />*/}
                        <span className="text-xl font-bold text-[#0056b3]">MarketPlace UCA</span>
                    </motion.div>
                </Link>
            </div>
        </motion.nav>
    );
};

export default NavbarNoAuth;