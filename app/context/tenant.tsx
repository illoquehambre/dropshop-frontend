'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const TenantContext = createContext<string | null>(null)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<string | null>(null)

  useEffect(() => {
    const match = document.cookie.match(/(^|;\s*)tenant=([^;]+)/)
    if (match) setTenant(match[2])
  }, [])

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const t = useContext(TenantContext)
  if (t === undefined) throw new Error('useTenant debe usarse dentro de TenantProvider')
  return t
}