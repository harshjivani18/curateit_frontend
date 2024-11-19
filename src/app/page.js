// import HomePage from "@containers/home";
import MainLandingPage from "@containers/landing-page";
import ForgotPassword from "@containers/membership/forgot-password";

export const metadata = {
  title: "Boost your productivity by 10x & streamline content curation with CurateIt | Curateit",
  description:
    "Supercharge your productivity by 10x and simplify content curation with CurateIt. Discover how to save time and effort today!",
  authors: [],
  creator: "Curateit",
  publisher: "Curateit",
  openGraph: {
    title: "Boost your productivity by 10x & streamline content curation with CurateIt | Curateit",
    description: "Supercharge your productivity by 10x and simplify content curation with CurateIt. Discover how to save time and effort today!",
    type: "website",
    url: "https://www.curateit.com",
    siteName: "Curateit",
    images: [`${process.env.S3_STATIC_CDN}/webapp/banner.jpg`],
  },
  alternates: {
    canonical: "https://www.curateit.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  }
};

const Home = () => {
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CurateIt",
    "alternateName": "CurateIt",
    "url": "https://www.curateit.com",
    "logo": "https://d3jrelxj5ogq5g.cloudfront.net/webapp/logo1sv.svg",
    "sameAs": [
      "https://twitter.com/CurateitHQ",
      "https://www.instagram.com/curateithq/",
      "https://youtube.com/@curateit?si=LKdl4sP-O2UtzasY",
      "https://linkedin.com/company/curateit"
    ]
  }
  return (
    <>
      {/* <HomePage /> */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}></script>
      <MainLandingPage />
      <ForgotPassword />
    </>
  );
};

export default Home;
