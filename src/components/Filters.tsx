import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export const Filters = () => {
    const [params, setParams] = useSearchParams();
    const [localSearch, setLocalSearch] = useState(params.get('search') || '');

    const updateParam = (key: string, value: string) => {
        if (value) params.set(key, value);
        else params.delete(key);
        setParams(params);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
            {/* Категория */}
            <select
                className="border rounded p-2"
                value={params.get('category') || ''}
                onChange={(e) => updateParam('category', e.target.value)}
            >
                <option value="">Все категории</option>
                <option value="shoes">Обувь</option>
                <option value="clothes">Одежда</option>
                <option value="accessories">Аксессуары</option>
            </select>

            {/* Бренд */}
            <select
                className="border rounded p-2"
                value={params.get('brand') || ''}
                onChange={(e) => updateParam('brand', e.target.value)}
            >
                <option value="">Все бренды</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
            </select>

            {/* Цена */}
            <input
                type="number"
                placeholder="Мин. цена"
                className="border rounded p-2 w-24"
                onChange={(e) => updateParam('minPrice', e.target.value)}
                defaultValue={params.get('minPrice') || ''}
            />
            <input
                type="number"
                placeholder="Макс. цена"
                className="border rounded p-2 w-24"
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                defaultValue={params.get('maxPrice') || ''}
            />

            {/* Сортировка */}
            <select
                className="border rounded p-2"
                value={params.get('sort') || 'newest'}
                onChange={(e) => updateParam('sort', e.target.value)}
            >
                <option value="newest">Сначала новые</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="popular">Популярные</option>
            </select>

            {/* Поиск */}
            <input
                type="text"
                placeholder="Поиск..."
                className="border rounded p-2 flex-1"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') updateParam('search', localSearch);
                }}
            />
        </div>
    );
};