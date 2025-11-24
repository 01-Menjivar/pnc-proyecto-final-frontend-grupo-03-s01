import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Link} from "react-router-dom";

const NavbarHome = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Función para manejar el desplazamiento suave con compensación por la altura de la Navbar
    const scrollToSection = (sectionId) => {
        setIsOpen(false);
        
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                try {
                    const navbar = document.querySelector('nav');
                    const navbarHeight = navbar ? navbar.offsetHeight : 80; 
                    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = sectionPosition - navbarHeight - 20; 

                    window.scrollTo({
                        top: Math.max(0, offsetPosition), 
                        behavior: 'smooth',
                    });
                } catch (error) {
                    console.warn('Error al hacer scroll:', error);
                    // Fallback: scroll simple
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                console.warn(`Sección '${sectionId}' no encontrada`);
            }
        }, 100);
    };

    // Variantes para animaciones de hover y tap en los enlaces
    const linkVariants = {
        hover: { scale: 1.05, color: '#007BFF', transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
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
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white shadow-lg fixed w-full z-50 font-montserrat"
        >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-10">
                <div className="flex justify-center items-center h-16 sm:h-20 md:h-24 lg:h-28">
                    <div className="flex items-center w-full max-w-6xl justify-between">
                        <Link to="/">
                            <motion.div
                                className="flex-shrink-0 flex items-center"
                                whileHover={{scale: 1.05}}
                                transition={{duration: 0.3}}
                            >
                                <motion.img
                                    variants={owlVariants}
                                    animate="animate"
                                    className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10"
                                    src="/buho.png"
                                    alt="MarketPlace UCA Logo"
                                />
                                <div className="flex flex-col ml-2 sm:ml-3 md:ml-4 text-left">
                                    <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-none">
                                        MarketPlace
                                    </div>
                                    <div className="text-xs text-gray-600">UCA</div>
                                </div>
                            </motion.div>
                        </Link>
                        <div className="flex items-center ml-4 sm:ml-6 md:ml-8 lg:ml-12">
                            <div className="hidden lg:flex lg:space-x-8 xl:space-x-10">
                                <motion.button
                                    onClick={() => scrollToSection('how-it-works')}
                                    className="text-gray-900 px-3 py-2 rounded-md text-sm md:text-base lg:text-lg xl:text-xl font-medium flex items-center space-x-2 whitespace-nowrap"
                                    variants={linkVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <img src="/compra.gif" alt="Cómo funciona icon" className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                                    <span>Cómo funciona</span>
                                </motion.button>
                                <motion.button
                                    onClick={() => scrollToSection('benefits')}
                                    className="text-gray-900 px-3 py-2 rounded-md text-sm md:text-base lg:text-lg xl:text-xl font-medium flex items-center space-x-2 whitespace-nowrap"
                                    variants={linkVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <img src="/beneficios.gif" alt="Beneficios icon" className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                                    <span>Beneficios</span>
                                </motion.button>
                                <Link to={{
                                    pathname: '/login',
                                }}>
                                    <motion.a
                                        href="#"
                                        className="text-gray-900 px-3 py-2 rounded-md text-sm md:text-base lg:text-lg xl:text-xl font-medium flex items-center space-x-2 whitespace-nowrap"
                                        variants={linkVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <img src="/acceso.gif" alt="Iniciar sesión icon"
                                             className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"/>
                                        <span>Iniciar sesión</span>
                                    </motion.a>
                                </Link>
                            </div>
                            <div className="lg:hidden flex items-center">
                                <motion.button
                                    onClick={toggleMenu}
                                    className="text-gray-900 hover:text-[#007BFF] focus:outline-none"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="h-6 w-6 sm:h-8 sm:w-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                                        />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
                style={{ overflow: 'hidden' }}
            >
                <div className="px-4 py-4 space-y-1">
                    <motion.button
                        onClick={() => scrollToSection('how-it-works')}
                        className="w-full text-left text-gray-900 hover:text-[#007BFF] hover:bg-blue-50 px-4 py-3 rounded-md text-base font-medium flex items-center space-x-3 transition-colors duration-200"
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <img src="/compra.gif" alt="Cómo funciona icon" className="h-5 w-5" />
                        <span>Cómo funciona</span>
                    </motion.button>
                    <motion.button
                        onClick={() => scrollToSection('benefits')}
                        className="w-full text-left text-gray-900 hover:text-[#007BFF] hover:bg-blue-50 px-4 py-3 rounded-md text-base font-medium flex items-center space-x-3 transition-colors duration-200"
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <img src="/beneficios.gif" alt="Beneficios icon" className="h-5 w-5" />
                        <span>Beneficios</span>
                    </motion.button>
                    <Link to="/login">
                        <motion.div
                            className="w-full text-left text-gray-900 hover:text-[#007BFF] hover:bg-blue-50 px-4 py-3 rounded-md text-base font-medium flex items-center space-x-3 transition-colors duration-200"
                            variants={linkVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setIsOpen(false)}
                        >
                            <img src="/acceso.gif" alt="Iniciar sesión icon" className="h-5 w-5" />
                            <span>Iniciar sesión</span>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default NavbarHome;