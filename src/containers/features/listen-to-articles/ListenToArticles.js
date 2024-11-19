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
    title: "Unlock audio access to your favourite reads on the go!",
    subTitle:
      "Too busy to sit and read every article? Experience efficiency with our Listen to Article feature, transforming your articles into audio so you can stay informed on the go. Perfect for the multitasker in everyone, it ensures you never miss out on valuable content, no matter where you are.",
    features: [
      "Access 1000+ articles audibly",
      "Multitask with ease",
      "Reduce eye strain by 70%",
      "Save 5+ hours weekly",
    ],
    cta: {
      title: "Listen to articles now",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero%20Image%20(1).png`,
      altText:
        "Unlock audio access to your favourite reads on the go with CurateIt",
    },
    breadcrumbs: [
      {
        title: "Home",
        href: "/",
        active: false,
      },
      {
        title: "Features",
        href: "/features",
        active: false,
      },
      {
        title: "Listen to articles",
        href: "#S",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/listen_to_articles_testimonial_profile.png`,
      altText:
        "Unlock audio access to your favourite reads on the go with CurateIt",
    },
    name: "Tom Henderson",
    profession: "PhD Candidate",
    testimonial:
      "“Since incorporating the 'Listen to Article' feature into my routine, I've doubled my daily information intake without additional screen time. It's efficient and indispensable for my studies.”",
  },
  textImageScroll: {
    title: "Eye strain? Let your ears do the reading with CurateIt",
    sections: [
      {
        title: "From text to speech in a blink!",
        subtitle:
          "Tired of reading? It's about time you use CurateIt to turn all your online reads into podcasts and listen to everything on the go.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/From-text-to-speech-in-a-blink.json`,
          altText: "Create custom template s of AI Prompts with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Consume content at an unbelievable speed",
        subtitle:
          "Listen to articles at your own pace by easily adjusting the playback speed. Whether you're in a hurry or want to take things slow, control is just a click away—turn up the speed for a quick listen or dial it down to absorb every word.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Consume-content-at-an-unbelievable-speed.json`,
          altText: "Consume content at an unbelievable speed with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Save audios and never, ever lose it",
        subtitle:
          "Listen to articles at your own pace by easily adjusting the playback speed. Whether you're in a hurry or want to take things slow, control is just a click away—turn up the speed for a quick listen or dial it down to absorb every word.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Save%20audios%20and%20never,%20ever%20lose%20it.png`,
          altText: "Save audios and never, ever lose it with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "A fully customised listening experience",
        subtitle:
          "Customise your listening experience with our diverse selection of voices, languages, and accents. Enjoy your audio adventures, your way!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/A%20fully%20customised%20listening%20experience.png`,
          altText: "A fully customised listening experience with CurateIt",
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
    title: "See how the CurateIt Listen to Article feature works",
    subtitle:
      "In this tutorial, we show you how you can make the best use of the Listen to Article feature to consume articles on the go!",
    embed: "iuNEogYbOJo?si=IdmjOSSXv_0fhuX0",
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
        title: "Researchers",
        subTitle:
          "Got stacks of research articles? Let CurateIt's Listen to Article tool read them out to you, turning your reading backlog into an on-the-go podcast.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Business owners",
        subTitle:
          "Need to check industry reports and market analyses? CurateIt's Listen to Article feature turns those text-heavy pages into digestible audio snippets, so you can stay informed while on the move.",
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
          "For teams juggling project updates and research, our Listen to Article feature converts written content into audio, enabling your team to absorb information during commutes or while multitasking!",
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
    title: "Always stay up with trending articles",
    subTitle:
      "Reading articles is okay, but with CurateIt, you can listen to them instead and free up your hands for other tasks. Transform any online article into a spoken audio file instantly with our Listen to Article tool. ",
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
        question: "What is a listen to article tool?",
        answer:
          "A listen to article tool turns written content into spoken audio, allowing you to hear articles instead of reading them. Simply choose an article online, and the tool converts the text into voice. It's perfect for multitasking or for those who prefer audio over text for consuming information.",
      },
      {
        question: "How do I turn an article into audio?",
        answer:
          "You can turn articles into audio by simply downloading the Chrome extension of CurateIt and creating an account. Once done, you can log in and try the Listen to Article feature on CurateIt.",
      },
      {
        question: "What website turns articles into audio?",
        answer:
          "CurateIt is an all in one platform that enables users to turn articles into audio. What’s more, you can even change the speed of the audio and download for later on your device.",
      },
      {
        question: "What are the benefits of audio articles?",
        answer:
          "There are various benefits of using the audio articles. For starters, it helps you reduce eye strain and listen to articles on the go. With CurateIt, you can even increase the speed of the audio.",
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
        href: "/",
      },
    },
  },
  moreFeatures: {
    blob: "Categories",
    title: "More Features to 10x your productivity.",
    blocks: [
      {
        asset: "PiBrowsers",
        title: "Tabs manager",
        href: "/features/tabs-manager",
      },
      {
        asset: "PiBookmarkSimple",
        title: "Bookmark Manager",
        href: "/features/bookmark-manager",
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
      {
        asset: "PiBookOpen",
        title: "Reader mode",
        href: "/features/reader-mode",
      },
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
        asset: "PiRobot",
        title: "AI Prompts",
        href: "/features/ai-prompts",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(15).png`,
          altText:
            "Best 7 Chrome Extensions for Converting Text to Speech with CurateIt",
        },
        title: "Best 7 Chrome Extensions for Converting Text to Speech",
        description:
          "So, you've probably been there - a browser window so crowded with tabs you can't even see the icons anymore. Sound familiar? 😅 Tab manager apps are like the superheroes of the internet world.",
        href: "https://www.curateit.com/u/curateit.com/g/197924/best-7-chrome-extensions-for-converting-text-to-speech",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/102/icons/Thumbnail(10).png`,
          altText:
            "Step-By-Step Guide to Using the Listen to Article feature on CurateIt",
        },
        title:
          "Step-By-Step Guide to Using the Listen to Article feature on CurateIt",
        description:
          "According to Opensource, 45% of people have more than 20 tabs open at a given time. If you've ever stared at the numerous open tabs on your computer and felt overwhelmed, know that you're not alone.",
        href: "https://www.curateit.com/u/curateit.com/g/197925/step-by-step-guide-to-using-the-listen-to-article-feature-on-cura",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/450x450_min/common/users/207/icons/BlueModernSecurityandTechnologyPresentation(42).png`,
          altText: "Cool Listen To Article Tools In 2024",
        },
        title: "Cool Listen To Article Tools In 2024",
        description:
          "Hello everyone, Curt here from CurateIt! Today, I’m excited to share some insights into the world of listen-to-article tools. These tools are transforming how we interact with written content, so let’s dive in and explore what’s on offer in 2024.",
        href: "https://www.curateit.com/u/Curt/c/6501/cool-listen-to-article-tools",
      },
    ],
  },
};

const ListenToArticles = () => {
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

export default ListenToArticles;
