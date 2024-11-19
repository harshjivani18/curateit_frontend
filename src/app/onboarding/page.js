import Onboarding from "@containers/onboarding";

export const metadata = {
  title: "Onboarding | Curateit",
  description: "Curateit Onboarding",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const OnboardingPage = () => {
  return <Onboarding />;
};

export default OnboardingPage;
