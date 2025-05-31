import { createContext, useContext, useEffect, useState, } from 'react';
import type { ReactNode } from 'react';
import { products as initialProducts } from '../data/products';

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    brand: string;
};

type AdminContextType = {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: number) => void;
    updateProduct: (product: Product) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ecommerce-products';

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : initialProducts;
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Product) => {
        setProducts((prev) => [...prev, product]);
    };

    const removeProduct = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };

    return (
        <AdminContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdmin must be used within AdminProvider');
    return context;
};