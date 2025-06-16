import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useAuth } from "../context/AuthContext";

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    brand: string;
};

export const AdminPage = () => {
    const { products, addProduct, removeProduct, updateProduct } = useAdmin();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const [form, setForm] = useState<Product>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        brand: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const startEdit = (product: Product) => {
        setForm(product);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setForm({
            id: 0,
            title: '',
            description: '',
            price: 0,
            image: '',
            category: '',
            brand: ''
        });
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (isEditing) {
            updateProduct({ ...form, price: Number(form.price) });
        } else {
            addProduct({ ...form, id: Date.now(), price: Number(form.price) });
        }
        cancelEdit();
    };

    return (
        <div className="p-4">

            <h1 className="text-2xl font-bold mb-4 flex items-center justify-between">
                Админ-панель
                <button
                    onClick={() => {
                        logout();
                        navigate("/login");  // Перенаправление на страницу входа
                    }}
                    className="bg-red-600 text-white py-1 px-3 rounded"
                >
                    Выйти
                </button>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Titel" className="border p-2" />
                <input name="description" value={form.description} onChange={handleChange} placeholder="Beschreibung" className="border p-2" />
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Preis" className="border p-2" />
                <input name="image" value={form.image} onChange={handleChange} placeholder="Bild-URL" className="border p-2" />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Kategorie" className="border p-2" />
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Marke" className="border p-2" />
                <div>
                    <button onClick={handleSave} className="bg-black text-white py-2 px-4 rounded mr-2">
                        {isEditing ? 'Сохранить' : 'Добавить товар'}
                    </button>
                    {isEditing && (
                        <button onClick={cancelEdit} className="py-2 px-4 rounded border border-gray-400">
                            Отмена
                        </button>
                    )}
                </div>
            </div>

            <ul>
                {products.map((p) => (
                    <li key={p.id} className="border p-2 mb-2 flex justify-between items-center">
                        <span>{p.title} — {p.price}€</span>
                        <div>
                            <button
                                onClick={() => startEdit(p)}
                                className="mr-2 text-blue-600 hover:underline"
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => removeProduct(p.id)}
                                className="text-red-600"
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};