import Blogs from "./Blogs/Blogs";
import Compatibility from "./Compatibility/Compatibility";
import Faq from "./Faq/Faq";
import Hero from "./Hero/Hero";
import ImageSection from "./ImageSection/ImageSection";
import StartNow from "./StartNow/StartNow";
import Testimonials from "./Testimonials/Testimonials";
import CustomNav from "@components/landingPageTabs/CustomNav";
import Footer from "@components/Footer2/Footer";

const data = {
  hero: {
    title: "One Extension. Every Browser.",
    subTitle: [
      "Cross-browser compatibility, zero hassle.",
      "With Curateit, enjoy consistent performance and access to your gems across all browsers.",
    ],
    dropdown: [
      {
        icon: "win",
        title: "Windows (64-bit)",
        href: "/sign-up",
      },
      {
        icon: "mac",
        title: "MacOS",
        href: "/sign-up",
      },
      {
        icon: "linux",
        title: "Linux",
        href: "/sign-up",
      },
    ],
    getMore: {
      title: "Get more apps",
      href: "/sign-up",
    },
  },
  compatibility: {
    list: [
      "Extensions",
      "Mobile",
      "Desktop",
      "Bookmarklets",
      "Integrations",
      "APIs",
    ],
    title: "Curateit goes wherever you go — across devices and browsers alike",
    content: {
      Extensions: {
        icon: "PiGlobe",
        key: "Extensions",
        title: "Browser Extension",
        subTitle:
          "Access Curateit seamlessly across Chrome, Firefox, Safari, and Edge, enjoying consistent functionality and powerful features for a smooth, uninterrupted experience on any browser.",
        links: [
          {
            key: "Chrome",
            href: "https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk",
            icon: "PiGoogleChromeLogo",
          },
          {
            key: "Edge",
            href: "https://microsoftedge.microsoft.com/addons/detail/curateit-ai-bookmark-ma/gdjgbhcijenmgmaagejhofijihdfjjob",
            icon: "SiMicrosoftedge",
          },
          {
            key: "Opera",
            href: "/sign-up",
            icon: "SiOpera",
          },
        ],
        iconList: "browser-icons-list",
      },
      Mobile: {
        icon: "PiDeviceMobileCamera",
        key: "Mobile",
        title: "Android & iPhones",
        subTitle:
          "Curateit all your work and gems are always at your fingertips, synced effortlessly across devices.",
        links: [
          {
            key: "Android",
            href: "/sign-up",
            icon: "PiAndroidLogo",
          },
          {
            key: "iPhone",
            href: "/sign-up",
            icon: "PiAppleLogo",
          },
        ],
        blob: {
          visible: true,
          title: "Coming Soon",
        },
      },
      Desktop: {
        icon: "PiDesktop",
        key: "Desktop",
        title: "Mac, Windows & Linux",
        subTitle:
          "Access Curateit seamlessly on your Mac, Windows, or Linux desktops for unified productivity across all platforms.",
        links: [
          {
            key: "Windows",
            href: "/sign-up",
            icon: "PiWindowsLogo",
          },
          {
            key: "MacOS",
            href: "/sign-up",
            icon: "PiAppleLogo",
          },
          {
            key: "Linux",
            href: "/sign-up",
            icon: "PiLinuxLogo",
          },
        ],
      },
      Bookmarklets: {
        icon: "PiBookmark",
        key: "Bookmarklets",
        title: "Bookmarklets",
        subTitle:
          "Add Curateit's powerful features to any browser with ease using our convenient bookmarklets.",
        links: [
          {
            key: "Bookmarklets",
            title: "Add Bookmarklets",
            href: "/sign-up",
            icon: "PiBookmark",
          },
        ],
      },
      Integrations: {
        icon: "PiDesktop",
        key: "Integrations",
        title: "Integrations",
        subTitle:
          "Enhance your workflow by integrating Curateit with your favorite apps and tools, making your productivity journey smoother than ever.",
        links: [
          {
            key: "Connect",
            title: "Connect Now",
            href: "/sign-up",
            icon: "PiCheckCircle",
          },
        ],
        blob: {
          visible: true,
          title: "Coming Soon",
        },
        iconList: "integration-icons-list",
      },
      APIs: {
        icon: "PiKey",
        key: "APIs",
        title: "APIs",
        subTitle:
          "Integrate Curateit's functionalities into your workflows with our flexible APIs, empowering advanced customization and automation.",
        links: [
          {
            key: "Windows",
            title: "Get API Keys",
            href: "/sign-up",
            icon: "PiKey",
          },
        ],
        blob: {
          visible: true,
          title: "Coming Soon",
        },
      },
      // 'Imports': {
      //     icon: 'PiGlobe',
      // },
    },
  },
  bulkImport: {
    title: "Import from over 12+ platforms in a click",
    subTitle:
      "Safely import and save social media posts, testimonials, inspiration boards, movies, kindly highlights and more from a range of platforms.",
    defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Img 6 default.png`,
    hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Image 6 hover.gif`,
    alt: "",
    cta: {
      title: "Start Importing",
      href: "/sign-up",
    },
  },
  testimonials: {
    blob: "Testimonials",
    title: "What Customer Says",
    subTitle:
      "Tool and strategies modern teams need to help their companies grow.",
    testimonials: [
      {
        testimonial:
          '"CurateIt has been a lifesaver for managing my research articles and notes. Its intuitive interface makes it easy to keep everything organized."',
        name: "Dr. Emily Nguyen,",
        profession: "Research Scientist",
        profile: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/dr_emily_nguyen.png`,
          altText:
            "Power up your productivity by building an AI prompts library with CurateIt",
        },
      },
      {
        testimonial:
          '"As a Product Manager, I find CurateIt indispensable for collating user feedback and competitor analysis. It\'s streamlined our development process significantly."',
        name: "Michael Chen,",
        profession: "Senior Product Manager",
        profile: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/michael_chen.png`,
          altText:
            "Power up your productivity by building an AI prompts library with CurateIt",
        },
      },
      {
        testimonial:
          '"CurateIt has elevated my content creation process, allowing me to efficiently organize and reference my sources. It\'s an essential tool for any blogger."',
        name: "Sarah Johnson,",
        profession: "Professional Blogger",
        profile: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/sarah_johnson.png`,
          altText:
            "Power up your productivity by building an AI prompts library with CurateIt",
        },
      },
      {
        testimonial:
          '"The ability to save and categorize diverse content types has made CurateIt a crucial part of my daily workflow as a Graphic Designer."',
        name: "Alex Rodriguez,",
        profession: "Freelance Graphic Designer",
        profile: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/alex_rodriguez.png`,
          altText:
            "Power up your productivity by building an AI prompts library with CurateIt",
        },
      },
      {
        testimonial:
          "“Using CurateIt for academic purposes has transformed how I organize my study materials. Its features are perfect for students and educators alike.”",
        name: "David Lee,",
        profession: "Marketing Consultant",
        profile: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/david_lee.png`,
          altText:
            "Power up your productivity by building an AI prompts library with CurateIt",
        },
      },
      {
        testimonial:
          "“As a Marketing Consultant, CurateIt helps me keep track of industry trends and client information, making my work more efficient and organized.”",
        name: "Rachel Smith,",
        profession: "University Lecturer",
        profile: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/rachel_smith.png`,
          altText:
            "Power up your productivity by building an AI prompts library with CurateIt",
        },
      },
    ],
    cta: {
      title: "See More",
      href: "/sign-up",
    },
  },
  startNow: {
    title: "Explore Infinite Ways To Use CurateIt",
    subTitle:
      "Use CurateIt exactly the way you like. No matter which browser, you can have CurateIt by your side.",
    cta: {
      title: "Download now",
      href: "/sign-up",
    },
  },
  faq: {
    title: "Frequently asked questions",
    subTitle: "Everything you need to know about the product and billing.",
    faqs: [
      {
        question: "What is CurateIt?",
        answer:
          "CurateIt is a versatile content curation tool designed to help users collect, organise, and share digital content efficiently. It's perfect for designers, content creators, marketers, and anyone looking to streamline their content management process.",
      },
      {
        question: "What features does CurateIt offer?",
        answer:
          "CurateIt offers features such as: Easy content clipping from web pages, Organisation of collected content into customisable boards, Sharing boards with team members or publicly, Annotating content with notes and tags, Integration with other productivity tools",
      },
      {
        question: "Can I use CurateIt offline?",
        answer:
          "CurateIt primarily operates as an online tool, requiring an internet connection to clip, organise, and share content. However, you can access previously saved content offline.",
      },
      {
        question: "Is CurateIt free?",
        answer:
          "CurateIt offers a free plan with basic features. For more advanced functionalities, there are various premium plans available, each catering to different user needs.",
      },
      {
        question: "How can CurateIt help in team collaboration?",
        answer:
          "CurateIt enhances team collaboration by allowing users to create shared boards, where team members can collectively clip, organise, and annotate content. This facilitates seamless communication and collaboration on projects.",
      },
      {
        question: "In which browsers can I use CurateIt?",
        answer:
          "You can use CurateIt on Chrome, FireFox, Safari Edge and many more!",
      },
    ],
    more: {
      image: {
        source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/avatar_group.png`,
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(19).png`,
          altText: "Top 7 AI Prompts Library Extension for Google Chrome",
        },
        title: "Top 7 AI Prompts Library Extension for Google Chrome",
        description:
          "Lost the specific AI prompt you're looking for? Now you have to retype it or look for it amongst the many you've saved in a document somewhere. Re-typing prompts you re-use regularly or looking for them in documents can be time-consuming.",
        href: "https://www.curateit.com/u/curateit.com/g/197988/top-7-ai-prompts-library-extension-for-google-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/common/users/102/icons/Thumbnail(5).png`,
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

const Downloads = () => {
  return (
    <div>
      <CustomNav />
      <div>
        <Hero {...data?.hero} />

        <div className="">
          <Compatibility {...data?.compatibility} />
        </div>

        <div className="my-10 md:my-7">
          <ImageSection {...data?.bulkImport} />
        </div>

        <div className="my-20 md:my-24">
          <Testimonials {...data?.testimonials} />
        </div>

        <div className="">
          <StartNow {...data?.startNow} />
        </div>

        <div className="my-10 md:my-24">
          <Faq {...data?.faq} />
        </div>

        <div className="my-10 md:my-24">
          <Blogs {...data?.blogs} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Downloads;
