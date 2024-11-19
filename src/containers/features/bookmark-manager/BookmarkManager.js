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
    title:
      "Content Overload? Get Relief with Our Bookmark Chrome Extension for Google",
    subTitle:
      "Struggling to keep track of important sites? Let CurateIt's Bookmark Manager feature tidy up your browsing life. Save, annotate, and share — all in one spot.",
    features: [
      "Boost sharing efficiency by 50%",
      "Increase productivity by 10x",
      "Cut search times by 75%",
      "Save 5+ hours weekly",
    ],
    cta: {
      title: "Manage bookmarks now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Bookmark Manager.png`,
      altText:
        "Content Overload? Get Relief with Our Bookmark Chrome Extension for Google on CurateIt ",
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
        title: "Bookmark Manager",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Luke Martin.png`,
      altText: "Consuming content on YouTube within seconds on CurateIt ",
    },
    name: "Luke Martin",
    profession: "Data Analyst",
    testimonial:
      "“I've cut down hours from my research every week, thanks to the Bookmark Manager from CurateIt. It's not only handy—it's totally transformed how I handle my tasks.”",
  },
  textImageScroll: {
    title:
      "Simplify your browsing and how you save content with Bookmark Manager.",
    sections: [
      {
        title: "Organise bookmarks in collections",
        subtitle:
          "With CurateIt, clear out the clutter of messy bookmarks. Experience a clean, streamlined interface that simplifies the management and access of your saved content, allowing you to quickly find what you need without any hassle.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Organise bookmarks in collections.png`,
          altText: "Organise bookmarks in collections with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Quickly categorise your bookmarks with intuitive tagging",
        subtitle:
          "Why struggle with complex bookmarks and messy collections? Our intuitive tagging system simplifies your organisation, making it quick and easy to manage everything.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Quickly categorise your bookmarks with intuitive tagging.gif`,
          altText:
            "Quickly categorise your bookmarks with intuitive tagging with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Instantly annotate, highlight important details and share",
        subtitle:
          "Don't just bookmark—annotate and highlight your saved content in various colours and styles. You can also share your insights easily through public or private collections in our bookmark organiser for Chrome.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Instantly-annotate,-highlight-important-details-and-share.json`,
          altText:
            "Instantly annotate, highlight important details and share with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Use auto-tags to file into multiple categories and collections",
        subtitle:
          "Managing multiple categories can often be time-consuming and complicated. Our auto-tagging feature simplifies this by ensuring seamless access to your content, anytime and anywhere, effortlessly.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Use auto-tags to file into multiple categories and collections.png`,
          altText:
            "Use auto-tags to file into multiple categories and collections with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Unmatched full-text search capabilities",
        subtitle:
          "Leverage the power of universal search to effortlessly find what you're looking for, even from third-party apps and your browsing history.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Unmatched-full-text-search-capabilities.json`,
          altText: "Unmatched full-text search capabilities with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Easily save over 20 types of content",
        subtitle:
          "Go beyond URLs and text—bookmark images, PDFs, and even code snippets. An inclusive approach to modern bookmarking.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Easily save over 20 types of content.png`,
          altText: "Easily save over 20 types of content with CurateIt",
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
    title: "See how the CurateIt Bookmark Manager works.",
    subtitle: "Watch how you can manage bookmarks seamlessly with CurateIt.",
    embed: "pgtBzTm8xDE?si=KwG_tnRzV_pxJZiK",
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
        title: "Hobbyist",
        subTitle:
          "Create collections for their interests for cooking recipes, DIY projects, or travel destinations.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Professionals",
        subTitle:
          "Organise research materials, articles, and resources for easy access and retrieval.",
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
          "A centralized hub for including documents, design assets, and research materials or links.",
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
    title: "A faster, easier way to save and curate content from the web!",
    subTitle:
      "Keep your bookmarks tidy and accessible. With CurateIt's Bookmark Manager, you can easily organise your favourite web pages, ensuring quick and easy access whenever you need them.",
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
        question: "Why use a bookmark manager?",
        answer:
          "Using a bookmark manager like CurateIt Bookmark not only helps you organize your digital life but also elevates your interaction with digital resources, making you more productive.",
      },
      {
        question: "What is the best way to manage bookmarks in Chrome?",
        answer:
          "With CurateIt Bookmark's Chrome extension, you can effortlessly manage, search, and annotate bookmarks right from your browser",
      },
      {
        question: "What is the best bookmark manager extension for Chrome?",
        answer:
          "The CurateIt Bookmark extension for Chrome is one of the most powerful extensions that integrates seamlessly with your browser, providing you with advanced bookmark management capabilities like tagging, annotating, and highlighting, all without leaving your browser window.",
      },
    ],
    more: {
      image: {
        source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150/feature-pages/avatar_group.png`,
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(27).png`,
          altText:
            "Best Bookmark Manager Extensions You Need to Know with CurateIt",
        },
        title: "Best Bookmark Manager Extensions You Need to Know",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/209796/best-bookmark-manager-extensions-you-need-to-know",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(31).png`,
          altText:
            "Step-By-Step Guide to using the CurateIt's Bookmark Manager with CurateIt",
        },
        title: "Step-By-Step Guide to using the CurateIt's Bookmark Manager",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/209795/step-by-step-guide-to-using-the-curateits-bookmark-manager",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BookmarkManagerTools2023.png`,
          altText: "Top 10 Bookmark Managers for Chrome 2024 with Curateit",
        },
        title: "Top 10 Bookmark Managers for Chrome 2024",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/227748/top-10-bookmark-managers-for-chrome-2024",
      },
    ],
  },
};

const BookmarkManager = () => {
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

export default BookmarkManager;
