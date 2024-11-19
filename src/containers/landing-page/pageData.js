import {
  CellularNetworkIcon,
  SourceCodeSquareIcon,
  PaintBoardIcon,
  BookOpen02Icon,
  TimeManagementIcon,
  CircleArrowDataTransferHorizontalIcon,
  ImageAdd02Icon,
  Folder02Icon,
  Target02Icon,
  Note01Icon,
  BulbChargingIcon,
  Atom02Icon,
  DiscoverCircleIcon,
  StarsIcon,
  ZapIcon,
} from "src/hugeicons/Stroke";

const STATIC_IMAGES_CDN = process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN;

export const solutionsContent = [
  {
    key: "1",
    title: "Swipe files",
    iconSrc: <CircleArrowDataTransferHorizontalIcon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/solutions1.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Seamless Retrieval",
        description: `
        With a powerful search feature, retrieve specific content from your swipe files quickly and eliminate the need for manual searching.  `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Multi-Format Support",
        description: `
        From PDFs and JPGs to videos and audio files, embrace the freedom to save and access an extensive array of content in your swipe files.      `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Anywhere, Anytime Access",
        description: `
        Enjoy the convenience of accessing your swipe files from any device at any time, ensuring flexibility in your workflow. `,
      },
    },
  },
  {
    key: "2",
    title: "Moodboards",
    iconSrc: <ImageAdd02Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/roles1.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Organize Images into Gallery",
        description: `
        Save and create a beautiful gallery with curated digital assets from across the web. Categorize them into multiple folders and files in a clutter free manner to access them whenever you please.     `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Customizable Descriptions",
        description: `
        Add context and detail to your mood boards by including unique descriptions, providing insights into the creative vision behind each element.  `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Efficient Highlighting",
        description: `
        Highlight and add annotations in key design elements or inspirations on your mood boards, enhancing communication within your creative team. `,
      },
    },
  },
  {
    key: "3",
    title: "Knowledge",
    iconSrc: <BulbChargingIcon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/roles1.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Centralized Knowledge Hub",
        description: `
        Build a centralized knowledge bank where you can compile and organize a wealth of information in one accessible location. Integrate it seamlessly with platforms like Pocket, Raindrop.io, Kindle, Twitter, Linkedin, and Reddit    `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Privacy Controls",
        description: `
        Exercise control over access to bookmarks, collections, and tags, determining who can view or contribute to each   `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Duplicate or Broken Links",
        description: `
        CurateIt assists in identifying and removing duplicates so you can maintain the integrity of your curated content at all times.  `,
      },
    },
  },
  {
    key: "4",
    title: "Event Planning",
    iconSrc: <Folder02Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/roles1.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Customizable Collections",
        description: `
        Tailor collections to specific aspects of your event, such as vendors, schedules, or marketing materials, enhancing the organization and clarity of event-related content. `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Highlights and Annotations",
        description: `
        Enhance communication and planning by adding highlights and annotations to event-related documents, ensuring key points are emphasized and understood. `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "AI-Powered Tagging",
        description: `
        Leverage intelligent content categorization with auto- tagging, facilitating systematic organization of event-related mood boards, inspiration and materials for quick reference.     `,
      },
    },
  },
  {
    key: "5",
    title: "Ideas, Hobbies & More",
    iconSrc: <Target02Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/roles1.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Customize Covers",
        description: `
        Add a unique touch to your curated content with customizable images, creating an engaging and visually appealing presentation.       `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Explore Collections from Others",
        description: `
        Discover new ideas, content, and perspectives as you navigate through diverse collections crafted by the CurateIt community.   `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Public, Private, and Embed Options",
        description: `
        Choose between public, private, or embed options to control who can access, view, or interact with your curated content, providing flexibility in sharing and collaboration.     `,
      },
    },
  },
  {
    key: "6",
    title: "Job Tracker",
    iconSrc: <Note01Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/roles1.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Streamlined Job Tracking",
        description: `
        Discover potential opportunities and efficiently organize them within personalized collections. With CurateIt, your job search becomes more strategic and organized, putting valuable opportunities at your fingertips for informed career decisions. `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Powerful Organizational Capabilities",
        description: `
        Blend your highlights, notes, and tags to create the perfect brain-boosting concoction. All of your study notes, saved and organized subject wise and topic wise        `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Responsive Access",
        description: `
        Access candidate or employer related materials from any device at any time, providing flexibility for on-the-go decision-making and coordination. `,
      },
    },
  },
];

