import ExtensionOnboarding  from "@containers/extension-onboarding";

export const metadata = {
    title: 'Onboarding Document | Curateit',
    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
}

const ExtensionOnboardingPage = () => {
    return <ExtensionOnboarding />;
}

export default ExtensionOnboardingPage;
