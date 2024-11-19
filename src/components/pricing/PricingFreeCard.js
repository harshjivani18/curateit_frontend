
// * ICONS 
import { FaCircleCheck } from "react-icons/fa6";

// ? COMPONENTS
import { SolidRoundedButton } from "./PricingButtons";

const freeFeatures = [
    '5 Guest members',
    '1000 Gems',
    '5 Collections & Tags each',
    '10 mins listen to articles',
    '5 mb file upload limit',
    '3 mins audio note limit',
    'Link In Bio',
    'Unlimited visitors',
]

const PricingFreeCard = () => {

    // ? Method to render the Features List
    const renderFeatures = () => {

        return freeFeatures.map((feature, index) => {

            return (
                <p 
                    key={`free-feature-${index}`}
                    id={`free-feature-${index}`}
                    className='flex items-center gap-x-2 text-sm text-grey-light font-normal'
                >

                    <FaCircleCheck 
                        className='text-primary-blue text-lg'
                    />
                    {feature}
                </p>
            )

        })

    }

    return (
        <div className='hidden md:block md:mt-8'>
            <div className='w-full rounded-xl shadow-lg flex flex-row items-center justify-between p-6'
            >
                <div className='w-[55%] flex flex-col items-center justify-center p-2 gap-3'
                >
                    <p
                        className='text-[32px] text-black font-semibold'
                    >
                        Explorer <span className='text-primary-medium-blue'>(Free)</span>
                    </p>

                    <div>
                        <SolidRoundedButton
                            title='Start for Free'
                            className=''
                            url='http://curateit.com/sign-up'
                        />
                    </div>
                </div>

                <div
                    id='free-card-features-section'
                    className='w-[40%]'
                >
                    <div className='w-full grid grid-cols-2 grid-rows-4 gap-y-3'>
                        {
                            renderFeatures()
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PricingFreeCard