import './globals.css'
import Script from 'next/script'
import { Source_Serif_4 } from 'next/font/google'
import MainStoreProvider from '@components/providers/MainStoreProvider'

const sourceSerif = Source_Serif_4({ subsets: ["latin"] });

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
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Moon+Dance&family=Nunito+Sans:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700;900&family=Roboto:wght@400;500;700;900&display=swap"
          as="font"
        />

        {isMainDomain && (
          <>
            <Script strategy="lazyOnload">
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
              {`!function(q,e,v,n,t,s){if(q.qp) return; n=q.qp=function(){n.qp?n.qp.apply(n,arguments):n.queue.push(arguments);}; n.queue=[];t=document.createElement(e);t.async=!0;t.src=v; s=document.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);}(window, 'script', 'https://a.quora.com/qevents.js');
                  qp('init', '94d2751c2e1d4803b151f3506e432d9a');
                  qp('track', 'ViewContent');`}
            </Script>
            <Script strategy="lazyOnload">
              {`_linkedin_partner_id = "6976457";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
            </Script>
            <Script strategy="lazyOnload">
              {`(function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);`}
            </Script>
            <Script strategy="lazyOnload">
              {`window.lintrk('track', { conversion_id: 18538497 });`}
            </Script>

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
            <Script strategy="lazyOnload">
              {`window.$crisp=[];window.CRISP_WEBSITE_ID="2da0f8ad-9423-4c81-a426-0e974d557a4b";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
            </Script>
            <Script strategy="lazyOnload">
              {`!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1138584177177403');
                fbq('track', 'PageView');`}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=1138584177177403&ev=PageView&noscript=1"
              />
            </noscript>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://q.quora.com/_/ad/94d2751c2e1d4803b151f3506e432d9a/pixel?tag=ViewContent&noscript=1"
              />
            </noscript>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt="Linkedin"
                src="https://px.ads.linkedin.com/collect/?pid=6976457&fmt=gif"
              />
            </noscript>
          </>
        )}
        <script
          async
          src={`${process.env.NEXT_PUBLIC_UMAMI_API_URL}/script.js`}
          data-website-id={process.env.NEXT_PUBLIC_WEBSITE_ID}
        />
        <script src="https://cdn.iframe.ly/embed.js" async></script>
      </head>
      <body className={sourceSerif.className}>
        <MainStoreProvider>{children}</MainStoreProvider>
      </body>
    </html>
  );
}
