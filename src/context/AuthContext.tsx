import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin123"; //

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("isAuthenticated");
        if (saved === "true") setIsAuthenticated(true);
    }, []);

    const login = (password: string) => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("AuthContext not found");
    return ctx;
};