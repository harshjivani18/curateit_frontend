import dynamic from "next/dynamic";

import FeatureBlocks from "@containers/LandingPages/FeatureBlocks/FeatureBlocks";
import FeatureBlocksMobile from "@containers/LandingPages/FeatureBlocks/FeatureBlocksMobile";
import HeroSection from "@containers/LandingPages/HeroSection/HeroSection";
import Testimonial from "@containers/LandingPages/Testimonial/Testimonial";
import TrustedTeams from "@containers/LandingPages/TrustedTeams/TrustedTeams";
import UserCards from "@containers/LandingPages/UserCards/UserCards";
import VideoShowcase from "@containers/LandingPages/VideoShowcase/VideoShowcase";
import StartNow from "@containers/LandingPages/StartNow/StartNow";
import Faq from "@containers/LandingPages/Faq/Faq";
import Blogs from "@containers/LandingPages/Blogs/Blogs";
import TextImageScrollMobile from "@containers/LandingPages/TextImageScroll/TextImageScrollMobile";
import MoreFeatures from "@containers/LandingPages/MoreFeatures/MoreFeatures";
import Footer from "@components/Footer2/Footer";

const TextImageScroll = dynamic(
  () => import("@containers/LandingPages/TextImageScroll/TextImageScroll"),
  { ssr: false }
);

const CustomNav = dynamic(
  () => import("@components/landingPageTabs/CustomNav"),
  { ssr: false }
);

