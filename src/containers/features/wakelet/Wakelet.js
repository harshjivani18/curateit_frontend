import dynamic from "next/dynamic";

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
import TextImageScrollMobile from "@containers/LandingPages/TextImageScroll/TextImageScrollMobile";
import Footer from "@components/Footer2/Footer";

const TextImageScroll = dynamic(
  () => import("@containers/LandingPages/TextImageScroll/TextImageScroll"),
  { ssr: false }
);

const CustomNav = dynamic(
  () => import("@components/landingPageTabs/CustomNav"),
  { ssr: false }
);

const data = {
  heroSection: {
    title:
      "The most powerful Wakelet alternative to create beautiful academic collections ",
    subTitle:
      "Create stunning collections of study resources and links effortlessly. CurateIt helps you build and organise academic content, transforming the study experience into something seamless and visually appealing.",
    features: [
      "Save 90% of time spent searching for resources",
      "Simplify collection sharing among students",
      "Reduce 95% of disorganised bookmarks",
      "Improve study efficiency by 80%",
      "Enhance resource recall by 75%",
    ],
    cta: {
      title: "Create collections now",
      href: "/sign-up",
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Wakelet.png`,
      altText:
        "The most powerful Wakelet alternative to create beautiful academic collections  with CurateIt",
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
        title: "Wakelet",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Dr_Michael_Lee_Wakelet.png`,
      altText:
        "The most powerful Wakelet alternative to create beautiful academic collections  with CurateIt",
    },
    name: "Dr. Michael Lee",
    profession: "Academic Researcher",
    testimonial:
      "“CurateIt's ability to create collections has drastically improved how I handle academic content. It allows me to keep my research materials well-organised and easily accessible, which saves me a significant amount of time.”",
  },
  textImageScroll: {
    title: "A brand new experience of sorting your academic content",
    sections: [
      {
        title: "Enhanced organisation for your academic content",
        subtitle:
          "Keep all your academic resources neatly sorted in one place! With CurateIt's collections feature, easily find and access materials exactly when you need them as collections.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Enhanced organisation for your academic content.png`,
          altText:
            "Enhanced organisation for your academic content with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Customise your collections with remarks, tags, and more",
        subtitle:
          "Personalise your academic collections with remarks, tags, and other metadata. CurateIt allows you to add detailed notes, keywords, and annotations to each item, ensuring your content is organised and searchable with precision.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Customise-your-collections-with-remarks,-tags,-and-more.json`,
          altText:
            "Customise your collections with remarks, tags, and more with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "other",
      },
      {
        title: "Share your resources just the way you want to!",
        subtitle:
          "Easily share your curated collections with CurateIt's flexible sharing options. Whether it's privately within your study group for collaborative projects or publicly with your peers, CurateIt is the Best Online Discussion Tools for Students that ensures seamless sharing to suit your needs.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Share your resources just the way you want to!.png`,
          altText: "Share your resources just the way you want to!",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Access your organised collections anywhere, anytime",
        subtitle:
          "With CurateIt, your meticulously curated academic collections are accessible from any device, allowing you to study or research wherever and whenever it suits you best.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Access your organised collections anywhere, anytime.png`,
          altText:
            "Access your organised collections anywhere, anytime with CurateIt",
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
    title: "See how you can sort your academic content with CurateIt",
    subtitle:
      "Watch this tutorial to know how to sort your academic resources on CurateIt",
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
        title: "Students",
        subTitle:
          "Struggling to keep up with endless study materials? Simplify your research with CurateIt's streamlined organization tools. Dive into key concepts quickly and efficiently, making the most of your study sessions!",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Teachers",
        subTitle:
          "Simplify curriculum development with CurateIt's efficient content curation tools. Easily compile resources and lesson materials to create engaging and cohesive educational experiences for your students.",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        blob: "Categories",
        icon: "PiUsers",
        title: "Study groups",
        subTitle:
          "Facilitate seamless collaboration within study groups using CurateIt's collaborative curation features. Share and organise study materials effortlessly, ensuring everyone stays informed and prepared for productive group discussions and study sessions.",
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
    title: "Stay ahead of the academic curve with CurateIt ",
    subTitle:
      "With CurateIt's collection feature, streamline your study resources for quick access and efficient revision, ensuring you stay focused and prepared for success.",
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
        question: "How can CurateIt's collections benefit academic routine?",
        answer:
          "CurateIt's collection features allows you to organise and access your study materials efficiently. You can categorise notes, articles, and resources by topic or course, making revision and study sessions more streamlined and effective.",
      },
      {
        question:
          "Can I share my curated collections with classmates or study group members?",
        answer:
          "Yes, CurateIt enables you to share your collections privately with classmates or publicly with peers. This feature is perfect for collaborative projects, group study sessions, or sharing helpful resources within your academic community.",
      },
      {
        question:
          "Is it easy to add and manage content in CurateIt's study collections?",
        answer:
          "Absolutely! CurateIt provides a user-friendly interface where you can easily add, edit, and organise your study materials. You can add remarks, tags, and annotations to each item to enhance organisation and searchability.",
      },
      {
        question: "Can I access my curated collections from different devices?",
        answer:
          "Yes, CurateIt is accessible from any device with an internet connection. Whether you're using a laptop, tablet, or smartphone, you can conveniently access your curated study collections anytime, anywhere.",
      },
      {
        question: "What is the best Wakelet alternative?",
        answer:
          "While there are many apps to sort and orginise study materials, CurateIt offers robust features for organising and managing digital content, making it an excellent alternative to Wakelet. With CurateIt, users can create curated collections of articles, videos, and notes, customize their organization with tags and remarks, and collaborate seamlessly with others. It provides a streamlined interface and flexible sharing options, making it ideal for both personal and collaborative use in education, research, and content curation.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(74).png`,
          altText:
            "Step-by-Step Guide on Curate's Kudo board Card Creator with CurateIt",
        },
        title: "Step-by-Step Guide on Curateit's Kudo board Card Creator",
        description: "",
        href: "https://www.curateit.com/blog/step-by-step-guide-on-curateits-online-group-card-feature?bid=1r4dkmM",
      },
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(79).png`,
          altText: "Top 5 Testimonial Collection Tools in 2024 with CurateIt",
        },
        title: "Top 5 Testimonial Collection Tools in 2024",
        description: "",
        href: "https://www.curateit.com/blog/top-5-testimonial-collection-tools-in-2024?bid=b1lFNgg",
      },
    ],
  },
};

const Wakelet = () => {
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

export default Wakelet;
