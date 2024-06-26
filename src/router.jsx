import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Loginp from './pages/Loginp';
import DefaultLayout from './layout/DefaultLayout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Loginp />
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