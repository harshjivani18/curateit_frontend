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
      "The best Kudo alternative you need to use for employee recognition ",
    subTitle:
      "Create stunning online group cards and collections effortlessly. CurateIt helps you build and organize greeting cards and gifts for your office and special occasions, transforming employee recognition into something seamless and visually appealing.",
    features: [
      "Save 90% of time spent organizing group cards and gifts",
      "Simplify sharing and signing group greeting cards",
      "Reduce 95% of disorganized greetings and gifts",
      "Enhance employee morale by 80%",
    ],
    cta: {
      title: "Create collections now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Kudo Alternative.png`,
      altText:
        "The best Kudo alternative you need to use for employee recognition with CurateIt",
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
        title: "Kudo Alternative",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Sarah_Martinez_KA.png`,
      altText:
        "The best Kudo alternative you need to use for employee recognition  with CurateIt",
    },
    name: "Sarah Martinez",
    profession: "Team Lead",
    testimonial:
      "“Using CurateIt for our office group cards has been a fantastic experience. The platform makes it so easy to collect signatures and messages, ensuring everyone feels included. Our team celebrations have never been this organized and fun!”",
  },
  textImageScroll: {
    title: "Create and organise Online Group Cards for Offices & Occasions",
    sections: [
      {
        title:
          "A new way to Organize Group Greeting Cards & Gifts for Employees",
        subtitle:
          "Keep all your group greeting cards and gift collections neatly organized in one place! With CurateIt’s collections feature, easily gather and manage signatures, messages, and contributions for every occasion.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/A new way to Organize Group Greeting Cards & Gifts for Employees.png`,
          altText:
            "A new way to Organize Group Greeting Cards & Gifts for Employees with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title:
          "Streamline Sharing of Group Greeting Cards & Gifts for Employees",
        subtitle:
          "Share and distribute group greeting cards and gifts effortlessly into collections! CurateIt ensures seamless sharing among team members, fostering collaboration and appreciation.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Streamline Sharing of Group Greeting Cards & Gifts for Employees.png`,
          altText:
            "Streamline Sharing of Group Greeting Cards & Gifts for Employees with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Reduce Clutter with Organized Online Greeting Group Cards",
        subtitle:
          "Say goodbye to scattered online greeting cards! CurateIt keeps all your group cards neatly organized, reducing clutter and making it easy to find the right card for any occasion by adding tags, remarks and more!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Reduce Clutter with Organized Online Greeting Group Cards.png`,
          altText:
            "Reduce Clutter with Organized Online Greeting Group Cards with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Enhance Engagement with Memorable Group Greeting Cards",
        subtitle:
          "Create visually appealing and memorable group greeting cards! CurateIt's user-friendly interface encourages participation and engagement, making each greeting card special.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Enhance Engagement with Memorable Group Greeting Cards.png`,
          altText:
            "Enhance Engagement with Memorable Group Greeting Cards with Curateit",
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
    title: "Create memorable collections of wishes with CurateIt",
    subtitle:
      "Watch this tutorial to know how to sort your Online Greeting Group Cards",
    embed: "2KOG-NNcnaQ?si=zFpgS4bpylNvmcLg",
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
        title: "HR Managers",
        subTitle:
          "Stand out across platforms with CurateIt's AI Profile Photo Maker! Craft and customize professional profile photos effortlessly, ensuring a cohesive and impactful online persona that resonates with your audience and enhances your digital brand.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Event Organisers",
        subTitle:
          "Coordinate memorable events with ease using CurateIt's structured group greeting card collections. Streamline the process of collecting well-wishes and messages from attendees, ensuring each event is personalized and unforgettable.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        blob: "Categories",
        icon: "PiUsers",
        title: "Team Leaders",
        subTitle:
          "Facilitate team bonding and recognition with CurateIt's streamlined group greeting card collections. Effortlessly gather team member signatures and messages to celebrate milestones and achievements, fostering a positive team spirit and cohesive work environment.",
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
    title: "Keep Your Online Group Cards for Offices Organized  ",
    subTitle:
      "With CurateIt's group greeting card and gift collection feature, streamline your employee appreciation efforts. Easily organize and share heartfelt messages and gifts, ensuring every recognition moment is memorable and impactful.",
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
        question: "What are group greeting card collections in CurateIt?",
        answer:
          "Group greeting card collections in CurateIt allow you to gather signatures, messages, and contributions from multiple team members or colleagues for special occasions or employee recognition events. These collections make it easy to create personalized and heartfelt greetings that everyone can contribute to.",
      },
      {
        question: "How can CurateIt help streamline office celebrations?",
        answer:
          "CurateIt simplifies office celebrations by providing a platform to organize and manage group greeting cards and gifts efficiently. It allows you to centralize contributions, making it easier to coordinate and ensure everyone is included in the celebration.",
      },
      {
        question: "Can I customize the group greeting cards in CurateIt?",
        answer:
          "Yes, CurateIt offers customization options for group greeting cards. You can personalize the design, add custom messages, and include images or logos to make each card unique and meaningful for the recipient.",
      },
      {
        question: "What is the best Kudo alternative for employee recognition?",
        answer:
          "CurateIt stands out as an excellent alternative to Kudo for employee recognition due to its intuitive interface, efficient organization of group greetings and gifts, and robust customization options. It enhances team engagement and morale through seamless recognition experiences.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(74).png`,
          altText:
            "Step-by-Step Guide on Curateit's Online Group Card Feature with CurateIt",
        },
        title: "Step-by-Step Guide on Curateit's Online Group Card Feature",
        description: "",
        href: "https://www.curateit.com/blog/step-by-step-guide-on-curateits-online-group-card-feature?bid=1r4dkmM",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/102/icons/photo-1717660777297-073e41ed790a`,
          altText:
            "The Ultimate Guide to Top 12 Online Group Cards for Offices",
        },
        title: "The Ultimate Guide to Top 12 Online Group Cards for Offices",
        description: "",
        href: "https://www.curateit.com/blog/the-ultimate-guide-to-top-12-online-group-cards-for-offices?bid=dYocIpo",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/450x450_min/webapp/banner.jpg`,
          altText: "Best Online Group Cards For Offices & Occasions",
        },
        title: "Best Online Group Cards For Offices & Occasions",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/13011/online-group-cards-offices-occasions",
      },
    ],
  },
};

const KudoAlternative = () => {
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

export default KudoAlternative;
