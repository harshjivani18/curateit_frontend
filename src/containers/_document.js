import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>Curate It</title>
                    <meta name="description" content="This is my Next.js application." />
                    {/* <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Moon+Dance&family=Nunito+Sans:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700;900&family=Roboto:wght@400;500;700;900&display=swap" as="font" /> */}
                    <script async src={`${process.env.NEXT_PUBLIC_UMAMI_API_URL}/script.js`} data-website-id={process.env.NEXT_PUBLIC_WEBSITE_ID} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
