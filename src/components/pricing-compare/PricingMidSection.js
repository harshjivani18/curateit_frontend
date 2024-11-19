'use client'

import { useState }                 from 'react'
import { IoIosArrowBack, 
         IoIosArrowForward }        from "react-icons/io";
import Cross                        from './round-icons/Cross'
import Tick                         from './round-icons/Tick'

const timeFrames = ['Monthly', 'Yearly']

const usersTitles = ['Explorer', 'Curator', 'Influencer', 'Team S', 'Team M', 'Team XL']

const titles = {
    Explorer: {
        Monthly: {
            blob: 'Try it free for 7 days',
            title: 'Explorer',
            price: 'Free',
        },
        Yearly: {
            blob: 'Try it free for 7 days',
            title: 'Explorer',
            price: 'Free',
        }
    },
    Curator: {
        Monthly: {
            blob: 'Beginner Friendly',
            title: 'Curator',
            price: '$3.99',
        },
        Yearly: {
            blob: 'Beginner Friendly',
            title: 'Curator',
            price: '$2.90',
        }
    },
    Influencer: {
        Monthly: {
            blob: 'Try it free for 7 days',
            title: 'Influencer',
            price: '$12.99',
        },
        Yearly: {
            blob: 'Try it free for 7 days',
            title: 'Influencer',
            price: '$8.99',
        }
    },
    ['Team S']: {
        Monthly: {
            blob: 'Try it free for 7 days',
            title: 'Team S',
            price: '$79',
        },
        Yearly: {
            blob: 'Try it free for 7 days',
            title: 'Team S',
            price: '$6',
        }
    },
    ['Team M']: {
        Monthly: {
            blob: 'Try it free for 7 days',
            title: 'Team M',
            price: '$159',
        },
        Yearly: {
            blob: 'Try it free for 7 days',
            title: 'Team M',
            price: '$199',
        }
    },
    ['Team XL']: {
        Monthly: {
            blob: 'Try it free for 7 days',
            title: 'Team XL',
            price: '$499',
        },
        Yearly: {
            blob: 'Try it free for 7 days',
            title: 'Team XL',
            price: '$299',
        }
    },
}

