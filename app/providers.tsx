

import { NextUIProvider } from '@nextui-org/react'
import { CartProvider } from '@/context/cart'
import { StoreProvider } from '@/context/store-context'
import { headers } from 'next/headers';

export async function Providers({ children }: { children: React.ReactNode }) {
  const host = headers().get('host') ?? 'localhost:3000';

  const origin = `${host.startsWith('localhost')|| host.startsWith('tienda1') ? 'http' : 'https'}://${host}`;

  const res = await fetch(`${origin}/api/strapi`);
  
  if (!res.ok) {
    // Manejo de errores
    console.error('Error al llamar al API interno:', res.statusText);
    return (
      <CartProvider>
        <NextUIProvider className='flex flex-col h-full'>
          {children}
        </NextUIProvider>
      </CartProvider>
    )
  }
  console.log('Response:', res.body);

  const store = await res.json();
  console.log('Parsed store:', store);
  return (
    <StoreProvider store={store}>
      <CartProvider>
        <NextUIProvider className='flex flex-col h-full'>
          {children}
        </NextUIProvider>
      </CartProvider>
    </StoreProvider>
  )
}  