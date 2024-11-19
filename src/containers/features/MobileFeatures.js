'use client'

import { PiArticle, PiBookOpen, PiBookmarkSimple, PiBrowsers, PiChartLine, PiCloudArrowUp, PiCode, PiFilePdf, PiFolderLock, PiGauge, PiImageSquare, PiInfo, PiInstagramLogo, PiLink, PiMagnifyingGlass, PiMicrophone, PiMoon, PiPalette, PiRobot, PiScan, PiSelectionPlus, PiSparkleFill, PiSpeakerHigh, PiSquaresFour, PiTag, PiTextAlignCenter, PiUserCirclePlus, PiUserFocus, PiYoutubeLogo } from 'react-icons/pi'
import { FaXTwitter } from 'react-icons/fa6'
import { RiDoubleQuotesL } from 'react-icons/ri'
import Highlighter from '../../icons/Highlighter'
import TextExpander from '../../icons/TextExpander'
import UserSound from '../../icons/UserSound'

const { useState } = require('react')

const data = {
    breadcrumbs: [
        {
            title: 'Home',
            href: 'https://www.curateit.com/sign-up',
            active: false,
        },
        {
            title: 'Features',
            href: '#',
            active: true,
        },
    ],
    header: {
        title: 'Max your productivity meter with CurateIt\'s features!',
        subTitle: 'Boost your productivity with CurateIt! Experience a suite of features designed to streamline your workflow and enhance your efficiency in just a few clicks'
    },
    features: [
        {
            title: 'Tabs Manager',
            asset: 'PiBrowsers',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/tabs-manager'
        },
        {
            title: 'Web Highlighter',
            asset: 'Highlighter',
            assetType: 'component',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/web-highlighter'
        },
        {
            title: 'Web Clipper',
            asset: 'PiScan',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/web-clipper'
        },
        {
            title: 'Bookmark Manager',
            asset: 'PiBookmarkSimple',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/bookmark-manager'
        },
        {
            title: 'Private & Public Collections',
            asset: 'PiFolderLock',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'PDF Highlighter',
            asset: 'PiFilePdf',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Text Expander',
            asset: 'TextExpander',
            assetType: 'component',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/text-expander'
        },
        {
            title: 'Reader Mode',
            asset: 'PiBookOpen',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/reader-mode'
        },
        {
            title: 'AI Prompts',
            asset: 'PiRobot',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/ai-prompts'
        },
        {
            title: 'Listen to Articles',
            asset: 'UserSound',
            assetType: 'component',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/listen-to-articles'
        },
        {
            title: 'Universal Dark Mode',
            asset: 'PiMoon',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/universal-dark-mode'
        },
        {
            title: 'Speed Reading',
            asset: 'PiGauge',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/speed-reading'
        },
        {
            title: 'Audio Notes Taker',
            asset: 'PiSpeakerHigh',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/audio-notes-taker'
        },
        {
            title: 'Profile Image Generator',
            asset: 'PiUserCirclePlus',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Website Text Extractor',
            asset: 'PiTextAlignCenter',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/website-text-extractor'
        },
        {
            title: 'YouTube Summariser',
            asset: 'PiYoutubeLogo',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/youtube-summariser'
        },
        {
            title: 'Site Insights',
            asset: 'PiInfo',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Image Color Extractor',
            asset: 'PiPalette',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/image-color-extractor'
        },
        {
            title: 'Image Text Extractor',
            asset: 'PiArticle',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/image-text-extractor'
        },
        {
            title: 'Full Page Screenshot Taker',
            asset: 'PiSelectionPlus',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/screenshot-taker'
        },
        {
            title: 'Link/social feed to image post',
            asset: 'PiInstagramLogo',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Save Code Snippets',
            asset: 'PiCode',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Backup Tweets and Unroll',
            asset: 'FaXTwitter',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Auto Tags & Categorization',
            asset: 'PiTag',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Link in Bio',
            asset: 'PiUserFocus',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Statistics and Activity Logs',
            asset: 'PiChartLine',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Short Redirect Links',
            asset: 'PiLink',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Spotlight Search',
            asset: 'PiMagnifyingGlass',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'App Shortcuts',
            asset: 'PiSquaresFour',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Citation Generator',
            asset: 'RiDoubleQuotesL',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/citation-generator'
        },
        {
            title: 'Image Editor',
            asset: 'PiImageSquare',
            assetType: 'icon',
            blob: false,
            blobText: '',
            blobAsset: '',
            href: '/features/image-editor'
        },
        {
            title: 'Auto Backups',
            asset: 'PiCloudArrowUp',
            assetType: 'icon',
            blob: true,
            blobText: 'Coming Soon',
            blobAsset: '',
            href: ''
        },
        {
            title: 'Video recorder and downloader',
            asset: 'PiMicrophone',
            assetType: 'icon',
            blob: true,
            blobText: 'Coming Soon',
            blobAsset: '',
            href: '/features/'
        },
    ],
    startNow: {
        title: 'One Tool, Infinite Possibilities',
        subTitle: 'CurateIt cuts through the clutter so you can conquer your to-do list with a smile.',
        cta: {
            title: 'Try Curateit for free',
            href: 'https://www.curateit.com/sign-up'
        }
    },
    blogs: {
        title: 'Latest blog posts',
        subTitle: 'Tool and strategies modern teams need to help their companies grow.',
        cta: {
            title: 'More blogs',
            href: 'https://www.curateit.com/u/curateit.com/c/8197/blogs'
        },
        blogs: [
            {
                image: {
                    source: 'https://d3iw0ybn9guog9.cloudfront.net/common/users/102/icons/Thumbnail(4).png',
                    altText: 'Step-By-Step Guide to Using the CurateIt Reader Mode Feature with CurateIt'
                },
                title: 'Step-By-Step Guide to Using the CurateIt Reader Mode Feature',
                description: 'If you\'re someone who loves reading a lot of online articles and blogs but hates the clutter and distractions that come with it, you\'re not alone.',
                href: 'https://www.curateit.com/u/curateit.com/g/197921/step-by-step-guide-to-using-the-curateit-reader-mode-feature',
            },
            {
                image: {
                    source: 'https://d3iw0ybn9guog9.cloudfront.net/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(18).png',
                    altText: '5 Best Chrome Extensions for Reading Articles with CurateIt'
                },
                title: '5 Best Chrome Extensions for Reading Articles',
                description: 'Admit it, we all get sucked into the web of the digital world. Endless Instagram scrolls, cute cat videos, and suddenly that article you needed to read is a distant memory.',
                href: 'https://www.curateit.com/u/curateit.com/g/197920/5-best-chrome-extensions-for-reading-articles',
            },
            {
                image: {
                    source: 'https://d3iw0ybn9guog9.cloudfront.net/common/users/102/icons/Thumbnail(6).png',
                    altText: 'Step-by-Step Guide on How To Use The CurateIt Web Highlighter For Chrome'
                },
                title: 'Step-by-Step Guide on How To Use The CurateIt Web Highlighter',
                description: 'Ever struggled to keep track of useful stuff you find online? Whether it\'s for work research or study, keeping important bits of info handy can be a real headache.',
                href: 'https://www.curateit.com/u/curateit.com/g/197904/step-by-step-guide-on-how-to-use-the-curateit-web-highlighter',
            },
        ]
    },
    faq: {
        title: 'Frequently asked questions',
        subTitle: 'Everything you need to know about the product and billing.',
        faqs: [
            {
                question: 'What kind of content can I curate with CurateIt?',
                answer: 'CurateIt allows you to curate all sorts of web content, including articles, videos, images, social media posts, and more. You can build collections from any website you can access!'
            },
            {
                question: 'How does CurateIt help me organize my content?',
                answer: 'CurateIt provides a central hub for all your curated content. You can create folders and subfolders to categorize your finds, add tags for easy searching, and even write private notes for each piece.'
            },
            {
                question: 'Can I share my curated collections with others?',
                answer: 'Absolutely! CurateIt allows you to share your collections publicly or privately. You can generate a link to share with anyone, or embed your collections directly on your website.',
            },
            {
                question: 'Does CurateIt offer any tools to enhance my curated content?',
                answer: 'Yes, CurateIt offers several features to enrich your collections. You can add headlines and descriptions to each piece, reorder items within folders, and even customize the look and feel of your shared collections.'
            }
        ],
        more: {
            image: {
                source: 'https://d3jrelxj5ogq5g.cloudfront.net/feature-pages/avatar_group.png',
                altText: 'Can\'t find the answer you\'re looking for? Please chat to our friendly team at CurateIt'
            },
            title: 'Still have questions?',
            subTitle: 'Can\'t find the answer you\'re looking for? Please chat to our friendly team.',
            cta: {
                title: 'Get in touch',
                href: 'https://www.curateit.com/sign-up'
            }
        }
    },
}

