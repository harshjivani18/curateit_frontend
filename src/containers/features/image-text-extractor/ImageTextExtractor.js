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
      "Skip the typing — the Image Text Extractor Extension for Chrome extracts text from images in a flash",
    subTitle:
      "Struggling to copy text from images? Let CurateIt's Image Text Extractor Extension for Chrome simplify your digital life. Extract, edit, and share — all with a single click.",
    features: [
      "Increase extraction efficiency by 50%",
      "Reduce manual typing by 75%",
      "Boost productivity by 10x",
      "Save 5+ hours weekly",
    ],
    cta: {
      title: "Extract text now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Image Text Extractor.png`,
      altText:
        "Skip the typing — the Image Text Extractor Extension for Chrome extracts text from images in a flash on CurateIt ",
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
        title: "Image Text Extractor",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Sarah Williams.png`,
      altText: "Skip the typing on CurateIt ",
    },
    name: "Sarah Williams",
    profession: "Researcher",
    testimonial:
      "“I used to spend ages typing out text from images. With CurateIt’s Image Text Extractor Extension for Chrome, I save so much time each week. It’s made my work so much easier and faster.”",
  },
  textImageScroll: {
    title:
      "Reduce typing effort with the Image Text Extractor Extension for Chrome.",
    sections: [
      {
        title: "Save time with online image text extractor",
        subtitle:
          "With CurateIt's online image text extractor, quickly convert text from images into editable content. No more tedious manual typing and enjoy a faster, more efficient workflow that allows you to focus on what truly matters.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Save time with online image text extractor.json`,
          altText: "Save time with online image text extractor with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Increase productivity with online image text extractor",
        subtitle:
          "Streamline your tasks by instantly turning image text into usable content. This tool helps you accomplish more in less time, boosting your overall productivity and efficiency.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Increase productivity with online image text extractor.png`,
          altText:
            "Increase productivity with online image text extractor with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Enhance accuracy with online image text extractor",
        subtitle:
          "Minimise errors by directly extracting text from images with CurateIt's Image Text Extractor Extension for Chrome. This tool ensures precise text conversion, reducing the risk of mistakes and improving the quality of your work.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Enhance accuracy with online image text extractor.png`,
          altText:
            "Enhance accuracy with online image text extractor with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Supports multiple formats",
        subtitle:
          "CurateIt's online image text extractor uses advanced OCR technology to efficiently handle a variety of image formats, including JPEG, PNG, and GIF. This capability allows you to extract both text and codes from almost any image, enhancing your ability to manage and utilize digital content effectively.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Supports multiple formats.png`,
          altText: "Supports multiple formats with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Boost accessibility with online image text extractor",
        subtitle:
          "This feature empowers you to work with information previously locked in image formats, making it easier to integrate and repurpose data across different platforms and projects.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Boost accessibility with online image text extractor.png`,
          altText:
            "Boost accessibility with online image text extractor with CurateIt",
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
    title: "See how the CurateIt Image Text Extractor works.",
    subtitle:
      "This tutorial makes it easier to understand how the image text extractor works",
    embed: "Ztm6Iox2RxY?si=RU7OpCquoT5-nYEG",
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
        title: "Creators",
        subTitle:
          "Use the online image text extractor to seamlessly integrate text from visual sources into their content. This is invaluable for bloggers, graphic designers and video producers who frequently use quotes, data and insights from various images.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Students",
        subTitle:
          "Leverage the online image text extractor for their academic research and project creation. This tool is ideal for extracting important information from scanned documents, textbook images, and study materials, helping them organize and cite sources efficiently.",
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
          "This tool is perfect for extracting data from charts, graphs, and documents during collaborative projects, ensuring all team members have quick access to crucial information and maintain alignment on tasks.",
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
    title: "Quickly convert image text into editable content!",
    subTitle:
      "Effortlessly extract text from images and turn it into editable, usable data. With CurateIt's Image Text Extractor Extension for Chrome, streamline your workflow and save valuable time by bypassing manual data entry.",
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
        question: "What is an image text extractor?",
        answer:
          "An image text extractor is a tool designed to automatically convert text that is captured in image format into editable, digital text. This technology, often powered by OCR (Optical Character Recognition), enables users to extract text from photos, scanned documents, and digital images quickly and accurately, eliminating the need for manual transcription.",
      },
      {
        question: "Why use an image text extractor?",
        answer:
          "Using an image text extractor like CurateIt's Image Text Extractor Extension for Chrome enhances your ability to quickly turn visual content into editable text. This is invaluable for anyone looking to save time, increase productivity, and reduce the hassle of manually retyping text from images.",
      },
      {
        question: "What is the best way to extract text from images in Chrome?",
        answer:
          "With the CurateIt Image Text Extractor Extension for Chrome, you can seamlessly extract text directly from images on the web. This tool integrates smoothly into your browser, allowing you to convert image text to editable format with just a click, without ever leaving your web page.",
      },
      {
        question: "What is the best image text extractor extension for Chrome?",
        answer:
          "The CurateIt Image Text Extractor Extension for Chrome stands out as one of the top choices for extracting text from images. It uses advanced OCR technology to accurately capture text from any image, supporting a wide range of formats and providing a user-friendly interface to streamline your digital tasks.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(33).png`,
          altText:
            "Step-By-Step Guide to Using the CurateIt's Image Text Extractor",
        },
        title:
          "Step-By-Step Guide to Using the CurateIt's Image Text Extractor",
        description:
          "If you’re constantly matching and remixing colours for your projects, the struggle to pinpoint and reproduce the exact shades you need can be incredibly frustrating. 😩",
        href: "https://www.curateit.com/u/curateit.com/g/209800/guide-to-using-curateit-image-text-extractor",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/102/icons/photo-1719216324718-51c2729c5bfc`,
          altText:
            "The Ultimate Guide to Top 10 Image Text Extractors for Busy Professionals in 2024",
        },
        title:
          "The Ultimate Guide to Top 10 Image Text Extractors for Busy Professionals in 2024",
        description:
          "Ever found yourself buried under a mountain of images – infographics, research papers brimming with diagrams, and screenshots of code that seem more cryptic than a secret society's handbook?",
        href: "https://www.curateit.com/blog/10-image-text-extractors?bid=AmOC1Ug",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/102/icons/photo-1717511140281-52586e5e307d`,
          altText: "Top 5 Image Text Extractor Extensions For Chrome",
        },
        title: "Top 5 Image Text Extractor Extensions For Chrome",
        description: "Top 5 Image Text Extractor Extensions For Chrome in 2024",
        href: "https://www.curateit.com/u/Curt/c/8583/top-5-image-text-extractor-extensions-for-chrome",
      },
    ],
  },
};

const ImageTextExtractor = () => {
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

export default ImageTextExtractor;
