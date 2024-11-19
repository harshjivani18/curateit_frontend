import FeatureBlock from "./FeatureBlock";

const FeatureBlocks = ({ featureBlocks }) => {
  const renderBlocks = () => {
    return (
      featureBlocks &&
      featureBlocks?.length > 0 &&
      featureBlocks?.map((feature, index) => {
        return (
          <FeatureBlock
            size={feature?.size}
            defaultImage={feature?.defaultImage}
            hoverImage={feature?.hoverImage}
            alt={feature?.altText}
            key={`feature-block-${index}`}
            href={feature?.href}
          />
        );
      })
    );
  };

  return (
    <div id="feature-blocks-desktop" className="w-full">
      <div className="page-layout pb-14">
        <div className="grid grid-cols-12 gap-4">{renderBlocks()}</div>
      </div>
    </div>
  );
};

export default FeatureBlocks;
