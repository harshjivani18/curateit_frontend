import FeatureBlocks from '@containers/LandingPages/FeatureBlocks/FeatureBlocks'
import FeatureBlocksMobile from '@containers/LandingPages/FeatureBlocks/FeatureBlocksMobile'
import HeroSection from '@containers/LandingPages/HeroSection/HeroSection'
import Testimonial from '@containers/LandingPages/Testimonial/Testimonial'
import TrustedTeams from '@containers/LandingPages/TrustedTeams/TrustedTeams'
import UserCards from '@containers/LandingPages/UserCards/UserCards'
import VideoShowcase from '@containers/LandingPages/VideoShowcase/VideoShowcase'
import StartNow from '@containers/LandingPages/StartNow/StartNow'
import Faq from '@containers/LandingPages/Faq/Faq'
import Blogs from '@containers/LandingPages/Blogs/Blogs'
import TextImageScroll from '@containers/LandingPages/TextImageScroll/TextImageScroll'
import TextImageScrollMobile from '@containers/LandingPages/TextImageScroll/TextImageScrollMobile'
import MoreFeatures from '@containers/LandingPages/MoreFeatures/MoreFeatures'
import CustomNav from '@components/landingPageTabs/CustomNav'
import Footer from '@components/Footer2/Footer'

const data = {
  heroSection: {
    title: "Capture and highlight web info effortlessly for your big ideas!",
    subTitle:
      "Tired of endless scrolling to find that one genius idea you saw online? Make it pop with CurateIt, your must-have web highlighter that ensures your brightest finds never slip through the cracks again.",
    features: [
      "Pick from 4 highlight shades",
      "Highlight text, images, videos, PDFs",
      "Just ONE click to find your highlights",
      "Cut 6+ hours of redundant work daily",
    ],
    cta: {
      title: "Start highlighting here",
      href: `/sign-up`,
    },
    asset: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Hero Image.png`,
      altText:
        "Capture and highlight web info effortlessly for your big ideas with CurateIt",
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
        title: "Web Highlighter",
        href: "#",
        active: true,
      },
    ],
  },
  testimonial: {
    profile: {
      source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/150x150_min/feature-pages/web_highlighter_testimonial_profile.png`,
      altText: "CurateIt Web Highlighter Testimonial Profile picture",
    },
    name: "Emily Clarke",
    profession: "University Student & Freelancer",
    testimonial:
      "“CurateIt's web highlighter has been a lifesaver for my studies and freelance work. It's like having a digital highlighter that never runs out - perfect for marking up important bits across the web. I've saved countless hours.”",
  },
  textImageScroll: {
    title: "Highlighting so good, you'll never want to stop exploring the web!",
    sections: [
      {
        title: "Seamlessly highlight any text on the internet",
        subtitle:
          "Got loads of stuff to read online? Just highlight the bits you need in a variety of colours with CurateIt. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Seamlessly highlight any text on the internet.json`,
          altText:
            "Seamlessly highlight any text on the internet with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          mobileTitle: "Learn more",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Highlight and make notes on images",
        subtitle:
          "Found something interesting in a picture? Just highlight that part and drop a note right there. It's perfect for when you want to remember details or share insights about a photo. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Highlight and make notes on images.jpg`,
          altText: "Highlight and make notes on images with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          mobileTitle: "Learn more",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Highlight PDFs for deeper understanding",
        subtitle:
          "Our PDF Highlighter for Chrome lets you highlight and note down thoughts on PDF documents - anywhere on the internet, making it easier to review and study them. ",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_min/feature-pages/Highlight PDFs for deeper understanding.jpg`,
          altText: "Highlight PDFs for deeper understanding with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          mobileTitle: "Learn more",
          href: `/sign-up`,
        },
        assetType: "image",
      },
      {
        title: "Never miss a moment in any YouTube video—highlight them too",
        subtitle:
          "When you stumble upon something cool in a YouTube video, be it a tutorial or a vlog, you can highlight that specific part and save it into collections. Keep all your interesting finds neatly organised and easy to revisit!",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Never-miss-a-moment-in-any-YouTube-video.json`,
          altText:
            "Never miss a moment in any YouTube video—highlight them too with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          mobileTitle: "Learn more",
          href: `/sign-up`,
        },
        assetType: "other",
      },
      {
        title: "Instantly search any text and save web pages with ease",
        subtitle:
          "Find exactly what you're looking for in your collections with a quick search, and never lose a webpage again by saving permanent copies.",
        asset: {
          source: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/feature-pages/Instantly search any text and save web pages with ease.json`,
          altText:
            "Instantly search any text and save web pages with ease with CurateIt",
        },
        cta: {
          title: "Try Curateit for free",
          mobileTitle: "Learn more",
          href: `/sign-up`,
        },
        assetType: "other",
      },
    ],
  },
  videoShowcase: {
    blob: "Explore",
    title: "See how the CurateIt Web Highlighter works",
    subtitle:
      "Unsure about the web highlighter? Let us clear things up for you with this tutorial!",
    embed: "XOunz2B7JLc?si=j4Kus9aMEyBi_k2i",
    cta: {
      title: "Try for free",
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
          "Swamped with cool finds across the web? Highlight, save, and organise your research work with CurateIt's web highlighter.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiSuitcaseSimple",
        title: "Students",
        subTitle:
          "A never ending list of study materials online? Highlight, save, and categorise your notes effortlessly with CurateIt's web highlighter.",
        cta: {
          title: "Try for free",
          href: `/sign-up`,
        },
      },
      {
        icon: "PiUsers",
        title: "Teams",
        subTitle:
          "Teamwork made easy – highlight, share, and manage web content collectively with CurateIt's highlighter.",
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
    title: "Don't ever miss anything important!",
    subTitle:
      "Ever find cool stuff online but then lose track of it? Don't let that happen again! With CurateIt's Web Highlighter, you can easily highlight text, images, or videos. Keep all the important bits right at your fingertips.",
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
        question: "What is the function of a web highlighter?",
        answer:
          "A web highlighter lets you mark text directly on web pages, similar to how you might use a highlighter pen on paper. ",
      },
      {
        question: "Is there a highlighting tool for Chrome?",
        answer:
          "Yes, CurateIt is a highly recommended highlighting tool for Chrome, favoured by online researchers, content creators, and productivity enthusiasts alike. Its user-friendly interface and versatile features make it ideal for annotating and organising web content efficiently.",
      },
      {
        question: "What is the best highlighter extension for Chrome?",
        answer:
          "CurateIt stands out as the best highlighter extension for Chrome, offering a comprehensive set of features that cater to a wide range of users, from students and researchers to content creators and productivity enthusiasts.",
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
        asset: "PiScan",
        title: "Web Clipper",
        href: "/features/web-clipper",
      },
      // {
      //   asset: "PiRecordFill",
      //   title: "Screen recorder",
      //   href: "/features/screen-recorder",
      // },
      {
        asset: "TextExpander",
        title: "Text Expander",
        href: "/features/text-expander",
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
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/Thumbnail(6).png`,
          altText:
            "Step-by-Step Guide on How To Use The CurateIt Web Highlighter With CurateIt",
        },
        title: "Step-by-Step Guide on How To Use The CurateIt Web Highlighter",
        description:
          "Ever struggled to keep track of useful stuff you find online? Whether it's for work research or study, keeping important bits of info handy can be a real headache.",
        href: "https://www.curateit.com/u/curateit.com/g/197904/step-by-step-guide-on-how-to-use-the-curateit-web-highlighter",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/2.png`,
          altText:
            "The Top 5 Tools to Highlight and Annotate Web Pages with CurateIt",
        },
        title: "The Top 5 Tools to Highlight and Annotate Web Pages",
        description:
          "You have bookmarked hundreds, or maybe thousands of online resources for your research. But when you get back to them a few days later, you cannot recall why you saved that particular article or how exactly it can benefit your research work. ",
        href: "https://www.curateit.com/u/curateit.com/c/8183/step-by-step-guide-on-how-to-use-the-curateit-web-highlighter",
      },
      {
        image: {
          source: `${process.env.NEXT_PUBLIC_STATIC_BLOG_IMAGES_CDN}/600x600_min/common/users/102/icons/BlueModernSecurityandTechnologyPresentation(17).png`,
          altText: "Curateit vs Weavatools: A brief comparison",
        },
        title: "Curateit vs Weavatools: A brief comparison",
        description:
          "Ever feel like you're Indiana Jones battling myriads of browser tabs, desperately trying to capture the infinite nuggets of information before they get lost in the digital desert? Yeah, us too. ",
        href: "https://www.curateit.com/u/curateit.com/g/197905/cuaretit-vs-weavatools-a-brief-comparison",
      },
    ],
  },
};

const WebHighlighter = () => {

    return (
      <div>
        <CustomNav />
        <div id="web-highlighter-page">
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

          <div className="my-10 lg:my-24">
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

export default WebHighlighter