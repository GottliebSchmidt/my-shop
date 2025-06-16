
import { Link, useLocation, useParams } from 'react-router-dom';
import { products } from '../data/products';

export const Breadcrumbs = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    // Начинаем с главной
    const crumbs = [{ name: 'Home', path: '/' }];

    // Добавляем Каталог, если мы не на главной
    if (location.pathname !== '/' && (location.pathname.startsWith('/catalog') || location.pathname.startsWith('/product'))) {
        crumbs.push({ name: 'catalog', path: '/' });
    }

    // Если мы на странице продукта — добавляем название товара
    if (location.pathname.startsWith('/product') && id) {
        const product = products.find((p) => p.id.toString() === id);

        crumbs.push({
            name: product ? product.title : `product #${id}`,
            path: location.pathname,
        });
    }

    return (
        <nav aria-label="breadcrumbs" className="mb-4 text-sm text-gray-600">
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                    <span key={`${crumb.path}-${index}`} className="inline-flex items-center">
            {!isLast ? (
                <>
                    <Link to={crumb.path} className="hover:underline">
                        {crumb.name}
                    </Link>
                    <span className="mx-2 select-none">/</span>
                </>
            ) : (
                <span className="font-semibold text-gray-800">{crumb.name}</span>
            )}
          </span>
                );
            })}
        </nav>
    );
};