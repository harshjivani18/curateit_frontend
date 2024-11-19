import { Button } from "antd";
import Image from "next/image";


const BrowserLogoComponent = ({item}) => {

  const handleNavigate = (item) => {
    window.open(
      item?.url
        ? `${item.url}`
        : "https://chromewebstore.google.com/detail/curateit-ai-bookmark-mana/hhofkocnlefejficdipgkefgfmnenpbk",
      "_blank"
    );
  }

    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          src={item?.imgSrc}
          alt={item.name}
          priority={true}
          width={56}
          height={56}
        />

        {item?.comingSoon ? (
          <Button className="rounded-[35px] border-[#DFE4EC] hover:border-[#DFE4EC] bg-white text-[#4B4F5D] cursor-not-allowed">
            Coming soon
          </Button>
        ) : (
          <Button
            type="primary"
            className="rounded-[35px] text-white bg-[#347AE2] border-[#347AE2] hover:bg-[#347AE2] hover:border-[#347AE2]"
            onClick={() => handleNavigate(item)}
          >
            Install
          </Button>
        )}
      </div>
    );
}

export default BrowserLogoComponent;