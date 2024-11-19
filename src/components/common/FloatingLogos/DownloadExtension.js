const DownloadExtension = () => {
    return (
      <a
        href="https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk?hl=en&authuser=0&pli=1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="p-2 bg-white text-sm font-medium border hover:bg-gray-100  flex gap-x-1 cursor-pointer items-center justify-center text-[#062046] shadow-gradient-blue rounded-md">
          <img
            className="w-5 h-5"
            src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/extension.png`}
            alt="Download Extension from google chrome store"
          />
          Download Extension
        </div>
      </a>
    );
  };
  
  export default DownloadExtension;
  