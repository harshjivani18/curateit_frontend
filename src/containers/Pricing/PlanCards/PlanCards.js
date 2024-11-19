'use client'

import { FaCircleCheck } from 'react-icons/fa6';
// import { IoChevronDown } from 'react-icons/io5';
import { Menu, Transition } from '@headlessui/react';
import { GoArrowRight } from 'react-icons/go';
import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const curatorFeatures = [
    'For 1 member',
    '5 guest users',
    '1 workspace',
    '1 Link in Bio',
    'Unlimited Gems',
    'Unlimited Private Collections',
    'Unlimited Private Tags',
    '5 hours of listening to articles',
    '20 mins of Audio notes & Recorder',
    'Screen cast Video recorder (5 min length)',
    '5000 views',
    'Access to Web Clipper',
    // 'Limited access to Screenshot Tool'
];

const InfluencerFeatures = [
    'For 1 member',
    '10 guest users',
    '1 workspace',
    '3 Link in Bio & Instagram wall',
    'Sell digital products (coming soon)',
    'Unlimited Gems, Collections and Tags',
    'Public Collections (SEO optimised)',
    '10 hours of listening to articles',
    '60 mins of Audio notes & Recorder',
    'Screen cast Video recorder (90 min length)',
    'Publish Blogs',
    'Access to Web Clipper',
    // 'Unlimited access to Screenshot Tool'
];

const TeamFeatures = [
    'For 1 member',
    '50 guest users',
    '5 workspaces',
    '1 Link in Bio per user',
    'Instagram wall Generator',
    'Sell digital products',
    'Unlimited Gems, Collections and Tags',
    '10 hours of listening to articles',
    '60 mins of Audio notes & Recorder',
    'Screen cast Video recorder (90 min length)',
    '100,000 views',
];

