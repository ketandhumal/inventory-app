import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import api from './api'; 

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      alert('Failed to fetch products from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Inventory Management</h2>
      <ProductForm onAdded={fetchProducts} />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}

export default App;
