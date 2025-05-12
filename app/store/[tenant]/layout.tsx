import { NavBar } from '@/components/navbar/NavBar2'
import { Footer } from '@/app/components/footer/Footer'
import { TenantProvider } from '@/app/context/tenant';

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const { tenant } = params;
  // Fetch datos de la tienda desde tu API (Strapi)
  console.log('tenant',  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/stores/${tenant}`);
  let store = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/stores/${tenant}`,
    );

    if (!res.ok) { // Si la respuesta no es 2xx
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    store = await res.json();
  } catch (error) {
    console.error("Error fetching store data:", error);
    return <p>Error cargando la tienda</p>;
  }

  if (!store) {
    return <p>Tienda no encontrada</p>;
  }

  return (
    <TenantProvider store={store}>
      <header className="sticky top-0 z-30">

        <NavBar></NavBar>


      </header>
      <main className="w-5/6 self-center justify-self-center min-h-screen">

        {children}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </TenantProvider>
  );
}
