"use client";

import Image from "next/image";

import "../../../components/FeatureBlocks.css";
import { useState } from "react";

const FeatureBlock = ({ size, defaultImage, hoverImage, alt, href, key }) => {
  const [hover, setHover] = useState(false);

  const renderBlock = () => {
    return (
      <a
        href={href}
        className="group h-full w-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={defaultImage}
          className={`transition-all ease-in-out delay-150 block h-full rounded-2xl ${
            hover ? "hidden" : "block"
          } h-full w-full`}
          alt={alt}
          width={1000}
          height={1000}
          loading="lazy"
          style={{
            maxWidth: "100%",
          }}
        />
        <Image
          src={hoverImage}
          className={`transition-all ease-in-out delay-150 block h-full rounded-2xl ${
            hover ? "block" : "hidden"
          } h-full w-full`}
          alt={alt}
          width={1000}
          height={1000}
          priority={true}
          loading="lazy"
          style={{
            maxWidth: "100%",
          }}
        />
      </a>
    );
  };

  return (
    <div className={`grid-col-span-${Math.floor(size)}`}>
      {renderBlock()}
    </div>
  );
};

export default FeatureBlock;
