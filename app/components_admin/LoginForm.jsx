'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('api/strapi/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: email,
                    password
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Credenciales incorrectas');
            }

            // El JWT ya está en cookie HttpOnly, redirigimos al área admin
            router.push('/admin')

        } catch (error) {
            alert(error.message || 'Error en el login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto my-8 p-8 bg-white shadow-lg rounded-lg text-black"
        >
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 font-medium">
                    Contraseña:
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
        </form>
    );
}