export const rolesContent = [
  {
    key: "1",
    title: "Digital Marketers ",
    iconSrc: <CellularNetworkIcon/>,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/Digital Marketers.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Product Research",
        description: `
        Compile and analyze competitor products and market trends for informed strategy development
          `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Knowledge Management",
        description: `
        Organize marketing guidelines, resources, and best practices for team access and efficiency      `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "News Digest",
        description: `
        Compile and analyze competitor products and market trends for informed strategy development      `,
      },
    },
  },
  {
    key: "2",
    title: "Educators ",
    iconSrc: <Note01Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/Educators.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "E-Learning Resource Collection",
        description: `
        Gather and manage digital educational materials and online courses for teaching and personal development.     `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Research Paper",
        description: `
        Organize academic papers, research materials, and scholarly articles for easy access and reference  `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Study Guides",
        description: `
        Organize academic papers, research materials, and scholarly articles for easy access and reference      `,
      },
    },
  },
  {
    key: "3",
    title: "HR Professionals ",
    iconSrc: <Target02Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/HR Professionals.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Candidate & Jobs Search Tracker",
        description: `
        Maintain a structured record of potential candidates and job opportunities     `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Knowledge Management",
        description: `
        Organize HR resources, policies, and training materials for efficient internal distribution      `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Travel Planning",
        description: `
        Plan and organize recruitment events, job fairs, and business trips efficiently   `,
      },
    },
  },
  {
    key: "4",
    title: "Freelancers",
    iconSrc: <Folder02Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/Freelancers.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Portfolio",
        description: `
        Display a curated collection of your work, projects, and client testimonials  `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Hobbies, Ideas & Inspiration Curation",
        description: `
        Organize details of business trips, client meetings, and workshops
        `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Hobbies, Ideas & Inspiration Curation",
        description: `
        Collect and organize ideas and inspirations for projects and personal development
        `,
      },
    },
  },
  {
    key: "5",
    title: "Students",
    iconSrc: <TimeManagementIcon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/Students.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Research Paper Library",
        description: `
        Organize academic papers and scholarly articles, including managing citations for research projects.      `,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Study Guides",
        description: `
        Create and maintain comprehensive study guides and educational materials for various subjects.   `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "E-Learning Resource Collection",
        description: `
        Gather online courses, webinars, and educational resources for a richer learning experience
        `,
      },
    },
  },
  {
    key: "6",
    title: "Engineers",
    iconSrc: <SourceCodeSquareIcon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/Engineers.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Coding Snippets Library",
        description: `Maintain a collection of frequently used or reference-worthy code snippets for efficient programming.`,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Knowledge Management",
        description: `
        Organize technical documentation, resources, and best practices for personal and team use    `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Research Paper",
        description: `
        Compile technical papers, articles, and research for ongoing learning and reference   `,
      },
    },
  },
  {
    key: "7",
    title: "Hobbyists",
    iconSrc: <PaintBoardIcon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/Hobbyists.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Hobbies, Ideas & Inspiration Curation",
        description: `Organize and manage collections of hobby-related projects, ideas, and inspirations`,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Recipe Collections",
        description: `
        Plan and organize travel details related to hobby activities, like photography trips or craft workshops. `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Travel Planning",
        description: `
        Compile technical papers, articles, and research for ongoing learning and reference   `,
      },
    },
  },
  {
    key: "8",
    title: "Avid Readers",
    iconSrc: <BookOpen02Icon />,
    content: {
      imageSrc: `${STATIC_IMAGES_CDN}/webapp/Avid Readers.png`,
      featureOne: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "Reading Lists",
        description: `Curate lists of must-read books, articles, and blogs across various genres and interests`,
      },
      featureTwo: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "News Digest",
        description: `
        Create a personalized collection of news feeds, articles, and blogs to stay informed and engaged.   `,
      },
      featureThree: {
        featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
        heading: "E-Learning Resource Collection",
        description: `
        Collect materials and ideas related to reading hobbies, such as book club resources or literary discussions`,
      },
    },
  },
];

