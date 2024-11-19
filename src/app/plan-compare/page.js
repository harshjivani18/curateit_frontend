import PricingComparison from "@containers/plan-compare";

export async function generateMetadata({ params, searchParams }, parent) {
    return {
        title: `Pricing Comparison - CurateIt`,
        description: "Looking to save money? Visit CurateIt for a comprehensive pricing comparison tool. Compare prices and find the best deals in one convenient place.",
        keywords: [
            "pricing comparison",
            "compare prices",
            "best deals",
            "save money",
            "compareit",
            "curateit",
        ],
        authors: [],
        creator: "Curateit",
        publisher: "Curateit",
        openGraph: {
            title: `Pricing Comparison - CurateIt`,
            description: "Looking to save money? Visit CurateIt for a comprehensive pricing comparison tool. Compare prices and find the best deals in one convenient place.",
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

const PlanComparePage = () => {
    return (
        <PricingComparison />
    );
}

export default PlanComparePage;

