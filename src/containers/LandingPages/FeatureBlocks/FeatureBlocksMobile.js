import Image from "next/image";

const FeatureBlocksMobile = ({ featureBlocks }) => {
  const renderBlocks = () => {
    return (
      featureBlocks &&
      featureBlocks?.length > 0 &&
      featureBlocks?.map((feature, index) => {
        return (
          <a
            href={feature?.href ? feature?.href : null}
            className="w-full rounded-2xl"
            key={index}
          >
            <Image
              src={feature?.image}
              className="w-full  rounded-2xl"
              alt={feature?.altText}
              width={1000}
              height={1000}
              loading="lazy"
              style={{
                maxWidth:'100%'
              }}
            />
          </a>
        );
      })
    );
  };

  return (
    <div id="tags-manager-feature-blocks-mobile" className="w-full pb-10">
      <div className="page-layout flex flex-col items-center items-start justify-start gap-4">
        {renderBlocks()}
      </div>
    </div>
  );
};

export default FeatureBlocksMobile;
