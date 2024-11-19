const CoverImageComponent = ({coverImage='',imagePosition,}) => {
    return (
      <div className="">
        {coverImage &&
          (coverImage?.type === "upload" ||
            coverImage?.type === "unsplash") && (
            <div
              style={{
                width: "100%",
                height:
                  coverImage?.size === "small"
                    ? "15vh"
                    : coverImage?.size === "expanded"
                    ? "600px"
                    : "350px",
                overflow: "hidden",
              }}
              className="group"
            >
              <img
                src={
                  !coverImage?.icon?.includes("1200x120")
                    ? coverImage?.icon?.replace(
                        process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL,
                        `${process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL}/1200x120`
                      )
                    : coverImage?.icon
                }
                alt={coverImage?.altInfo || "Collection Cover Image"}
                style={{
                  display: "block",
                  objectFit: "cover",
                  borderRadius: "0px",
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                  objectPosition: `${imagePosition?.x}% ${imagePosition?.y}%`,
                }}
              />
            </div>
          )}

        {coverImage && coverImage?.type === "gallery" && (
          <div className="group" id="parent-cover-imagecontainer">
            <div
              style={{
                background: coverImage?.icon,
                width: "100%",
                height:
                  coverImage?.size === "small"
                    ? "15vh"
                    : coverImage?.size === "expanded"
                    ? "600px"
                    : "350px",
                overflow: "hidden",
              }}
            ></div>
          </div>
        )}
      </div>
    );
}

export default CoverImageComponent;