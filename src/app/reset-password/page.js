import ResetPassword            from "@containers/membership/forgot-password/reset-password";

export const metadata = {
    title: "Reset Password | CurateIt",
    description: "Sign up for CurateIt and start curating your online world. Explore, save, and share content that matters to you.",
    keywords: [],
    authors: [],
    creator: "Curateit",
    publisher: "Curateit",
    openGraph: {
        title: "Reset Password | CurateIt",
        description: "Sign up for CurateIt and start curating your online world. Explore, save, and share content that matters to you.",
        siteName: "Curateit",
        type: "website",
        url: `${process.env.WEBAPP_URL}/reset-password`,
        images: [`${process.env.S3_STATIC_CDN}/webapp/curateit-200x200.png`],
    },
    alternates: {
        canonical: `${process.env.WEBAPP_URL}/reset-password`,
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
    }
}

const ResetPasswordPage = () => {
    return <ResetPassword />;
}

export default ResetPasswordPage;