import FeatureBlocks from '@containers/LandingPages/FeatureBlocks/FeatureBlocks'
import FeatureBlocksMobile from '@containers/LandingPages/FeatureBlocks/FeatureBlocksMobile'
import HeroSection from '@containers/LandingPages/HeroSection/HeroSection'
import Testimonial from '@containers/LandingPages/Testimonial/Testimonial'
import TrustedTeams from '@containers/LandingPages/TrustedTeams/TrustedTeams'
import UserCards from '@containers/LandingPages/UserCards/UserCards'
import VideoShowcase from '@containers/LandingPages/VideoShowcase/VideoShowcase'
import StartNow from '@containers/LandingPages/StartNow/StartNow'
import Faq from '@containers/LandingPages/Faq/Faq'
import MoreFeatures from '@containers/LandingPages/MoreFeatures/MoreFeatures'
import Blogs from '@containers/LandingPages/Blogs/Blogs'
import TextImageScroll from '@containers/LandingPages/TextImageScroll/TextImageScroll'
import TextImageScrollMobile from '@containers/LandingPages/TextImageScroll/TextImageScrollMobile'
import CustomNav from '@components/landingPageTabs/CustomNav'
import Footer from '@components/Footer2/Footer'

const data = {
  heroSection: {
    title:
      "Slash your typing efforts in half with the most efficient text expander",
    subTitle:
      "Why spend ages typing when you could be doing anything else? CurateIt's text expander gets your text across in half the time so you can work on what matters more.",
    features: [
      "3x your typing speed",
      "Cut down 80% of your repetitive typing",
      "Access your go-to phrases in 0.2 seconds",
      "Reclaim 5+ hours every week ",
    ],
    cta: {
      title: "Save time typing here",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image Text Expander.png`,
      altText:
        "Slash your typing efforts in half with the most efficient text expander with CurateIt",
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
        title: "Text Expander",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/text_expander_testimonial_profile.png`,
      altText: "CurateIt Tabs Manager Testimonial Profile picture",
    },
    name: "Michelle Park",
    profession: "Entrepreneur and Creator",
    testimonial:
      "“Ever since incorporating CurateIt's Text Expander into my daily workflow, I've slashed my email response time by half. It's like having a personal assistant for my keyboard!”",
  },
  textImageScroll: {
    title: "Wishing for more hours in a day? Try our Text Expander for it!",
    sections: [
      {
        title: "Create customised text snippets",
        subtitle:
          "Turn long texts into short codes with Custom Text Snippets. Type less, say more, and speed up your writing instantly!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Create customised text snippets.jpg`,
          altText: "Create customised text snippets with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Automate using dynamic forms",
        subtitle:
          "CurateIt's Dynamic forms let you customise your snippets and automate them. Now adjust your pre-saved text on the spot to fit exactly what you need, making your typing efficient.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Automate using dynamic forms.jpg`,
          altText: "Automate using dynamic forms with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Never say “It's on my other device” again!",
        subtitle:
          "As we sync your data across devices, you can keep your snippets handy, no matter the device or browser. This ensures your shortcuts follow you, everywhere you go.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Never say Its on my other device again.jpg`,
          altText: "Never say “It's on my other device” again with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Clipboard's got your back, always",
        subtitle:
          "Combine your clipboard content with CurateIt's Text Expander. This means you can now include text you've copied into your shortcuts, boosting your expander's capabilities even further.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Clipboards got your back always.jpg`,
          altText: "Clipboard's got your back, always with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Never miss tools that you love",
        subtitle:
          "Our Text Expander integrates perfectly with ChatGPT, Gmail, Outlook, Twitter, LinkedIn, and plenty more. Take your typing to the next level by incorporating our text shortcuts into all your essential productivity apps.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Never miss tools that you love.jpg`,
          altText: "Never miss tools that you love with CurateIt",
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
    title: "See how the CurateIt Text Expander works",
    subtitle:
      "Wondering if the Text Expander is right for you? Let us help you decide!",
    embed: "ilH1-_Xg9sw?si=QvOW6SoanDwmr5NB",
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
        title: "Productivity buffs",
        subTitle:
          "Too much typing, not enough time? Speed through your tasks with the Text Expander to create shortcuts, save keystrokes, and save time.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Researchers",
        subTitle:
          "Perfect for researchers as it turns lengthy references into quick shortcuts. Save time, focus on analysis, and make breakthroughs faster.",
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
          "CurateIt's Text Expander streamlines communication with quick shortcuts for common phrases!",
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
    title: "Shortcut your way to productivity!",
    subTitle:
      "Don't wear out your keyboard with repetitive typing! With CurateIt's Text Expander feature, you can easily create shortcuts for frequently used phrases, responses, and more. Save time and effort by keeping your repetitive text just a shortcut away.",
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
        question: "What is text expander used for?",
        answer:
          "A text expander is a tool that lets you type shorter codes or abbreviations, which automatically expand into full words, sentences, or even paragraphs. It's used to save time on typing, reduce typos, and make repetitive writing tasks quicker and easier.",
      },
      {
        question: "How do you make text expander?",
        answer:
          "On CurateIt, making a text expander is simple. First, you create custom snippets—short codes or abbreviations for longer text you often use. When you type these abbreviations, CurateIt automatically replaces them with the full text. This way, you save time and keep your writing consistent.",
      },
      {
        question: "Is a text expander worth it?",
        answer:
          "A text expander is useful especially if you often find yourself typing the same things over and over. It saves time, reduces typing errors, and keeps your work consistent.",
      },
      {
        question: "What is the best text expander tool for Chrome?",
        answer:
          "The best text expander tool for Chrome has got to be CurateIt. It's easy to use and integrates seamlessly with your browser, making your typing faster and more efficient. Whether you’re drafting emails, writing reports, or just jotting down notes, CurateIt saves you time and effort with custom snippets for any text you use frequently. ",
      },
    ],
    more: {
      image: {
        source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/100x100/feature-pages/avatar_group.png`,
        altText:
          "Can't find the answer you're looking for? Please chat to our friendly team at CurateIt",
      },
      title: "Still have questions?",
      subTitle:
        "Can't find the answer you're looking for? Please chat to our friendly team.",
      cta: {
        title: "Get in touch",
        href: "mailto:support@curateit.com",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(8).png`,
          altText: "Top 10 Text Expander Extension for Chrome with CurateIt",
        },
        title: "Top 10 Text Expander Extension for Chrome",
        description:
          "Have you heard of the forgotten art of shorthand?  Imagine a world before recorders and typewriters, where stenographers could transcribe speeches at over 100 words per minute using special symbols!",
        href: "https://www.curateit.com/u/curateit.com/g/197996/top-10-text-expander-extension-for-chrome",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(30).png`,
          altText:
            "Top Image Text Expander Extensions You Need To Know with CurateIt",
        },
        title: "Top Image Text Expander Extensions You Need To Know",
        description:
          "For everyone who's ever wished for a faster way to handle repetitive typing tasks, there's a smile-inducing solution just for you.",
        href: "https://www.curateit.com/u/curateit.com/g/209801/top-image-text-expander-extensions-you-need-to-know",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Thumbnail(2).png`,
          altText:
            "Step-By-Step Guide to Using the CurateIt Text Expander feature with Curateit",
        },
        title: "Step-By-Step Guide to Using the CurateIt Text Expander feature",
        description:
          "If you've ever found yourself typing the same phrases over and over, or rewriting similar emails each day, you know how repetitive and time-consuming it can get.",
        href: "https://www.curateit.com/u/curateit.com/g/197919/step-by-step-guide-to-using-the-curateit-text-expander-feature",
      },
    ],
  },
};

const TextExplander = () => {

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

}

export default TextExplander