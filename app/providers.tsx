"use client";

import { NextUIProvider } from "@nextui-org/react";
import { CartProvider } from "@/context/cart";
import { TenantProvider } from "@/context/tenant";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <NextUIProvider className="flex flex-col h-full">
        {children}
      </NextUIProvider>
    </CartProvider>
  );
}
