import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface Props {
    products: Product[];
}

export const ProductList = ({ products }: Props) => {
    if (!products.length) return <p>Keine Artikel entsprechen Ihrer Suche..</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
