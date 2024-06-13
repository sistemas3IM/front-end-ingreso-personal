import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import DefaultLayout from './layout/DefaultLayout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/main",
                element: <DefaultLayout />
            },
        ]
    },
]);

export default router;