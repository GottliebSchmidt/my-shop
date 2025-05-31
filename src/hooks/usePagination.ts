import { useMemo, useState } from 'react';

export const usePagination = (items: any[], perPage: number = 6) => {
    const [page, setPage] = useState(1);

    const paginated = useMemo(() => {
        const start = (page - 1) * perPage;
        return items.slice(start, start + perPage);
    }, [items, page, perPage]);

    const totalPages = Math.ceil(items.length / perPage);

    return {
        page,
        totalPages,
        paginated,
        setPage,
    };
};