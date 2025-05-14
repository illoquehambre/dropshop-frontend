'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StoreForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ title, slug }));
      if (logo) {
        formData.append('files.logo', logo);
      }

      const res = await fetch('/api/strapi/store', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Error creando la tienda');
      }

      const { store } = await res.json();
      // Llamar al callback onSuccess si está definido
      if (onSuccess) {
        onSuccess(store);
      } else {
        // Si no hay callback, redirigir por defecto
        router.push(`/stores/${store.slug}`);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded text-black">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-medium">Título</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="slug" className="block mb-1 font-medium">Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="logo" className="block mb-1 font-medium">Logo (opcional)</label>
        <input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="block w-full text-sm text-gray-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Creando...' : 'Crear Tienda'}
      </button>
    </form>
  );
}