import EmailVerified           from "@containers/membership/email-verified";

export const metadata = {
    title: 'Email verified | Curateit',
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const EmailVerifiedPage = () => {
    return <EmailVerified />;
}

export default EmailVerifiedPage;