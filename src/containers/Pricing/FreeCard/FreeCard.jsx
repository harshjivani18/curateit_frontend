
// * ICONS 
import { FaCircleCheck } from "react-icons/fa6";

// ? COMPONENTS
import SolidRoundedButton from '@components/Buttons/SolidRoundedButton'

const freeFeatures = [
    'For 1 member',
    '5 Collections',
    '1 workspace',
    '1 Link in Bio',
    '100 Gems',
    '5 Guest users',
    '5 Tags',
    '1000 views'
]

const FreeCard = () => {

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
        <div
            id='pricing-free-card-section'
            className='w-full rounded-xl shadow-lg flex flex-row items-center justify-between p-6'
        >
            <div
                id='card-title-section'
                className='w-[55%] flex flex-col items-center justify-center p-2 gap-3'
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
    )

}

export default FreeCard