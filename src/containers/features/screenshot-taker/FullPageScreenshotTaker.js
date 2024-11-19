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
    title: "Snap your full screen with just one click in Chrome!",
    subTitle:
      "Don't let the boundaries of your screen limit your captures. Embrace the power of full visibility with CurateIt, the premier tool for full-page screenshots.",
    features: [
      "Snap entire pages with a single clicks",
      "Snap entire pages with a single clicks",
      "Capture 100% of your visible content",
      "Save 10+ hours weekly",
    ],
    cta: {
      title: "Capture full screen screenshots",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Full page screenshot.png`,
      altText:
        "Snap your full screen with just one click in Chrome! with CurateIt",
    },
    breadcrumbs: [
      {
        title: "Home",
        href: `/sign-up`,
        active: false,
      },
      {
        title: "Features",
        href: "/features",
        active: false,
      },
      {
        title: "Full Page Screenshot Taker",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/screenshot_taker_testimonial.png`,
      altText:
        "Power up your productivity by building an AI prompts library with CurateIt",
    },
    name: "Sara Nguyen",
    profession: "Graphic Designer",
    testimonial:
      "“CurateIt's full screenshot feature has transformed how I manage project visuals. It's a massive time-saver!”",
  },
  textImageScroll: {
    title: "Capture everything on your screen in the easiest way possible!",
    sections: [
      {
        title: "Capture every detail with a single click",
        subtitle:
          "Seamlessly save everything from top to bottom of your display in one go. Ideal for documenting those detailed and comprehensive web pages—with no pixel left behind!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Capture-every-detail-with-a-single-click.json`,
          altText: "Capture every detail with a single click with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Edit and enhance your screenshots instantly",
        subtitle:
          "Not only can you grab the entire screen with one click, but CurateIt also lets you tweak brightness, contrast, and more. Enhance your screenshots to highlight important details or adjust visibility for better clarity, making every capture as informative as it is comprehensive. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Edit and enhance your screenshots instantly.png`,
          altText: "Edit and enhance your screenshots instantly with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Organise your screenshots with ease",
        subtitle:
          "With CurateIt, you can do more than just take screenshots; you can organise them into collections. Whether you're compiling a project's visual resources or gathering data for a presentation, CurateIt makes it simple to categorise and retrieve your screenshots.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Organise your screenshots with ease.png`,
          altText: "Organise your screenshots with ease with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Never miss any critical info!",
        subtitle:
          "CurateIt's full-screen screenshot capability is beneficial for users who need to document complete web pages, long-form articles, or detailed data spreadsheets without the hassle of stitching multiple images together. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Never miss any critical info!.png`,
          altText: "Never miss any critical info with CurateIt",
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
    title: "See how the CurateIt Full Page Screenshot Taker feature works",
    subtitle:
      "Still need a hand to know how the Full Page Screenshot Taker really work? Let us help you out with this tutorial.",
    embed: "1fOmV3GFEkg?si=KWCaH2LU3MY6je7d",
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
        title: "Researchers",
        subTitle:
          "Need to capture comprehensive data from online sources? Grab it all at once with CurateIt's full-screen screenshot feature.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Marketers",
        subTitle:
          "Executing multiple campaigns and need quick insights? Use the full-screen screenshot tool to instantly capture and archive entire webpages for competitive analysis and strategy.",
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
          "Streamline collaboration and enhance communication by sharing full-screen screenshots with your team.",
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
    title:
      "See the whole page at once with CurateIt's full-screen screenshot feature.",
    subTitle:
      "No more cutting off important details or dealing with multiple screenshots. Capture the entire webpage with just one click using CurateIt’s full-screen screenshot tool. It’s quick, easy, and captures everything you need in one go.",
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
        question: "How does the full-screen screenshot feature work?",
        answer:
          "CurateIt's full-screen screenshot feature enables you to capture an entire webpage with just one click. This tool is perfect for saving visuals, entire articles, or even long forums for later reference, all without the need to scroll or capture multiple sections separately.",
      },
      {
        question: "Can I edit the screenshots taken with CurateIt?",
        answer:
          "Yes, after taking a full-screen screenshot with CurateIt, you can edit the image directly within the tool. Options include adjusting brightness, contrast, and adding annotations, making it ideal for highlighting important information or making notes on the screenshot itself.",
      },
      {
        question: "Where can I save my full-screen screenshots?",
        answer:
          "With CurateIt, you can save your full-screen screenshots directly to your device, or better yet, you can organise them into collections within the extension. This feature is particularly useful for managing project-specific visuals or categorising information by topics or themes.",
      },
      {
        question:
          "Is the full-screen screenshot feature compatible with all websites?",
        answer:
          "CurateIt's full-screen screenshot feature is designed to work across virtually all websites. Whether it's a static webpage or a dynamic site with complex layouts, the tool can capture everything visible in the browser window, ensuring you don't miss out on any details.",
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
        href: `/sign-up`,
      },
    },
  },
  moreFeatures: {
    blob: "Categories",
    title: "More Features to 10x your productivity.",
    blocks: [
      {
        asset: "TextExpander",
        title: "Text Expander",
        href: "/features/text-expander",
      },
      {
        asset: "PiBookmarkSimple",
        title: "Bookmark Manager",
        href: "/features/bookmark-manager",
      },
      {
        asset: "UserSound",
        title: "Listen to article",
        href: "/features/listen-to-article",
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
        asset: "PiScan",
        title: "Web clipper",
        href: "/features/web-clipper",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(23).png`,
          altText:
            "10 Best Full Page Screenshot Taker Extensions for Chrome with Curateit",
        },
        title: "10 Best Full Page Screenshot Taker Extensions for Chrome",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/197920/5-best-chrome-extensions-for-reading-articles",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Heading(3).png`,
          altText:
            "Step-by-Step Guide to using the Curateit's Full Page Screenshot Feature with CurateIt",
        },
        title:
          "Step-by-Step Guide to using the Curateit's Full Page Screenshot Feature",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199741/step-by-step-guide-to-using-the-curateits-full-page-screenshot-f",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/webapp/banner.jpg`,
          altText: "Best Full Page & Screenshot Taker Extensions with Curateit",
        },
        title: "Best Full Page & Screenshot Taker Extensions",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/8740/best-full-page-screenshot-taker",
      },
    ],
  },
};

const FullPageScreenshotTaker = () => {
  return (
    <div>
      <CustomNav />
      <div id="text-expander-page">
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

export default FullPageScreenshotTaker;
