
'use client';
import { createContext, useContext, useEffect, useState } from 'react';



const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const t = document.cookie
      .split('; ')
      .find(row => row.startsWith('tenant='))
      ?.split('=')[1];
    if (t) setTenant(t);
  }, []);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}
