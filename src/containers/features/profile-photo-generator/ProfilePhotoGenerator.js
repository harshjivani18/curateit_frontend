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
      "Make your profile stand out with CurateIt's AI Profile Photo Generator",
    subTitle:
      "CurateIt's AI Profile Photo Generator eliminates the challenge. No more awkward selfies—just professional, polished profile pictures at your fingertips.",
    features: [
      "Boost your professional image by 80% with a polished profile photo",
      "Save 90% of your time finding the perfect profile photo",
      "Simplify customizing professional profile pictures",
      "Reduce unprofessional photos by 95%",
    ],
    cta: {
      title: "Create collections now",
      href: "/sign-up",
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image AI Profile Generator.png`,
      altText:
        "Make your profile stand out with CurateIt's AI Profile Photo Generator with CurateIt",
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
        title: "Profile Photo Generator",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/David_Chen_PPG.png`,
      altText:
        "Make your profile stand out with CurateIt's AI Profile Photo Generator with CurateIt",
    },
    name: "David Chen",
    profession: "Freelance Marketer",
    testimonial:
      '"CurateIt\'s AI Profile Photo Generator has transformed how I present myself online. As a freelancer, having a professional-looking profile photo is crucial. With CurateIt, I can generate polished and captivating photos instantly, saving me time and helping me make a great first impression with clients."',
  },
  textImageScroll: {
    title: "Make a Strong Impression with AI-Generated Profile Pictures",
    sections: [
      {
        title: "Create Professional Profile Photos in Seconds with CurateIt",
        subtitle:
          "Create and customize professional-grade profile photos in moments using CurateIt's AI Profile Photo Generator, ensuring you always make a polished and impactful impression across all your digital platforms.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Create Professional Profile Photos in Seconds with CurateIt.png`,
          altText:
            "Create Professional Profile Photos in Seconds with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Refine Your Personal Branding with Ease",
        subtitle:
          "Amplify your personal branding effortlessly with CurateIt's AI Profile Photo Maker! Customise your profile photos to embody your unique style and professional identity, ensuring a cohesive and impactful online presence that resonates with your audience.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Refine Your Personal Branding with Ease.png`,
          altText: "Refine Your Personal Branding with Ease with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Create Multiple Profile Photos for Every Social Media Platform",
        subtitle:
          "With CurateIt's AI Profile Photo Maker, you can effortlessly generate multiple profile photos tailored for each of your social media pages. Maintain a consistent, professional image across all platforms with ease.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Create Multiple Profile Photos for Every Social Media Platform.png`,
          altText:
            "Create Multiple Profile Photos for Every Social Media Platform with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: "/sign-up",
        },
        assetType: "image",
      },
      {
        title: "Boost Confidence in Your Professional Image",
        subtitle:
          "CurateIt's AI Profile Photo Maker empowers you to project confidence and professionalism online. With high-quality, customizable profile photos, you can confidently enhance your digital identity, making a strong and memorable impression on potential clients, employers, and colleagues alike.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Boost Confidence in Your Professional Image.png`,
          altText: "Boost Confidence in Your Professional Image with CurateIt",
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
    title: "Learn how to use the AI Profile Photo Generator on CurateIt",
    subtitle:
      "Watch this tutorial to know how to create an impressive profile photo on CurateIt",
    embed: "E0Udd6nFxXE?si=d2vYtXnP_ZQ9pjj8",
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
        title: "Content Creators",
        subTitle:
          "Stand out across platforms with CurateIt's AI Profile Photo Maker! Craft and customize professional profile photos effortlessly, ensuring a cohesive and impactful online persona that resonates with your audience and enhances your digital brand.",
        cta: {
          title: "Try for free",
          href: "/sign-up",
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Professionals",
        subTitle:
          "Easily create and customize high-quality profile photos tailored to your professional image. Whether you're networking, job hunting, or building your personal brand, project confidence and credibility with every click.",
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
    title: "Create Impactful Profile Pictures with Ease on CurateIt ",
    subTitle:
      "With CurateIt's AI Profile Photo Generator, enhance your digital identity effortlessly. Customize professional profile photos that you can now create in less than a second!",
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
        question: "What is an AI Profile Photo Maker?",
        answer:
          "An AI Profile Photo Maker uses artificial intelligence to generate and customize professional-quality profile photos quickly and effortlessly.",
      },
      {
        question: "Why should I use an AI Profile Photo Maker?",
        answer:
          "An AI Profile Photo Maker ensures that your online presence is professional and consistent across various platforms, helping you make a strong first impression.",
      },
      {
        question:
          "What are the benefits of using CurateIt's AI Profile Photo Maker?",
        answer:
          "CurateIt's AI Profile Photo Maker enables users to create multiple customized profile photos tailored to their personal or professional branding, enhancing their digital identity.",
      },
      {
        question: "What is the best AI Profile Photo Maker available?",
        answer:
          "CurateIt stands out as the best AI Profile Photo Maker, offering intuitive tools and high-quality results that empower users to refine their digital presence effectively.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(19).png`,
          altText:
            "The Ultimate Guide to Top 5 Profile Photo Generators for Social Media Managers",
        },
        title:
          "The Ultimate Guide to Top 5 Profile Photo Generators for Social Media Managers",
        description:
          "If you are reading this, then we assume you're a social media manager, and it's Monday morning. You're switching and handling multiple client accounts, your inbox is overflowing, and you've just realised that your profile pics look like they were taken during the Dark Ages.",
        href: "https://www.curateit.com/u/curateit.com/g/264155/top-5-profile-photo-generators",
      },
    ],
  },
};

const ProfilePhotoGenerator = () => {
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

export default ProfilePhotoGenerator;
