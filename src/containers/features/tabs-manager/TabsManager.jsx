import FeatureBlocks from '@containers/LandingPages/FeatureBlocks/FeatureBlocks'
import FeatureBlocksMobile from '@containers/LandingPages/FeatureBlocks/FeatureBlocksMobile'
import HeroSection from '@containers/LandingPages/HeroSection/HeroSection'
import Testimonial from '@containers/LandingPages/Testimonial/Testimonial'
import TrustedTeams from '@containers/LandingPages/TrustedTeams/TrustedTeams'
import UserCards from '@containers/LandingPages/UserCards/UserCards'
import VideoShowcase from '@containers/LandingPages/VideoShowcase/VideoShowcase'
import StartNow from '@containers/LandingPages/StartNow/StartNow'
import Faq from '@containers/LandingPages/Faq/Faq'
import MoreFeatures from '@containers/LandingPages/MoreFeatures/MoreFeatures'
import Blogs from '@containers/LandingPages/Blogs/Blogs'
import TextImageScroll from '@containers/LandingPages/TextImageScroll/TextImageScroll'
import TextImageScrollMobile from '@containers/LandingPages/TextImageScroll/TextImageScrollMobile'
import CustomNav from '@components/landingPageTabs/CustomNav'
import Footer from '@components/Footer2/Footer'
import "../../../components/landing-pages.css";

