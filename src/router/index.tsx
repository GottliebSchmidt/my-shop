import { createBrowserRouter } from 'react-router-dom';
import {App} from '../App';
import {ProductPage} from '../pages/ProductPage';
import {NotFoundPage} from '../pages/NotFoundPage';
import {AdminPage} from '../pages/AdminPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // содержит <Outlet />
        children: [
            { path: 'product/:id', element: <ProductPage /> },
            { path: 'admin', element: <AdminPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);