const images = {
    PiBrowsers: PiBrowsers,
    PiScan: PiScan,
    PiBookmarkSimple: PiBookmarkSimple,
    PiFolderLock: PiFolderLock,
    PiFilePdf: PiFilePdf,
    PiBookOpen: PiBookOpen,
    PiRobot: PiRobot,
    PiMoon: PiMoon,
    PiGauge: PiGauge,
    PiSpeakerHigh: PiSpeakerHigh,
    PiUserCirclePlus: PiUserCirclePlus,
    PiTextAlignCenter: PiTextAlignCenter,
    PiYoutubeLogo: PiYoutubeLogo,
    PiInfo: PiInfo,
    PiPalette: PiPalette,
    PiArticle: PiArticle,
    PiSelectionPlus: PiSelectionPlus,
    PiInstagramLogo: PiInstagramLogo,
    PiCode: PiCode,
    FaXTwitter: FaXTwitter,
    PiTag: PiTag,
    PiUserFocus: PiUserFocus,
    PiChartLine: PiChartLine,
    PiLink: PiLink,
    PiMagnifyingGlass: PiMagnifyingGlass,
    PiSquaresFour: PiSquaresFour,
    RiDoubleQuotesL: RiDoubleQuotesL,
    PiImageSquare: PiImageSquare,
    PiCloudArrowUp: PiCloudArrowUp,
    PiMicrophone: PiMicrophone,
    Highlighter: Highlighter,
    TextExpander: TextExpander,
    UserSound: UserSound,
}

