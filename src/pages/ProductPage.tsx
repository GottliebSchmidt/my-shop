import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

type SeoProps = {
    title: string;
    description: string;
    image: string;
    url?: string;
};

const Seo = ({ title, description, image, url = window.location.href }: SeoProps) => {
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": title,
        "image": [image],
        "description": description,
        "url": url,
        "offers": {
            "@type": "Offer",
            "url": url,
            "priceCurrency": "EUR",
            "price": "", // Цена подставим ниже
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary_large_image" />
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
    );
};

export const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<typeof products[0] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        setError(null);

        // эмуляция загрузки с задержкой
        const timer = setTimeout(() => {
            try {
                const found = products.find((p) => p.id.toString() === id);
                if (!found) {
                    setError('Товар не найден');
                    setLoading(false);
                    return;
                }
                setProduct(found);
                setLoading(false);
            } catch {
                setError('Ошибка загрузки товара');
                setLoading(false);
            }
        }, 700);

        return () => clearTimeout(timer);
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product.id.toString());
            alert(`Добавлен в корзину: ${product.title}`);
        }
    };

    if (loading) return <div className="p-4 text-center">Загрузка товара...</div>;
    if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
    if (!product) return null;

    return (
        <div className="p-4">
            <Seo
                title={product.title}
                description={product.description}
                image={product.image}
                url={`${window.location.origin}/product/${product.id}`}
            />

            <Breadcrumbs />

            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full max-w-sm rounded"
                    loading="lazy"
                />
                <div>
                    <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold">{product.price} €</p>
                    <button
                        onClick={handleAddToCart}
                        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
};