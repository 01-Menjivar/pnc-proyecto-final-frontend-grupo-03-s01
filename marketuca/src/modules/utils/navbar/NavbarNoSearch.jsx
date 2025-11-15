import {useContext, useState} from "react";
import {
    Search,
    ShoppingCart,
    MessageSquare,
    Heart,
    User,
    ShoppingBag,
    LogOut,
    BookUp, ClockAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext.jsx";

const Navbar = ({   setSearchQuery,isAdmin}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0 5px 15px rgba(0, 86, 179, 0.2)" },
        tap: { scale: 0.95 },
    };

    const menuVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.2, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: { duration: 0.15, ease: "easeIn" },
        },
    };

    const menuItemVariants = {
        hover: { x: 5, color: "#0056b3", transition: { duration: 0.2 } },
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(e.target.value.trim());
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
        if (confirmLogout) {
            console.log("Cerrando sesión...");
            setIsMenuOpen(false);
            logout();
            navigate("/");
        } else {
            setIsMenuOpen(false);
        }
    };
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
            className="sticky top-0 z-50 bg-white border-white-b shadow-sm rounded-md"
        >
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">

                <Link to={{ pathname: "/dashboard" }}>
                    <motion.div
                        className="flex items-center gap-2 select-none"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                    >
                        <motion.img
                            variants={owlVariants}
                            animate="animate"
                            className="h-8 w-8 sm:h-10 sm:w-10"
                            src="/buho.png"
                            alt="MarketPlace UCA Logo"
                        />
                        { /*<img src="/buho.png" alt="Logo búho" className="w-6 h-6" />*/}
                        <span
                            className="text-xl font-bold text-[#0056b3]">MarketPlace UCA</span>
                    </motion.div>
                </Link>
                
                <div className="flex items-center gap-3">

                    <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Link to="/favorites">
                                <Heart className="w-5 h-5 text-[#0056b3]" />
                            </Link>
                        </Button>
                    </motion.div>
                    <div className="relative">
                        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <User className="w-5 h-5 text-[#0056b3]" />
                            </Button>
                        </motion.div>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    variants={menuVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                                >
                                    {/* Perfil del usuario */}
                                    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                                        <img
                                            src="/placeholder.svg?height=40&width=40"
                                            alt="User profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">{user?.name}</p>
                                            <p className="text-sm text-gray-500">{user?.role}</p>
                                        </div>
                                    </div>
                                    {/* Opciones del menú */}
                                    <div className="py-2">
                                        <motion.div
                                            variants={menuItemVariants}
                                            whileHover="hover"
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                window.location.href = "/profile"; // Recarga la página al redirigir
                                            }}
                                        >
                                            <ShoppingBag className="w-4 h-4" />
                                            <span>Mi perfil</span>
                                        </motion.div>
                                        <motion.div
                                            variants={menuItemVariants}
                                            whileHover="hover"
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer"
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                window.location.href = "/favorites"; // Recarga la página al redirigir
                                            }}
                                        >
                                            <Heart className="w-4 h-4" />
                                            <span>Mis favoritos</span>
                                        </motion.div>
                                        {isAdmin && (
                                            <motion.div
                                                variants={menuItemVariants}
                                                whileHover="hover"
                                                className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    window.location.href = "/waitlist";
                                                }}
                                            >
                                                <ClockAlert className="w-4 h-4" />
                                                <span>Lista de espera</span>
                                            </motion.div>
                                        )}
                                        {isAdmin && (
                                            <motion.div
                                                variants={menuItemVariants}
                                                whileHover="hover"
                                                className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    window.location.href = "/adminman";
                                                }}
                                            >
                                                <BookUp className="w-4 h-4" />
                                                <span>Manejo de administrador</span>
                                            </motion.div>
                                        )}
                                        <motion.div
                                            variants={menuItemVariants}
                                            whileHover="hover"
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer border-t border-gray-200"
                                            onClick={handleLogout}
                                        >

                                            <LogOut className="w-4 h-4" />
                                            <span>Cerrar sesión</span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;