const FeaturesList = {
    Explorer: [
        {
            type: 'feature',
            text: 'Included members',
            value: '1'
        },
        {
            type: 'feature',
            text: 'Guest users (5 per paid member)',
            value: '5'
        },
        {
            type: 'feature',
            text: 'Workspaces (Coming soon)',
            value: '1'
        },
        {
            type: 'feature',
            text: 'No of bio links',
            value: '1'
        },
        {
            type: 'feature',
            text: 'Bio link - Instagram wall generator',
            value: false
        },
        {
            type: 'feature',
            text: 'Sell digital products from other platforms',
            value: false
        },
        {
            type: 'feature',
            text: 'Blog',
            value: false
        },
        {
            type: 'feature',
            text: 'Gem - Bookmarks (20+ media types)',
            value: '100'
        },
        {
            type: 'feature',
            text: 'Collections',
            value: '5'
        },
        {
            type: 'feature',
            text: 'Tags',
            value: '5'
        },
        {
            type: 'title',
            text: 'Add Ons',
            value: ''
        },
        {
            type: 'feature',
            text: 'Additional User Cost',
            value: '0'
        },
        {
            type: 'feature',
            text: 'Custom Domain (Future)',
            value: 'N/A'
        },
        {
            type: 'feature',
            text: 'Remove Curateit Branding',
            value: 'N/A'
        },
        {
            type: 'feature',
            text: 'Workspace',
            value: '$5'
        },
        {
            type: 'title',
            text: 'Import and save features',
            value: ''
        },
        {
            type: 'feature',
            text: 'Bookmarks upload',
            value: true
        },
        {
            type: 'feature',
            text: 'Pocket Integration',
            value: true
        },
        {
            type: 'feature',
            text: 'Kindle Highlights ',
            value: true
        },
        {
            type: 'feature',
            text: 'Twitter/X Post, Bookmarks & likes',
            value: true
        },
        {
            type: 'feature',
            text: 'Linkedin Saved Posts',
            value: true
        },
    ],
    Curator: [
        {
            type: 'feature',
            text: 'Included members',
            value: '1'
        },
        {
            type: 'feature',
            text: 'Guest users (5 per paid member)',
            value: '5'
        },
        {
            type: 'feature',
            text: 'Workspaces (Coming soon)',
            value: '1'
        },
        {
            type: 'feature',
            text: 'No of bio links',
            value: '1'
        },
        {
            type: 'feature',
            text: 'Bio link - Instagram wall generator',
            value: false
        },
        {
            type: 'feature',
            text: 'Sell digital products from other platforms',
            value: false
        },
        {
            type: 'feature',
            text: 'Blog',
            value: false
        },
        {
            type: 'feature',
            text: 'Gem - Bookmarks (20+ media types)',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Collections',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Tags',
            value: 'Unlimited'
        },
        {
            type: 'title',
            text: 'Add Ons',
            value: ''
        },
        {
            type: 'feature',
            text: 'Additional User Cost',
            value: 'N/A'
        },
        {
            type: 'feature',
            text: 'Custom Domain (Future)',
            value: 'N/A'
        },
        {
            type: 'feature',
            text: 'Remove Curateit Branding',
            value: 'N/A'
        },
        {
            type: 'feature',
            text: 'Workspace',
            value: '$5'
        },
        {
            type: 'title',
            text: 'Import and save features',
            value: ''
        },
        {
            type: 'feature',
            text: 'Bookmarks upload',
            value: true
        },
        {
            type: 'feature',
            text: 'Pocket Integration',
            value: true
        },
        {
            type: 'feature',
            text: 'Kindle Highlights ',
            value: true
        },
        {
            type: 'feature',
            text: 'Twitter/X Post, Bookmarks & likes',
            value: true
        },
        {
            type: 'feature',
            text: 'Linkedin Saved Posts',
            value: true
        },
    ],
    Influencer: [
        {
            type: 'feature',
            text: 'Included members',
            value: '1'
        },
        {
            type: 'feature',
            text: 'Guest users (5 per paid member)',
            value: '10'
        },
        {
            type: 'feature',
            text: 'Workspaces (Coming soon)',
            value: '1'
        },
        {
            type: 'feature',
            text: 'No of bio links',
            value: '3'
        },
        {
            type: 'feature',
            text: 'Bio link - Instagram wall generator',
            value: true
        },
        {
            type: 'feature',
            text: 'Sell digital products from other platforms',
            value: true
        },
        {
            type: 'feature',
            text: 'Blog',
            value: true
        },
        {
            type: 'feature',
            text: 'Gem - Bookmarks (20+ media types)',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Collections',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Tags',
            value: 'Unlimited'
        },
        {
            type: 'title',
            text: 'Add Ons',
            value: ''
        },
        {
            type: 'feature',
            text: 'Additional User Cost',
            value: 'N/A'
        },
        {
            type: 'feature',
            text: 'Custom Domain (Future)',
            value: '$10/m'
        },
        {
            type: 'feature',
            text: 'Remove Curateit Branding',
            value: '$10/m'
        },
        {
            type: 'feature',
            text: 'Workspace',
            value: '$5'
        },
        {
            type: 'title',
            text: 'Import and save features',
            value: ''
        },
        {
            type: 'feature',
            text: 'Bookmarks upload',
            value: true
        },
        {
            type: 'feature',
            text: 'Pocket Integration',
            value: true
        },
        {
            type: 'feature',
            text: 'Kindle Highlights ',
            value: true
        },
        {
            type: 'feature',
            text: 'Twitter/X Post, Bookmarks & likes',
            value: true
        },
        {
            type: 'feature',
            text: 'Linkedin Saved Posts',
            value: true
        },
    ],
    ['Team S']: [
        {
            type: 'feature',
            text: 'Included members',
            value: '10'
        },
        {
            type: 'feature',
            text: 'Guest users (5 per paid member)',
            value: '50'
        },
        {
            type: 'feature',
            text: 'Workspaces (Coming soon)',
            value: '5'
        },
        {
            type: 'feature',
            text: 'No of bio links',
            value: '1 per user'
        },
        {
            type: 'feature',
            text: 'Bio link - Instagram wall generator',
            value: true
        },
        {
            type: 'feature',
            text: 'Sell digital products from other platforms',
            value: true
        },
        {
            type: 'feature',
            text: 'Blog',
            value: true
        },
        {
            type: 'feature',
            text: 'Gem - Bookmarks (20+ media types)',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Collections',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Tags',
            value: 'Unlimited'
        },
        {
            type: 'title',
            text: 'Add Ons',
            value: ''
        },
        {
            type: 'feature',
            text: 'Additional User Cost',
            value: '$7.99'
        },
        {
            type: 'feature',
            text: 'Custom Domain (Future)',
            value: '$29/m'
        },
        {
            type: 'feature',
            text: 'Remove Curateit Branding',
            value: '$29/m'
        },
        {
            type: 'feature',
            text: 'Workspace',
            value: '$5'
        },
        {
            type: 'title',
            text: 'Import and save features',
            value: ''
        },
        {
            type: 'feature',
            text: 'Bookmarks upload',
            value: true
        },
        {
            type: 'feature',
            text: 'Pocket Integration',
            value: true
        },
        {
            type: 'feature',
            text: 'Kindle Highlights ',
            value: true
        },
        {
            type: 'feature',
            text: 'Twitter/X Post, Bookmarks & likes',
            value: true
        },
        {
            type: 'feature',
            text: 'Linkedin Saved Posts',
            value: true
        },
    ],
    ['Team M']: [
        {
            type: 'feature',
            text: 'Included members',
            value: '25'
        },
        {
            type: 'feature',
            text: 'Guest users (5 per paid member)',
            value: '125'
        },
        {
            type: 'feature',
            text: 'Workspaces (Coming soon)',
            value: '5'
        },
        {
            type: 'feature',
            text: 'No of bio links',
            value: '1 per user'
        },
        {
            type: 'feature',
            text: 'Bio link - Instagram wall generator',
            value: true
        },
        {
            type: 'feature',
            text: 'Sell digital products from other platforms',
            value: true
        },
        {
            type: 'feature',
            text: 'Blog',
            value: true
        },
        {
            type: 'feature',
            text: 'Gem - Bookmarks (20+ media types)',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Collections',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Tags',
            value: 'Unlimited'
        },
        {
            type: 'title',
            text: 'Add Ons',
            value: ''
        },
        {
            type: 'feature',
            text: 'Additional User Cost',
            value: '$5.99'
        },
        {
            type: 'feature',
            text: 'Custom Domain (Future)',
            value: '$59/m'
        },
        {
            type: 'feature',
            text: 'Remove Curateit Branding',
            value: '$59/m'
        },
        {
            type: 'feature',
            text: 'Workspace',
            value: '$5'
        },
        {
            type: 'title',
            text: 'Import and save features',
            value: ''
        },
        {
            type: 'feature',
            text: 'Bookmarks upload',
            value: true
        },
        {
            type: 'feature',
            text: 'Pocket Integration',
            value: true
        },
        {
            type: 'feature',
            text: 'Kindle Highlights ',
            value: true
        },
        {
            type: 'feature',
            text: 'Twitter/X Post, Bookmarks & likes',
            value: true
        },
        {
            type: 'feature',
            text: 'Linkedin Saved Posts',
            value: true
        },
    ],
    ['Team XL']: [
        {
            type: 'feature',
            text: 'Included members',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Guest users (5 per paid member)',
            value: '200'
        },
        {
            type: 'feature',
            text: 'Workspaces (Coming soon)',
            value: '5'
        },
        {
            type: 'feature',
            text: 'No of bio links',
            value: '1 per user'
        },
        {
            type: 'feature',
            text: 'Bio link - Instagram wall generator',
            value: true
        },
        {
            type: 'feature',
            text: 'Sell digital products from other platforms',
            value: true
        },
        {
            type: 'feature',
            text: 'Blog',
            value: true
        },
        {
            type: 'feature',
            text: 'Gem - Bookmarks (20+ media types)',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Collections',
            value: 'Unlimited'
        },
        {
            type: 'feature',
            text: 'Tags',
            value: 'Unlimited'
        },
        {
            type: 'title',
            text: 'Add Ons',
            value: ''
        },
        {
            type: 'feature',
            text: 'Additional User Cost',
            value: 'N/A'
        },
        {
            type: 'feature',
            text: 'Custom Domain (Future)',
            value: '$100/m'
        },
        {
            type: 'feature',
            text: 'Remove Curateit Branding',
            value: '$100/m'
        },
        {
            type: 'feature',
            text: 'Workspace',
            value: '$5'
        },
        {
            type: 'title',
            text: 'Import and save features',
            value: ''
        },
        {
            type: 'feature',
            text: 'Bookmarks upload',
            value: true
        },
        {
            type: 'feature',
            text: 'Pocket Integration',
            value: true
        },
        {
            type: 'feature',
            text: 'Kindle Highlights ',
            value: true
        },
        {
            type: 'feature',
            text: 'Twitter/X Post, Bookmarks & likes',
            value: true
        },
        {
            type: 'feature',
            text: 'Linkedin Saved Posts',
            value: true
        },
    ],
}

