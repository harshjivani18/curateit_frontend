import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TitleComponent from "@components/onboarding/common/TitleComponents";

const ImageCarousel = ({ images, isLogin=false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Clear existing interval if it exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up a new interval to change the image every 3 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [images.length, currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {isLogin && (
        <div className={`pb-3`}>
          <TitleComponent
            title={images[currentIndex]?.title}
            subTitle={images[currentIndex]?.subTitle}
            isFromImage={true}
          />
        </div>
      )}
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-[50px] transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-4 h-4 rounded-full ${
                index === currentIndex ? "bg-[#347AE2]" : "bg-[#B8D4FE]"
              }`}
            />
          ))}
        </div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`transition-opacity duration-1000 ${
              index === currentIndex
                ? "opacity-100 absolute inset-0 block"
                : "opacity-0 hidden"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className={`fadeImage ${
                index === currentIndex ? "block" : "hidden"
              }
              ${index === 2 ? "mt-6" : ""}
              `}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageCarousel;
