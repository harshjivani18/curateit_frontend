

function BookmarkIcon({color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 23 28"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.5 15.333v-8m-4 4h8M20.833 26V8.4c0-2.24 0-3.36-.436-4.216a4 4 0 00-1.748-1.748C17.794 2 16.673 2 14.433 2H8.567c-2.24 0-3.36 0-4.216.436a4 4 0 00-1.748 1.748c-.436.856-.436 1.976-.436 4.216V26l9.333-5.333L20.833 26z"
      ></path>
    </svg>
  );
}

export default BookmarkIcon;