import EmailVerify           from "@containers/membership/verify";

export const metadata = {
    title: 'Verifying... | Curateit',
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const EmailVerifyPage = () => {
    return <EmailVerify />;
}

export default EmailVerifyPage;