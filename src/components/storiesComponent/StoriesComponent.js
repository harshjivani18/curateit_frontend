// import Stories from "react-insta-stories";

const stories = [
  "https://source.unsplash.com/3tYZjGSBwbk",
  "https://picsum.photos/1080/1920",
  "https://picsum.photos/1081/1920",
  "https://picsum.photos/1082/1920",
  "https://picsum.photos/1083/1920",
];

const StoriesComponent = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-40 h-40 rounded-full bg-white shadow-lg">
        <div className="absolute inset-0 border border-black  rounded-full ring ring-black "></div>
        <div className="absolute inset-2 w-36 h-36 rounded-full bg-white">
          <img
            src="https://picsum.photos/200/200"
            alt="Your Story"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default StoriesComponent;
