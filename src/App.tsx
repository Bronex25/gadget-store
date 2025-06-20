import React, { useEffect } from 'react';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { ItemsPage } from './pages/ItemsPage/ItemsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/productsSlice';
import FullPageLoader from './components/Loader/FullPageLoader';
import { Product } from './types/Product';
import { ProductDetailsPage } from './pages/ProducDetailsPage/ProductDetailsPage';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status, products } = useAppSelector(state => state.products);

  const phones: Product[] = [];
  const tablets: Product[] = [];
  const accessories: Product[] = [];
  // Categorize products into phones, tablets, and accessories
  products.forEach(product => {
    if (product.category === 'phones') {
      phones.push(product);
    } else if (product.category === 'tablets') {
      tablets.push(product);
    } else if (product.category === 'accessories') {
      accessories.push(product);
    }
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Header></Header>

      <div className="container">
        {status === 'loading' ? (
          <FullPageLoader />
        ) : (
          <Routes>
            <Route path="" element={<HomePage />}></Route>
            <Route path="home" element={<Navigate to="/" replace />}></Route>
            <Route
              path="phones"
              element={
                <ItemsPage pageName="Mobile Phones" productToShow={phones} />
              }
            ></Route>
            <Route
              path="phones/:productId"
              element={<ProductDetailsPage />}
            ></Route>
            <Route
              path="tablets"
              element={<ItemsPage pageName="Tablets" productToShow={tablets} />}
            ></Route>
            <Route
              path="accessories"
              element={
                <ItemsPage pageName="Accessories" productToShow={accessories} />
              }
            ></Route>
            <Route path="favorites" element={<FavoritesPage />}></Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        )}

        <Footer />
      </div>
    </>
  );
};

export default App;
