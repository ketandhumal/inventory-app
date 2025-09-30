import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import api from './api'; 

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Inventory Management</h2>
      <ProductForm onAdded={fetchProducts} /> {/* api is imported inside ProductForm */}
      <ProductList products={products} />
    </div>
  );
}

export default App;
