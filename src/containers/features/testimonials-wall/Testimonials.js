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
    title: "Create Beautiful Testimonial Walls with CurateIt",
    subTitle:
      "CurateIt revolutionizes how you curate and present testimonials online. Rediscover the art of showcasing client feedback and success stories with simplicity and style.",
    features: [
      "Craft stunning testimonial walls effortlessly",
      "Save 90% of your time with intuitive curation tools",
      "Showcase client success with curated perfection",
      "Ensure 95% professional and polished presentation",
    ],
    cta: {
      title: "Create collections now",
      href: "/sign-up",
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Testimonials.png`,
      altText: "Create Beautiful Testimonial Walls with CurateIt with CurateIt",
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
        title: "Testimonials",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Emma_Lee_Testimonials_wall.png`,
      altText: "Create Beautiful Testimonial Walls with CurateIt with CurateIt",
    },
    name: "Emma Lee",
    profession: "Marketing Director",
    testimonial:
      "“CurateIt's testimonial wall feature has transformed how we highlight client feedback. It's intuitive to use and beautifully showcases our success stories, enhancing our credibility.”",
  },
  textImageScroll: {
    title: "Curate & share client testimonials that turn heads and win hearts",
    sections: [
      {
        title: "Discover and Organize Client Success Stories with Ease",
        subtitle:
          "Explore and organize client testimonials effortlessly with CurateIt's streamlined tools. From gathering feedback to showcasing client achievements, CurateIt simplifies the process of collecting and curating client success stories for maximum impact.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Discover and Organize Client Success Stories with Ease.png`,
          altText:
            "Discover and Organize Client Success Stories with Ease with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "A New Way to Show Stunning Testimonials",
        subtitle:
          "With customizable layouts and easy-to-use features, CurateIt allows you to create stunning testimonial displays that resonate with your audience. Showcase client satisfaction and build trust with visually compelling testimonial collections.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/A New Way to Show Stunning Testimonials.png`,
          altText: "A New Way to Show Stunning Testimonials with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Tag and Annotate Your Testimonial Collections",
        subtitle:
          "Organize and enrich your testimonial collections with tags and annotations on CurateIt. Add context and insights to client feedback, making it easy to navigate and understand for yourself or your team. Enhance your client success story presentation with robust organizational tools.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Tag and Annotate Your Testimonial Collections.png`,
          altText:
            "Tag and Annotate Your Testimonial Collections with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Build Trust with The Best Testimonials Collection software",
        subtitle:
          "Dazzle your audience with versatile formats on CurateIt. From heartfelt notes to captivating images and compelling videos, showcase client satisfaction creatively. Build trust and inspire with stunning testimonial collections that leave a lasting impression.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Build Trust with The Best Testimonials Collection software.png`,
          altText:
            "Build Trust with The Best Testimonials Collection software with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Embed and Share Your Testimonial Collections",
        subtitle:
          "CurateIt allows you to share testimonial collections privately or publicly and easily embed them on your website. Showcase client satisfaction with customizable layouts and dynamic formats to enhance your online presence effortlessly.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Embed and Share Your Testimonial Collections.png`,
          altText: "Embed and Share Your Testimonial Collections with CurateIt",
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
    title: "We'll Show You How to Create Testimonial Walls",
    subtitle:
      "On CurateIt, you can organize your client feedback into visually captivating displays. See how.",
    embed: "FzeHW7vF7iM?si=-JavRAW4pB-CzM1s",
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
        title: "Marketing Teams",
        subTitle:
          "Effortlessly showcase client success stories and testimonials with CurateIt's intuitive testimonial wall creator. Enhance credibility and engage your audience with visually compelling displays.",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Entrepreneurs",
        subTitle:
          "CurateIt empowers entrepreneurs to build trust and credibility with beautifully curated testimonial collections. Highlight client satisfaction and success stories effectively.",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        blob: "Categories",
        icon: "PiUsers",
        title: "Sales Professionals",
        subTitle:
          "Create impactful testimonial displays that resonate with potential clients. CurateIt's tools help you showcase customer satisfaction and build rapport.",
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
    title: "Showcase Client Success Stories Beautifully With CurateIt",
    subTitle:
      "CurateIt enables businesses to effortlessly curate stunning testimonial walls and collections, perfect for showcasing client satisfaction and success. Streamline your testimonial presentation and enhance credibility with ease.",
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
        question: "Can I customize the layout of my testimonial walls?",
        answer:
          "Yes, CurateIt allows you to choose from various customizable layouts to create visually appealing testimonial displays that suit your brand's aesthetic.",
      },
      {
        question: "How can I share my curated testimonial collections?",
        answer:
          "You can easily share your curated testimonial walls with clients, partners, or the public. CurateIt provides options to generate shareable links or directly post on social media platforms.",
      },
      {
        question:
          "Is there a limit to the number of testimonial walls I can create on CurateIt?",
        answer:
          "No, there is no limit. You can create as many testimonial walls as you need on CurateIt, making it ideal for businesses of all sizes.",
      },
      {
        question: "Can I add multimedia content to my testimonial walls?",
        answer:
          "Yes, CurateIt supports multimedia content such as images and videos, allowing you to create comprehensive and engaging testimonial displays.",
      },
    ],
    more: {
      image: {
        source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150min/feature-pages/avatar_group.png`,
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(79).png`,
          altText: "Top 5 Testimonial Collection Tools in 2024 with CurateIt",
        },
        title: "Top 5 Testimonial Collection Tools in 2024",
        description: "",
        href: "https://www.curateit.com/blog/top-5-testimonial-collection-tools-in-2024?bid=b1lFNgg",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(69).png`,
          altText:
            "Step-by-Step Guide on How To Create Testimonial Walls Using CurateIt",
        },
        title:
          "Step-by-Step Guide on How To Create Testimonial Walls Using CurateIt",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/277059/step-by-step-guide-on-how-to-create-testimonial-walls-using-curat",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/450x450_min/webapp/banner.jpg`,
          altText:
            "Best Websites To Collect & Embed Testimonials with CurateIt",
        },
        title: "Best Websites To Collect & Embed Testimonials",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/13005/websites-to-collect-embed-testimonials",
      },
    ],
  },
};

const Testimonials = () => {
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

export default Testimonials;
