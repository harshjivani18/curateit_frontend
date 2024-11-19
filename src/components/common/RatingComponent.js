import React from 'react';

const RatingComponent = ({ value,isBigSize=false }) => {
  const roundedValue = Math.floor(value);

  const icons = [];
  for (let i = 0; i < roundedValue; i++) {
    icons.push(<img className={`${isBigSize ? 'h-5 w-5' : 'h-4 w-4'}`} src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/yellow-star.png`} alt="Rating star" />);
  }

  return <div className='flex gap-1 items-center'>{icons}</div>;
};

export default RatingComponent;
