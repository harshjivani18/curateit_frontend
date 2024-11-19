import SocialLoginCallback      from "@containers/membership/social-login";

export const metadata = {
    title: "Validate social login ... | Curateit",
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const SocialLoginCallbackPage = () => {
    return <SocialLoginCallback />
}

export default SocialLoginCallbackPage