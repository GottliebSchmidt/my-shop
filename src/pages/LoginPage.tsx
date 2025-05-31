import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = auth.login(password);
        if (success) {
            navigate("/admin");
        } else {
            setError("Неверный пароль");
        }
    };

    return (
        <div>
            <h1>Вход в админку</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};