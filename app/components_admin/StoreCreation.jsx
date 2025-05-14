'use client';
import { useState } from 'react';
import StoreForm from './StoreForm';
export default function StoreCreation({ token }) {
  const [createdStore, setCreatedStore] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleSuccess = (store) => {
    setCreatedStore(store);
  };

  const handleConnect = async () => {
    setConnecting(true);
    setError('');
    try {
      // 1. Pedimos authUrl al backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/printful-oauth`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error obteniendo URL de Printful');
      }
      console.log('res', res);
      const { authUrl } = await res.json();

      // 2. Abrimos ventana popup
      const popup = openPopup(authUrl);
      if (!popup) {
        throw new Error('No se pudo abrir la ventana emergente');
      }

      // 3. Escuchamos mensaje desde la ventana de callback (más abajo)
      window.addEventListener('message', (event) => {
        if (event.source !== popup) return;
        const { type, payload } = event.data;
        if (type === 'PRINTFUL_CONNECTED') {
          // Aquí payload puede incluir { store, message }
          setCreatedStore(payload.store);
          popup.close();
        }
        if (type === 'PRINTFUL_ERROR') {
          setError(payload.message);
          popup.close();
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto">
        {!createdStore ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Crear nueva tienda</h1>
            <StoreForm onSuccess={handleSuccess} />
          </>
        ) : (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
              Tienda "{createdStore.title}" creada con éxito!
            </h2>
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="px-6 py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {connecting ? 'Conectando...' : 'Conectar con Printful'}
            </button>
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// No olvides importar openPopup
function openPopup(url, name = 'PrintfulAuth', w = 600, h = 700) {
  const left = window.screenX + (window.innerWidth - w) / 2;
  const top  = window.screenY + (window.innerHeight - h) / 2;
  return window.open(
    url,
    name,
    `width=${w},height=${h},left=${left},top=${top}`
  );
}
