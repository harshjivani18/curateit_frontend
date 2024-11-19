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
    title: "Uncover website facts with a single click",
    subTitle:
      "Need to know more about a website? Site Insights by CurateIt lets you dig into details like headquarters, brand colours, locations and much more. It’s your go-to tool for website intelligence!",
    features: [
      "Reduce research time by up to 80%",
      "Uncover 50+ website data points",
      "100% accurate information",
      "Save 15+ hours weekly",
    ],
    cta: {
      title: "Get site insights now",
      href: "/sign-up",
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image site insights.png`,
      altText: "Uncover website facts with a single click with CurateIt",
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
        title: "Site Insights",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Sarah_Jennings_Site_Insights.png`,
      altText: "Uncover website facts with a single click with CurateIt",
    },
    name: "Sarah Jennings",
    profession: "Research Analyst",
    testimonial:
      "“Thanks to CurateIt's Site Insights, I've shaved hours off my research time each week. It's not just helpful—it's been a real game changer for staying on top of my workload.”",
  },
  textImageScroll: {
    title: "CurateIt is your shortcut to deep website knowledge, effortlessly.",
    sections: [
      {
        title: "Instant website insights at your fingertips",
        subtitle:
          "Never wonder about a website again! With just one click on CurateIt's Site Insights, instantly access an overview of the company, including a summary, logos, brand colours, and email contact details. It's comprehensive insight made effortless!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Instant website insights at your fingertips.png`,
          altText: "Instant website insights at your fingertips with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Access comprehensive SEO and keyword data",
        subtitle:
          "With just one click, CurateIt's Site Insights feature provides an in-depth look at crucial SEO details of any webpage. This includes information such as the URL, H-tags, meta description, language, word count, and robots tags, offering a thorough understanding of the page's search engine optimisation and keyword usage.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Access comprehensive SEO and keyword data.png`,
          altText: "Access comprehensive SEO and keyword data with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Complete web link overview and export",
        subtitle:
          "CurateIt's Site Insights feature allows you to view a complete list of all internal and external links on a webpage. This tool is especially useful for research purposes, as it enables users to not only access these links with a single click and also export them.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Complete web link overview and export.png`,
          altText: "Complete web link overview and export",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Explore brand colour schemes instantly",
        subtitle:
          "With just one click, you can uncover the colours that define a brand's visual identity and appeal. This tool simplifies the process of understanding and assessing the effectiveness of design choices on any website.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Explore brand colour schemes instantly.png`,
          altText: "Explore brand colour schemes instantly with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Discover Social Media Links and Insights",
        subtitle:
          "Effortlessly uncover all the social media profiles linked to a webpage with just one tap. Gain insights into a brand's social media reach and engagement, helping you understand their digital strategy and presence across platforms. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Discover Social Media Links and Insights.png`,
          altText: "Discover Social Media Links and Insights with CurateIt",
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
    title: "See how the CurateIt site insights feature works",
    subtitle:
      "Check how you can get website information within seconds using CurateIt.",
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
        title: "Researchers",
        subTitle:
          "Use CurateIt's Site Insights to instantly retrieve critical information from any website—perfect for efficiently organising and analysing your research sources.",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Students",
        subTitle:
          "Struggling to manage multiple sources for your projects? Simplify your research with CurateIt's Site Insights—get quick access to website details, social media links, and more in a single click, making study sessions more productive and less chaotic.",
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
          "CurateIt's Site Insights allows one-click access to vital website information. Facilitate seamless collaboration and smarter decision-making across your team, ensuring that every project is backed by comprehensive insights.",
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
    title: "Fast-track your web research with CurateIt's site insights",
    subTitle:
      "Skip the tedious search process. CurateIt's Site Insights brings you directly to the pivotal website information you need, saving you time and effort.",
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
        question: "What is site insights?",
        answer:
          "Site insights is a feature within CurateIt that allows you to quickly access key information about any website. It provides details such as social media links, SEO data, brand colours, and much more, all with a single click.",
      },
      {
        question: "How do I access site insights on CurateIt?",
        answer:
          "To use site insights, simply navigate to the CurateIt extension and click the Site Insights icon. The insights will be displayed immediately, giving you all the essential data in one place.",
      },
      {
        question: "Can I use site insights for any website?",
        answer:
          "Yes, you can use the site insights feature of CurateIt across any website.",
      },
      {
        question: "Which is the best site insights extension for Chrome?",
        answer:
          "CurateIt's Site Insights extension for Chrome is highly recommended for anyone looking for an efficient way to gather detailed website data directly from their browser. It integrates seamlessly with Chrome, offering quick access to essential insights without leaving your current tab. This makes it an excellent tool for researchers, students, and professionals alike.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(22).png`,
          altText: "Top 5 Site Insights Extensions for Chrome with CurateIt",
        },
        title: "Top 5 Site Insights Extensions for Chrome",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199744/top-5-site-insights-extensions-for-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/Heading(4).png`,
          altText:
            "Step-by-Step Guide to using the Curateit's Site Insights Feature with CurateIt",
        },
        title:
          "Step-by-Step Guide to using the Curateit's Site Insights Feature",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199745/step-by-step-guide-to-using-the-curateits-site-insights-feature",
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

const SiteInsights = () => {
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

export default SiteInsights;
