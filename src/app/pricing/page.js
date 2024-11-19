import PricingPage from "@containers/pricing";

export async function generateMetadata({ params, searchParams }, parent) {
    return {
        title: `Pricing - CurateIt`,
        description: "Find the ideal pricing solutions for your business at Curateit. Browse through our carefully selected range of pricing strategies to optimize your revenue and growth.",
        keywords: [
            "pricing",
            "pricing strategies",
            "pricing solutions",
            "revenue optimization",
            "growth optimization",
            "curateit",
        ],
        authors: [],
        creator: "Curateit",
        publisher: "Curateit",
        openGraph: {
            title: `Pricing - CurateIt`,
            description: "Find the ideal pricing solutions for your business at Curateit. Browse through our carefully selected range of pricing strategies to optimize your revenue and growth.",
            type: "website",
            url: `${process.env.NEXT_PUBLIC_WEBAPP_URL}/plan-compare`,
            siteName: "Curateit",
            images: [`${process.env.S3_STATIC_CDN}/webapp/banner.jpg`],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBAPP_URL}/plan-compare`,
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
        },
    }
}

const Pricing = () => {
    return <PricingPage />
}

export default Pricing;