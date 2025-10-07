import React, { useState } from 'react';
import api from '../api';

function ProductForm({ onAdded }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files && files[0] ? files[0] : null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description || '');
      data.append('price', form.price || 0);
      data.append('quantity', form.quantity || 0);

      if (form.image) data.append('image', form.image);

      await api.post('', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setForm({ name: '', description: '', price: '', quantity: '', image: null });
      onAdded();
    } catch (err) {
      console.error("Axios error:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);

        // Show meaningful message
        let message = err.response.data?.message || JSON.stringify(err.response.data);
        alert(`Backend error (${err.response.status}): ${message}`);
      } else if (err.request) {
        console.error("No response from server:", err.request);
        alert('No response from server. Please check your backend.');
      } else {
        console.error("Request error:", err.message);
        alert(`Request error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-3">
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="col-md-3">
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Description"
          />
        </div>
        <div className="col-md-2">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Price"
          />
        </div>
        <div className="col-md-2">
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            className="form-control"
            placeholder="Quantity"
          />
        </div>
        <div className="col-md-2">
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="form-control"
            accept="image/*"
          />
        </div>
      </div>
      <div className="mt-2">
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
