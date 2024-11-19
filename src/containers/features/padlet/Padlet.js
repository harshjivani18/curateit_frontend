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
      "The best Padlet alternative for creating stunning curated collections",
    subTitle:
      "CurateIt makes it easy to arrange and present everything you curate online in ways that are clear and attractive.",
    features: [
      "Save 90% time on content organisation",
      "Organise curated content beautifully",
      "Effortlessly share curated content",
      "Enhance efficiency by 80% ",
    ],
    cta: {
      title: "Create collections now",
      href: "/sign-up",
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Padelet.png`,
      altText:
        "The best Padlet alternative for creating stunning curated collections with CurateIt",
    },
    breadcrumbs: [
      {
        title: "Home",
        href: "/sign-up",
        active: false,
      },
      {
        title: "Features",
        href: "/features",
        active: false,
      },
      {
        title: "Padlet",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Lauren_White_Padlet.png`,
      altText:
        "The best Padlet alternative for creating stunning curated collections with CurateIt",
    },
    name: "Lauren White",
    profession: "Social Media Marketer",
    testimonial:
      "“CurateIt's collection feature has enhanced my ability to manage online content. It allows me to keep my resources well-organised and readily available, boosting my productivity.”",
  },
  textImageScroll: {
    title: "Turn curated content into eye-catching collections with CurateIt",
    sections: [
      {
        title: "Keep your curated content organised ",
        subtitle:
          "CurateIt's collections feature helps you neatly sort and manage all your curated materials in one place. Easily find and access resources whenever you need them, ensuring a streamlined workflow and efficient organisation.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Keep your curated content organised.png`,
          altText: "Keep your curated content organised  with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Create visually stunning collections",
        subtitle:
          "Design captivating collections of curated content with ease. Showcase your content in a visually appealing manner that enhances presentation and engagement, making your work stand out.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Create visually stunning collections.png`,
          altText: "Create visually stunning collections with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title:
          "Organise with precision using tags, remarks, and other properties",
        subtitle:
          "Enhance your curation process on CurateIt by categorising content with tags, adding detailed remarks, and utilising other custom properties. This allows for precise organisation and quick retrieval of curated materials, optimising your workflow and productivity.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Organise with precision using tags, remarks, and other properties.json`,
          altText:
            "Organise with precision using tags, remarks, and other properties",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "other",
      },
      {
        title: "Share collections effortlessly, publicly or privately",
        subtitle:
          "CurateIt is the only Padlet Alternative that simplifies the sharing of your curated collections. Whether collaborating with peers or presenting to the public, easily control access settings to share your collections securely and seamlessly.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Share collections effortlessly, publicly or privately.png`,
          altText:
            "Share collections effortlessly, publicly or privately with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
    ],
  },
  videoShowcase: {
    blob: "Explore",
    title: "Watch how you can create stunning collections",
    subtitle: "In this video learn how to create collections on CurateIt",
    embed: "mu3XnVm5ABE?si=tPV1DjWPxtDqAlG4",
    cta: {
      title: "Try it by yourself",
      href: "/sign-up",
    },
  },
  userCards: {
    blob: "Categories",
    title: "Best for creators, individuals as well as teams",
    cards: [
      {
        icon: "PiPaintBrush",
        title: "Hobbyists",
        subTitle:
          "Simplify your content organisation with CurateIt's efficient tools. Dive into your interests effortlessly, ensuring each session is productive and enjoyable!",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Marketers",
        subTitle:
          "Transform your marketing strategy with CurateIt's powerful tools. Streamline content organization, enhance collaboration, and boost productivity effortlessly, ensuring your campaigns are always on point!",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        blob: "Categories",
        icon: "PiUsers",
        title: "Teams",
        subTitle:
          "Share and organize resources effortlessly, ensuring everyone stays informed and projects progress smoothly, fostering a cohesive and productive team environment.",
        cta: {
          title: "Try for free",
          href: "/sign-up",
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
    title: "The only Padlet alternative you need to create collections",
    subTitle:
      "Simplify content curation and organisation with CurateIt's intuitive features. Create and manage visually striking collections to streamline your workflow.",
    cta: {
      title: "Try CurateIt for free",
      href: "/sign-up",
    },
  },
  faq: {
    title: "Frequently asked questions",
    subTitle: "Everything you need to know about the product and billing.",
    faqs: [
      {
        question:
          "How can I create visually appealing collections on CurateIt?",
        answer:
          "CurateIt allows you to create visually appealing collections by organising your curated content with tags, remarks, and other custom properties. This helps in presenting your materials in an engaging manner.",
      },
      {
        question:
          "Can I collaborate with others on curated collections using CurateIt?",
        answer:
          "Yes, CurateIt facilitates collaboration by allowing you to share curated collections privately or publicly. It supports real-time updates and comments, making teamwork seamless.",
      },
      {
        question:
          "What is the best Padlet alternative to create beautiful collections?",
        answer:
          "CurateIt stands out as a versatile alternative to Padlet for creating and organising visually stunning collections of curated content. Its intuitive interface and robust features make it ideal for both personal and professional use.",
      },
      {
        question:
          "How can CurateIt improve my productivity in managing curated content?",
        answer:
          "CurateIt streamlines content management by offering tools to easily organise, access, and share curated content. This efficiency helps in saving time and staying focused on tasks.",
      },
    ],
    more: {
      image: {
        source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/avatar_group.png`,
        altText:
          "Can't find the answer you're looking for? Please chat to our friendly team at CurateIt",
      },
      title: "Still have questions?",
      subTitle:
        "Can't find the answer you're looking for? Please chat to our friendly team.",
      cta: {
        title: "Get in touch",
        href: "/sign-up",
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
      //   {
      //     asset: "PiRecordFill",
      //     title: "Screen recorder",
      //     href: "/features/screen-recorder",
      //   },
      //   {
      //     asset: "PiCode",
      //     title: "Save code snippets",
      //     href: "/features/save-code-snippets",
      //   },
      //   {
      //     asset: "FaXTwitter",
      //     title: "Backup tweets",
      //     href: "/features/backup-tweets",
      //   },
      {
        asset: "PiScan",
        title: "Web clipper",
        href: "/features/web-clipper",
      },
      //   {
      //     asset: "PiFilePdf",
      //     title: "PDF Highlighter",
      //     href: "/features/pdf-highlighter",
      //   },
    ],
    cta: {
      title: "Get started",
      href: "/sign-up",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/450x450_min/webapp/banner.jpg`,
          altText: "Best Discussion Board Tools For Students with CurateIt",
        },
        title: "Best Discussion Board Tools For Students",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/11997/discussion-tools-for-students",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(80).png`,
          altText: "Top 5 Alternatives for Padlet in 2024 with CurateIt",
        },
        title: "Top 5 Alternatives for Padlet in 2024",
        description: "",
        href: "https://www.curateit.com/blog/top-5-alternatives-for-padlet?bid=I_jYl_x",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/450x450_min/webapp/banner.jpg`,
          altText:
            "Top Site Insights Extensions For Google Chrome with CurateIt",
        },
        title: "Top Site Insights Extensions For Google Chrome",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/8784/site-insights-extensions-for-chrome",
      },
    ],
  },
};

const Padlet = () => {
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

export default Padlet;
