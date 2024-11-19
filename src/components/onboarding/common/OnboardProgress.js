import { Progress } from "antd";
import { useSelector } from "react-redux";

const OnboardProgress = () => {
  const onboardingCurrentStep = useSelector(
    (state) => state.app.onboardingCurrentStep
  ); 

  const progressValue = (onboardingCurrentStep / 10) * 100;

    return (
      <div className="my-4">
        <Progress percent={progressValue} />
      </div>
    );
}

export default OnboardProgress;