const data = {
    heroSection: {
        title: "The easiest way to organize and sort your tabs in a click",
        subTitle: "Life's too short to be troubled by thousands of open tabs. So cut the chase and organize them better with CurateIt, the world's most-loved tab manager for Chrome.",
        features: [
            "Sort 1000+ tabs",
            "Slash 90% search time",
            "Find tabs in one click",
            "Save 10+ hours weekly"
        ],
        cta: {
            title: "Sort your tabs now",
            href:`/sign-up`
        },
        asset: {
            source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Tab Manager.png`,
            altText: "The easiest way to organize and sort your tabs in a click with CurateIt"
        },
        breadcrumbs: [
            {
                title: "Home",
                href: "/",
                active: false
            },
            {
                title: "Features",
                href: "/features",
                active: false,
            },
            {
                title: "Tabs Manager",
                href: "#",
                active: true
            }
        ]
    },
    testimonial: {
        profile: {
            source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/tabs_manager_testimonial_profile.png`,
            altText: "CurateIt Tabs Manager Testimonial Profile picture"
        },
        name: "Jack Thompson",
        profession: "PhD student",
        testimonial: "“Using CurateIt made finding my research tabs so much easier. It's honestly saved me hours of hassle.”"
    },
    textImageScroll: {
        title: 'The only thing between you and sorted tabs? It\'s CurateIt.',
        sections: [
            // NEEDED
            {
                title: 'Open and collect as many tabs as you like, stress-free',
                subtitle: 'Don\'t regret your tab enthusiasm! With CurateIt\'s tab manager, save and revisit your tabs anytime later!',
                asset: {
                    source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Open-and-collect-as-many-tabs.json`,
                    altText: 'Open and collect as many tabs as you like, stress-free with CurateIt'
                },
                cta: {
                    title: 'Try Curateit for free',
                    href: 'https://www.curateit.com/sign-up'
                },
                assetType: 'other',
            },
            {
                title: 'Love a tab? Then mark your favourite!',
                subtitle: 'With so many tabs, it\'s easy to get lost. Mark your top picks with CurateIt and jump back to what matters in a snap.',
                asset: {
                    source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Love a tab Put a heart on it.jpg`,
                    altText: 'Love a tab? Then mark your favourite with CurateIt'
                },
                cta: {
                    title: 'Try Curateit for free',
                    href: 'https://www.curateit.com/sign-up'
                },
                assetType: 'image',
            },
            {
                title: 'All your tabs in one convenient location',
                subtitle: 'Experience the ease of unified tab management as CurateIt gathers every open tab across profiles into one convenient spot. Cross browser support just made easier.',
                asset: {
                    source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/All your tabs in one convenient location.jpg`,
                    altText: 'All your tabs in one convenient location with CurateIt'
                },
                cta: {
                    title: 'Try Curateit for free',
                    href: 'https://www.curateit.com/sign-up'
                },
                assetType: 'image',
            },
            // NEEDED
            {
                title: 'Find your tabs faster than a blink',
                subtitle: 'Quickly find and access any tab, whether it\'s just one or a whole group, with CurateIt - making your browsing faster and more convenient than ever.',
                asset: {
                    source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Find your tabs faster than a blink.json`,
                    altText: 'Find your tabs faster than a blink with CurateIt'
                },
                cta: {
                    title: 'Try Curateit for free',
                    href: 'https://www.curateit.com/sign-up'
                },
                assetType: 'other',
            },
            {
                title: 'A lighter browser experience',
                subtitle: 'Suspend the tabs you\'re not using to free up memory, reduce clutter, and focus on what matters. When you\'re ready, wake them up with a click—like they never took a nap.',
                asset: {
                    source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/A Lighter Browser Experience.jpg`,
                    altText: 'A lighter browser experience with CurateIt'
                },
                cta: {
                    title: 'Try Curateit for free',
                    href: 'https://www.curateit.com/sign-up'
                },
                assetType: 'image',
            },
        ]
    },
    videoShowcase: {
        blob: "Explore",
        title: "See how the CurateIt Tab Manager works",
        subtitle: "Wondering if the tab manager is right for you? Let us help you decide!",
        embed: "pgtBzTm8xDE?si=qsalg78OSCN4U8mi",
        cta: {
            title: "Try it by yourself",
            href:`/sign-up`
        }
    },
    userCards: {
        blob: "Categories",
        title: "Best for creators, individuals as well as teams",
        cards: [
            {
                icon: "PiPaintBrush",
                title: "Creators",
                subTitle: "Got too many tabs open for new content ideas? Gather, sort, and organise them with CurateIt's tab manager. It's the perfect tool for keeping your brainstorming sessions neat and productive. ",
                cta: {
                    title: "Try for free",
                    href:`/sign-up`
                }
            },
            {
                icon: "PiSuitcaseSimple",
                title: "Professionals",
                subTitle: "Secure the best resources from tabs across the web and sort them efficiently with CurateIt. This makes it simple to maintain a well-organised repository of information that's ready whenever you need it.",
                cta: {
                    title: "Try for free",
                    href:`/sign-up`
                }
            },
            {
                blob: "Categories",
                icon: "PiUsers",
                title: "Teams",
                subTitle: "Ideas at your fingertips - effortlessly save and curate essential tabs for your team with CurateIt. This allows you to organise shared knowledge and resources accessible and manageable for everyone.",
                cta: {
                    title: "Try for free",
                    href:`/sign-up`
                }
            }
        ]
    },
    trustedTeams: {
    title: "Trusted by teams worldwide at",
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/1100x1100_min/feature-pages/trusted_teams_full.png`,
      altText: "Trusted by teams worldwide at CurateIt",
    },
    },
    featureBlocks: [
        {
        size: 4,
        defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 1 default.png`,
        hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 1 hover.png`,
        link: `/sign-up`,
        altText: "All-in-One Content Curation with CurateIt",
        },
        {
        size: 8,
        defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/800x800_min/feature-pages/Img 2 default.png`,
        hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/800x800_min/feature-pages/Img 2 hover.png`,
        link: `/sign-up`,
        altText: "Your all in one productivity tool is CurateIt",
        },
        {
        size: 8,
        defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/800x800_min/feature-pages/Img 3 default.png`,
        hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Image 3 hover.gif`,
        link: `/sign-up`,
        altText: "Find all your needs at one place with CurateIt",
        },
        {
        size: 4,
        defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 4 default.png`,
        hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 4 hover.png`,
        link: `/sign-up`,
        altText: "Social Collaboration Platform at CurateIt",
        },
        {
        size: 5,
        defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 5 default.png`,
        hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 5 hover.png`,
        link: `/sign-up`,
        altText: "Save anything from the web with CurateIt",
        },
        {
        size: 7,
        defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/700x700_min/feature-pages/Img 6 default.png`,
        hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Image 6 hover.gif`,
        link: `/sign-up`,
        altText: "Bulk Import and Curate your content in one place with CurateIt",
        },
    ],
    FeatureBlocksMobile: [
        {
        image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 2 default.png`,
        altText: "Your all in one productivity tool is CurateIt",
        },
        {
        image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 3 default.png`,
        altText: "Find all your needs at one place with CurateIt",
        },
        {
        image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 4 mobile.png`,
        altText: "Save anything from the web with CurateIt",
        },
        {
        image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 3 mobile.png`,
        altText: "360 degree social collaboration platform with CurateIt",
        },
        {
        image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/500x500_min/feature-pages/Img 6 default.png`,
        altText: "Bulk Import and Curate your content in one place with CurateIt",
        },
    ],
    startNow: {
        title: "Ready to streamline your browsing?",
        subTitle: "We get it — working with a thousand tabs isn't just chaotic, it's a full-time job! Why add to the headache? Snap everything into place with CurateIt and make your tabs sorted!",
        cta: {
            title: "Try CurateIt for free",
            href:`/sign-up`
        }
    },
    faq: {
        title: "Frequently asked questions",
        subTitle: "Everything you need to know about the product and billing.",
        faqs: [
            {
                question: "What is the Chrome extension that keeps tabs?",
                answer: "CurateIt's Tab Manager is the most popular extension for Chrome, designed to simplify your tab management. It allows you to easily organise and create collections of tabs for later use, making your browsing experience smoother and more efficient."
            },
            {
                question: "How do I arrange tabs?",
                answer: "On CurateIt, you can arrange your tabs by creating collections for specific use cases."
            },
            {
                question: "What is the best Chrome extension?",
                answer: "While multiple tab managers on Chrome let you organise tabs, the CurateIt tab manager stands out as it allows you to create collections, save, search and use its tab manager tools to simplify your browsing experience."
            }
        ],
        more: {
            image: {
                source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/100x100/feature-pages/avatar_group.png`,
                altText: "Can't find the answer you're looking for? Please chat to our friendly team at CurateIt"
            },
            title: "Still have questions?",
            subTitle: "Can't find the answer you're looking for? Please chat to our friendly team.",
            cta: {
                title: "Get in touch",
                href: "mailto:support@curateit.com"
            }
        }
    },
    moreFeatures: {
        blob: 'Categories',
        title: 'More Features to 10x your productivity.',
        blocks: [
            {
                asset: 'PiBookOpen',
                title: 'Reader mode',
                href: '/features/reader-mode'
            },
            {
                asset: 'PiBookmarkSimple',
                title: 'Bookmark Manager',
                href: '/features/bookmark-manager'
            },
            {
                asset: 'Highlighter',
                title: 'Web Highlighter',
                href: '/features/web-highlighter'
            },
            // {
            //     asset: 'PiRecordFill',
            //     title: 'Screen recorder',
            //     href: '/features/screen-recorder'
            // },
            {
                asset: 'TextExpander',
                title: 'Text Expander',
                href: '/features/text-expander'
            },
            // {
            //     asset: 'PiCode',
            //     title: 'Save code snippets',
            //     href: '/features/save-code-snippets'
            // },
            // {
            //     asset: 'FaXTwitter',
            //     title: 'Backup tweets',
            //     href: '/features/backup-tweets'
            // },
            {
                asset: 'PiRobot',
                title: 'AI Prompts',
                href: '/features/ai-prompts'
            },
            // {
            //     asset: 'PiFilePdf',
            //     title: 'PDF Highlighter',
            //     href: '/features/pdf-highlighter'
            // },
        ],
        cta: {
            title: 'Get started',
            href: `/sign-up`
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
                    source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(1).png`,
                    altText: 'Top 10 Chrome Tab Manager Extensions You Need To Know with CurateIt'
                },
                title: 'Top 10 Chrome Tab Manager Extensions You Need To Know',
                description: 'Mark Black said, “Sometimes the most productive thing you can do is relax.” But is this suggestion applicable in 2024 when deadlines are looming large and our computer screens are flooded with numerous open tabs?',
                href: 'https://www.curateit.com/u/curateit.com/g/197138/chrome-tab-manager-extensions-2024',
            },
            {
                image: {
                    source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Thumbnail(7).png`,
                    altText: 'Step-By-Step Guide to Using the CurateIt Tab Manager feature with CurateIt'
                },
                title: 'Step-By-Step Guide to Using the CurateIt Tab Manager feature',
                description: 'If you\'ve ever juggled multiple projects at once, you know the chaos of keeping dozens of browser tabs open. It\'s overwhelming, slows your computer down, and makes it tough to find what you need when you need it.',
                href: 'https://www.curateit.com/u/curateit.com/g/197901/guide-to-curateit-tabs-manager',
            },
            {
                image: {
                    source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(16).png`,
                    altText: 'CurateIt vs. Workona: Which one is the best tab manager for Chrome?'
                },
                title: 'CurateIt vs. Workona: Which one is the best tab manager for Chrome?',
                description: 'You open your laptop, fire up Chrome, and start chasing the thoughts bouncing around in your head. Within ten minutes, your screen is a mosaic of 20 tabs.',
                href: 'https://www.curateit.com/u/curateit.com/g/197902/curateit-vs-workona-tab-manager-chrome',
            },
        ]
    },
}

const TabsManager = () => {

    return (
        <div>
            <CustomNav />
            <div
            id='tabs-manager-page'
        >

            <HeroSection
                {...data?.heroSection}
            />

            <div>
                <Testimonial
                    {...data?.testimonial}
                />
            </div>

            <div className='hidden lg:block'>
                <TextImageScroll
                    {...data?.textImageScroll}
                />
            </div>

            <div className='block lg:hidden'>
                <TextImageScrollMobile
                    {...data?.textImageScroll}
                />
            </div>

            <div>
                <VideoShowcase
                    {...data?.videoShowcase}
                />
            </div>

            <div>
                <UserCards
                    {...data?.userCards}
                />
            </div>

            <div>
                <TrustedTeams
                    {...data?.trustedTeams}
                />
            </div>

            <div className='hidden lg:block'>
                <FeatureBlocks
                    featureBlocks={data?.featureBlocks}
                />
            </div>

            <div className='block lg:hidden'>
                <FeatureBlocksMobile
                    featureBlocks={data?.FeatureBlocksMobile}
                />
            </div>

            <div>
                <StartNow
                    {...data?.startNow}
                />
            </div>

            <div className='my-12 lg:my-14'>
                <Faq
                    {...data?.faq}
                />
            </div>

            <div>
                <MoreFeatures
                    {...data?.moreFeatures}

                />
            </div>

            <div>
                <Blogs
                    {...data?.blogs}
                />
            </div>

        </div>
            <Footer />
        </div>
    )

}

export default TabsManager