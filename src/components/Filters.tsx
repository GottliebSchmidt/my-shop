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
            {/* Kategorie */}
            <select
                className="border rounded p-2"
                value={params.get('category') || ''}
                onChange={(e) => updateParam('category', e.target.value)}
            >
                <option value="">Alle Kategorien</option>
                <option value="shoes">Schuhe</option>
                <option value="clothes">Kleidung</option>
                <option value="accessories">Accessoires</option>
            </select>

            {/* Marke */}
            <select
                className="border rounded p-2"
                value={params.get('brand') || ''}
                onChange={(e) => updateParam('brand', e.target.value)}
            >
                <option value="">Alle Marken</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
            </select>

            {/* Preis */}
            <input
                type="number"
                placeholder="Mindestpreis"
                className="border rounded p-2 w-24"
                onChange={(e) => updateParam('minPrice', e.target.value)}
                defaultValue={params.get('minPrice') || ''}
            />
            <input
                type="number"
                placeholder="Maximalpreis"
                className="border rounded p-2 w-24"
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                defaultValue={params.get('maxPrice') || ''}
            />

            {/* Sortierung */}
            <select
                className="border rounded p-2"
                value={params.get('sort') || 'newest'}
                onChange={(e) => updateParam('sort', e.target.value)}
            >
                <option value="newest">Neueste zuerst</option>
                <option value="price_asc">Preis: aufsteigend</option>
                <option value="price_desc">Preis: absteigend</option>
                <option value="popular">Beliebt</option>
            </select>

            {/* Suche */}
            <input
                type="text"
                placeholder="Suche..."
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