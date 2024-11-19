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
    title: "Power up your productivity by building an AI prompts library",
    subTitle:
      "Stop wrestling with complex AI tasks. Create the ultimate AI prompts library with CurateIt to simplify and accelerate your workflows.",
    features: [
      "Boost productivity by 70%",
      "Create 1000+ custom AI prompts",
      "Reduce 95% of redundant work",
      "Save up to 15+ hours weekly",
    ],
    cta: {
      title: "Start curating AI prompts",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero%20Image%20AI%20Prompt.png`,
      altText:
        "Power up your productivity by building an AI prompts library with CurateIt",
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
        title: "AI-Prompts",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/testimonial_profile (1).png`,
      altText:
        "Power up your productivity by building an AI prompts library with CurateIt",
    },
    name: "Alex Johnson",
    profession: "Social Media Specialist",
    testimonial:
      "“Using CurateIt's AI prompt feature has really simplified my social media planning. It helps me generate fresh ideas quickly, making my campaigns more engaging and effective. I can't imagine doing my job without it now.”",
  },
  textImageScroll: {
    title: "Now you'll never have to start work from scratch again!",
    sections: [
      {
        title: "Create custom templates of AI Prompts",
        subtitle:
          "With CurateIt, you can build a custom library of AI prompt templates so you never have to lose time typing the same prompts again and again!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Create-custom-template-of-AI-Prompts.json`,
          altText: "Create custom templates of AI Prompts with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Easy sorting and categorisation of prompts",
        subtitle:
          "Keep your AI prompts neat and navigable! With CurateIt's tagging and categorisation features, you can quickly organise your AI Prompts collections into tidy sections for easy retrieval.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Easy-sorting-and-categorisation-of-prompts.json`,
          altText: "Easy sorting and categorisation of prompts with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Use prompts across multiple AI platforms",
        subtitle:
          "CurateIt's integration features make your AI prompts play nice with all your favourite AI platforms. Seamless, smooth, and a bit of a show-off—work across AI platforms with your custom prompts.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Use%20prompts%20across%20multiple%20AI%20platforms.png`,
          altText: "Use prompts across multiple AI platforms with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Keep your prompts to yourself or share with the world!",
        subtitle:
          "With CurateIt, you're the boss of your AI prompts. Choose to keep them private or share your prompts collection with the world. Customise your collection's visibility to suit your strategy, all in a few clicks.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Keep%20your%20prompts%20to%20yourself%20or%20share%20with%20the%20world.png`,
          altText:
            "Keep your prompts to yourself or share with the world! with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Save prompts from the web in a click",
        subtitle:
          "Ever stumble upon a genius AI prompt while surfing the web? With CurateIt, you can snap it up in seconds and store it in your collection. Whether it's for tweaking later or using as-is, keep all those prompts neatly organised.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Save%20prompts%20from%20the%20web%20in%20a%20click.png`,
          altText: "Save prompts from the web in a click with CurateIt",
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
    title: "See how the CurateIt AI Prompts feature works",
    subtitle:
      "Still need a hand to know how the AI prompts really work? Let us help you out with this tutorial.",
    embed: "OHiJPmQty6U?si=9QcaADNnA-oMHCk_",
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
          "CurateIt's AI prompts feature lets creators store all creative prompts in one place and use them to leverage AI tools, making content creation faster and more streamlined. ",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Marketers",
        subTitle:
          "Have a lot of campaigns to manage? Using CurateIt you can create exclusive prompts library to keep your creative ideas lined up and ready to deploy, whenever you need them.",
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
          "CurateIt's AI prompts are a team's dream! Store, share, and access AI prompts with your team all in one place. It keeps everyone aligned and creative juices flowing—effortlessly.",
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
    title: "Working with AI never felt this good!",
    subTitle:
      "Everyone uses AI, but you can streamline and make this work faster with CurateIt. Create custom AI prompts to accelerate your workflow and achieve more in less time—effortlessly with CurateIt's AI Prompts feature.",
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
        question: "What is an AI prompt?",
        answer:
          "An AI prompt is like a question or command you give to an artificial intelligence system to generate specific outputs or perform certain tasks. You tell it what you need, like asking for homework help or generating a story, and it gives you a personalised response.",
      },
      {
        question: "What is the structure of a prompt?",
        answer:
          "The structure of a prompt typically includes a clear command or question, any necessary context or details, and specific criteria for the desired output. This setup helps guide the AI to understand and fulfil the request accurately. Try to be concise, definite and articulate with a clear objective.",
      },
      {
        question: "What is the best AI prompts library extension for Chrome?",
        answer:
          "The best AI prompts library extension for Chrome is CurateIt. That's because it offers a user-friendly interface and powerful features to create, manage, and deploy AI prompts efficiently. \n Whether you're looking to streamline repetitive tasks or enhance your creative processes, CurateIt provides the tools you need to harness the power of AI directly within your browser.",
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
        href: "/",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(19).png`,
          altText: "Top 7 AI Prompts Library Extension for Google Chrome",
        },
        title: "Top 7 AI Prompts Library Extension for Google Chrome",
        description:
          "Lost the specific AI prompt you're looking for? Now you have to retype it or look for it amongst the many you've saved in a document somewhere. Re-typing prompts you re-use regularly or looking for them in documents can be time-consuming.",
        href: "https://www.curateit.com/u/curateit.com/g/197988/top-7-ai-prompts-library-extension-for-google-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/Thumbnail(5).png`,
          altText:
            "Step-By-Step Guide to Using the CurateIt AI Prompt feature with CurateIt",
        },
        title: "Step-By-Step Guide to Using the CurateIt AI Prompt feature",
        description:
          "According to Opensource, 45% of people have more than 20 tabs open at a given time. If you've ever stared at the numerous open tabs on your computer and felt overwhelmed, know that you're not alone.",
        href: "https://www.curateit.com/u/curateit.com/g/197923/step-by-step-guide-to-using-the-curateit-ai-prompt-feature",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/207/icons/photo-1697577418970-95d99b5a55cf`,
          altText: "Best AI Prompt Library Tools with Curateit",
        },
        title: "Best AI Prompt Library Tools",
        description:
          "Today, let me Curt, take you into the fascinating world of AI prompt libraries. Whether you're a tech newbie or a seasoned AI enthusiast, understanding what an AI prompt library is and why it's becoming a crucial tool in our digital arsenal is key.",
        href: "https://www.curateit.com/u/Curt/c/8212/ai-prompt-library-tools",
      },
    ],
  },
};

const AiPrompts = () => {
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

export default AiPrompts;
