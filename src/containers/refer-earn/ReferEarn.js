'use client'

import './refer-earn.css'
import { useState } from "react";
import Activities from './Activites'
import Affiliate from './Affiliate'
import Refer from './Refer'
import TitleSection from './TitleSection'
import CustomNav from "@components/landingPageTabs/CustomNav";
import Footer from "@components/Footer2/Footer";

const ReferEarn = () => {

    const [currentCategory, setCurrentCategory] = useState('All')

    return (
      <div>
        <CustomNav />
        <div className="w-[90%] lg:w-max-[1779.5px] mx-auto mt-[60px]">
          <TitleSection
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />

          <div className="mt-[40px] hidden xl:block">
            <Refer />
          </div>

          <div className="w-full my-12">
            <Activities
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          </div>

          <div className="my-12 hidden lg:block">
            <Affiliate />
          </div>
        </div>
        <Footer />
      </div>
    );

}

export default ReferEarn