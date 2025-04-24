'use client';
import { createContext, useContext } from 'react'

type Store = {
  id: number
  title: string
  logo: any // puedes tipar mejor con los datos reales
} | null

const StoreContext = createContext<Store>(null)

export const useStore = () => useContext(StoreContext)

export const StoreProvider = ({
  children,
  store,
}: {
  children: React.ReactNode
  store: Store
}) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
