import ForgotPasswordSuccess           from "@containers/membership/forgot-password/forgot-password-verify";

export const metadata = {
    title: 'Password request sent | Curateit',
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const ForgotPasswordSuccessPage = () => {
    return <ForgotPasswordSuccess />;
}

export default ForgotPasswordSuccessPage;