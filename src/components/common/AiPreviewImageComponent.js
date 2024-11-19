import Image from "next/image";


const AiPreviewImageComponent = () => {
    return (
      <>
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/onboarding-images/ai-profile-demo.png`}
            alt={"profile"}
            priority={true}
            width={585}
            height={450}
            style={{
              width: "100%",
            }}
          />
        </div>
      </>
    );
}

export default AiPreviewImageComponent;