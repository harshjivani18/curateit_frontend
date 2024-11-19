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
      "A simplified way to extract text from the web right from your browser",
    subTitle:
      "No more copy-pasting or reformatting. CurateIt's Web page Text Extractor seamlessly extracts text from any page, delivering a clean, ready-to-use document. Save time and get precise content instantly.",
    features: [
      "Improve research efficiency by 50%",
      "Simplify content collection by 60%",
      "Extract text with 99% accuracy",
      "Save 80% of your time",
    ],
    cta: {
      title: "Extract text from web",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Web Text Extractor.png`,
      altText:
        "A simplified way to extract text from the web right from your browser with CurateIt",
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
        title: "Website Text Extractor",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/James Turner.png`,
      altText:
        "Power up your productivity by building an AI prompts library with CurateIt",
    },
    name: "James Turner",
    profession: "Data Analyst",
    testimonial:
      "“CurateIt's Web page Text Extractor has simply changed how I gather information. It's saved me countless hours of tedious copy-pasting, allowing me to focus on analysing the data instead.”",
  },
  textImageScroll: {
    title: "Get exactly what you need from. Just the text, nothing else.",
    sections: [
      {
        title: "Skip the copy-paste, save time",
        subtitle:
          "Don't waste another second on tedious copying! CurateIt is the only web page text extractor you need to instantly pull the text you need from any website, making your workflow smoother and quicker than ever!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Skip the copy-paste, save time.png`,
          altText: "Skip the copy-paste, save time with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Keep your focus sharp on the content you need",
        subtitle:
          "Pull the exact text you're interested in, with zero hassle. This tool streamlines your browsing by filtering out the noise, so you can stay focused on what truly matters. Ideal for anyone who values precision and efficiency in their digital interactions.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Keep your focus sharp on the content you need.png`,
          altText:
            "Keep your focus sharp on the content you need with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Boost your productivity by accessing key information faster ",
        subtitle:
          "Our text extractor extension for Chrome not only allows you to copy text swiftly but also instantly provides the word count and estimated reading time. This feature helps you manage your schedule more effectively, ensuring you spend your time reading only what's necessary.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Boost your productivity by accessing key information faster.png`,
          altText:
            "Boost your productivity by accessing key information faster  with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Capture clean text from multiple sources in moments",
        subtitle:
          "Gather pristine text from various online sources quickly and easily. This tool eliminates the fuss of manual note-taking and simplifies data collection, letting you compile and compare information without the hassle of formatting issues. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Capture clean text from multiple sources in moments.png`,
          altText:
            "Capture clean text from multiple sources in moments with CurateIt",
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
    title: "See how the CurateIt Website Text Extractor Feature works",
    subtitle:
      "Learn how to enhance your online efficiency by using the Web Text Extractor in our step-by-step tutorial.",
    embed: "26P-NRHPb_Y?si=mDAW7oI8k0AF-yid",
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
          "The Web page Text Extractor simplifies gathering data from diverse online publications, saving valuable research time and allowing for quick, easy analysis of textual content.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Entrepreneurs",
        subTitle:
          "The Web page Text Extractor enables entrepreneurs to swiftly extract crucial market and competitor information from online sources, facilitating faster decision-making and strategic planning.",
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
          "The Web page Text Extractor helps teams efficiently consolidate information from multiple web sources, enhancing collaboration and providing quick access to essential data.",
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
    title: "The last web text extractor that you will download",
    subTitle:
      "Turn any cluttered webpage into a clear text document instantly with CurateIt's Web page Text Extractor. Solid information is just a click away. Simplify your research, enhance your productivity—experience the smarter way to browse.",
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
        question: "What is a Web Text Extractor?",
        answer:
          "A Web Text Extractor is a tool that allows you to automatically pull text content from web pages, stripping away any non-text elements like images and ads, leaving you with clean, readable text. This is particularly useful for research, content creation, and data collection.",
      },
      {
        question: "What is the best Web Text Extractor?",
        answer:
          "CurateIt is regarded as the best Web Text Extractor available. It offers high accuracy, ease of use, and versatility, efficiently extracting text from any web page with just a single click. Users appreciate its ability to preserve the original formatting of the text, making it ready to use immediately.",
      },
      {
        question: "How does a Web Text Extractor enhance productivity?",
        answer:
          "By quickly extracting text from web pages and eliminating the need to manually select, copy, and clean up text, a Web Text Extractor saves time and reduces effort. This allows users to focus more on analyzing the content rather than on tedious data entry tasks.",
      },
      {
        question: "Can Web Text Extractor work on any website?",
        answer:
          "Yes, modern Web Text Extractors like CurateIt are designed to work across a broad range of websites, regardless of their underlying technology.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(28).png`,
          altText:
            "Top 5 Website Text Extractor Extensions in Chrome with CurateIt",
        },
        title: "Top 5 Website Text Extractor Extensions in Chrome",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/209808/top-5-website-text-extractor-extensions-in-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(34).png`,
          altText:
            "Step-by-Step tutorial to use the website text extractor feature with CurateIt",
        },
        title:
          "Step-by-Step tutorial to use the website text extractor feature",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/209809/step-by-step-tutorial-to-use-the-website-text-extractor-feature",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/webapp/banner.jpg`,
          altText: "Top Extensions For Website Text Extractor with Curateit",
        },
        title: "Top Extensions For Website Text Extractor",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/9362/extensions-website-text-extractor",
      },
    ],
  },
};

const WebsiteTextExtractor = () => {
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

export default WebsiteTextExtractor;
