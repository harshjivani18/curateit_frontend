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
    title: "Consuming content on YouTube within seconds on CurateIt ",
    subTitle:
      "Videos fast-tracked to their key points. CurateIt slices through the mundane, delivering YouTube content the way you always wished it would be: quick, concise, and to the point.",
    features: [
      "Reduce 95% unnecessary content",
      "Save 90% of your viewing time",
      "Reduce video fatigue by 60%",
      "Skip 70% redundant parts",
    ],
    cta: {
      title: "Summarise YouTube Videos now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image YT Highlighter.png`,
      altText: "Consuming content on YouTube within seconds on CurateIt ",
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
        title: "Youtube Summariser",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Alex_Reed_TM.png`,
      altText: "Consuming content on YouTube within seconds on CurateIt ",
    },
    name: "Alex Reed",
    profession: "Content Creator",
    testimonial:
      "“CurateIt's YouTube summariser has changed how I consume content for my creative projects. It helps me grasp essential insights from lengthy videos in minutes, saving me countless hours each week.”",
  },
  textImageScroll: {
    title: "Who has time for long videos? Get the summary with CurateIt.",
    sections: [
      {
        title: "Transcribe YouTube videos in seconds, effortlessly",
        subtitle:
          "Don't miss a word from your favourite videos! With CurateIt's YouTube transcriber, capture and review every detail in text instantly!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Transcribe YouTube videos in seconds, effortlessly.png`,
          altText:
            "Transcribe YouTube videos in seconds, effortlessly with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "AI summaries at warp speed!",
        subtitle:
          "Long videos? Who has the time! \n Catch the key points in moments with CurateIt's AI-powered summaries and make time for more fun stuff.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/AI summaries at warp speed!.png`,
          altText: "AI summaries at warp speed! with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Directly import YouTube videos into collections",
        subtitle:
          "Who says you need to watch videos to keep them? Import YouTube videos directly into your CurateIt collections and save them for when you actually have time!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Directly import YouTube videos into collections.png`,
          altText:
            "Directly import YouTube videos into collections with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Highlight, tag, and save YouTube moments in a click!",
        subtitle:
          "No need to scramble for pen and paper during crucial video scenes. Just highlight, annotate, and tag directly in YouTube videos with CurateIt, making those key moments instantly recallable for later!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Highlight, tag, and save YouTube moments in a click!.png`,
          altText:
            "Highlight, tag, and save YouTube moments in a click! with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Screenshot YouTube videos instantly!",
        subtitle:
          "Ever wish you could freeze-frame the action? With CurateIt, snap a screenshot at just the right moment in a YouTube video and save it to your collection for easy reference later!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Screenshot YouTube videos instantly!.json`,
          altText: "Screenshot YouTube videos instantly! with CurateIt",
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
    title: "See how the CurateIt YouTube Summariser feature works",
    subtitle:
      "Still need a hand to know how the YouTube Summariser really work? Let us help you out with this tutorial.",
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
        title: "Creators",
        subTitle:
          "Overwhelmed by endless video content? Zip through with CurateIt's YouTube summariser and scoop up all the juicy ideas fast!",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Marketers",
        subTitle:
          "Swamped with content but short on time? Use CurateIt's YouTube summariser to catch the trends, annotate insights, and screenshot key moments—streamline your strategy and execute with precision!",
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
          "With CurateIt's YouTube summariser, your team can quickly grasp key points, annotate collaboratively, and share screenshots to ensure no detail is missed. Keep your projects aligned and moving swiftly!",
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
    title: "Fast-forward to the good part with CurateIt's YouTube summariser.",
    subTitle:
      "Don't get bogged down by lengthy videos. Use CurateIt's YouTube summariser to leap straight to the crucial parts and save valuable time.",
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
        question: "What is a YouTube summariser?",
        answer:
          "A YouTube summariser is a tool that uses AI to analyse a video and distill it into a brief summary, capturing the main points and important details. This allows you to understand the essence of a video without having to watch it in its entirety.",
      },
      {
        question: "How does CurateIt's YouTube summariser work?",
        answer:
          "CurateIt's YouTube summariser uses advanced AI to scan through a video and extract the key points, providing you with a condensed version of the content. This allows you to quickly grasp the essential information without watching the entire video.",
      },
      {
        question: "Is it possible to save and share the summarised content?",
        answer:
          "Absolutely! After summarising a YouTube video with CurateIt, you can easily save the summary in your collections and share it directly with colleagues or friends. This makes it incredibly convenient for group studies, collaborative projects, or just keeping a personal archive.",
      },
      {
        question: "Which is the best YouTube video summariser?",
        answer:
          "CurateIt is the top choice for YouTube video summarising. It combines powerful AI with user-friendly features to quickly deliver concise, accurate summaries of videos, making it an invaluable tool for anyone looking to save time and enhance their productivity.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(26).png`,
          altText:
            "Top 10 Youtube Summary Generator Extensions for Chrome with CurateIt",
        },
        title: "Top 10 Youtube Summary Generator Extensions for Chrome",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199738/top-10-youtube-summary-generator-extensions-for-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/102/icons/photo-1501854140801-50d01698950b`,
          altText:
            "Step-by-Step Guide to Using the Curateit's Youtube Summariser with CurateIt",
        },
        title: "Step-by-Step Guide to Using the Curateit's Youtube Summariser",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199739/step-by-step-guide-to-using-the-curateits-youtube-summariser",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/collection/8038/cover/photo-1567606404839-dea8cec4d278`,
          altText: "Top Youtube Video Summarisers with Curateit",
        },
        title: "Top Youtube Video Summarisers",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/8038/top-youtube-video-summarizers",
      },
    ],
  },
};

const YoutubeSummariser = () => {
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

export default YoutubeSummariser;
