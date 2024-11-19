import RegisterForm                         from "@containers/membership/registration";

export const metadata = {
    title: "Sign Up | CurateIt",
    description: "Sign up for CurateIt and start curating your online world. Explore, save, and share content that matters to you.",
    keywords: [],
    authors: [],
    creator: "Curateit",
    publisher: "Curateit",
    openGraph: {
        title: "Sign Up | CurateIt",
        description: "Sign up for CurateIt and start curating your online world. Explore, save, and share content that matters to you.",
        siteName: "Curateit",
        type: "website",
        url: `${process.env.WEBAPP_URL}/sign-up`,
        images: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
    },
    alternates: {
        canonical: `${process.env.WEBAPP_URL}/sign-up`,
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
    }
}

const SignUp = () => {
    return <RegisterForm />;
}

export default SignUp