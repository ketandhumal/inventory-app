import React, { useState } from 'react';
import api from '../api'; 

function ProductForm({ onAdded }) {
  const [form, setForm] = useState({ name: '', description: '', price: '', quantity: '', image: null });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('description', form.description);
      data.append('price', form.price || 0);
      data.append('quantity', form.quantity || 0);
      if (form.image) data.append('image', form.image);

      await api.post('/', data); // uses api.js instance

      setForm({ name: '', description: '', price: '', quantity: '', image: null });
      onAdded();
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-3">
          <input required name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Name" />
        </div>
        <div className="col-md-3">
          <input name="description" value={form.description} onChange={handleChange} className="form-control" placeholder="Description" />
        </div>
        <div className="col-md-2">
          <input name="price" type="number" value={form.price} onChange={handleChange} className="form-control" placeholder="Price" />
        </div>
        <div className="col-md-2">
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} className="form-control" placeholder="Quantity" />
        </div>
        <div className="col-md-2">
          <input name="image" type="file" onChange={handleChange} className="form-control" />
        </div>
      </div>
      <div className="mt-2">
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
      </div>
    </form>
  );
}

export default ProductForm;
