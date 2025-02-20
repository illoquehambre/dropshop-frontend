
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from '@/components/navbar/NavBar2'
import { Footer } from '@/app/components/footer/Footer'



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Comercio Beta',
  description: 'Integración de Snipcart en Next.js App Router',
}



export default function RootLayout({ children }) {





  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
      </head>
      <body className={`${inter.className} overflow-y-auto `} >
        <Providers>
          {/*<Script src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"  strategy="beforeInteractive" />}
          <div hidden  id="snipcart" data-api-key={BEARER_TOKEN} data-config-modal-style="side"  />

          {/** <script src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>
          <div hidden id="snipcart" data-api-key={BEARER_TOKEN}></div>*/}

          <header className="sticky top-0 z-30">

            <NavBar></NavBar>


          </header>
          <main className="w-5/6 self-center justify-self-center min-h-screen">

            {children}
          </main>
        </Providers>
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
