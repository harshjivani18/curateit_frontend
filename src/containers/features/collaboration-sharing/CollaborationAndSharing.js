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
    title: "Create, share and collaborate seamlessly with CurateIt",
    subTitle:
      "Collaboration made easy and fun. CurateIt lets you share and build collections effortlessly, enhancing teamwork and productivity like never before.",
    features: [
      "Share collections with a single click",
      "Collaborate in real-time with your team",
      "Keep everyone updated effortlessly",
      "Boost productivity by 80%",
    ],
    cta: {
      title: "Start sharing collections now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Collaboration and Sharing.png`,
      altText: "Create, share and collaborate seamlessly with CurateIt",
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
        title: "Collaboration and sharing",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Jordan Taylor.png`,
      altText: "Create, share and collaborate seamlessly with CurateIt",
    },
    name: "Jordan Taylor",
    profession: "Project Manager",
    testimonial:
      "“CurateIt's sharing and collaboration tools have been a life-saver for my team. We can easily share ideas and feedback, which has really boosted our creativity and efficiency. It's made working together so much easier and more productive.”",
  },
  textImageScroll: {
    title: "Simplify collaboration with CurateIt's easy sharing features.",
    sections: [
      {
        title: "Faster results through collaborative efforts",
        subtitle:
          "Share effortlessly and boost productivity! CurateIt lets your team add and access valuable content from anywhere, streamlining your workflow and speeding up projects. Work smarter by sharing more!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Faster results through collaborative efforts.png`,
          altText: "Create custom template s of AI Prompts with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Collaborate across the board or in small squads!",
        subtitle:
          "Need to loop everyone in? Or just a few key players? Manage any team size effortlessly with CurateIt's flexible sharing and collaboration features like public or private collections, ensuring everyone stays connected, whether it's the whole company or a select group.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Collaborate across the board or in small squads!.png`,
          altText:
            "Collaborate across the board or in small squads with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Create your team, spark your creativity",
        subtitle:
          "Adding the right people can turn any project into a masterpiece. Invite friends or colleagues to join your team on CurateIt. Together, discover and share gems that drive excellence.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Create your team, spark your creativity.png`,
          altText: "Create your team, spark your creativity with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Invite, collaborate, and create without limits.",
        subtitle:
          "Bringing your team together is as simple as sending an email or sharing a link. With CurateIt, you can invite colleagues to view, edit, or manage collections as workspace collaborators. Empower your team to contribute and control, fostering a workspace that's as dynamic as your ideas.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Invite, collaborate, and create without limits..png`,
          altText:
            "Invite, collaborate, and create without limits. with CurateIt",
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
    title: "See how the CurateIt Collaboration Features works",
    subtitle:
      "Get to know all about sharing and collaborating collections on CurateIt on this video.",
    embed: "uzFeKMRHibo?si=udbE16a0j8VB4TYw",
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
          "Group projects made easy! Streamline your study sessions with CurateIt's sharing and collaboration features. Invite classmates via email or link to view, edit, or own parts of your project. ",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Researchers",
        subTitle:
          "CurateIt's sharing and collaboration tools allow you to invite peers via email or link to jointly edit, view, and manage research materials. Accelerate discoveries and refine your studies by working smarter together.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiUsers",
        title: "Teams",
        subTitle:
          "CurateIt enables seamless integration of new members with simple email invites or direct links. Customise access levels from viewing to full ownership and watch as collaboration enhances efficiency and sparks innovation across your projects.",
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
    title: "Speed up teamwork with CurateIt's collaboration features",
    subTitle:
      "Don't let collaboration slow you down. Use CurateIt's powerful sharing and collaboration features to connect instantly, align quickly, and focus on what truly matters—getting great work done together.",
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
        question: "How can I invite someone to collaborate on CurateIt?",
        answer:
          "You can invite others to collaborate by sending them an email or a link directly from the platform. They can then view, edit, or manage content based on the permissions you set.",
      },
      {
        question: "Can I limit what my collaborators can see and do?",
        answer:
          "Yes, you can set different access levels for each collaborator, including view-only, edit, and ownership rights.",
      },
      {
        question: "Is CurateIt suitable for large teams?",
        answer:
          "Yes, CurateIt works well for both small groups and large teams, facilitating effective communication and project management across any number of participants.",
      },
      {
        question: "How does CurateIt help in managing team projects?",
        answer:
          "CurateIt provides tools that allow you to share collections and communicate comments in real-time, helping keep everyone aligned and informed.",
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

const CollaborationAndSharing = () => {
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

export default CollaborationAndSharing;
