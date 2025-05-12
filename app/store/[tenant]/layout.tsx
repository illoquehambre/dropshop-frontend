import { NavBar } from '@/components/navbar/NavBar2'
import { Footer } from '@/app/components/footer/Footer'
import { TenantProvider } from '@/app/context/tenant';
import { StoreProvider } from '@/app/context/store';

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  
  return (
    <StoreProvider slug={params.tenant}>
      <header className="sticky top-0 z-30">

        <NavBar></NavBar>


      </header>
      <main className="w-5/6 self-center justify-self-center min-h-screen">

        {children}
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </StoreProvider>
  );
}
