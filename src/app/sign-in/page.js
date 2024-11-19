import SignIn               from "@containers/membership/login";

export const metadata = {
    title: "Sign In | CurateIt",
    description: "Join CurateIt today and revolutionize how you curate online content. Sign in to access a user-friendly platform for organizing articles, videos, and more.",
    keywords: [],
    authors: [],
    creator: "Curateit",
    publisher: "Curateit",
    openGraph: {
        title: "Sign In | CurateIt",
        description: "Join CurateIt today and revolutionize how you curate online content. Sign in to access a user-friendly platform for organizing articles, videos, and more.",
        siteName: "Curateit",
        type: "website",
        url: `${process.env.WEBAPP_URL}/sign-in`,
        images: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
    },
    alternates: {
        canonical: `${process.env.WEBAPP_URL}/sign-in`,
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
    }
}

const SignInPage = () => {
    return <SignIn />;
}

export default SignInPage;