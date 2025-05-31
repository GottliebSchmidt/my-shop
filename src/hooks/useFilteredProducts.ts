import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { useMemo } from 'react';
import type { Product } from '../types';


export const useFilteredProducts = (): Product[] => {
    const [params] = useSearchParams();
    const category = params.get('category') || '';
    const brand = params.get('brand') || '';
    const minPrice = parseFloat(params.get('minPrice') || '0');
    const maxPrice = parseFloat(params.get('maxPrice') || '9999');
    const sort = params.get('sort') || 'newest';
    const search = params.get('search')?.toLowerCase() || '';

    return useMemo<Product[]>(() => {
        let result = [...products];

        if (category) result = result.filter(p => p.category === category);
        if (brand) result = result.filter(p => p.brand === brand);
        result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
        if (search) result = result.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search)
        );

        switch (sort) {
            case 'price_asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                result.sort((a, b) => b.popularity - a.popularity);
                break;
            default:
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return result;
    }, [category, brand, minPrice, maxPrice, sort, search]);
};
