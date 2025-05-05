import { NavBar } from '@/components/navbar/NavBar2'
import { Footer } from '@/app/components/footer/Footer'

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const { tenant } = params;
  // Fetch datos de la tienda desde tu API (Strapi)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/stores/${tenant}`,
    { cache: 'force-cache' }
  );
  const store = await res.json();

  if (!store) {
    return <p>Tienda no encontrada</p>;
  }

  return (
    <>
      <header className="sticky top-0 z-30">

        <NavBar></NavBar>


      </header>
      <main className="w-5/6 self-center justify-self-center min-h-screen">

        {children}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
