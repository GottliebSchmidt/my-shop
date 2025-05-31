import type { Product } from '../types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const { addToCart } = useCart();

    return (
        <motion.div className="border rounded-xl shadow p-4" whileHover={{ scale: 1.03 }}>
            <Breadcrumbs />
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded mb-2"
                />
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-blue-600 font-semibold mt-1">€{product.price}</p>
            </Link>
            <button
                onClick={() => addToCart(product.id.toString())}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                type="button"
            >
                В корзину
            </button>
        </motion.div>
    );
};