const PlanCards = () => {

    const [teamCount, setTeamCount] = useState('10')

    // ? Method to render the Features List
    const renderFeatures = (featuresList) => {
        return featuresList.map((feature, index) => {
            return (
                <div
                    key={`free-feature-${index}`}
                    id={`free-feature-${index}`}
                    className='leading-[25px] flex gap-2 items-center text-sm text-grey-light font-normal'
                >
                    <FaCircleCheck className='text-primary-blue !text-lg !w-[20px] !h-[20px]' />
                    {feature}
                </div>
            );
        });
    };

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };

    const Dropdown = () => {
        return (
            // <button className='relative group transition-all duration-200 focus:overflow-visible w-max h-max p-1 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-[15px] pl-3 border border-zinc-200 w-max'>
            //     <span className='text-[10px]'>10</span>
            //     <svg
            //         className='rotate-180 group-focus:rotate-0'
            //         xmlns='http://www.w3.org/2000/svg'
            //         width='22'
            //         height='22'
            //         viewBox='0 0 24 24'
            //     >
            //         <path
            //             fill='currentColor'
            //             d='m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z'
            //         />
            //     </svg>
            //     <div className='absolute shadow-lg top-[3rem] left-0 w-max h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2'>
            //         <a className='flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg'>
            //             <p className='text-[10px]'>10</p>
            //         </a>
            //         <a className='flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg'>
            //             <p className='text-[10px]'>25</p>
            //         </a>
            //         <a className='flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg'>
            //             <p className='text-[10px]'>Unlimited</p>
            //         </a>
            //     </div>
            // </button>
            <>
                {/* <Menu as='div' className='relative inline-block text-left mt-[8px]'>
                    <Menu.Button className='rounded-[15px] py-1 px-3 border border-zinc-200 flex flex-row items-center'>More <IoChevronDown className='-mr-1 h-5 w-5 text-gray-400' aria-hidden='true' /></Menu.Button>
                    <Menu.Items  className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`${active && 'bg-blue-500'}`}
                                >
                                    10
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`${active && 'bg-blue-500'}`}
                                >
                                    25
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={`${active && 'bg-blue-500'}`}
                                >
                                    Unlimited
                                </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu> */}
                <Menu as='div' className='relative inline-block text-left'>
                    <div>
                        <Menu.Button className='inline-flex items-center w-full justify-center gap-x-1.5 rounded-full bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                            <p
                                className='text-[12px]  tracking-tight font-semibold text-black text-center'
                            >
                                {teamCount}
                            </p>
                            <MdOutlineKeyboardArrowDown className='-mr-1 h-5 w-5 text-gray-400' aria-hidden='true' />
                        </Menu.Button>
                    </div>

                    <Transition
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                    >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='py-1'>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => setTeamCount('10')}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm cursor-pointer'
                                            )}
                                        >
                                            10
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => setTeamCount('25')}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm cursor-pointer'
                                            )}
                                        >
                                            25
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => setTeamCount('Unlimited')}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm cursor-pointer'
                                            )}
                                        >
                                            Unlimited
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </>

        );
    };


    return (
        <div className='w-full flex flex-col gap-10 items-start justify-between lg: lg:flex-row lg:items-stretch lg:justify-between'>
            {/* <div className='w-full flex flex-col gap-10 items-start justify-between lg:grid lg:grid-cols-3 lg:items-stretch lg:justify-between'> */}
            <div className='w-full lg:w-[32%] border border-[0.4px] rounded-xl p-6 shadow-lg flex flex-col items-center jusitify-start'>
                <p className='bg-blue-200 py-1 px-3 rounded-xl text-[12px] text-primary-blue font-medium w-max flex flex-col items-center jusitify-start'>
                    Beginner Friendly
                </p>
                <p className='text-black text-[32px] font-semibold leading-[38.72px] mt-3'>
                    Curator
                </p>
                <p className='hidden lg:block bg-[#EFFCF6] py-1 px-2 rounded-xl text-[10px] text-[#004440] font-bold w-max flex flex-col items-center jusitify-start mt-3'>
                    Save 28%
                </p>
                <div
                    id='price-section'
                    className='flex flex-row items-center justify-between gap-2 mt-2'
                >
                    <div>
                        <p className='text-[#235197] text-3xl font-semibold'>$2.90</p>
                    </div>
                    <div>
                        <p className='text-center text-base text-[#97A0B5] font-light'>
                            per seat/month
                            <br />
                            <span className='hidden lg:block'>billed anually</span>
                        </p>
                    </div>
                </div>

                <p className='text-[12px] text-[#347AE2] font-medium leading-[18px] mt-2 text-center flex flex-row items-center gap-2'>
                    $3.99 billed monthly
                    <span className='block lg:hidden bg-[#EFFCF6] py-1 px-2 rounded-xl text-[8px] text-[#004440] font-bold w-max flex flex-col items-center jusitify-start'>
                        Save 28%
                    </span>
                </p>

                <p className='text-[12px] text-[#74778B] font-normal leading-[12px] mt-3 text-center'>
                    Just want to explore the platform, this plan is best for you.
                </p>

                <div>
                    <button className='bg-primary-blue w-full w-[239px] px-7 lg:px-0 lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'>
                        <a
                            className='text-white text-sm font-semibold leading-5 min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                            href='/'
                            target='_blank'
                        >
                            Get Started
                        </a>
                    </button>
                </div>

                <div className='w-full my-4 border border-[#F0F4F8]' />

                <div className='w-full flex flex-col items-start justify-start gap-3'>
                    {renderFeatures(curatorFeatures)}
                </div>

                <button
                    className='flex lg:hidden flex-row items-center justify-center gap-2 mt-5 w-[212px] h-[40px] border border-primary-blue rounded-lg bg-blue-200 text-primary-blue text-[14px] leading-[20px] font-medium'
                >
                    See full feature list <GoArrowRight className='text-xl' />
                </button>

            </div>

            <div className='w-full lg:w-[32%] relative border border-2 border-primary-blue rounded-xl p-6 shadow-lg flex flex-col items-center jusitify-start'>
                <div className='px-9 py-2 bg-primary-blue font-normal text-white text-sm rounded-lg absolute -top-6'>
                    <p>Recommended</p>
                </div>

                <p className='bg-blue-200 py-1 px-3 rounded-xl text-[12px] text-primary-blue font-medium w-max'>
                    Try it Free for 7 days
                </p>
                <p className='text-black text-[32px] font-semibold leading-[38.72px] mt-3'>
                    Influencer
                </p>
                <p className='hidden lg:block bg-[#EFFCF6] py-1 px-2 rounded-xl text-[10px] text-[#004440] font-semibold w-max flex flex-col items-center jusitify-start mt-3'>
                    Save 30%
                </p>
                <div
                    id='price-section'
                    className='flex flex-row items-center justify-between gap-2 mt-2'
                >
                    <div>
                        <p className='text-[#235197] text-3xl font-semibold'>$8.99</p>
                    </div>
                    <div>
                        <p className='text-center text-base text-[#97A0B5] font-light'>
                            per seat/month
                            <br />
                            <span className='hidden lg:block'>billed anually</span>
                        </p>
                    </div>
                </div>

                <p className='text-[12px] text-[#347AE2] font-medium leading-[18px] mt-2 text-center flex flex-row items-center gap-2'>
                    $12.99 billed monthly
                    <span className='block lg:hidden bg-[#EFFCF6] py-1 px-2 rounded-xl text-[8px] text-[#004440] font-bold w-max flex flex-col items-center jusitify-start'>
                        Save 30%
                    </span>
                </p>

                <p className='text-[12px] text-[#74778B] font-normal leading-[12px] mt-3 text-center'>
                    Just want to explore the platform, this plan is best for you.
                </p>

                <div>
                    <button className='bg-primary-blue w-full w-full w-[239px] px-7 lg:px-0 lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'>
                        <a
                            className='text-white text-sm font-semibold leading-5 min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                            href='/'
                            target='_blank'
                        >
                            Get Started
                        </a>
                    </button>
                </div>

                <div className='w-full my-4 border border-[#F0F4F8]' />

                <div className='w-full flex flex-col items-start justify-start gap-3'>
                    {renderFeatures(InfluencerFeatures)}
                </div>

                <button
                    className='flex lg:hidden flex-row items-center justify-center gap-2 mt-5 w-[212px] h-[40px] border border-primary-blue rounded-lg bg-blue-200 text-primary-blue text-[14px] leading-[20px] font-medium'
                >
                    See full feature list <GoArrowRight className='text-xl' />
                </button>

            </div>

            <div className='w-full lg:w-[32%] border border-[0.4px] rounded-xl p-6 shadow-lg flex flex-col items-center jusitify-start'>
                <p className='bg-blue-200 py-1 px-3 rounded-xl text-[12px] text-primary-blue font-medium w-max'>
                    Unlimited plan
                </p>
                <p className='text-black text-[32px] font-semibold leading-[38.72px] mt-3'>
                    Team
                </p>
                <p className='hidden lg:block bg-[#EFFCF6] py-1 px-2 rounded-xl text-[10px] text-[#004440] font-bold w-max flex flex-col items-center jusitify-start mt-3'>
                    Save 25%
                </p>
                <div
                    id='price-section'
                    className='flex flex-row items-center justify-between gap-2 mt-2'
                >
                    <div>
                        <p className='text-[#235197] text-3xl font-semibold'>
                            {
                                (teamCount === '10') ? '$6' : (teamCount === '25') ? '$15' : (teamCount === 'Unlimited') ? '$50' : ''
                            }
                        </p>
                    </div>
                    <div>
                        <p className='text-center text-base text-[#97A0B5] font-light'>
                            per seat/month
                            <br />
                            <span className='hidden lg:block'>billed anually</span>
                        </p>
                    </div>
                </div>

                <p className='text-[12px] text-[#347AE2] font-medium leading-[18px] mt-2 text-center flex flex-row items-center gap-2'>
                    {
                        (teamCount === '10') ? '$7.99' : (teamCount === '25') ? '$18.99' : (teamCount === 'Unlimited') ? '$65' : ''
                    } billed monthly
                    <span className='block lg:hidden bg-[#EFFCF6] py-1 px-2 rounded-xl text-[8px] text-[#004440] font-bold w-max flex flex-col items-center jusitify-start'>
                        Save {
                            (teamCount === '10') ? '25%' : (teamCount === '25') ? '30%' : (teamCount === 'Unlimited') ? '40%' : ''
                        }
                    </span>
                </p>

                <div className='flex flex-row items-center gap-4 py-3'>
                    <p className='text-[12px] text-[#4B4F5D]'>Number of users</p>{' '}
                    <Dropdown />
                </div>

                <p className='text-[12px] text-[#74778B] font-normal leading-[12px] mt-3 text-center'>
                    Just want to explore the platform, this plan is best for you.
                </p>

                <div>
                    <button className='bg-primary-blue w-full w-[239px] px-7 lg:px-0 lg:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue mt-4'>
                        <a
                            className='text-white text-sm font-semibold leading-5 min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                            href='/'
                            target='_blank'
                        >
                            Get Started
                        </a>
                    </button>
                </div>

                <div className='w-full my-4 border border-[#F0F4F8]' />

                <div className='w-full flex flex-col items-start justify-start gap-3'>
                    {renderFeatures(TeamFeatures)}
                </div>

                <button
                    className='flex lg:hidden flex-row items-center justify-center gap-2 mt-5 w-[212px] h-[40px] border border-primary-blue rounded-lg bg-blue-200 text-primary-blue text-[14px] leading-[20px] font-medium'
                >
                    See full feature list <GoArrowRight className='text-xl' />
                </button>
            </div>
        </div>
    );
};

export default PlanCards;

