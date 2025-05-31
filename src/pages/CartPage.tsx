
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export const CartPage = () => {
    const { items, removeFromCart } = useCart();

    if (items.length === 0) {
        return <div className="p-8 text-center text-gray-600">Ваша корзина пуста</div>;
    }

    const totalPrice = items.reduce((sum, item) => {
        const product = products.find(p => p.id.toString() === item.id);
        return product ? sum + product.price * item.quantity : sum;
    }, 0);

    return (
        <main className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Корзина</h1>
            <ul>
                {items.map(item => {
                    const product = products.find(p => p.id.toString() === item.id);
                    if (!product) return null;

                    return (
                        <li key={item.id} className="mb-6 flex justify-between items-center border-b pb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                                <p className="text-gray-600">€{product.price} × {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Удалить
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-8 text-right text-2xl font-bold">
                Итого: €{totalPrice.toFixed(2)}
            </div>
        </main>
    );
};