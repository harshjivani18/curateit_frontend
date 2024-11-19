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
      "Publish professional blogs effortlessly that drives millions of views",
    subTitle:
      "No more agonising over drafts or complex formatting. CurateIt's Blog Creation feature turns your thoughts into polished, publish-ready gems. Save time and make blogging a side hustle!",
    features: [
      "Boost blog creation efficiency by 70%",
      "Simplify content formatting by 80%",
      "Publish with 99% fewer headaches",
      "Save 90% of your time",
    ],
    cta: {
      title: "Create a blog now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Blog.png`,
      altText:
        "Publish professional blogs effortlessly that drives millions of views with CurateIt",
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
        title: "Blog Builder",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150x_min/feature-pages/testimonial_profile.png`,
      altText:
        "Publish professional blogs effortlessly that drives millions of views with CurateIt",
    },
    name: "Sarah Mitchell",
    profession: "Content Strategist",
    testimonial:
      "“CurateIt's Blog Creation feature has completely taken over my content strategy, for the better of course! I can now effortlessly turn my rough ideas into polished blog posts, saving me hours each week. I's like having a personal editor at my fingertips.”",
  },
  textImageScroll: {
    title: "Streamline your blogging process from concept to publication",
    sections: [
      {
        title: "From draft to published—all in one go",
        subtitle:
          "Don't get bogged down with old-school blogging where you craft in one tool, format in another, and manage somewhere else. CurateIt rolls it all into one sleek platform, so even the most technologically challenged can look like a blogging genius.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/From draft to published all in one go.json`,
          altText: "From draft to published—all in one go with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Optimise your content for search engines",
        subtitle:
          "Boost your blog's visibility effortlessly with CurateIt. Our platform helps you seamlessly integrate key SEO strategies into your posts, ensuring they are primed to climb search rankings. This means not just more views, but the right kind of traffic coming your way.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Optimise+your+content+for+search+engines.png`,
          altText: "Optimise your content for search engines with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Boost your productivity by accessing key information faster ",
        subtitle:
          "Our text extractor extension for Chrome not only allows you to copy text swiftly but also instantly provides the word count and estimated reading time. This feature helps you manage your schedule more effectively, ensuring you spend your time reading only what's necessary.  ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Boost your productivity by accessing key information faster.png`,
          altText:
            "Boost your productivity by accessing key information faster  with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Enrich content with easy multimedia embedding",
        subtitle:
          "Enhance your blog's appeal and functionality with CurateIt's versatile embedding options. Integrate a variety of multimedia formats including images and videos directly into your posts. This feature not only enriches your content but also captivates your audience, providing them with a comprehensive and immersive reading experience.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Enrich content with easy multimedia embedding.png`,
          altText:
            "Enrich content with easy multimedia embedding with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Share your content publicly or privately ",
        subtitle:
          "CurateIt empowers you to control the visibility of your posts, allowing you to share them publicly with a wide audience or privately for a select group. Additionally, the platform's tagging feature helps you organize your content efficiently, making it easier to manage and retrieve. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Share your content publicly or privately.png`,
          altText: "Share your content publicly or privately  with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Enhance readability with customisable viewing options",
        subtitle:
          "Listen to articles with our text-to-speech feature, switch to dark mode for eye comfort, or adjust text style and size to suit your preferences. These features are designed to make reading more accessible and enjoyable, catering to diverse user needs and preferences.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Enhance readability with customisable viewing options.png`,
          altText:
            "Enhance readability with customisable viewing options with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Guide readers with powerful header tags for easy navigation",
        subtitle:
          "Enhance your blog's navigability and user engagement with strategic use of header tags. By organising your content with clear, descriptive headers, you can enable readers to quickly find the sections most relevant to their interests.  ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Guide readers with powerful header tags for easy navigation.png`,
          altText:
            "Guide readers with powerful header tags for easy navigation with CurateIt",
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
    title: "See how the CurateIt Blog Builder Feature works",
    subtitle:
      "In this tutorial, we show you how to create and publish blogs on CurateIt",
    embed: "7AqpaRorHp0?si=_XQpCNVWGqyxX2Ru",
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
        title: "Blogger",
        subTitle:
          "CurateIt's blog builder functionality streamlines the entire blogging process for writers, enabling them to craft, edit, and publish posts from a single, intuitive platform. ",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Marketers",
        subTitle:
          "CurateIt's blog builder is great for marketers, offering tools that seamlessly integrate SEO optimisation and multimedia embedding to create compelling content. ",
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
          "For teams, CurateIt's blog builder enhances collaboration and efficiency. It provides a shared platform where multiple users can simultaneously contribute, edit, and review content before publication. ",
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
    title: "The ultimate blog builder for every creator",
    subTitle:
      "Craft flawless blog posts effortlessly with CurateIt's Blog Builder. From drafting to publishing, every step is streamlined to enhance creativity and efficiency. Say goodbye to clunky interfaces and multiple tools—CurateIt brings everything you need into one intuitive platform. Simplify your blogging process and focus on what truly matters: creating great content.",
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
        question: "What features does CurateIt's Blog Builder offer?",
        answer:
          "CurateIt's Blog Builder is equipped with a comprehensive set of tools designed to streamline the blogging process. It offers intuitive drafting, easy multimedia integration, SEO optimization, and collaborative features that allow multiple contributors to edit and review posts. Additionally, it provides the capability to schedule and publish directly from the platform.",
      },
      {
        question:
          "How does CurateIt's Blog Builder simplify the blogging process?",
        answer:
          "The Blog Builder simplifies blogging by integrating all necessary tools into one platform. From initial concept to final publication, bloggers can draft, edit, enhance with multimedia, and optimise for SEO without needing to switch between different software. This all-in-one approach saves time and reduces the complexity involved in managing blog content.",
      },
      {
        question:
          "Can I collaborate with my team using CurateIt's Blog Builder?",
        answer:
          "Yes, CurateIt's Blog Builder supports real-time collaboration. Teams can work together on articles, with members able to contribute, edit, and provide feedback all within the same environment. This makes it ideal for maintaining a cohesive voice and style across all blog content.",
      },
      {
        question:
          "Is CurateIt's Blog Builder suitable for bloggers of all skill levels?",
        answer:
          "Absolutely, CurateIt's Blog Builder is designed to be user-friendly for both novice bloggers and experienced content creators. The platform offers a variety of customization options to suit different preferences and skill levels, ensuring that everyone can efficiently produce high-quality content.",
      },
      {
        question:
          "How does CurateIt's Blog Builder help improve SEO for my blog posts?",
        answer:
          "CurateIt's Blog Builder includes built-in SEO tools that help ensure your blog posts are optimized for search engines. These tools assist in incorporating keywords, meta tags, and other SEO practices directly into your posts. Additionally, the platform can suggest SEO improvements, helping your content rank better and reach a wider audience.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(18).png`,
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

const BlogBuilder = () => {
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

export default BlogBuilder;
