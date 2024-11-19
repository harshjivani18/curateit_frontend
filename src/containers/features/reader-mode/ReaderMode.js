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
    title: "Enter a world of unbelievably calm and focused reading",
    subTitle:
      "Frustrated by pop-ups and ads while trying to read important stuff online? Switch to CurateIt's Reader Mode and experience distraction-free reading.",
    features: [
      "Block 100% of ads and pop-ups",
      "Adjust text size and more with one click",
      "Annotate directly on pages",
      "Increase comprehension by 70%",
    ],
    cta: {
      title: "Start focused reading now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Reader mode.png`,
      altText:
        "Slash your typing efforts in half with the most efficient text expander with CurateIt",
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
        title: "Reader Mode",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/reader_mode_testimonial_profile.png`,
      altText: "CurateIt Tabs Manager Testimonial Profile picture",
    },
    name: "Emily Carter",
    profession: "Content Strategist",
    testimonial:
      "“Reader Mode has completely transformed my online reading experience. No more distractions, just pure focus. It's seriously boosted my productivity and understanding.”",
  },
  textImageScroll: {
    title:
      "Rediscover the joy of reading online - no ads, no stops, just content.",
    sections: [
      {
        title: "Experience blogs and articles with zero interruptions!",
        subtitle:
          "Enjoy a cleaner, simpler interface that turns your reading into a seamless and engaging experience. No ads, sidebars or pop-ups, allowing you to focus solely on the content that matters.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Experience blogs and articles with zero interruptions!.jpg`,
          altText:
            "Experience blogs and articles with zero interruptions with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Max out your screen, switch to full screen and save it!",
        subtitle:
          "CurateIt's Reader Mode lets you blow up the text to full screen, switch to eye-friendly dark or light mode, even download articles as PDFs or plain text. It's your reading, your rules—just more comfy.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Max out your screen, switch to full screen and save it.jpg`,
          altText:
            "Max out your screen, switch to full screen and save it with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Listen to articles on the go in different languages",
        subtitle:
          "Pop in your earbuds and turn articles into mini podcasts! Our listening feature lets you choose from a bunch of voices and languages, so you can have your articles read out in anything from a soothing British accent to a cheerful Spanish tone.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Listen to articles on the go in different languages.json`,
          altText:
            "Listen to articles on the go in different languages with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Customise fonts for better reading",
        subtitle:
          "No matter what you are reading, now you can customise the font style, change the size and even change its colour! Perfect for a comfy ready.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Customise fonts for better reading.jpg`,
          altText: "Customise fonts for better reading with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Fast-Forward Your Reading to 5X Speed!",
        subtitle:
          "Want to read super fast? Through CurateIt's Reader Mode feature, you can speed up your reading by 0.5x, 1x, 1.5x, 2x, or even 5x so that you can finish books or articles in a snap.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Fast-Forward Your Reading to 5X Speed.jpg`,
          altText: "Fast-Forward Your Reading to 5X Speed! with CurateIt",
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
    title: "See how the CurateIt Reader Mode feature works",
    subtitle:
      "Wondering if the Reader Mode is right for you? Let us help you decide!",
    embed: "PD9I2LFsR48?si=b04gNyh4Hbe9XF3u",
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
          "Clear the clutter and focus on your studies with CurateIt's Reader Mode. Perfect for students who need to zero in on what matters without distractions.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Researchers",
        subTitle:
          "Great for researchers to turn off ads or unnecessary elements while reading online for maximum concentration. ",
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
          "Reader Mode keeps teams on the same page by creating a distraction-free environment where everyone can focus on essential content without ads. ",
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
    title: "Distraction-free reading now made super easy!",
    subTitle:
      "Tired of cluttered web pages? With CurateIt's Reader Mode feature, you can strip away ads, pop-ups, and unnecessary images to focus solely on the text. Enjoy a cleaner, clearer reading experience that lets you absorb information without distractions.",
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
        question: "What does reader mode mean?",
        answer:
          "Reader mode is a feature that simplifies a webpage's layout, removing ads, pop-ups, and background elements to provide a clean, uncluttered text view. This helps improve focus and readability by presenting the content in a streamlined format.",
      },
      {
        question: "How do I open reader mode?",
        answer:
          "It's quite easy to switch on the Reader Mode when you have the CurateIt extension downloaded for Chrome.\n To open it, simply click on the reader mode button in the Curateit extension. This will switch on reader mode for the webpage you're currently viewing.",
      },
      {
        question: "Is the reader mode useful?",
        answer:
          "Yes, reader mode is incredibly useful as it clears away clutter like ads and pop-ups from web pages, allowing for a cleaner and more focused reading experience. This makes absorbing information easier and faster, especially when you're studying or researching.",
      },
      {
        question: "Can we turn on dark mode while reading online?",
        answer:
          "Yes, with CurateIt's reader mode, you can easily switch to dark mode while reading online. This feature enhances readability and reduces eye strain!",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(18).png`,
          altText:
            "5 Best Chrome Extensions for Reading Articles with CurateIt",
        },
        title: "5 Best Chrome Extensions for Reading Articles",
        description:
          "So, you've probably been there - a browser window so crowded with tabs you can't even see the icons anymore. Sound familiar? 😅 Tab manager apps are like the superheroes of the internet world.",
        href: "https://www.curateit.com/u/curateit.com/g/197920/5-best-chrome-extensions-for-reading-articles",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Thumbnail(4).png`,
          altText:
            "Step-By-Step Guide to Using the CurateIt Reader Mode Feature with CurateIt",
        },
        title: "Step-By-Step Guide to Using the CurateIt Reader Mode Feature",
        description:
          "According to Opensource, 45% of people have more than 20 tabs open at a given time. If you've ever stared at the numerous open tabs on your computer and felt overwhelmed, know that you're not alone.",
        href: "https://www.curateit.com/u/curateit.com/g/197921/step-by-step-guide-to-using-the-curateit-reader-mode-feature",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/199/icons/engage-reader_793b048514.jpg`,
          altText: "Hand-Picked Reader Mode Extensions For Chrome",
        },
        title: "Hand-Picked Reader Mode Extensions For Chrome",
        description:
          "In the vast expanse of the internet, finding a quiet space to focus on reading can be a task. This is where reader mode extensions for Chrome come to the rescue.",
        href: "https://www.curateit.com/u/aliza.ai.curateit/c/6500/hand-picked-reader-mode-extensions-for-chrome",
      },
    ],
  },
};

const ReaderMode = () => {
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

export default ReaderMode;