const data = {
  heroSection: {
    title: "The most reliable web clipper extension you'll find on the web",
    subTitle:
      "Capture text, images, videos, and any content from the web effortlessly using the web clipper, and save everything in one secure spot. It's your digital content, streamlined and simplified.",
    features: [
      "Clip 5+ content formats",
      "Cut down 80% of your organising time",
      "One-click saves everything",
      "Share with 1M+ internet users",
    ],
    cta: {
      title: "Start clipping now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Clipper.png`,
      altText:
        "The most reliable web clipper extension you'll find on the web at CurateIt",
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
        title: "Web Clipper",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/web_clipper_testinmonial_profile.png`,
      altText: "CurateIt Web Clipper Testimonial Profile picture",
    },
    name: "Olivia Hughes",
    profession: "Researcher",
    testimonial:
      "“CurateIt's web clipper tools have transformed how I gather content and research online. It's drastically reduced the time I spend sorting through data.”",
  },
  textImageScroll: {
    title: "Spot something awesome? Clip it using CurateIt!",
    sections: [
      {
        title: "Clip any of your favourite content on the web",
        subtitle:
          "Too much interesting content in your browser? Highlight and clip web pages, articles, or PDFs effortlessly and stash them in CurateIt. Choose to capture full pages or just the bits you need—simple, straightforward, no complications.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Clip any of your favourite content on the web.json`,
          altText:
            "Clip any of your favourite content on the web with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Capture what you need with powerful screenshots",
        subtitle:
          "Whether you require a full-screen image, a specific selected area, or just the contents of a visible tab, CurateIt has you covered. Beyond simple captures, it also provides editing functionalities, allowing you to tweak and refine your screenshots right after taking them.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Capture what you need with powerful screenshots.jpg`,
          altText:
            "Capture what you need with powerful screenshots with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Your notes finally find a place",
        subtitle:
          "Have some important notes made for your clipped content? Don't save it anywhere else - simple add to your clips so you know exactly where to find them.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Your notes finally find a place.jpg`,
          altText: "Your notes finally find a place with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Integrate with other tools you love",
        subtitle:
          "With CurateIt, seamlessly integrate your web clips into the apps and tools you already love. No more switching between apps or losing track of valuable content.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Integrate with other tools you love.jpg`,
          altText: "Integrate with other tools you love with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Extracting text now will be your hobby!",
        subtitle:
          "Effortlessly pull text out of images using CurateIt's OCR feature. Simply hover over an image, and let our extension do the magic. Perfect for when you need to grab quotes or data without the hassle of typing it out yourself.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Extracting text now will be your hobby.json`,
          altText: "Extracting text now will be your hobby! with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
    ],
  },
  videoShowcase: {
    blob: "Explore",
    title: "See how to start clipping content from the web!",
    subtitle:
      "Still on the fence? We can help you understand the web clipper features in this tutorial.",
    embed: "8hKjzNTziN0?si=okM8mG5949UhQAit",
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
        title: "Productivity enthusiasts",
        subTitle:
          "Boost your productivity by clipping content swiftly with CurateIt. Bid farewell to constant searching; welcome a neatly organised collection of all your web discoveries.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Professionals",
        subTitle:
          "Save time and keep your digital workspace tidy, ensuring you stay focused and productive. Perfect for busy professionals juggling multiple tasks.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiUsers",
        title: "Teams",
        subTitle:
          "CurateIt's web clipper lets your team capture, share, and sort web finds in a snap. Say hello to a central hub for all your collaborative content! ",
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
    title: "Capture the best of the web!",
    subTitle:
      "Stumble upon amazing content online only to lose it later? Don’t let that be your story! With CurateIt's web clipper features, you can effortlessly clip text, images, PDFs, videos and much more. Keep everything that matters securely saved and always accessible.",
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
        question: "What is a web clipper?",
        answer:
          "It's a tool that lets you easily save, organise, and access content from the internet, right in your browser.",
      },
      {
        question: "What is the best web clipper for note taking?",
        answer:
          "CurateIt is the go-to web clipper for anyone who wants to easily save, tag, and organise their notes from the web. With its user-friendly features, you can quickly mark your favourite pieces of content, add personal tags, and even add comments.",
      },
      {
        question: "What is the best web clipper extension for Chrome?",
        answer:
          "Among the numerous choices, CurateIt emerges as the top web clipper extension for Chrome, providing an effortless method for capturing, managing, and customising your online finds.",
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
        href: "mailto:support@curateit.com",
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
        asset: "TextExpander",
        title: "Text Expander",
        href: "/features/text-expander",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(2).png`,
          altText:
            "Top 5 Web Clipper Extensions for Google Chrome with CurateIt",
        },
        title: "Top 5 Web Clipper Extensions for Google Chrome",
        description:
          "Remember scouring magazines for the latest range of comics, the hottest scoop on your celeb crush, the most sought-after sartorial pieces, and those stunning concert photos? Back then, the only way to snag those gems was with a trusty pair of scissors and a precious diary.",
        href: "https://www.curateit.com/u/curateit.com/g/197903/the-top-5-tools-to-highlight-and-annotate-web-pages",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Thumbnail(9).png`,
          altText:
            "The Ultimate Step-by-Step Guide to Clip Content from the Web with CurateIt",
        },
        title:
          "The Ultimate Step-by-Step Guide to Clip Content from the Web with CurateIt",
        description:
          "If you've ever felt the frustration of finding a brilliant article online, only to lose it in the abyss of your bookmarks, you know how maddening and cluttered things can get.",
        href: "https://www.curateit.com/u/curateit.com/g/197907/the-ultimate-step-by-step-guide-to-clip-content-from-the-web-with",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/199/icons/photo-1542744095-291d1f67b221`,
          altText:
            "The Best Web Clippers In 2024 You Need To Use with CurateIt",
        },
        title: "The Best Web Clippers In 2024 You Need To Use",
        description:
          "Web clippers are like your digital lifeboats! They help you save, organise, and revisit all the cool stuff you find online without turning your browser into a tab-zilla. Whether it's for research, inspiration, or just keeping track of your must-reads, web clippers are the secret weapon you didn't know you needed.",
        href: "https://www.curateit.com/u/aliza.ai.curateit/c/6261/the-best-web-clippers-in-you-need-to-use",
      },
    ],
  },
};

const WebClipper = () => {
  return (
    <div>
      <CustomNav />
      <div id="web-clipper-page">
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

        <div className="my-10 lg:my-24">
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

export default WebClipper;
