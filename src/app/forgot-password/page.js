import ForgotPassword           from "@containers/membership/forgot-password";

export const metadata = {
    title: 'Forgot Password | Curateit',
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const ForgotPasswordPage = () => {
    return <ForgotPassword />;
}

export default ForgotPasswordPage;