export const featuresContent = [
  {
    key: "1",
    title: "Top Features",
    iconSrc: <Atom02Icon />,
    content: {
      firstPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/bookmark-02.svg`,
        title: "Bookmark Management & Efficiency",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Gif 1.gif`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Bookmark Manager",
          description: `Organize, access, and manage bookmarks with unparalleled ease, making it a breeze to navigate through favourite sites. Revolutionize bookmarking experience with CurateIt's Bookmark Manager`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Save sessions ",
          description: `
          Never loose a session, restart sessions easily with Curateit’s Tabs Manager. Share research, sessions with team, enhancing productivity for professionals and multitaskers alike`,
        },
      },
      secondPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/tab-02.svg`,
        title: "Content Interaction & Accessibility",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/gif 2.gif`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Highlight the Web",
          description: `
          Best for product managers, researchers and avid readers to quickly pinpoint and reference key information`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Reader Mode",
          description: `
          Read favorite articles without ads, speed read them or even listen to them to boost productivity  `,
        },
      },
      thirdPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/pen-02.svg`,
        title: "Social Media & Content Creation",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/gif 3.gif`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Backup Social Media Posts",
          description: `
          Effortlessly back up insights from Twitter, LinkedIn, and Reddit. Essential for preserving your digital footprint and valuable social media content`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Web Clipper",
          description: `
          Capture and annotate web content directly for your projects. A powerful tool for content creators, enabling easy collection and organization of web information`,
        },
      },
    },
  },
  {
    key: "2",
    title: "Curation",
    iconSrc: <DiscoverCircleIcon />,
    content: {
      firstPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/bookmark-02.svg`,
        title: "Enhanced Web Interactivity",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Curation 1.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Highlight the Web & YouTube Highlighter",
          description: `Highlight important web content and save key YouTube video segments`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Image & PDF Highlighter",
          description: `
          Annotate crucial details in images and highlight key information in PDFs   `,
        },
      },
      secondPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/tab-02.svg`,
        title: "Content Organization & Backup",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Curation 2.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Save Code Snippets & Backup Tweets",
          description: `
          Capture essential code snippets and archive important Twitter threads `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Duplicate & Broken Links Finder",
          description: `
          Identify and fix broken or duplicate links for a smoother online experience `,
        },
      },
      thirdPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/pen-02.svg`,
        title: "Advanced Collection Management        ",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Curation 3.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Private, Public & Embed Collections",
          description: `
          Organize content in tailored collections for diverse sharing options  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Import Kindle & Pocket Highlights",
          description: `
          Integrate Kindle highlights and transfer Pocket articles for seamless access `,
        },
      },
    },
  },
  {
    key: "3",
    title: "Productivity",
    iconSrc: <ZapIcon />,
    content: {
      firstPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/bookmark-02.svg`,
        title: "Advanced Search & Organization",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Productivity 1.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Spotlight Search & Tabs Manager",
          description: `Utilize powerful search capabilities and efficiently manage browser tabs`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Text Expander & Screen Video Recorder",
          description: `
          Streamline typing tasks and record screen activity with ease       `,
        },
      },
      secondPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/tab-02.svg`,
        title: "Enhanced Recording & Link Management",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Productivity 2.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Audio Recorder & Short Redirect Links",
          description: `
          Capture audio effortlessly and simplify URL sharing with short links  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Listen to Articles & Text/Code Image Extraction (OCR)",
          description: `
          Convert articles to audio and extract text or code from images seamlessly `,
        },
      },
      thirdPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/pen-02.svg`,
        title: "Efficient Access & Reading Tools",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Productivity 3.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Full-Text Search & Keyboard Shortcuts",
          description: `
          Quickly locate information with full-text search and use keyboard shortcuts for efficiency  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "App Shortcuts & Speed Reading",
          description: `
          Navigate apps faster with shortcuts and enhance reading speed for productivity  `,
        },
      },
    },
  },
  {
    key: "4",
    title: "Creator",
    iconSrc: <BulbChargingIcon />,
    content: {
      firstPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/bookmark-02.svg`,
        title: "Dynamic Online Profile Enhancement",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Creator 1.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Link in Bio",
          description: `Create a centralized, impactful best in world bio link to showcase your digital presence with ease`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "MediaKits",
          description: `
          Craft professional and engaging MediaKits to highlight your brand or personal portfolio     `,
        },
      },
      secondPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/tab-02.svg`,
        title: "Advanced Collection & Analytics",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Creator 2.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Private & Public Collections",
          description: `
          Organize content in tailored collections, both private and public, for diverse audience engagement  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Statistics & Activity Logs",
          description: `
          Gain insights into your content performance with detailed statistics and activity logs.`,
        },
      },
      thirdPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/pen-02.svg`,
        title: "Efficient Content Management",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Creator 3.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Read Later",
          description: `
          Save content to access and review at your convenience, ensuring you never miss important information  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Shareable Embeds",
          description: `
          Enhance your website or blog with easily embeddable and shareable content for wider reach  `,
        },
      },
    },
  },
  {
    key: "5",
    title: "Utility",
    iconSrc: <BookOpen02Icon />,
    content: {
      firstPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/bookmark-02.svg`,
        title: "Enhanced Browsing & Reading",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Utility 1.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Site Insights & Reader Mode",
          description: `Gain insights into web usage and enjoy distraction-free reading`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Universal Dark Mode",
          description: `
          Improve comfort and focus across all websites with dark mode   `,
        },
      },
      secondPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/tab-02.svg`,
        title: "Advanced Recording & Capture",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Utility 2.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Screen Video & Audio Recorder",
          description: `
          Easily record high-quality screen and audio content  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Tab Sound Capture & OCR Extraction",
          description: `
          Record audio from browser tabs and extract text or code from images `,
        },
      },
      thirdPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/pen-02.svg`,
        title: "Efficient Annotation & Highlighting",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Utility 3.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Screenshot & Annotations",
          description: `
          Capture and annotate screenshots for detailed content review  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Image & PDF Highlighter",
          description: `
          Emphasize key details in images and PDF documents  `,
        },
      },
    },
  },
  {
    key: "6",
    title: "Readers",
    iconSrc: <StarsIcon />,
    content: {
      firstPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/bookmark-02.svg`,
        title: "Reading Modes & Accessibility",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Readers 1.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Reader Mode & Universal Dark Mode",
          description: `Enjoy a focused reading environment and reduce eye strain with dark mode`,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Read Later & Speed Reading",
          description: `
          Save content for future reading and enhance your reading speed and comprehension       `,
        },
      },
      secondPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/tab-02.svg`,
        title: "Listening & Integration",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Readers 2.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Listen to Articles & Import Pocket Articles",
          description: `
          Convert articles to audio and seamlessly integrate your saved Pocket articles  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Import Kindle Highlights & Goodreads book",
          description: `
          Access and utilize your Kindle highlights for enriched reading and research.`,
        },
      },
      thirdPart: {
        favImageSrc: `${STATIC_IMAGES_CDN}/webapp/pen-02.svg`,
        title: "Research & Content Management",
        imageSrc: `${STATIC_IMAGES_CDN}/webapp/Readers 3.png`,
        featureOne: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Citations & Backup Tweets",
          description: `
          Easily create citations for academic or professional work and archive important Twitter content  `,
        },
        featureTwo: {
          featureIconSrc: `${STATIC_IMAGES_CDN}/webapp/zap.svg`,
          heading: "Highlight the Web & Import Raindrop Highlights",
          description: `
          Emphasize and revisit key web content and integrate highlights from Raindrop.io. `,
        },
      },
    },
  },
];

