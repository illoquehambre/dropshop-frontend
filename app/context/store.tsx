// stores/StoreContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface StoreData { title: string; logo: []; /* etc */ }
const StoreContext = createContext<StoreData | null>(null)

export function StoreProvider({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const [store, setStore] = useState<StoreData | null>(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/stores/${slug}`)
      .then(r => r.json())
      .then((data) => setStore(data))
  }, [slug])

  if (!store) return <p>Cargando tienda…</p>
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const s = useContext(StoreContext)
  if (!s) throw new Error('useStore debe usarse dentro de StoreProvider')
  return s
}
