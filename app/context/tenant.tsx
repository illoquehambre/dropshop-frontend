
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Store = {
  
    title: string;
    logo: {
      id: string;
      url: string;
      preview_url: string
      name: string
    };
  
};

const TenantContext = createContext<Store | null>(null);

export function TenantProvider({ children,
  store 
}: {
  children: React.ReactNode;
  store: Store | null;
}) {
  return (
    <TenantContext.Provider value={store}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}