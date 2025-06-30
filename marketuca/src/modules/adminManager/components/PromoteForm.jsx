import { useState } from "react";

const PromoteForm = ({ users, setUsers }) => {
    const [emailInput, setEmailInput] = useState("");
    const [message, setMessage] = useState("");

    const handlePromoteByEmail = (e) => {
        e.preventDefault();
        setMessage("");
        const email = emailInput.trim().toLowerCase();
        const userIndex = users.findIndex((u) => u.email.toLowerCase() === email);

        if (userIndex === -1) {
            setMessage("No se encontró un usuario con ese correo.");
            return;
        }
        if (users[userIndex].role === "ADMIN") {
            setMessage("Este usuario ya es administrador.");
            return;
        }
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], role: "ADMIN" };
        setUsers(updatedUsers);
        setMessage("¡Usuario promovido a administrador exitosamente!");
        setEmailInput("");
    };

    return (
        <form
            onSubmit={handlePromoteByEmail}
            className="bg-white/70 shadow-md p-6 rounded-2xl z-20 w-full max-w-md mb-6 flex flex-col gap-4"
        >
            <label className="font-semibold text-left text-gray-700">Correo del usuario a promover:</label>
            <input
                type="email"
                required
                className="border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="correo@uca.edu.sv"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl transition"
            >
                Promover a Admin
            </button>
            {message && (
                <span className="text-sm text-green-600 text-left mt-1">{message}</span>
            )}
        </form>
    );
};

export default PromoteForm;
