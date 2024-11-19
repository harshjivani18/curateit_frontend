

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 44 44"
    >
      <g filter="url(#filter0_d_6565_98139)">
        <rect width="40" height="40" x="2" y="1" fill="#347AE2" rx="8"></rect>
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 21l-2.731-8.874A59.77 59.77 0 0131.485 21a59.771 59.771 0 01-18.215 8.876L16 21zm0 0h7.5"
        ></path>
        <rect
          width="39"
          height="39"
          x="2.5"
          y="1.5"
          stroke="#347AE2"
          rx="7.5"
        ></rect>
      </g>
      <defs>
        <filter
          id="filter0_d_6565_98139"
          width="44"
          height="44"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_6565_98139"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_6565_98139"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default SendIcon;