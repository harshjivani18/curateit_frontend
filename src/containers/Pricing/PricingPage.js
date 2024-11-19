import React from "react";
import FreeCard from "@containers/Pricing/FreeCard/FreeCard";
import GetUnlimited from "@containers/Pricing/GetUnlimited/GetUnlimited";
import PlanCards from "@containers/Pricing/PlanCards/PlanCards";
import SeeComparison from "@containers/Pricing/SeeComparison/SeeComparison";
import Title from "@containers/Pricing/Title/Title";
import TryOut from "@containers/Pricing/TryOut/TryOut";
import CustomNav from "@components/landingPageTabs/CustomNav";
import Footer from "@components/Footer2/Footer";

const PricingPage = () => {
  return (
    <div>
      <CustomNav />
      <div id="page-pricing" className="page-layout py-5 md:py-9">
        <Title />

        <div className="mt-6 md:mt-9">
          <TryOut />
        </div>

        <div className="mt-14">
          <PlanCards />
        </div>

        <div className="hidden md:block md:mt-8">
          <SeeComparison />
        </div>

        <div className="mt-6 md:mt-9">
          <GetUnlimited />
        </div>

        <div className="hidden md:block md:mt-8">
          <FreeCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
