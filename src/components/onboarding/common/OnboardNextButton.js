
import { Button } from "antd";
import { useSelector } from "react-redux";

const OnboardNextButton = ({
  handleStep = () => {},
  onEmailInvite = () => {},
  loading=false}) => {
  const onboardingCurrentStep = useSelector(
    (state) => state.app.onboardingCurrentStep
  );

  return (
    <div className="w-full flex items-center justify-between my-4">
      <div>
      </div>

      <div className="flex items-center">
        {(onboardingCurrentStep > 1 && onboardingCurrentStep !== 10) && (
          <Button
            className="!border-[#347AE2] !text-[#347AE2] !bg-[#E5F0FF] hover:border-[#347AE2] hover:text-[#347AE2] hover:bg-[#E5F0FF] mr-2 rounded"
            onClick={() => handleStep(onboardingCurrentStep - 1,'back')}
            disabled={loading}
          >
            Back
          </Button>
        )}
        <Button
          className="!bg-[#347AE2] !hover:bg-[#347AE2] rounded"
          type="primary"
          onClick={() => {
            if (onboardingCurrentStep === 10) {
              onEmailInvite();
            } else {
              handleStep(onboardingCurrentStep + 1);
            }
          }}
          disabled={loading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardNextButton;