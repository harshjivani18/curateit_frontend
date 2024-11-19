const CurateitLogo = ({ isCentered }) => {
    const STATIC_IMAGES_CDN = process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN;
    return (
        <div className={isCentered ? "flex justify-center" : ""}>
            <img
              className="h-[35px]"
              src={`${STATIC_IMAGES_CDN}/webapp/logo.png`}
              alt="Curateit"
            />
        </div>
    )
}

export default CurateitLogo