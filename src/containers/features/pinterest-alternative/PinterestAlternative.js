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
    title: "Explore and Curate Beautiful Collections with CurateIt",
    subTitle:
      "CurateIt simplifies the process of curating and presenting your inspirations online. Reimagine curating and showcasing your inspirations online with elegance and efficiency. ",
    features: [
      "Effortlessly create stunning moodboards",
      "Save 90% time with quick and intuitive curation",
      "Showcase gems with curated perfection",
      "Ensure 95% professional and polished content curation",
    ],
    cta: {
      title: "Create collections now",
      href: "/sign-up",
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Pinterest Alternative.png`,
      altText:
        "Explore and Curate Beautiful Collections with CurateIt with CurateIt",
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
        title: "Pinterest Alternative",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Sarah_Reynolds_Pinterest_Alternative.png`,
      altText:
        "Explore and Curate Beautiful Collections with CurateIt with CurateIt",
    },
    name: "Sarah Reynolds",
    profession: "Graphic Designer",
    testimonial:
      "“CurateIt's moodboard creation tool has revolutionized my design workflow. As a graphic designer, curating visual inspirations is vital. With CurateIt, I can effortlessly organize and showcase design gems, saving me valuable time and ensuring my portfolio shines with 95% curated perfection.”",
  },
  textImageScroll: {
    title: "Explore, Curate and Share Your Inspirations with CurateIt",
    sections: [
      {
        title:
          "Effortless Curation of Stunning Visual Collections with CurateIt",
        subtitle:
          "Effortlessly curate visually stunning collections of inspiration and curated content with CurateIt. Whether you're compiling mood boards for design projects or showcasing fashion trends, CurateIt's intuitive tools allow you to assemble and present visuals in a professional and compelling manner. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Effortless Curation of Stunning Visual Collections with CurateIt.png`,
          altText:
            "Effortless Curation of Stunning Visual Collections with CurateIt with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Discover and Organize Gems of Inspiration with Ease",
        subtitle:
          "Explore and organize your inspirations effortlessly with CurateIt's intuitive tools. From discovering new trends to organizing ideas for projects, CurateIt simplifies the process of collecting and categorizing gems of inspiration.  efficiency in your work.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Discover and Organize Gems of Inspiration with Ease.png`,
          altText:
            "Discover and Organize Gems of Inspiration with Ease with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Craft Stunning Moodboards for Visual Inspiration",
        subtitle:
          "With customizable layouts and simple drag-and-drop features, you can bring your creative vision to life effortlessly. CurateIt empowers users to showcase ideas and inspirations effectively, making it indispensable for designers, marketers, and anyone wanting to visually communicate concepts and themes.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Craft Stunning Moodboards for Visual Inspiration.png`,
          altText:
            "Craft Stunning Moodboards for Visual Inspiration with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Tag and Add Notes to Your Collections",
        subtitle:
          "Organize and enrich your curated collections with ease on CurateIt. Tag items and add detailed notes to each piece, ensuring clarity and context for yourself or collaborators. Streamline your creative process and enhance collaboration with robust organizational tools.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Tag and Add Notes to Your Collections.png`,
          altText: "Tag and Add Notes to Your Collections with CurateIt",
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
    title: "Learn how to create stunning visual moodboards",
    subtitle:
      "On CurateIt you can organise your finds in stunning visuals. See how.",
    embed: "m46C83N1xlc?si=I5QmuwuV8fHG_qGP",
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
        title: "Freelancers",
        subTitle:
          "By effortlessly tagging items and adding detailed notes to their curated collections, freelancers can maintain organized repositories of inspiration, ideas, and references. This streamlines content creation processes, allowing them to quickly access relevant materials and maintain creative momentum.",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Designers",
        subTitle:
          "Designers leverage CurateIt's visually stunning moodboards to streamline their creative workflows. By curating and organizing visual inspirations in beautifully crafted collections, designers can quickly communicate their creative vision to clients and team members. ",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        blob: "Categories",
        icon: "PiUsers",
        title: "Freelancers",
        subTitle:
          "As a freelancer, stand out with CurateIt's AI Profile Photo Maker! Create compelling profile photos that reflect your unique style and professionalism.",
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
    title:
      "Visualize Ideas Beautifully With CurateIt's Tool for Stunning Moodboards",
    subTitle:
      "CurateIt empowers users to effortlessly curate stunning visual moodboards and collections, perfect for showcasing creativity and inspiration. Streamline your curation process and create visually captivating content with ease.",
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
        question: "Can I share my curated collections with others?",
        answer:
          "Yes, you can easily share your curated collections with friends, colleagues, or the public. CurateIt allows you to generate a shareable link or directly post your collections on social media platforms.",
      },
      {
        question: "What types of content can I curate on CurateIt?",
        answer:
          "You can curate a wide range of content including images, videos, articles, and more. Our platform supports multimedia formats to help you create comprehensive and engaging collections.",
      },
      {
        question: "How does CurateIt help in showcasing my creativity?",
        answer:
          "CurateIt provides customizable templates and layouts to showcase your curated content in a visually appealing manner. Whether you're an artist, designer, or content creator, our tools enhance the presentation of your creative work.",
      },
      {
        question:
          "Is there a limit to the number of collections I can create on CurateIt?",
        answer:
          "No, there is no limit. You can create as many collections as you like on CurateIt. Whether for personal projects, professional portfolios, or collaborative endeavors, our platform supports unlimited creativity.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(81).png`,
          altText: "Best Pinterest Alternatives in 2024 with CurateIt",
        },
        title: "Best Pinterest Alternatives in 2024",
        description: "",
        href: "https://www.curateit.com/blog/best-pinterest-alternatives-in-2024?bid=NKpThLK",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/450x450_min/webapp/banner.jpg`,
          altText:
            "Top Pinterest Alternatives For Your Creativity with CurateIt",
        },
        title: "Top Pinterest Alternatives For Your Creativity",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/13019/top-pinterest-alternatives-for-your-creativity",
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

const PinterestAlternative = () => {
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

export default PinterestAlternative;
