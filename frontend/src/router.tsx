import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Startups from './pages/Startups';
import Login from './pages/Login';
import GuideDetail from './pages/GuideDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'startups',
        element: <Startups />,
      },
      {
        path: 'guide/:sectionId',
        element: <GuideDetail />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  }
]);
