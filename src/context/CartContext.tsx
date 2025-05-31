import { createContext, useContext, useState, } from 'react';
import type { ReactNode } from 'react';
interface CartItem {
    id: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (id: string) => {
        setItems((prev) => {
            const exists = prev.find((item) => item.id === id);
            if (exists) {
                return prev.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};