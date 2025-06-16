import { useState, useEffect } from 'react';
import { products as allProducts } from '../data/products';
import { useSearchParams, Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '../components/Breadcrumbs';

const ITEMS_PER_PAGE = 9;

interface Product {
    id: number;
    title: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    popularity?: number;
}

const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
        className="border p-4 rounded shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <Link to={`/product/${product.id}`} className="block hover:underline">
            <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.brand} — {product.category}</p>
            <p className="text-lg font-bold">{product.price} €</p>
        </Link>
    </motion.div>
);

export const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [brand, setBrand] = useState(searchParams.get('brand') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || '');
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // имитация загрузки с задержкой
    useEffect(() => {
        setLoading(true);
        setError(null);
        const timer = setTimeout(() => {
            try {
                // если бы был fetch, здесь был бы await fetch(...)
                setProducts(allProducts);
                setLoading(false);
            } catch (e) {
                setError('Fehler beim Laden der Produkte');
                setLoading(false);
            }
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    const categories = Array.from(new Set(allProducts.map(p => p.category)));
    const brands = Array.from(new Set(allProducts.map(p => p.brand)));

    const filteredProducts = products.filter(p => {
        return (
            (category ? p.category === category : true) &&
            (brand ? p.brand === brand : true) &&
            (search ? p.title.toLowerCase().includes(search.toLowerCase()) : true)
        );
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
            case 'price_asc':
                return a.price - b.price;
            case 'price_desc':
                return b.price - a.price;
            case 'newest':
                return b.id - a.id;
            case 'popular':
                return (b.popularity || 0) - (a.popularity || 0);
            default:
                return 0;
        }
    });

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = sortedProducts.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    useEffect(() => {
        const params: Record<string, string> = {};
        if (category) params.category = category;
        if (brand) params.brand = brand;
        if (sort) params.sort = sort;
        if (search) params.search = search;
        params.page = page.toString();
        setSearchParams(params);
    }, [category, brand, sort, search, page, setSearchParams]);

    useEffect(() => {
        setPage(1);
    }, [category, brand, sort, search]);

    if (loading) return <div className="p-4 text-center">Загрузка товаров...</div>;
    if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

    return (
        <>
            <Seo
                title="Produktkatalog — Shop"
                description="Große Auswahl an Produkten mit Filter-, Sortier- und Seitenfunktion"
            />

            <div className="p-4">
                <Breadcrumbs />

                <h1 className="text-2xl mb-4">Produktkatalog</h1>

                <div className="flex gap-4 mb-6 flex-wrap">
                    <input
                        type="text"
                        placeholder="Suche..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border p-2 flex-grow min-w-[200px]"
                    />

                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="border p-2"
                    >
                        <option value="">Alle Kategorien</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        className="border p-2"
                    >
                        <option value="">Alle Marken</option>
                        {brands.map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>

                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="border p-2"
                    >
                        <option value="">Sortierung</option>
                        <option value="price_asc">Preis ↑</option>
                        <option value="price_desc">Preis ↓</option>
                        <option value="newest">Neuheiten</option>
                        <option value="popular">Beliebtheit</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paginatedProducts.length === 0 ? (
                        <p>Товары не найдены</p>
                    ) : (
                        paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)
                    )}
                </div>

                <div className="flex justify-center mt-6 gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Назад
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-black text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Вперед
                    </button>
                </div>
            </div>
        </>
    );
};