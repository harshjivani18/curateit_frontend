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
    title: "Zoom through text faster than conversation with Speed Reading",
    subTitle:
      "Life moves fast—don't let slow reading hold you back. With CurateIt's Speed Reader, you can zip through your pages quickly and efficiently, perfect for anyone eager to learn without the wait.",
    features: [
      "Read at lightning speed",
      "2x your comprehension rate",
      "Retain information 50% faster",
      "Save over 4 hours daily",
    ],
    cta: {
      title: "Start speed reading",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image.png`,
      altText:
        "Zoom through text faster than conversation with Speed Reading with CurateIt",
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
        title: "Speed reading",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Speed Reading Testimonial.png`,
      altText: "CurateIt Universal dark mode Testimonial Profile picture",
    },
    name: "Emily Carter",
    profession: "Law Student",
    testimonial:
      "“CurateIt's Speed Reader transformed my study sessions. I'm zipping through my weekly readings in no time—it's genuinely saved me hours each day.”",
  },
  textImageScroll: {
    title: "A new way to maximise your reading sessions with speed!",
    sections: [
      {
        title: "Zoom through your reading list without breaking a sweat",
        subtitle:
          "Don't let slow reading drag you down! With CurateIt's Speed Reader, cruise through complex texts and get more done within seconds!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Zoom through your reading list without breaking a sweat.png`,
          altText:
            "Zoom through your reading list without breaking a sweat with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Unlock focused, fast-paced reading",
        subtitle:
          "Engage deeply with each word, grasp complex ideas more easily, and finish your reading goals swiftly and effectively. Experience reading with improved understanding and without sacrificing detail.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Unlock focused, fast-paced reading.png`,
          altText: "Unlock focused, fast-paced reading with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Adjust reading speeds to fit your pace",
        subtitle:
          "Not everyone reads at the same speed. Customise your reading flow with the speed reading feature, whether you're scanning or diving deep into the text!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Adjust reading speeds to fit your pace.png`,
          altText: "Adjust reading speeds to fit your pace with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Enhance focus with customised word recognition",
        subtitle:
          "This personalised reading experience not only speeds up your information processing but also enhances your understanding of the content, making each session more effective and easy to grasp. Discover a smarter way to read, where focus and speed align seamlessly.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Enhance focus with customised word recognition.png`,
          altText:
            "Enhance focus with customised word recognition with CurateIt",
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
    title: "See how the CurateIt Speed reading works",
    subtitle:
      "Wondering if the Speed reading is right for you? Let us help you decide!",
    embed: "b4Yf5JOEFYI?si=QTm7-h-ItHnlJqEc",
    cta: {
      title: "Try it by yourself",
      href: `/sign-up`,
    },
  },
  userCards: {
    blob: "Categories",
    title: "Best for students, individuals as well as teams",
    cards: [
      {
        icon: "PiPaintBrush",
        title: "Students",
        subTitle:
          "Buried under a mountain of study materials? Fly through your reading assignments and stay on top of your workload with CurateIt's Speed Reader",
        cta: {
          title: "Try it out",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Productivity enthusiasts",
        subTitle:
          "Maximise your efficiency and tackle your extensive reading list in record time with CurateIt's Speed Reader—perfect for productivity buffs looking to enhance their workflow.",
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
          "Boost team efficiency and streamline collaborative learning —ideal for teams needing to stay informed and agile in a fast-paced environment.",
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
    title: "Speed up reading sessions like never before!",
    subTitle:
      "Prolonged reading on glaring screens can be exhausting and strain your eyes. Enhance your reading speed with CurateIt designed to make your reading sessions efficient and less tiring!",
    cta: {
      title: "Try CurateIt for free",
      href: "/",
    },
  },
  faq: {
    title: "Frequently asked questions",
    subTitle: "Everything you need to know about the product and billing.",
    faqs: [
      {
        question: "What is speed reading?",
        answer:
          "Speed reading is a technique that allows you to read material much faster than the average reading speed. It involves minimising subvocalisation (saying words in your mind as you read), enhancing your eye movement, and increasing your focus to cover and comprehend large blocks of text quickly.",
      },
      {
        question: "How does CurateIt's Speed Reader help me read faster?",
        answer:
          "CurateIt's Speed Reader uses advanced algorithms to guide your eyes through text in an optimal way, reducing the time spent on each page and increasing your overall reading speed while maintaining comprehension.",
      },
      {
        question: "Can I adjust the speed settings on CurateIt's Speed Reader?",
        answer:
          "Absolutely! You can customise the speed settings to match your current reading level and increase it as you become more comfortable with speed reading techniques.",
      },
      {
        question:
          "Is speed reading suitable for all types of reading material?",
        answer:
          "Speed reading is most effective for reading non-fiction and informational texts where the goal is to acquire and retain information quickly. It may be less suitable for complex literature that requires in-depth analysis and reflection.",
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
      title: "More Blogs",
      href: "https://www.curateit.com/u/curateit.com/c/8197/blogs",
    },
    blogs: [
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(38).png`,
          altText:
            "Best 5 Speed Reading Extensions for Google Chrome with Curateit",
        },
        title: "Best 5 Speed Reading Extensions for Google Chrome",
        description: "",
        href: "https://www.curateit.com/blog/best-5-speed-reading-extensions-for-google-chrome?bid=nShC-JM",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Heading.png`,
          altText:
            "Step-By-Step Guide to Using the CurateIt Speed Reading feature on Curateit",
        },
        title: "Step-By-Step Guide to Using the CurateIt Speed Reading feature",
        description: "",
        href: "https://www.curateit.com/blog/step-by-step-guide-to-using-the-curateit-speed-reading-feature?bid=1lntK35",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/207/icons/BlueModernSecurityandTechnologyPresentation(46).png`,
          altText: "Best 10 Speed Reading Extension",
        },
        title: "Best 10 Speed Reading Extension",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/7588/best-speed-reading-extensions",
      },
    ],
  },
};

const SpeedReading = () => {
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

export default SpeedReading;