const levels = [6, 12, 'all']


const MobileFeatures = () => {

    const [level, setLevel] = useState(levels[0])

    const FeatureCardsMobile = () => {

        const leveledData = (level === 6) ? data?.features?.slice(0, 6) : (level === 12) ? data?.features?.slice(0, 12) : data?.features

        return leveledData?.map(({ title, href, asset, assetType, blob, blobText, blobAsset }, index) => {

            const AssetComponent = images[asset]

            return (
                <a
                    key={`feature-bocks-mob-${index}`}
                    className='relative w-full p-6 flex flex-col items-center justify-center cursor-pointer rounded-[8px] border-[1px] bg-[#F3F8FF] border-[#F3F8FF] hover:border-[#B8D4FE] hover:shadow-lg hover:shadow-[#105FD333]'
                    href={(href) ? href : '#'}
                >
                    {
                        blob
                        && <div className='absolute top-3 right-5 py-1 px-3 rounded-full bg-[#105FD3] flex flex-row items-center justify-center gap-2'>
                            <PiSparkleFill className='text-white text-[12px]' />
                            <p className='text-white text-[12px]'>{blobText}</p>
                        </div>
                    }
                    {
                        // (assetType === 'icon') ?
                        <AssetComponent className='text-[28px] text-[#105FD3]' />
                        // ''
                        // : ''
                    }

                    <p className='mt-3 text-[16px] text-[#292B38] leading-[25.6px]'>
                        {
                            title
                        }
                    </p>
                </a>
            )

        })

    }

    return (
        <div className='mt-8 block md:hidden'>
            <div
                className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
            >
                <FeatureCardsMobile />
            </div>

            <div className='mt-8 block md:hidden w-full flex flex-row items-center justify-center'>
                <button
                    className='py-3 px-8 rounded-[8px] border-[2px] border-[#B8D4FE] text-[#105FD3] text-[16px] font-semibold'
                    onClick={() => (level === 6) ? setLevel(12) : (level === 12) ? setLevel('all') : (level === 'all') ? setLevel(6) : null}
                >
                    {
                        (level === 6) ? 'More features' : (level === 12) ? 'See all features' : 'See less'
                    }
                </button>
            </div>
        </div>
    )

}

export default MobileFeatures