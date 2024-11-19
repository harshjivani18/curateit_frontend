import FeatureBlocks from '@containers/LandingPages/FeatureBlocks/FeatureBlocks'
import FeatureBlocksMobile from '@containers/LandingPages/FeatureBlocks/FeatureBlocksMobile'

const ImageGrid = () => {
  const featureBlocks = [
    {
      size: 4,
      defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%201%20default.png `,
      hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%201%20hover.png `,
      link: "https://www.curateit.com/sign-up",
      altText: "All-in-One Content Curation with CurateIt",
    },
    {
      size: 8,
      defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%202%20default.png `,
      hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%202%20hover.png `,
      link: "https://chrome.google.com/webstore/detail/curateit-save-share-manag/hhofkocnlefejficdipgkefgfmnenpbk",
      altText: "Your all in one productivity tool is CurateIt",
    },
    {
      size: 8,
      defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%203%20default.png `,
      hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Image%203%20hover.gif `,
      link: "https://www.curateit.com/sign-up",
      altText: "Find all your needs at one place with CurateIt",
    },
    {
      size: 4,
      defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%204%20default.png `,
      hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%204%20hover.png `,
      link: "https://www.curateit.com/sign-up",
      altText: "Social Collaboration Platform at CurateIt",
    },
    {
      size: 5,
      defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%205%20default.png `,
      hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%205%20hover.png `,
      link: "https://www.curateit.com/sign-up",
      altText: "Save anything from the web with CurateIt",
    },
    {
      size: 7,
      defaultImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%206%20default.png `,
      hoverImage: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Image%206%20hover.gif `,
      link: "https://www.curateit.com/sign-up",
      altText: "Bulk Import and Curate your content in one place with CurateIt",
    },
  ];

  const featureBlocksMobile = [
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%202%20default.png `,
      altText: "Your all in one productivity tool is CurateIt",
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Image%203%20hover.gif `,
      altText: "Find all your needs at one place with CurateIt",
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%204%20mobile.png `,
      altText: "Save anything from the web with CurateIt",
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Img%204%20default.png `,
      altText: "360 degree social collaboration platform with CurateIt",
    },
    {
      image: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/landing-pages/Image%206%20hover.gif `,
      altText: "Bulk Import and Curate your content in one place with CurateIt",
    },
  ];
  return (
    <div className="flex w-full flex-col mx-auto max-w-[1250px]  items-center mt-5 md:mt-20 pb-12 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="hidden lg:block">
        <FeatureBlocks featureBlocks={featureBlocks} />
      </div>

      <div className="block lg:hidden">
        <FeatureBlocksMobile featureBlocks={featureBlocksMobile} />
      </div>
    </div>
  );
};

export default ImageGrid;
