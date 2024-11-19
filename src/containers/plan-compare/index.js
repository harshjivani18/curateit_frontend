'use client'

import { useState }                             from 'react'
import { Menu, Transition }                     from '@headlessui/react'
import { MdOutlineKeyboardArrowDown }           from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowForward }    from 'react-icons/io'

import Cross                                    from "@components/pricing-compare/round-icons/Cross"
import Tick                                     from '@components/pricing-compare/round-icons/Tick'
import PricingComparisonMobile                  from "@components/pricing-compare/PricingComparisonMobile"

const teamOptions = ['S', 'M', 'XL']

const teamPlan = {
    S: {
        price: '$6',
        billedMonthly: '$79',
        save: '25%',
        includeMembers: '5',
        guestUsers: '50',
        workspaces: '3',
        bioLinks: '',
        bioLink: true,
        sellDigitalProducts: true,
        blog: true,
        gem: '15000 per member',
        collections: '250 per member',
        tags: '1000 per member',
        publicCollections: '250 per member',
        listenToArticles: '300 mins',
        listenToArticlesRef: '216200',
        audioNotes: '60 mins',
        videoScreencast: '120 mins',
        views: '100000',
        fileUpload: '250mb',
        storage: '10 GB per user',
        addOns: {
            additionalUserCost: '$7.00',
            customDomain: '$29/m',
            removeBranding: '$29/m',
            workspace: '$5',
            bandwidth: '$29/m',
            upgrade: '$12'
        },
        bookmarkManager: {
            views: '100000'
        }
    },
    M: {
        price: '$199',
        billedMonthly: '$159',
        save: '30%',
        includeMembers: '10',
        guestUsers: '100',
        workspaces: '5',
        bioLinks: '',
        bioLink: true,
        sellDigitalProducts: true,
        blog: true,
        gem: '15000 per member',
        collections: '250 per member',
        tags: '1000 per member',
        publicCollections: '250 per member',
        listenToArticles: '300 mins',
        listenToArticlesRef: '216200',
        audioNotes: '60 mins',
        videoScreencast: '120 mins',
        views: '100000',
        fileUpload: '250mb',
        storage: '10 GB per user',
        addOns: {
            additionalUserCost: '$5.99',
            customDomain: '$29/m',
            removeBranding: '$49/m',
            workspace: '$5',
            bandwidth: '$29/m',
            upgrade: '$12'
        },
        bookmarkManager: {
            views: '150000'
        }
    },
    XL: {
        price: '$299',
        billedMonthly: '$399',
        save: '40%',
        includeMembers: 'Unlimited (500)(5 domains)',
        guestUsers: '500',
        workspaces: '15',
        bioLinks: '',
        bioLink: true,
        sellDigitalProducts: true,
        blog: true,
        gem: '15000 per member',
        collections: '250 per member',
        tags: '1000 per member',
        publicCollections: '250 per member',
        listenToArticles: '5 hours',
        listenToArticlesRef: '216200',
        audioNotes: '60 mins',
        videoScreencast: '120 mins',
        views: '200000',
        fileUpload: '250mb',
        storage: '10 GB per user',
        addOns: {
            additionalUserCost: 'N/A',
            customDomain: '$100/m',
            removeBranding: '$100/m',
            workspace: '$5',
            bandwidth: '$100/m',
            upgrade: '$12'
        },
        bookmarkManager: {
            views: '200000'
        }
    }
}

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const PricingComparison = () => {

    const [team, setTeam] = useState(teamOptions[1])

    // ? SECTIONS SHOW/HIDE STATUS
    const [addOns, setAddOns] = useState(true)
    const [importAndSave, setImportAndSave] = useState(true)
    const [mediaCapture, setMediaCapture] = useState(true)
    const [importProfiles, setImportProfiles] = useState(true)
    const [bookmarkManager, setBookmarkManager] = useState(true)
    const [tabsManager, setTabsManager] = useState(true)
    const [highlightsFeatures, setHighlightsFeatures] = useState(true)
    const [youtubeFeatures, setYoutubeFeatures] = useState(true)
    const [readingFeatures, setReadingFeatures] = useState(true)
    const [textExpander, setTextExpander] = useState(true)
    const [aiPrompts, setAiPrompts] = useState(true)
    const [shortRedirectLinks, setShortRedirectLinks] = useState(true)
    const [other, setOther] = useState(true)
    const [linkInBio, setLinkInBio] = useState(true)
    const [sharingAndCommunity, setSharingAndCommunity] = useState(true)
    const [videoAndSession, setVideoAndSession] = useState(true)
    const [testimonials, setTestimonials] = useState(true)
    const [bugs, setBugs] = useState(true)

    return (
        <>
            <div className='hidden lg:block'>
                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between mt-[40px]'>
                    <table className='w-full table-fixed pricing-comparison-table '>

                        <thead className='gap-[20px]'>
                            <th className='w-[28%]  border-b-[2px] border-primary-blue'>
                                <div id='features-col' className='py-5 '>
                                    <p
                                        className='text-[40px] leading-[48.41px] tracking-tight font-semibold text-primary-medium-blue text-left mt-5'
                                    >
                                        Pricing
                                        <br />
                                        Comparison
                                    </p>
                                </div>
                            </th>
                            <th className='w-[18%] border-b-[2px] border-primary-blue'>
                                <div id='explorer-col' className=' p-5 flex flex-col items-center justify-start'>
                                    <div
                                        className='px-3 py-1 bg-primary-lighter-blue rounded-[24px] text-center'
                                    >
                                        <p
                                            className='text-primary-blue text-[10px] font-medium leading-[18px]'
                                        >
                                            Try it free for 7 days
                                        </p>
                                    </div>

                                    <p
                                        className='text-[32px] leading-[38.73px] tracking-tight font-semibold text-black text-center mt-[8px] flex justify-center items-center h-[47.98px]'
                                    >
                                        Explorer
                                    </p>

                                    <p
                                        className='text-[30px] leading-[38px] tracking-tight font-medium text-primary-medium-blue text-center mt-[12px]'
                                    >
                                        Free
                                    </p>

                                    <p className='text-[12px] text-transparent font-light leading-[18px] text-center mt-[4px]'>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>

                                    <div className='mt-[8px] flex flex-row items-center justify-center'>

                                        <p
                                            className='text-[10px] text-primary-blue font-medium leading-[18px]'
                                        >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>

                                    </div>
                                </div>
                            </th>
                            <th className='w-[18%] border-b-[2px] border-primary-blue bg-primary-blue-bg rounded-t-[12px]'>
                                <div id='curator-col' className='p-5 flex flex-col items-center justify-start'>
                                    <div
                                        className='px-3 py-1 bg-primary-lighter-blue rounded-[24px] text-center'
                                    >
                                        <p
                                            className='text-primary-blue text-[10px] font-medium leading-[18px]'
                                        >
                                            Beginner Friendly
                                        </p>
                                    </div>

                                    <p
                                        className='text-[32px] leading-[38.73px] tracking-tight font-semibold text-black text-center mt-[8px] flex justify-center items-center h-[47.98px]'
                                    >
                                        Curator
                                    </p>

                                    <p
                                        className='text-[30px] leading-[38px] tracking-tight font-medium text-primary-medium-blue text-center mt-[12px]'
                                    >
                                        $2.90
                                    </p>

                                    <p className='text-[12px] text-grey-light font-light leading-[18px] text-center mt-[4px]'>
                                        per seat/month billed anually
                                    </p>

                                    <div className='mt-[8px] flex flex-row items-center justify-center gap-[8px]'>

                                        <p
                                            className='text-[10px] text-primary-blue font-medium leading-[18px]'
                                        >
                                            $3.99 billed monthly
                                        </p>

                                        <div className='bg-[#EFFCF6] px-2 py-[1px] rounded-[24px]'>
                                            <p className='text-[8px] text-[#004440] font-bold leading-[18px]'>
                                                Save 28%
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </th>
                            <th className='w-[18%] border-b-[2px] border-primary-blue rounded-t-[12px]'>
                                <div id='influencer-col' className='p-5 flex flex-col items-center justify-start'>
                                    <div
                                        className='px-3 py-1 bg-primary-lighter-blue rounded-[24px] text-center'
                                    >
                                        <p
                                            className='text-primary-blue text-[10px] font-medium leading-[18px]'
                                        >
                                            Try it free for 7 days
                                        </p>
                                    </div>

                                    <p
                                        className='text-[32px] leading-[38.73px] tracking-tight font-semibold text-black text-center mt-[8px] flex justify-center items-center h-[47.98px]'
                                    >
                                        Influencer
                                    </p>

                                    <p
                                        className='text-[30px] leading-[38px] tracking-tight font-medium text-primary-medium-blue text-center mt-[12px]'
                                    >
                                        $8.99
                                    </p>

                                    <p className='text-[12px] text-grey-light font-light leading-[18px] text-center mt-[4px]'>
                                        per seat/month billed anually
                                    </p>

                                    <div className='mt-[8px] flex flex-row items-center justify-center gap-[8px]'>

                                        <p
                                            className='text-[10px] text-primary-blue font-medium leading-[18px]'
                                        >
                                            $12.99 billed monthly
                                        </p>

                                        <div className='bg-[#EFFCF6] px-2 py-[1px] rounded-[24px]'>
                                            <p className='text-[8px] text-[#004440] font-bold leading-[18px]'>
                                                Save 30%
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </th>
                            <th className='w-[18%] border-b-[2px] border-primary-blue bg-primary-blue-bg rounded-t-[12px]'>
                                <div id='team-col' className='p-5 flex flex-col items-center justify-start'>
                                    <div
                                        className='px-3 py-1 bg-primary-lighter-blue rounded-[24px] text-center'
                                    >
                                        <p
                                            className='text-primary-blue text-[10px] font-medium leading-[18px]'
                                        >
                                            Try it free for 7 days
                                        </p>

                                    </div>

                                    <Menu as='div' className='relative inline-block text-left mt-[8px]'>
                                        <div>
                                            <Menu.Button className='inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                                                <p
                                                    className='text-[32px] leading-[32px] tracking-tight font-semibold text-black text-center'
                                                >
                                                    Team {team}
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
                                                                onClick={() => setTeam('S')}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                                )}
                                                            >
                                                                Team S
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                onClick={() => setTeam('M')}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                                )}
                                                            >
                                                                Team M
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                onClick={() => setTeam('XL')}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm cursor-pointer'
                                                                )}
                                                            >
                                                                Team XL
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    <p
                                        className='text-[30px] leading-[38px] tracking-tight font-medium text-primary-medium-blue text-center mt-[12px]'
                                    >
                                        {teamPlan?.[team]?.price}
                                    </p>

                                    <p className='text-[12px] text-grey-light font-light leading-[18px] text-center mt-[4px]'>
                                        per seat/month billed anually
                                    </p>

                                    <div className='mt-[8px] flex flex-row items-center justify-center gap-[8px]'>

                                        <p
                                            className='text-[10px] text-primary-blue font-medium leading-[18px]'
                                        >
                                            {teamPlan?.[team]?.billedMonthly} billed monthly
                                        </p>

                                        <div className='bg-[#EFFCF6] px-2 py-[1px] rounded-[24px]'>
                                            <p className='text-[8px] text-[#004440] font-bold leading-[18px]'>
                                                Save {teamPlan?.[team]?.save}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </th>
                        </thead>

                        <tbody>
                            {/* 1 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Included members</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.includeMembers}</p>
                                </td>
                            </tr>

                            {/* 2 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Guest users (10 per paid member)</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.guestUsers}</p>
                                </td>
                            </tr>

                            {/* 3 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Workspaces (coming soon)</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.workspaces}</p>
                                </td>
                            </tr>

                            {/* 4 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>No of bio links</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick />{teamPlan?.[team]?.bioLinks}</p>
                                </td>
                            </tr>

                            {/* 5 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bio link - Instagram wall generator</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.bioLink ? <Tick /> : <Cross />}</p>
                                </td>
                            </tr>

                            {/* 6 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Sell digital products from other platforms</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[20px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[20px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.sellDigitalProducts ? <Tick /> : <Cross />}</p>
                                </td>
                            </tr>

                            {/* 7 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Blog</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.blog ? <Tick /> : <Cross />}</p>
                                </td>
                            </tr>

                            {/* 8 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Gem - Bookmarks (20+ media types)</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1000</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>6000</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>12000</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.gem}</p>
                                </td>
                            </tr>

                            {/* 9 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Collections</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>50</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>150</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.collections}</p>
                                </td>
                            </tr>

                            {/* 10 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Tags</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>50</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>500</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.tags}</p>
                                </td>
                            </tr>

                            {/* 11 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Public Collections & Tags</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>100</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.publicCollections}</p>
                                </td>
                            </tr>

                            {/* 12 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Listen to articles</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>300 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>300 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.listenToArticles}</p>
                                </td>
                            </tr>

                            {/* 13 */}

                           {/* <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Listen to articles (ref - character limit)</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>7500</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>216200</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>216200</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.listenToArticlesRef}</p>
                                </td>
                            </tr>
                            */}

                            {/* 14 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Audio Notes & Recorder</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>3 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>20 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.audioNotes}</p>
                                </td>
                            </tr>

                            {/* 15 */}
                           {/* <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video & Screencast Recorder</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>120 mins</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.videoScreencast}</p>
                                </td>
                            </tr>
                        */}

                            {/* 16 */}
                         {/*   <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Views (bandwidth)</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1000</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5000</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>50000</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.views}</p>
                                </td>
                            </tr>
                    */}
                            {/* 17 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>File upload</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 MB</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>50 MB</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>250mb</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.fileUpload}</p>
                                </td>
                            </tr>

                            {/* 18 */}
                            <tr>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Storage</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1 GB</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 GB</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 GB</p>
                                </td>
                                <td>
                                    <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.storage}</p>
                                </td>
                            </tr>

                        </tbody>

                    </table>
                </div>

              {/* Add Ons Section */}
             {/*   <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setAddOns(!addOns) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Add Ons
                        </p>

                        {
                            (addOns)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={addOns}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                           */}   
                             {/* 1 */}
                            {/*   <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Additional User Cost</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>0</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.addOns?.additionalUserCost}</p>
                                    </td>
                                </tr>
                        */}
                                {/* 2 */}
                        {/*     <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Custom Domain (Future)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$10/m</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.addOns?.customDomain}</p>
                                    </td>
                                </tr>

                                {/* 3 */}
                       {/*          <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Remove curateit Branding (FUTURE)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$10/m</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.addOns?.removeBranding}</p>
                                    </td>
                                </tr>

                                {/* 4 */}
                          {/*       <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Workspace</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$5</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$5</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$5</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.addOns?.workspace}</p>
                                    </td>
                                </tr>

                                {/* 5 */}
                           {/*      <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bandwidth (Per 100k views) (Future)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$10/m</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.addOns?.bandwidth}</p>
                                    </td>
                                </tr>

                                {/* 6 */}
                          {/*       <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Upgrade to Unlimited Storage</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>N/A</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$20</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>$20</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.addOns?.upgrade}</p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>
            */}
                {/* Import and save features section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setImportAndSave(!importAndSave) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Import and save features
                        </p>

                        {
                            (importAndSave)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={importAndSave}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bookmarks upload</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Pocket Integration</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Raindrop.io Highlights Integration</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Kindle Highlights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Twitter/X Post, Bookmarks & likes</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Linkedin Saved Posts</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Reddit Posts, Upvote and Saved Posts</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Github stars repository</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 9 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Medium Article lists </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 10 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Goodreads Books list </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 11 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Amazon Products & Wish list  </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 12 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Imdb watchlist and other lists</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 13 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Image Bookmarking (like Pinterest)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 14 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Code Snippet Bookmarking</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 15 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Save Ai prompts templates</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 16 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Save and Annotate PDFs</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 17 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Image Downloader</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 18 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Image Editor </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Media capture section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setMediaCapture(!mediaCapture) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Media Capture
                        </p>

                        {
                            (mediaCapture)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={mediaCapture}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Web Clipper</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Image or Photo Editing and annotation tool</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Screenshot Tool</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Image OCR (Extract text or code)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Audio Recorder </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>3 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>20 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Audio to Text transcript</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>3 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>20 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Audio Notes</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>3 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>20 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Capture system sound</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>3 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>20 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>60 mins</p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Import profiles section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setImportProfiles(!importProfiles) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Import profiles
                        </p>

                        {
                            (importProfiles)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={importProfiles}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Linkedin Company & User Profile</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>X Profile</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Medium Profile</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Instagram Profile</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Github Profile</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Reddit Channel & User Profile </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Youtube Company & User Profile</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Bookmark Manager Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setBookmarkManager(!bookmarkManager) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Bookmark Manager
                        </p>

                        {
                            (bookmarkManager)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={bookmarkManager}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                         {/*       <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Gem - Bookmarks (20+ media types)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>100</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 2 */}
                           {/*     <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Custom Tags</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 3 */}
                           {/*     <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Collections (folders & sub-folders)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 4 */}
                          {/*      <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share Collections (Private & Public) </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 5 */}
                          {/*      <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Views (bandwidth)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1000</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5000</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>50000</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>{teamPlan?.[team]?.bookmarkManager?.views}</p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bookmark Organizer </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Auto-tags</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Universal Search (gems, history, tabs)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 9 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Full-text search, third party apps</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 10 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Search Assistant (using Gems & History)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 11 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Save offline copy of gems/pages</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross/></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 12 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Automatic backups</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 13 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Duplicate and broken links finder</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 14 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Custom fields</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Tabs Manager section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setTabsManager(!tabsManager) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Tabs Manager
                        </p>

                        {
                            (tabsManager)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={tabsManager}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bulk Save Tabs</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Cross browser support</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Sync Tabs across devices</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bulk Suspend Tabs</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Session backups</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share Session tabs</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Highlights Features section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setHighlightsFeatures(!highlightsFeatures) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Highlights Features
                        </p>

                        {
                            (highlightsFeatures)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={highlightsFeatures}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Highlight in multiple colors</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Highlight Comment</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Highlights Tab</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Add Notes to Highlights</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share Highlights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Highlight collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Web Highlights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Image Highlights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 9 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>PDF Highlights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 10 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Code Highlights</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 11 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Kindle Highlights</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 12 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>YouTube collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 13 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Auto-highlights</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                </tr>

                                {/* 14 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Flash Cards on web, pdf and Youtube</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                </tr>

                                {/* 15 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Citations</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>


                {/* Youtube Features section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setYoutubeFeatures(!youtubeFeatures) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Youtube Features
                        </p>

                        {
                            (youtubeFeatures)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={youtubeFeatures}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Youtube Note taker</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Youtube Transcript Highlighter</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Youtube Transcript Extractor</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Youtube Screenshot </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Youtube AI summary</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Import Youtube Profile</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Reading Features section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setReadingFeatures(!readingFeatures) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Reading Features
                        </p>

                        {
                            (readingFeatures)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={readingFeatures}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Dark Mode</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Reader Mode</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Read Later (like Pocket)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Speed Reading</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Books Search</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Books Collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share Reading Collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Kindle Highlights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 9 */}
                            {/*    <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Listen to articles</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 min</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 hours</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 hours</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 hours</p>
                                    </td>
                                </tr>
                    */}
                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Text Expander section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setTextExpander(!textExpander) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Text Expander
                        </p>

                        {
                            (textExpander)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={textExpander}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Rich text editor support</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share team snippets</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Tags & Collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Text snippets or expander</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* AI Prompts Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setAiPrompts(!aiPrompts) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            AI Prompts
                        </p>

                        {
                            (aiPrompts)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={aiPrompts}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Save your Ai prompts</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share your Ai prompts with team</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Organize and manage your Ai prompts</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Use with all AI tools including Chat GPT,etc</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Short Redirect Links Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setShortRedirectLinks(!shortRedirectLinks) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Short Redirect Links
                        </p>

                        {
                            (shortRedirectLinks)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={shortRedirectLinks}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Short redirect links (Go links)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Unlimited</p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Snippets & Short links across browsers</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Tags & Collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share with team</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Browser extension integration</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>


                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Other Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setOther(!other) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Other
                        </p>

                        {
                            (other)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={other}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Spotlight Universal Search</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>App Shortcuts on Sidebar</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Usage analytics</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Site Insights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Page SEO details </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                           {/*     <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>File upload</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 MB</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 MB</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 GB</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 GB</p>
                                    </td>
                                </tr>

                                {/* 7 */}
                           {/*     <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Storage</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1 GB</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 GB</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 GB</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>10 GB per user</p>
                                    </td>
                                </tr>
                    */}
                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Link in Bio Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setLinkInBio(!linkInBio) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Link in Bio
                        </p>

                        {
                            (linkInBio)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={linkInBio}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>App Shortcuts on Sidebar</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                           {/*     <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>No. of Bio links</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>3</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>1 per user</p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Instagram Wall Generator</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Sell digital products from other platforms</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share social profile, social posts, social link</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Personalise Bio link page </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share payment and donation links</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Book a meeting (calendly, cal.com)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Supports 15+ content types</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 9 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Linktree links extractor</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 10 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Multiple Card Layouts</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 11 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Collect Contact details</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 12 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Multiple Page Layouts</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                </tr>

                                {/* 13 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Case Study & Projects</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                </tr>

                                {/* 14 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Short easy links (Qrat.me/user)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                </tr>

                                {/* 15 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Link Scheduling</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                </tr>

                                {/* 16 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>QR Code</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming soon</p>
                                    </td>
                                </tr>

                                {/* 17 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Analytics & Insights </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Sharing & Community features Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setSharingAndCommunity(!sharingAndCommunity) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Sharing & Community features
                        </p>

                        {
                            (sharingAndCommunity)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={sharingAndCommunity}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Build Teams/Groups</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Admin User to manage teams</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Cross /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Like, Comment & Share gems </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share gems & Collections publicly</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Embed gems & collections on your website</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share tab sessions with colleagues</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share & Browse Ai prompts with team</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share & Browse Text expander shortcuts</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 9 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share & Browse quick Go Links with team</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 11 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Collaborate on idea with team on collection</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 12 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Let Anonymous user submit ideas to collection</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Limited</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Video and Session Recording Section */}
           {/*     <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setVideoAndSession(!videoAndSession) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Video and Session Recording
                        </p>

                        {
                            (videoAndSession)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={videoAndSession}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Screen recording</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 2 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Camera recording</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 3 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Screen recording & cam bubble</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>
                            */}
                                {/* 4 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video & Screencast Recorder (like Loom)</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>5 min</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>90 mins</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>90 mins</p>
                                    </td>
                                </tr>
                            */}
                                {/* 5 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video transcription</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 6 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Auto Video Summary & Chapters</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 7 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Import and Download</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 8 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video Forms</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 9 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video Call To Actions </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 10 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Viewer Analytics & Insights</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 11 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share & embed Links</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 12
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Password Protected videos </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 13 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video Highlights</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 14 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video Reaction & Comments</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 15 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Collection & Tag management</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>
                            */}
                                {/* 16 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Remove branding on the video page</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 17 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Remove branding on embed video player</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
                            */}
                                {/* 18 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Add your logo on the video page</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>
*/}
                                {/* 19 
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Customize colors of the video player</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>
                    */}
                {/* Testimonials Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setTestimonials(!testimonials) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Testimonials
                        </p>

                        {
                            (testimonials)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={testimonials}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Import Testimonials </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Export Testimonials </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Text Testimonial</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Audio Testimonial</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video Testimonial</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Testimonial Forms</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Share Testimonial Collection</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Embed Testimonial Collection</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 9 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Testimonial Wall landing page</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 10 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Public Testimonial Page</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 11 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Video Auto-Transcription</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 12 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Custom Branding </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 13 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Testimonial Collection & Tag Management</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 14 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Testimonial analytics</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>

                {/* Bugs & Feedback Management Section */}
                <div
                    className='w-[90%] lg:w-[85%] mx-auto'
                >
                    <div
                        className='flex flex-row items-center justify-start gap-[10px] text-primary-blue my-3 mx-2.5 grow cursor-pointer'
                        onClick={() => { setBugs(!bugs) }}
                    >

                        <p className='text-[24px] font-semibold leading-[28px]'>
                            Bugs & Feedback Management
                        </p>

                        {
                            (bugs)
                                ? <IoIosArrowDown className='text-[23px]' />
                                : <IoIosArrowForward className='text-[23px]' />
                        }

                        <div className='border-b border-primary-blue-200 grow' />
                    </div>
                </div>

                <div className='w-[90%] lg:w-[85%] mx-auto flex flex-row items-start justify-between transition-all ease-in duration-100  mb-[40px]'>
                    <Transition
                        enter='transition-opacity duration-75'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity duration-150'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        show={bugs}
                    >
                        <table className='w-full table-fixed pricing-comparison-table '>

                            <thead className='gap-[20px]'>
                                <th className='w-[28%]'>
                                </th>
                                <th className='w-[18%]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] rounded-t-[12px]'>
                                </th>
                                <th className='w-[18%] bg-primary-blue-bg rounded-t-[12px]'>
                                </th>
                            </thead>

                            <tbody>
                                {/* 1 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Annotate on Web Pages</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 2 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Annotate on Images</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 3 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Annotate on Video</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 4 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Annotate on PDFs</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 5 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>File attachments on comment</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 6 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Comments with video</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 7 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Customer Fields</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 8 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Unlimited guests</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 9 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Public/Private Collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 10 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Public/Private Comments</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 11 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Embed Collections</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 12 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bug Status Management</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 13 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Board View</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 14 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Roadmap View</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 15 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Change log/Announcement View</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 16 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Bug Details</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 17 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Session recording</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 18 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Custom Workflow & Statuses</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[26px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'><Tick /></p>
                                    </td>
                                </tr>

                                {/* 19 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Screenshot & annotations </p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 20 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Email and app notifications</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 21 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Remove Curateit Branding</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 22 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Custom Branding</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                                {/* 23 */}
                                <tr>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] tracking-tight'>Feedback Analytics</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                    <td>
                                        <p className='w-full px-[10px] py-[12px] text-[16px] text-grey-text font-medium leading-[28px] flex-centered tracking-tight'>Coming Soon</p>
                                    </td>
                                </tr>

                            </tbody>

                        </table>
                    </Transition>
                </div>
            </div>

            <div className='block lg:hidden'>
                <PricingComparisonMobile />
            </div>
        </>
    )

}

export default PricingComparison