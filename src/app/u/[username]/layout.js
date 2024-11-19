import '../../globals.css'
import Script                   from 'next/script'
import { Inter }                from 'next/font/google'
import MainStoreProvider        from '@components/providers/MainStoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "Curateit - Curate, Save, Search gems of web, 10x your productivity"
};

export default function RootLayout({ children }) {
  const BASE_URL     = process.env.NEXT_PUBLIC_BASE_URL
  const isMainDomain = BASE_URL === "https://curateit.com" || BASE_URL === "https://www.curateit.com"
  return (
    <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          {/* <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Moon+Dance&family=Nunito+Sans:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700;900&family=Roboto:wght@400;500;700;900&display=swap" as="font" /> */}
          {isMainDomain && <>
            <Script strategy='lazyOnload'>
              {`(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_API_KEY}");`}
            </Script>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script strategy="lazyOnload">
              {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                          page_path: window.location.pathname,
                          });
                      `}
            </Script>
          </>}
          <script async src={`${process.env.NEXT_PUBLIC_UMAMI_API_URL}/script.js`} data-website-id={process.env.NEXT_PUBLIC_WEBSITE_ID} />
          <script src="https://.iframe.ly/embed.js" async></script>
        </head>
        <body className={inter.className}>
          <MainStoreProvider>
            {children}
          </MainStoreProvider>
        </body>
    </html>
  )
}
