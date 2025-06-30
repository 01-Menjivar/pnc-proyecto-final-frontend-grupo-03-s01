import React, {useContext, useEffect, useState} from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "../../utils/ParticlesBackground";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import {getUserInfo} from "../services/UserProfileService.js";



const Profile = () => {
    const {token, isAuthenticated} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { email } = useParams();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data } = await getUserInfo(email, token);
                setUser(data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        fetchUserInfo();
    }, [email, token]);

    if (!user) return <p>Cargando usuario...</p>;


    return (

            <div className="flex flex-col items-center pt-8 pl-16">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil de {user.name}</h1>

                <div className="">
                    {/* Tarjeta de información */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white shadow-md rounded-2xl p-6"
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Información personal</h2>
                        <div className="space-y-3 text-gray-600">
                            <div>
                                <span className="font-lg">Nombre:</span> {user.name}
                            </div>
                            <div>
                                <span className="font-lg">Correo:</span> {user.email}
                            </div>
                            <div>
                                <span className="font-lg">Facultad:</span> {user.facultyName}
                            </div>
                            <div>
                                <span className="font-lg">Num. Telefóno: </span> {user.phoneNumber}
                            </div>
                        </div>
                        
                    </motion.div>


                    

                </div>
            </div>

    );
};

export default Profile;
