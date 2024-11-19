import FeatureBlocks from "@containers/LandingPages/FeatureBlocks/FeatureBlocks";
import FeatureBlocksMobile from "@containers/LandingPages/FeatureBlocks/FeatureBlocksMobile";
import HeroSection from "@containers/LandingPages/HeroSection/HeroSection";
import Testimonial from "@containers/LandingPages/Testimonial/Testimonial";
import TrustedTeams from "@containers/LandingPages/TrustedTeams/TrustedTeams";
import UserCards from "@containers/LandingPages/UserCards/UserCards";
import VideoShowcase from "@containers/LandingPages/VideoShowcase/VideoShowcase";
import StartNow from "@containers/LandingPages/StartNow/StartNow";
import Faq from "@containers/LandingPages/Faq/Faq";
import MoreFeatures from "@containers/LandingPages/MoreFeatures/MoreFeatures";
import Blogs from "@containers/LandingPages/Blogs/Blogs";
import TextImageScroll from "@containers/LandingPages/TextImageScroll/TextImageScroll";
import TextImageScrollMobile from "@containers/LandingPages/TextImageScroll/TextImageScrollMobile";
import CustomNav from "@components/landingPageTabs/CustomNav";
import Footer from "@components/Footer2/Footer";

const data = {
  heroSection: {
    title: "Experience web comfort in dark mode across all pages",
    subTitle:
      "Give your eyes the comfort they deserve with Universal Dark Mode by CurateIt, the simplest way to enable dark mode across all your favourite sites. Toggle once, and enjoy a consistently soothing browsing experience—anywhere, anytime.",
    features: [
      "Reduce eye strain by 75% across all sites",
      "Cut down 80% of screen brightness glare",
      "Enhance readability on every page",
      "Activate dark mode on 1000+ websites",
    ],
    cta: {
      title: "Turn on dark mode now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero%20Image%20Dark%20Mode.png`,
      altText:
        "Experience web comfort in dark mode across all pages with CurateIt",
    },
    breadcrumbs: [
      {
        title: "Home",
        href: "/",
        active: false,
      },
      {
        title: "Features",
        href: "/features",
        active: false,
      },
      {
        title: "Universal dark mode",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Universal dark mode Testimonial.png`,
      altText: "CurateIt Universal dark mode Testimonial Profile picture",
    },
    name: "Samantha Lee",
    profession: "Research Scientist",
    testimonial:
      "“Universal Dark Mode has truly transformed my research sessions. The reduced glare makes those long hours much easier on my eyes, boosting my focus and comfort.”",
  },
  textImageScroll: {
    title: "A darker, less straining web experience is now just a click away!",
    sections: [
      {
        title: "Switch to dark mode on any site, eye-strain free",
        subtitle:
          "Don't let bright screens dull your browsing experience! With CurateIt's Universal Dark Mode, activate a soothing visual environment on any website, anytime!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Switch to dark mode on any site, eye-strain free.json`,
          altText:
            "Switch to dark mode on any site, eye-strain free with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Flip between different modes in a click",
        subtitle:
          "Hit a simple shortcut to switch between Dark and Light modes on any site. Enjoy comfy night browsing without any hassle or impact on site speed!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Flip%20between%20different%20modes%20in%20a%20click.png`,
          altText: "Flip between different modes in a click with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Fast, light, and easy on the eyes",
        subtitle:
          "CurateIt's Dark Mode is so light it practically floats, ensuring your web surfing stays as swift as ever. It's a soothing dark theme across all your websites without a hitch in your browsing speed.  ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Fast,%20light,%20and%20easy%20on%20the%20eyes.png`,
          altText: "Fast, light, and easy on the eyes with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "A great way to save some energy!",
        subtitle:
          "Dark Mode isn't just easy on the eyes—it's easy on your battery too! Flip it on to cut down on screen power use and keep your devices running longer without a recharge. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/A%20great%20way%20to%20save%20some%20energy!.png`,
          altText: "A great way to save some energy! with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
    ],
  },
  videoShowcase: {
    blob: "Explore",
    title: "See how the CurateIt Universal dark mode works",
    subtitle:
      "Wondering if the Universal dark mode is right for you? Let us help you decide!",
    embed: "WFYZEVj1oyE?si=dbLJmWlYGM9r7c2t",
    cta: {
      title: "Try it by yourself",
      href: `/sign-up`,
    },
  },
  userCards: {
    blob: "Categories",
    title: "Best for creators, individuals as well as teams",
    cards: [
      {
        icon: "PiPaintBrush",
        title: "Students",
        subTitle:
          "By easing eye strain and reducing glare, it makes studying from e-textbooks and online resources more comfortable.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Professionals",
        subTitle:
          "Tackle those late-night deadlines without the eye strain. It's the perfect way to keep your focus sharp and your documents clear.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        blob: "Categories",
        icon: "PiUsers",
        title: "Teams",
        subTitle:
          "Enable Universal Dark Mode for your whole team to reduce eye strain and improve focus during  collaborative sessions.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
    ],
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
    title: "Ready to make online browsing better? ",
    subTitle:
      "Staring at bright screens all day isn't just uncomfortable, it's exhausting! Why add to the eye strain? Flip on Universal Dark Mode with CurateIt and make your viewing experience soothing!",
    cta: {
      title: "Try CurateIt for free",
      href: `/sign-up`,
    },
  },
  faq: {
    title: "Frequently asked questions",
    subTitle: "Everything you need to know about the product and billing.",
    faqs: [
      {
        question: "Is dark mode good for eyes?",
        answer:
          "Yes, dark mode can be easier on the eyes, especially in low-light conditions. It reduces screen glare and eye strain, making prolonged screen use more comfortable.",
      },
      {
        question: "Is it safe to use dark reader?",
        answer:
          "Yes, using Dark Reader is generally safe. It's a popular browser extension that applies a dark theme to websites, reducing eye strain without affecting the underlying security of the sites you visit.",
      },
      {
        question: "What is the best dark mode extension for Chrome?",
        answer:
          "CurateIt stands out as the best dark mode extension for Chrome, offering seamless integration and a customisable dark theme that works across all websites. It's easy to use, light on resources, and enhances your browsing experience by reducing eye strain.",
      },
    ],
    more: {
      image: {
        source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/100x100/feature-pages/avatar_group.png`,
        altText:
          "Can't find the answer you're looking for? Please chat to our friendly team at CurateIt",
      },
      title: "Still have questions?",
      subTitle:
        "Can't find the answer you're looking for? Please chat to our friendly team.",
      cta: {
        title: "Get in touch",
        href: "/",
      },
    },
  },
  moreFeatures: {
    blob: "Categories",
    title: "More Features to 10x your productivity.",
    blocks: [
      {
        asset: "PiBrowsers",
        title: "Tabs manager",
        href: "/features/tabs-manager",
      },
      {
        asset: "PiBookmarkSimple",
        title: "Bookmark Manager",
        href: "/features/bookmark-manager",
      },
      {
        asset: "Highlighter",
        title: "Web Highlighter",
        href: "/features/web-highlighter",
      },
      // {
      //   asset: "PiRecordFill",
      //   title: "Screen recorder",
      //   href: "/features/screen-recorder",
      // },
      {
        asset: "PiBookOpen",
        title: "Reader mode",
        href: "/features/reader-mode",
      },
      // {
      //   asset: "PiCode",
      //   title: "Save code snippets",
      //   href: "/features/save-code-snippets",
      // },
      // {
      //   asset: "FaXTwitter",
      //   title: "Backup tweets",
      //   href: "/features/backup-tweets",
      // },
      {
        asset: "PiRobot",
        title: "AI Prompts",
        href: "/features/ai-prompts",
      },
      // {
      //   asset: "PiFilePdf",
      //   title: "PDF Highlighter",
      //   href: "/features/pdf-highlighter",
      // },
    ],
    cta: {
      title: "Get started",
      href: `/sign-up`,
    },
  },
  blogs: {
    title: "Latest blog posts",
    subTitle:
      "Tool and strategies modern teams need to help their companies grow.",
    cta: {
      title: "More blogs",
      href: "https://www.curateit.com/u/curateit.com/c/8197/blogs",
    },
    blogs: [
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(21).png`,
          altText: "Top 10 Dark Mode Extensions in Google Chrome with Curateit",
        },
        title: "Top 10 Dark Mode Extensions in Google Chrome ",
        description:
          "You know those moments when your phone or computer feels like it's trying to outshine the sun? Night owls who work late at night will surely be able to relate.",
        href: "https://www.curateit.com/u/curateit.com/g/197937/top-10-dark-mode-extensions-in-google-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Thumbnail(8).png`,
          altText:
            "Step by Step Guide To Use The Universal Dark Mode Feature on Curateit",
        },
        title:
          "Step by Step Guide To Use The Universal Dark Mode Feature on Curateit",
        description:
          "If you're glued to your computer screen day in and day out, adjusting to the glaring brightness can be a real strain on your eyes.",
        href: "https://www.curateit.com/u/curateit.com/g/197938/step-by-step-guide-to-use-the-universal-dark-mode-feature-on-cura",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/207/icons/photo-1498050108023-c5249f4df085`,
          altText: "Best Universal Dark Mode Extensions with Curateit",
        },
        title: "Best Universal Dark Mode Extensions",
        description:
          "If you're glued to your computer screen day in and day out, adjusting to the glaring brightness can be a real strain on your eyes.",
        href: "https://www.curateit.com/u/Curt/c/6533/best-universal-dark-mode-tools",
      },
    ],
  },
};

const UniversalDarkMode = () => {
  return (
    <div>
      <CustomNav />
      <div id="universal-dark-mode-page">
        <HeroSection {...data?.heroSection} />

        <div>
          <Testimonial {...data?.testimonial} />
        </div>

        <div className="hidden lg:block">
          <TextImageScroll {...data?.textImageScroll} />
        </div>

        <div className="block lg:hidden">
          <TextImageScrollMobile {...data?.textImageScroll} />
        </div>

        <div>
          <VideoShowcase {...data?.videoShowcase} />
        </div>

        <div>
          <UserCards {...data?.userCards} />
        </div>

        <div>
          <TrustedTeams {...data?.trustedTeams} />
        </div>

        <div className="hidden lg:block">
          <FeatureBlocks featureBlocks={data?.featureBlocks} />
        </div>

        <div className="block lg:hidden">
          <FeatureBlocksMobile featureBlocks={data?.FeatureBlocksMobile} />
        </div>

        <div>
          <StartNow {...data?.startNow} />
        </div>

        <div className="my-12 lg:my-14">
          <Faq {...data?.faq} />
        </div>

        <div>
          <MoreFeatures {...data?.moreFeatures} />
        </div>

        <div>
          <Blogs {...data?.blogs} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UniversalDarkMode;
