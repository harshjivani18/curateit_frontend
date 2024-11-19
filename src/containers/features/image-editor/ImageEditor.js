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
    title: "Make quick edits on images whenever, wherever with CurateIt",
    subTitle:
      "Tired of complicated editing software? Say hello to simplicity with CurateIt's Image Editor—where enhancing your images is as easy as a few clicks. From quick fixes to detailed tweaks, it's designed to streamline your workflow and free up your creativity.",
    features: [
      "Reduce editing steps by 50%",
      "Brighten photos 80% faster",
      "Crop images in 2 seconds",
      "Save 5+ hours weekly",
    ],
    cta: {
      title: "Edit images now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image image editor.png`,
      altText:
        "Make quick edits on images whenever, wherever with CurateIt with CurateIt",
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
        title: "Image Editor",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/Sam_Briggs__TM.png`,
      altText:
        "Power up your productivity by building an AI prompts library with CurateIt",
    },
    name: "Sam Briggs",
    profession: "Freelance Graphic Designer",
    testimonial:
      "“CurateIt's image editor is a game changer for my design work. I'm slashing editing time like crazy, freeing up hours for the fun creative stuff!”",
  },
  textImageScroll: {
    title: "Tired of time-consuming edits? CurateIt speeds things up.",
    sections: [
      {
        title: "Change brightness or contrast with ease",
        subtitle:
          "No more dull photos! With CurateIt's image editor, adjust brightness and contrast effortlessly to make your images pop!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Change brightness or contrast with ease.png`,
          altText: "Change brightness or contrast with ease with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Instantly give your photos a makeover",
        subtitle:
          "Jazz up your images with a click! Add sepia, grayscale, or sharpen effects, and play with tints to perfect your pictures with CurateIt's image editor.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Instantly give your photos a makeover.png`,
          altText: "Instantly give your photos a makeover with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Take control of your canvas",
        subtitle:
          "Get playful with your pictures! With CurateIt's image editor, you can draw, crop, flip, and resize with ease. It's your image, your rules—customize it to perfection!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Take control of your canvas.png`,
          altText: "Take control of your canvas with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Add words to your pictures",
        subtitle:
          "Add snappy captions or thoughtful quotes directly to your photos with CurateIt's image editor. It's not just a picture, it's your statement.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Do more than just edit!.png`,
          altText: "Add words to your pictures with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Extract text from images",
        subtitle:
          "With CurateIt's OCR feature, you can quickly pull out printed or handwritten words from any image, making it easy to capture and use important information without manual typing.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Extract-text-from-images-instantly-with-OCR.json`,
          altText: "Extract text from images with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
    ],
  },
  videoShowcase: {
    blob: "Explore",
    title: "See how the CurateIt Image Editor feature works",
    subtitle:
      "Still need a hand to know how the Image Editor really work? Let us help you out with this tutorial.",
    embed: "pgtBzTm8xDE?si=KwG_tnRzV_pxJZiK",
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
        title: "Productivity Buffs",
        subTitle:
          "Need to tweak and share visuals fast? Edit, enhance, and distribute your images directly from CurateIt, turning your creative chaos into a productive masterpiece, all with just a few clicks.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Creators",
        subTitle:
          "Struggling to perfect your visual content? With CurateIt's image editor, you can adjust, filter, and refine your images to make each post stand out—turn your creative visions into eye-catching realities with ease.",
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
          "CurateIt's image editor enables your team to apply uniform filters, adjustments, and enhancements to ensure every image reflects your brand’s aesthetic. ",
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
    title: "Unleash your creativity with CurateIt's Image Editor",
    subTitle:
      "Don't let complex software slow down your image editing. Use CurateIt's Image Editor to swiftly enhance, adjust, and beautify your photos with ease.",
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
        question: "What is an online image editor?",
        answer:
          "An online image editor is a web-based tool that allows you to modify and enhance digital images directly in your browser, without the need for downloading software. These tools provide various features such as cropping, resizing, adjusting brightness and contrast, and applying filters.",
      },
      {
        question: "What is the best online image editor for Chrome?",
        answer:
          "While there are several options available, CurateIt stands out due to its intuitive interface and comprehensive range of editing tools. Whether you're a professional designer or just sprucing up personal photos, CurateIt offers a seamless editing experience right within your browser.",
      },
      {
        question:
          "Can you change the brightness and contrast of images online?",
        answer:
          "Yes, most online image editors, including CurateIt, allow you to adjust the brightness and contrast of your images. This feature helps you fine-tune the visual details to ensure your photos look just the way you want.",
      },
      {
        question: "How do I add text to an image online?",
        answer:
          "Adding text to an image online is straightforward with tools like CurateIt's Image Editor. You can choose from various fonts, sizes, and colours to overlay text on your photos, perfect for creating captions, adding labels, or designing engaging graphics.",
      },
      {
        question:
          "Is it possible to crop and resize images using an online editor?",
        answer:
          "Absolutely! Online image editors like CurateIt provide easy-to-use cropping and resizing tools, enabling you to tailor the dimensions of your images for different uses, such as social media posts, blog articles, or print materials.",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(26).png`,
          altText:
            "Best Online Image Editor Extensions for Chrome with CurateIt",
        },
        title: "Best Online Image Editor Extensions for Chrome",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199742/best-online-image-editor-extensions-for-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/Heading(5).png`,
          altText:
            "Step-by-Step Guide to using the Curateit's Image Editor Feature with CurateIt",
        },
        title:
          "Step-by-Step Guide to using the Curateit's Image Editor Feature",
        description: "",
        href: "https://www.curateit.com/u/curateit.com/g/199743/step-by-step-guide-to-using-the-curateits-image-editor-feature",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/450x450_min/webapp/banner.jpg`,
          altText: "Best Image Editor Extensions For Chrome with CurateIt",
        },
        title: "Best Image Editor Extensions For Chrome",
        description: "",
        href: "https://www.curateit.com/u/Curt/c/8745/best-image-editor-extensions-for-chrome",
      },
    ],
  },
};

const ImageEditor = () => {
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

export default ImageEditor;
