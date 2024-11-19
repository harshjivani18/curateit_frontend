import Referral from "@containers/Referrals/ReferEarn";

export async function generateMetadata({ params, searchParams }, parent) {
    const { username }        = params
    const uArr                = username.split("@")
    const usernameParam       = uArr.length > 0 ? uArr[uArr.length - 1] : username
    const uStr                = usernameParam.replaceAll("%40", "")
    return {
        title: `Refer & Earn from CurateIt`,
        description: "Start earning rewards with CurateIt's referral program. Share our platform with others and get rewarded for every successful referral. Join now and start earning!",
        keywords: ["refer", "earn", "credits", "referral", "curateit"],
        authors: [],
        creator: "Curateit",
        publisher: "Curateit",
        openGraph: {
            title: `Refer & Earn from CurateIt`,
            description: "Start earning rewards with CurateIt's referral program. Share our platform with others and get rewarded for every successful referral. Join now and start earning!",
            type: "website",
            url: `${process.env.NEXT_PUBLIC_WEBAPP_URL}/u/${uStr}/referral`,
            siteName: "Curateit",
            images: [`${process.env.S3_STATIC_CDN}/webapp/banner.jpg`],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBAPP_URL}/u/${uStr}/referral`,
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
        },
    }
}

const ReferralPage = () => {
    return (
        <Referral />
    );
}

export default ReferralPage;