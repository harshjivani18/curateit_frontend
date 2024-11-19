import React, { useEffect, useRef } from 'react';

const RGBImage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = 250;
    const height = 250;

    // Loop through each pixel and set its color
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const red = x;
        const green = y;
        const blue = 0;  // Adjust this value to control the intensity of the blue component

        // Set the pixel color
        context.fillStyle = `rgb(${red},${green},${blue})`;
        context.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={250}
      height={250}
      style={{ border: '1px solid #000' }}
    ></canvas>
  );
};

export default RGBImage;