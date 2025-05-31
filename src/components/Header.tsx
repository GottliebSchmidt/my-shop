import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export const Header = () => {
    const { items } = useCart();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/" className="logo">MyStore</Link>

                <nav className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/admin" className="nav-link">Admin</Link>
                </nav>

                <Link to="/cart" className="cart-button nav-link">
                    <ShoppingCart size={18} />
                    {totalItems > 0 && (
                        <span className="cart-count">{totalItems}</span>
                    )}
                </Link>
            </div>
        </header>
    );
};