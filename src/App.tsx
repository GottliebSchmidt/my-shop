import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { Catalog } from './pages/Catalog';
import { ProductPage } from './pages/ProductPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartPage } from './pages/CartPage';
import { AuthProvider } from './context/AuthContext';

import {LoginPage} from './pages/LoginPage';

export const App = () => (
    <AuthProvider>
    <AdminProvider>
        <CartProvider>
            <Router>
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Catalog />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </CartProvider>
    </AdminProvider>
    </AuthProvider>
);