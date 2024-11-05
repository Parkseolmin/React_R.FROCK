import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/scss/style.scss';
import MyOrder from 'pages/MyOrder';

// Lazy loading components
const App = lazy(() => import('./App'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import('./pages/Home'));
const AllProducts = lazy(() => import('./pages/AllProducts'));
const NewProduct = lazy(() => import('./pages/NewProduct'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const MyCart = lazy(() => import('./pages/MyCart'));
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'));
const Category = lazy(() => import('./pages/Category'));
const Loading = lazy(() => import('./pages/Loading'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> }, // 홈 화면
      { path: '/products', element: <AllProducts /> }, // 전체 제품
      { path: '/products/category/:categoryId', element: <Category /> }, // 카테고리별 제품
      { path: '/products/:id', element: <ProductDetail /> }, // 제품 상세 페이지
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <MyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      }, // 장바구니 페이지
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      }, // 제품 등록 페이지
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </React.StrictMode>
);
