
const MadeWithCurateit = () => {
  return (
    <a
      href="https://www.curateit.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="p-2 bg-white text-sm font-medium border hover:bg-gray-100  flex gap-x-1 cursor-pointer items-center justify-center text-[#062046] shadow-gradient-blue rounded-md">
        <img
          className="w-5 h-5"
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
          alt="Octpus with to curateit icon"
        />
        Made with Curateit
      </div>
    </a>
  );
};

export default MadeWithCurateit;