export const queryContent = [
  {
    key: "1",
    query: "What is Curateit?",
    answer:
      "CurateIt is designed for Professionals, Freelancers, entrepreneurs, and small to medium-sized businesses looking to increase productivity by over 25%, offering web clipping, tab management, bookmarks, Spotlight search, reader view, dark mode, text-to-speech, PDF and YouTube transcript highlights, image screenshots, OCR, site info, and more. Enhance your content curation and organization process with our Chrome extension and web app.",
  },
  {
    key: "2",
    query: "How can I use the Curateit highlighter on web pages?",
    answer: `You can utilize the Curateit highlighter by simply selecting the text you want to highlight on any webpage. After selecting, you'll see a toolbar where you can choose the color and annotate as necessary`,
  },
  {
    key: "3",
    query: "Can I highlight YouTube transcripts with Curateit?",
    answer:
      "Yes, with Curateit, you can easily highlight sections of YouTube transcripts. You can even take notes and extract and save key portions of text",
  },
  {
    key: "4",
    query: "How does the Twitter import feature work in Curateit?",
    answer:
      "The Twitter import feature in Curateit allows you to manage, search, and organize your Twitter bookmarks, likes, and posts. You can save threads or individual tweets and even read simplified threads",
  },
];

export const testimonialsContent = [
  {
    key: "1",
    testimonial: `"CurateIt has been a lifesaver for managing my research articles and notes. Its intuitive interface makes it easy to keep everything organized."`,
    userName: "Dr. Emily Nguyen,",
    userDesignation: "Research Scientist",
    useImageSrc: `${STATIC_IMAGES_CDN}/webapp/testpro1.png`,
  },
  {
    key: "2",
    testimonial: `"As a Product Manager, I find CurateIt indispensable for collating user feedback and competitor analysis. It's streamlined our development process significantly."`,
    userName: "Michael Chen,",
    userDesignation: "Senior Product Manage",
    useImageSrc: `${STATIC_IMAGES_CDN}/webapp/testpro2.png`,
  },
  {
    key: "3",
    testimonial: `"CurateIt has elevated my content creation process, allowing me to efficiently organize and reference my sources. It's an essential tool for any blogger."`,
    userName: "Sarah Johnson,",
    userDesignation: "Professional Blogger",
    useImageSrc: `${STATIC_IMAGES_CDN}/webapp/testpro3.png`,
  },
  {
    key: "4",
    testimonial: `"The ability to save and categorize diverse content types has made CurateIt a crucial part of my daily workflow as a Graphic Designer." `,
    userName: "Alex Rodriguez,",
    userDesignation: "Freelance Graphic Designer",
    useImageSrc: `${STATIC_IMAGES_CDN}/webapp/testpro4.png`,
  },
  {
    key: "5",
    testimonial:
      "Using CurateIt for academic purposes has transformed how I organize my study materials. Its features are perfect for students and educators alike.",
    userName: "Rachel Smith,",
    userDesignation: "University Lecturer ",
    useImageSrc: `${STATIC_IMAGES_CDN}/webapp/testpro5.png`,
  },
  {
    key: "6",
    testimonial: `"As a Marketing Consultant, CurateIt helps me keep track of industry trends and client information, making my work more efficient and organized."`,
    userName: "David Lee,",
    userDesignation: "Marketing Consultant",
    useImageSrc: `${STATIC_IMAGES_CDN}/webapp/testpro6.png`,
  },
];