const PricingMidSection = () => {

    const [currentTimeFrame, setCurrentTimeFrame] = useState(timeFrames[0])
    const [currentUserTitle, setCurrentUserTitle] = useState(0)

    // ? Handling when clicked on prev arrow
    const handlePrevious = () => {

        if (currentUserTitle !== 0) {

            setCurrentUserTitle((count) => count - 1)

        }

    }

    // ? Handling when clicked on next arrow
    const handleNext = () => {

        if (currentUserTitle !== 5) {

            setCurrentUserTitle((count) => count + 1)

        }

    }

    // ? Method to render the Feature blocks in the Features list 
    const renderFeatures = () => {

        return FeaturesList?.[usersTitles[currentUserTitle]]?.map((feature, index) => {

            return (
                <div key={`${usersTitles[currentUserTitle]}.feature-${index}`} className={`flex flex-row items-center justify-between gap-[25px] ${(feature?.type === 'feature') ? 'pricing-feature-block' : 'pricing-title-block border-y-[.25px] border-blue-100'}`}>
                    <p 
                        className={`w-[60%] pl-[16px] py-[12px] ${(feature?.type === 'feature') ? 'text-[14px] font-medium' : 'text-[18px] text-primary-blue font-semibold'}`}
                    >
                        {feature?.text}
                    </p>
                    <p className={`w-[30%] flex flex-row items-center justify-center font-normal ${(typeof feature?.value === 'string') ? 'text-[14px]' : 'text-[24px]'}`}>
                        {
                            (feature?.value === true)
                            ? <Tick />
                            : (feature?.value === false)
                                ?  <Cross />
                                : feature?.value
                        }
                    </p>
                </div>
            )

        })

    }

    return (
        <div
            id='pricing-section-mobile'
            className='w-full'
        >

            <div className='w-full flex flex-col items-center justify-start border-[0.4px] rounded-[12px] py-4 shadow-md md:py-5 md:px-6 md:rounded-xl  md:shadow-lg'>

                {/* // ? TIME FRAME SWITCHER */}
                <div className='border-[1px] border-primary-blue-200 flex flex-row items-center justify-center gap-1 rounded-[30px] px-[.45px] py-[.75px]'>
                    <a
                        className={`py-1 px-[24.5px] rounded-[30px] cursor-pointer select-none ${(currentTimeFrame === 'Monthly') ? 'bg-primary-blue' : ''}`}
                        onClick={() => setCurrentTimeFrame('Monthly')}
                    >
                        <p className={`text-[12px] font-medium leading-[28px] ${(currentTimeFrame === 'Monthly') ? 'text-white' : 'text-primary-medium-blue'}`}>Monthly</p>
                    </a>
                    <a
                        className={`py-1 px-[24.5px] rounded-[30px] cursor-pointer select-none ${(currentTimeFrame === 'Yearly') ? 'bg-primary-blue' : ''}`}
                        onClick={() => setCurrentTimeFrame('Yearly')}
                    >
                        <p className={`text-[12px] font-medium leading-[28px] ${(currentTimeFrame === 'Yearly') ? 'text-white' : 'text-primary-medium-blue'}`}>Yearly</p>
                    </a>
                </div>

                {/* // ? TITLE SECTION */}
                <div className='w-full px-3 mt-7 flex flex-col items-center justify-start'>

                    {/* // ? TRY BLOB */}
                    <div
                        className='w-max px-3 py-1 bg-primary-lighter-blue rounded-[24px] text-center'
                    >
                        <p
                            className='text-primary-blue text-[10px] font-medium leading-[18px]'
                        >
                            {titles?.[usersTitles[currentUserTitle]]?.[currentTimeFrame]?.blob}
                        </p>
                    </div>

                    {/* // ? TITLE SECTION INNER */}
                    <div className='mt-[4px] w-full flex flex-row items-center justify-between gap-2'>
                        <button
                            className={` flex flex-row justify-start cursor-pointer select-non drop-shadow-xl ${(currentUserTitle === 0) ? 'cursor-default' : 'cursor-pointer'}`}
                            onClick={() => handlePrevious()}
                        >
                            <div className={`w-[36px] h-[36px] rounded-[26px] flex items-center justify-center ${(currentUserTitle === 0) ? 'bg-[#4b4f5d47]' : 'bg-primary-blue-100'}`}>
                                <IoIosArrowBack
                                    className={(currentUserTitle === 0) ? 'text-grey-medium' : 'text-primary-blue'}
                                />
                            </div>
                        </button>
                        <div className='w-[70%] flex flex-col items-center justify-center gap-[4px]'>
                            {/* // ? TITLE */}
                            <p className='text-[28px] text-black font-semibold leading-[33.89px]'>
                                {titles?.[usersTitles[currentUserTitle]]?.[currentTimeFrame]?.title}
                            </p>

                            <p className='text-[24px] text-primary-medium-blue font-medium leading-[38px]'>
                                {titles?.[usersTitles[currentUserTitle]]?.[currentTimeFrame]?.price}
                            </p>

                            {/* {
                                (currentTimeFrame === 'Yearly') ? <p className='text-[10px] font-medim text-center'>per seat/month billed annually</p> : ''
                            } */}

                            <p className='text-[10px] font-medim text-center'>
                                {
                                    (currentTimeFrame === 'Monthly') ? 'per seat/month' : 'per seat/month billed annually'
                                }
                            </p>
                        </div>
                        <button
                            className={`flex flex-row justify-end select-non drop-shadow-xl ${(currentUserTitle === 5) ? 'cursor-default' : 'cursor-pointer'}`}
                            onClick={() => handleNext()}
                        >
                            <div className={`w-[36px] h-[36px] rounded-[26px] flex items-center justify-center ${(currentUserTitle === 5) ? 'bg-[#4b4f5d47]' : 'bg-primary-blue-100'}`}>
                                <IoIosArrowForward
                                    className={(currentUserTitle === 5) ? 'text-grey-medium' : 'text-primary-blue'}
                                />
                            </div>
                        </button>
                    </div>

                    <button
                        className='mt-[12px] bg-primary-blue w-[219px] min-h-[40px] border-2 border-primary-blue rounded-[30px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue'
                    >

                        <a
                            className='text-[16px] text-white font-medium leading-[28px] min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                            href='https://curateit.com/sign-up'
                            target='_blank'
                        >
                            Get Started
                        </a>
                    </button>


                </div>
                <div className='border-b-[2px] border-primary-blue w-full mt-[20px]' />

                <div className='w-full flex flex-col'>
                    {/* <div className='flex flex-row items-center'>
                        <p className='w-[60%] pl-[16px] py-[12px] text-[14px] font-medim'>Included members</p>
                        <p className='w-[40%] flex flex-row items-center justify-center text-[14px] font-medim'>1</p>
                    </div>

                    <div className='flex flex-row items-center bg-[#F8FBFF]'>
                        <p className='w-[60%] pl-[16px] py-[12px] text-[14px] font-medim'>Guest users (5 per paid member)</p>
                        <p className='w-[40%] flex flex-row items-center justify-center text-[14px] font-medim'>5</p>
                    </div> */}

                    {
                        renderFeatures()
                    }
                </div>
            </div>

        </div>
    )

}

export default PricingMidSection