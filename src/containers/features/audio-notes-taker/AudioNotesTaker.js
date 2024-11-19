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
    title: "Never type again—just speak, and your words appear as notes",
    subTitle:
      "Ideas come at the speed of sound; capture them just as fast. Speak into CurateIt and see your audio notes transcribed in real-time, anywhere you browse.",
    features: [
      "Reduce manual note-taking by 100%",
      "Boost productivity with instant notes",
      "Increase comprehension by 75%",
      "Cut transcription time by 90%",
    ],
    cta: {
      title: "Create audio notes",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image (2).png`,
      altText:
        "Never type again—just speak, and your words appear as notes with CurateIt",
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
        title: "Audio notes taker",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Audio Notes Taker Testimonial.png`,
      altText: "CurateIt Universal dark mode Testimonial Profile picture",
    },
    name: "Alex Johnson",
    profession: "Project Manager",
    testimonial:
      "“Audio notes in CurateIt have revolutionised how I manage information. Now, I can just speak my thoughts and have them neatly transcribed and organised, saving me countless hours each week.”",
  },
  textImageScroll: {
    title: "Record, transcribe and organise instantly with Audio Notes Taker",
    sections: [
      {
        title: "Speak your notes, then see them perfectly transcribed",
        subtitle:
          "Never worry about missing details in meetings or lectures again! With CurateIt's Audio Notes feature, simply speak your thoughts and let the system transcribe them into well-organised notes that you can save and revisit anytime.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Speak your notes, then see them perfectly transcribed.png`,
          altText:
            "Speak your notes, then see them perfectly transcribed with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Instantly convert speech to clear, formatted text",
        subtitle:
          "Speak your thoughts and watch as CurateIt turns them into easy-to-understand, perfectly formatted sentences, ready for review whenever you need.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Instantly convert speech to clear, formatted text.png`,
          altText:
            "Instantly convert speech to clear, formatted text with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Neatly arranged audio notes instantly!",
        subtitle:
          "Speak your notes and seamlessly add tags and comments, then save them into organised collections for easy retrieval and reference.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Neatly arranged audio notes instantly!.png`,
          altText: "Neatly arranged audio notes instantly! with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Access your audio notes on any device ",
        subtitle:
          "Our Multi-Device Synchronisation ensures that your spoken thoughts and meeting notes are always within reach. Access your audio notes from any device, at any location, keeping you connected and your information synchronised.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Access your audio notes on any device.png`,
          altText: "Access your audio notes on any device  with CurateIt",
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
    title: "See how the CurateIt Audio Notes Taker works",
    subtitle:
      "Wondering if the Audio Notes Taker is right for you? Let us help you decide!",
    embed: "dsyOUlw7H2I?si=4nMoo963XqYl53Wh",
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
          "Capture detailed research observations on-the-go, record your findings instantly and access them later!",
        cta: {
          title: "Try it out",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Students",
        subTitle:
          "Effortlessly take lecture notes and study anywhere with CurateIt’s audio notes. Record key concepts and discussions directly on CurateIt!",
        cta: {
          title: "Try it out",
          href: `/sign-up`,
        },
      },
      {
        blob: "Categories",
        icon: "PiUsers",
        title: "Teams",
        subTitle:
          "Enhance collaboration and streamline meetings with CurateIt’s audio notes. Record discussions, capture actionable items and access all notes!",
        cta: {
          title: "Try it out",
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
    title: "Capture every discussion with unmatched clarity!",
    subTitle:
      "With CurateIt's audio notes feature, easily record every word during a lecture, meeting or an idea that you have. Review them later , and ensure no critical information slips through the cracks.",
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
        question: "What is an audio notes taker?",
        answer:
          "An audio notes taker is a tool that records spoken words and converts them into written text, allowing for easier review and organisation of information captured in meetings, lectures, or personal reminders.",
      },
      {
        question: "Why is an audio notes taker useful?",
        answer:
          "An audio notes taker is invaluable for anyone looking to save time and improve accuracy in capturing and organising spoken information, making it perfect for students, professionals, and anyone needing to record meetings or lectures.",
      },
      {
        question: "What is the best audio notes taker for Chrome?",
        answer:
          "CurateIt stands out as the best audio notes taker for Chrome, offering seamless integration with your browser, high-quality transcription, and features like offline access and multi-device synchronisation.",
      },
      {
        question:
          "What types of audio can I record with CurateIt's audio notes feature?",
        answer:
          "You can record a variety of audio types with CurateIt, including lectures, meetings, personal voice memos, and group discussions, all designed to be captured clearly for easy transcription and review.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(24).png`,
          altText: "5 Best Audio Notes Extensions in Chrome with Curateit",
        },
        title: "5 Best Audio Notes Extensions in Chrome",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199461/5-best-audio-notes-extensions-in-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/Heading(1).png`,
          altText:
            "Step-By-Step Guide to Using the CurateIt Audio Note-Taking Feature on Curateit",
        },
        title:
          "Step-By-Step Guide to Using the CurateIt Audio Note-Taking Feature",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199462/step-by-step-guide-to-using-the-curateit-audio-note-taking-featur",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/207/icons/photo-1611532736579-6b16e2b50449`,
          altText: "Top Audio Notes Recorder Extensions with Curateit",
        },
        title: "Top Audio Notes Recorder Extensions",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/6532/top-audio-notes-recorder-extensions",
      },
    ],
  },
};

const AudioNotesTaker = () => {
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

export default AudioNotesTaker;
