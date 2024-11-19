import { Spin } from 'antd';
import { useSelector } from 'react-redux';

const HeaderComponent = (props) => {
    const {
        coverImage,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        repositionMode,
        imagePosition,
        isDragging,
        handleCancelPosition,
        handleRepositionMode,
        handleSaveReposition,
        handleOpenCoverModal,
        loading,
        imageRef,
        divPosition="fixed",
        isLeftMargin=true,
        collapsed
    }                                  = props;
    const {isMobileView} = useSelector(state => state.app)
    const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env
    return (
      <>
        {loading ? (
          <Spin size="small" tip="" />
        ) : (
          <div className="">
            {coverImage &&
              (coverImage?.type === "upload" ||
                coverImage?.type === "unsplash") && (
                <div
                  style={{
                    height:
                      coverImage?.size === "small"
                        ? "15vh"
                        : coverImage?.size === "expanded"
                        ? "600px"
                        : "350px",
                    overflow: "hidden",
                  }}
                  className="group"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  {repositionMode && (
                    <p
                      style={{
                        position: "absolute",
                        top: "calc(50% - 10px)",
                        left: " calc(50% - 90px)",
                        padding: "0.3rem 1.5rem",
                      }}
                      className="bg-[#00000066] text-white text-sm w-fit "
                    >
                      Draw image to reposition
                    </p>
                  )}
                  <img
                    ref={imageRef}
                    src={coverImage?.icon?.replace(
                      NEXT_PUBLIC_STATIC_S3_BASE_URL,
                      `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/800x800_contain`
                    )}
                    alt={coverImage?.altInfo || "Collection Cover Image"}
                    style={{
                      display: "block",
                      objectFit: "cover",
                      borderRadius: "0px",
                      width: "100%",
                      height: "100%",
                      opacity: 1,
                      objectPosition: `${imagePosition?.x}% ${imagePosition?.y}%`,
                      pointerEvents: repositionMode ? "auto" : "none",
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                  />
                  {repositionMode ? (
                    <div className="change-cover-wrapper opacity-0 transition-opacity  group-hover:opacity-100">
                      <div className="change-cover-btn-wrapper">
                        <div
                          className="change-cover-btn"
                          onClick={handleSaveReposition}
                        >
                          Save position
                        </div>
                        <div
                          className="change-cover-btn"
                          onClick={handleCancelPosition}
                        >
                          Cancel
                        </div>
                      </div>
                    </div>
                  ) : !isMobileView ? (
                    <div className="change-cover-wrapper opacity-0 transition-opacity  group-hover:opacity-100">
                      <div className="change-cover-btn-wrapper">
                        <div
                          className="change-cover-btn"
                          onClick={handleOpenCoverModal}
                        >
                          Change Cover
                        </div>
                        <div
                          className="change-cover-btn"
                          onClick={handleRepositionMode}
                        >
                          Reposition
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}

            {coverImage && coverImage?.type === "gallery" && (
              <div className="group" id="parent-cover-imagecontainer">
                <div
                  style={{
                    background: coverImage?.icon,
                    height:
                      coverImage?.size === "small"
                        ? "15vh"
                        : coverImage?.size === "expanded"
                        ? "600px"
                        : "350px",
                    overflow: "hidden",
                  }}
                ></div>

                {!isMobileView && (
                  <div className="change-cover-wrapper opacity-0 transition-opacity absolute right-8  group-hover:opacity-100">
                    <div className="change-cover-btn-wrapper">
                      <div
                        className="change-cover-btn"
                        onClick={handleOpenCoverModal}
                      >
                        Change Cover
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </>
    );
}

export default HeaderComponent;