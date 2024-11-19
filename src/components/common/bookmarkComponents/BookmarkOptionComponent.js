"use client";

import { useEffect, useState }          from "react";
import { useDispatch }                  from "react-redux";
import { 
  ArrowDownTrayIcon,
  FolderIcon, 
  FolderOpenIcon, 
  HeartIcon, 
  LinkIcon 
}                                       from "@heroicons/react/24/outline";
import { 
  Dropdown, 
  Rate,
  Select, 
  message 
}                                       from "antd"
import { useRouter }                    from "next/navigation";
import {
  RiGithubLine,
  RiLinkedinFill,
  RiMediumLine,
  RiProductHuntLine,
  RiRedditLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiThreadsFill,
  RiFacebookLine,
  RiTwitchFill,
  RiPinterestFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiTelegramFill,
  RiSteamFill,
  RiTumblrFill,
  RiGitlabFill,
  RiMastodonFill,
  RiTwitterXFill,
  RiImageEditFill,
}                                       from "react-icons/ri";
import { DiHackernews }                 from "react-icons/di";
import { IoCopyOutline }                from "react-icons/io5";
import { SiImdb, SiSubstack }           from "react-icons/si";
import { AiOutlineLoading3Quarters }    from "react-icons/ai";
import { 
  PiGoodreadsLogoFill, 
  PiPencilSimple 
}                                       from "react-icons/pi";

import Input                            from "@components/collectionCombobox/Input";
import ComboBoxSelect                   from "@components/collectionCombobox/ComboBoxSelect";

import { getTextFromImage } from "@actions/bookmark";
import { getColorForProfilePlatform } from "@utils/commonFunctions";
import session from "@utils/session";
import { FaPinterest } from "react-icons/fa";
import { 
  PLATFORMS, 
  PLATFORMS_ICON, 
  PROFILE_PLATFORMS_ICON, 
  copyText, 
  countriesCurreny 
}                                       from "@utils/constants";

const Option = Select;

const TWEETTYPE = [
  {
    id: 1,
    name: "Post",
    value: "SavedToCurateit",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 2,
    name: "Bookmark",
    value: "Bookmark",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 3,
    name: "Like",
    value: "Like",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 4,
    name: "Saved Post",
    value: "SavedPost",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 5,
    name: "Upvoted",
    value: "Upvoted",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 6,
    name: "Star",
    value: "Star",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 7,
    name: "Comment",
    value: "Comment",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 8,
    name: "Pin",
    value: "Pin",
    icon: <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FolderOpenIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
];

const PROFILE_PLATFORMS = [
    {
      id: 1,
      name: "Twitter",
      value: "Twitter",
      icon: (
        <RiTwitterXFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiTwitterXFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiTwitterXFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 2,
      name: "LinkedIn",
      value: "LinkedIn",
      icon: (
        <RiLinkedinFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiLinkedinFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiLinkedinFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 3,
      name: "Reddit",
      value: "Reddit",
      icon: <RiRedditLine className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <RiRedditLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiRedditLine
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 4,
      name: "Producthunt",
      value: "Producthunt",
      icon: (
        <RiProductHuntLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiProductHuntLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiProductHuntLine
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 5,
      name: "Medium",
      value: "Medium",
      icon: <RiMediumLine className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <RiMediumLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiMediumLine
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 6,
      name: "Hacker News",
      value: "Hacker News",
      icon: <DiHackernews className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <DiHackernews className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <DiHackernews
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 7,
      name: "Github",
      value: "Github",
      icon: <RiGithubLine className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <RiGithubLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiGithubLine
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 8,
      name: "Tiktok",
      value: "Tiktok",
      icon: (
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tiktok.svg`}
          className="h-4 w-4 text-gray-500"
          aria-hidden="true"
          alt="tiktok"
        />
      ),
      selectOptionIcon: (
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tiktok.svg`}
          className="h-4 w-4 text-gray-500"
          aria-hidden="true"
          alt="tiktok"
        />
      ),
      selectedIcon: (
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tiktok.svg`}
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
          alt="tiktok"
        />
      ),
    },
    {
      id: 9,
      name: "Instagram",
      value: "Instagram",
      icon: (
        <RiInstagramLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiInstagramLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiInstagramLine
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 10,
      name: "Youtube" || 'YouTube',
      value: "Youtube" || 'YouTube',
      icon: (
        <RiYoutubeLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiYoutubeLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiYoutubeLine
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 11,
      name: "Threads",
      value: "Threads",
      icon: (
        <RiThreadsFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiThreadsFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiThreadsFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 12,
      name: "Facebook",
      value: "Facebook",
      icon: (
        <RiFacebookLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiFacebookLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiFacebookLine
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 13,
      name: "Twitch",
      value: "Twitch",
      icon: <RiTwitchFill className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <RiTwitchFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiTwitchFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 14,
      name: "Substack",
      value: "Substack",
      icon: <SiSubstack className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <SiSubstack className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <SiSubstack
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 15,
      name: "Pinterest",
      value: "Pinterest",
      icon: (
        <RiPinterestFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiPinterestFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiPinterestFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 16,
      name: "Discord",
      value: "Discord",
      icon: (
        <RiDiscordFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiDiscordFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiDiscordFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 17,
      name: "Whatsapp",
      value: "Whatsapp",
      icon: (
        <RiWhatsappFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiWhatsappFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiWhatsappFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 18,
      name: "Telegram",
      value: "Telegram",
      icon: (
        <RiTelegramFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiTelegramFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiTelegramFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 19,
      name: "Steam",
      value: "Steam",
      icon: <RiSteamFill className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <RiSteamFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiSteamFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 20,
      name: "Tumblr",
      value: "Tumblr",
      icon: <RiTumblrFill className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <RiTumblrFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiTumblrFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 21,
      name: "Gitlab",
      value: "Gitlab",
      icon: <RiGitlabFill className="h-4 w-4 text-gray-500" aria-hidden="true" />,
      selectOptionIcon: (
        <RiGitlabFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiGitlabFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 22,
      name: "Goodreads",
      value: "Goodreads",
      icon: (
        <PiGoodreadsLogoFill
          className="h-4 w-4 text-gray-500"
          aria-hidden="true"
        />
      ),
      selectOptionIcon: (
        <PiGoodreadsLogoFill
          className="h-4 w-4 text-gray-500"
          aria-hidden="true"
        />
      ),
      selectedIcon: (
        <PiGoodreadsLogoFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 23,
      name: "Mastodon",
      value: "Mastodon",
      icon: (
        <RiMastodonFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <RiMastodonFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <RiMastodonFill
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 24,
      name: "Imdb",
      value: "Imdb",
      icon: (
        <SiImdb className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <SiImdb className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <SiImdb
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 25,
      name: "Pinterest",
      value: "Pinterest",
      icon: (
        <FaPinterest className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectOptionIcon: (
        <FaPinterest className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ),
      selectedIcon: (
        <FaPinterest
          className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      ),
    },
];


const BookmarkOptionComponent = ({selectedType,currencySymbol,setCurrencySymbol,setProductPrice,productPrice,fileType='',setFavorite=()=>{},favorite='',rate='',setRate=()=>{},platformType='',setPlatformType=() =>{},onCopyCode=()=>{},assetUrl='',handleChangeAssetUrl=()=>{},page='',tweetType='',setTweetType=()=>{},imageSrc='',action='',id='',textExtract='',setTextExtract=()=>{},html,handleChangeAssetUrlForCode=()=>{} }) => {  
    const dispatch = useDispatch()
    const navigate = useRouter()
    const [textExtractLoading, setTextExtractLoading] = useState(false);
    const [showProfilePlatform, setShowProfilePlatform] = useState(false);
    const [selectedProfilePlatform, setSelectedProfilePlatform] = useState(
      platformType
        ? PROFILE_PLATFORMS.filter(
            (t) => t.value === platformType || t.name === platformType
          )[0]
        : PROFILE_PLATFORMS[0]
    );
    //socialfeed
    const [showTweetType, setShowTweetType] = useState(false);
    const [showPlatform, setShowPlatform] = useState(false);
    const [selectedTweet, setSelectedTweet] = useState(
      tweetType
        ? TWEETTYPE.filter(
            (t) => t.value === tweetType || t.name === tweetType
          )[0]
        : TWEETTYPE[0]
    );
    const [selectedPlatform, setSelectedPlatform] = useState(
      platformType
        ? PLATFORMS.filter(
            (t) => t.value === platformType || t.name === platformType
          )[0]
        : PLATFORMS[0]
    );

    const [open, setOpen] = useState(false);
    const handleOpen = (flag) => {
        setOpen(flag);
    };

    useEffect(() => {
    if (selectedType?.name === "Profile") {
      setSelectedProfilePlatform(
        platformType
          ? PROFILE_PLATFORMS.filter(
              (t) => t.value === platformType || t.name === platformType
            )[0]
          : PROFILE_PLATFORMS[0]
      );
    }
  }, [platformType, selectedType]);

  const onProfilePlatformChange = (e) => {
    setSelectedProfilePlatform(
      PROFILE_PLATFORMS.filter((platform) => platform.value === e)[0]
    );
    setShowProfilePlatform(false);
    setPlatformType(e);
    setOpen(false)
  };

  const getPostTypes = () => {
    if (
      selectedPlatform?.name === "Producthunt" ||
      selectedPlatform?.name === "LinkedIn" ||
      selectedPlatform?.name === "Medium" ||
      (selectedPlatform?.name === "Youtube" || selectedPlatform?.name === "YouTube") ||
      selectedPlatform?.name === "Quora" ||
      selectedPlatform?.name === "Hacker News" ||
      selectedPlatform?.name === "PlayStore" ||
      selectedPlatform?.name === "AppStore" ||
      selectedPlatform?.name === "G2" ||
      selectedPlatform?.name === "Capterra" ||
      selectedPlatform?.name === "Trustpilot" ||
      selectedPlatform?.name === "Google" ||
      selectedPlatform?.name === "ProductHunt" ||
      selectedPlatform?.name === "AppSumo" ||
      selectedPlatform?.name === "Goodreads" ||
      selectedPlatform?.name === "TripAdvisor" ||
      selectedPlatform?.name === "Yelp" ||
      selectedPlatform?.name === "Shopify" ||
      selectedPlatform?.name === "Amazon"
    ) {
      return TWEETTYPE.filter((t) => {
        return t.name === "Post" || t.name === 'Comment';
      });
    } else if (
      selectedPlatform?.name === "Twitter" ||
      selectedPlatform?.name === "X"
    ) {
      return TWEETTYPE.filter((t) => {
        return t.name === "Post" || t.name === "Bookmark" || t.name === "Like" || t.name === 'Comment';
      });
    } else if (selectedPlatform?.name === "Reddit") {
      return TWEETTYPE.filter((t) => {
        return (
          t.name === "Saved Post" ||
          t.name === "Bookmark" ||
          t.name === "Upvoted" || t.name === 'Comment'
        );
      });
    } else if (selectedPlatform?.name === "Github") {
      return TWEETTYPE.filter((t) => {
        return t.name === "Star" || t.name === 'Comment';
      });
    } else if (selectedPlatform?.name === "Pinterest") {
      return TWEETTYPE.filter((t) => {
        return t.name === "Pin";
      });
    }
    return TWEETTYPE;
  };

  const onTweetChange = (e) => {
    setSelectedTweet(TWEETTYPE.filter((tweet) => tweet.value === e)[0]);
    setTweetType(e);
    setShowTweetType(false);
  };

  const onPlatformChange = (e) => {
    setSelectedPlatform(
      PLATFORMS.filter((platform) => platform.value === e)[0]
    );
    setShowPlatform(false);
    setSelectedTweet(null);
    setPlatformType(e);
    setOpen(false)
  };

  const onDownloadImg = (url) => {
    const link      = document.createElement('a');
    link.href       = url;
    link.download   = true;
    link.download   = url;

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };


  const onCopyImageLink = () => {
    copyText(imageSrc, "Image copied to clipboard");
  };

  const onCopyImageText = async () => {
    if (selectedType?.name === "Image") {
      if (imageSrc.startsWith("blob")) {
        message.error("Image is not uploaded yet. So not able to extract text");
        return;
      }
      if (textExtract) {
        message.info("Text Already Copied to clipboard");
        return;
      } else {
        setTextExtractLoading(true);
        const resp = await dispatch(getTextFromImage(imageSrc));
        if (resp.error === undefined) {
          setTextExtractLoading(false);
          const { text } = resp.payload.data;
          try {
            copyText(text, "Text copied to clipboard");
          } catch (err) {
            message.error("Not have permission");
          }
          setTextExtract(text);
        } else {
          setTextExtractLoading(false);
          message.error("Not able to extract text");
          setTextExtract("");
        }
      }

      return;
    }

    // if (mediaType === "Screenshot") {
    //   if (screenshotImageSrc.startsWith("blob")) {
    //     message.error("Image is not uploaded yet. So not able to extract text");
    //     return;
    //   }
    //   if (textExtract) {
    //     message.info("Text Already Copied to clipboard");
    //     return;
    //   } else {
    //     setTextExtractLoading(true);
    //     const resp = await dispatch(extractImageText(screenshotImageSrc));
    //     if (resp.error === undefined) {
    //       setTextExtractLoading(false);
    //       const { text } = resp.payload.data;
    //       try {
    //         copyText(text, "Text copied to clipboard");
    //       } catch (err) {
    //         message.error("Not have permission");
    //       }
    //       setTextExtract(text);
    //     } else {
    //       setTextExtractLoading(false);
    //       message.error("Not able to extract text");
    //       setTextExtract("");
    //     }
    //   }
    // }
  };

  const dropdownnRenderUI = () => {
    return(
      <div className="relative w-full">
            <ComboBoxSelect
              inputShown={showProfilePlatform}
              hideInput={(e) => setShowProfilePlatform(e)}
              tweetData={PROFILE_PLATFORMS}
              onTweetChange={onProfilePlatformChange}
              selectedTweet={selectedProfilePlatform}
              error={false}
            />
        </div>
    )
  }

  const dropdownnRenderSocialFeedUI = () => {
    return(
      <div className="w-full relative mr-2">
              <ComboBoxSelect
                inputShown={showPlatform}
                hideInput={(e) => setShowPlatform(e)}
                tweetData={PLATFORMS}
                onTweetChange={onPlatformChange}
                selectedTweet={selectedPlatform}
                error={false}
                disabled={
                page === "bio" ? true : false
                }
              />
      </div>
    )
  }

  const onImageEditClick = async () => {
        const { NEXT_PUBLIC_BASE_URL }     = process.env
        if (imageSrc) {
            const url                      = imageSrc
            if (url) {
                // const editorURL            = `${NEXT_PUBLIC_BASE_URL}/u/${session.username}/image-editor/${id}/${session.token}?url=${url}`
                // window.open(editorURL,'_blank')
                navigate.push(`/u/${session.username}/image-editor/${id}/${session.token}?url=${url}`)
            }
            else {
                message.error("Can't open the image in editor")
            }
            return
        }
    }

    return(
        <>
        {
        selectedType?.name === 'Product' &&
        <>
        <div className="addbk-select mt-4">
            <Select
            bordered={false}
            value={currencySymbol}
            onChange={(value) => {
            const symbol = value.split('-')[1];
            setCurrencySymbol(symbol);
            }}
            className={`w-fit max-w-[80px]`}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => {
            return (
                option.value.toLowerCase().includes(input.toLowerCase())
            );
            }}
        >
        {countriesCurreny.map((item) => (
          <Option value={`${item.iso}-${item.symbol}`} key={item.iso}>
            {item.symbol}
          </Option>
        ))}
            </Select>
            <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} 
            placeholder="Price"/>
        </div>
        </>
        }

        {
        (selectedType?.name === 'Audio' || (selectedType?.name === 'Ai Prompt' || selectedType?.name === 'Text Expander' || selectedType?.name === 'Quote' || selectedType?.name === 'PDF' || selectedType?.name === 'Citation' || selectedType?.name === 'Video' || selectedType?.name === 'Blog')) &&
        <div className="flex items-center mt-4">
            {(selectedType?.name === 'Quote' || selectedType?.name === 'Citation') && <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5] mr-2" onClick={onCopyCode} title="Copy text">
            <IoCopyOutline className="h-5 w-5"/>
          </div>}
          <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                      e.stopPropagation()
                      setFavorite(prev => !prev)
                    }}>
                      {
                      favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                        </svg> :
                      <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                      }
                      
          </div>
        </div>
        }

        {
        (selectedType?.name === 'Book' || selectedType?.name === 'Movie') &&
        <Rate value={rate} allowHalf onChange={(value) => setRate(value)} />
        }

        {
        selectedType?.name === 'Profile' &&
        <>
        <div className="relative mt-4 w-full">
            <Dropdown
            // overlayStyle={{ width: isMobile? "100%" : "300px",position: 'fixed'}}
            trigger={["click"]}
            dropdownRender={() => dropdownnRenderUI()}
            onOpenChange={handleOpen}
            open={open}
            >
              <div style={{background: getColorForProfilePlatform(platformType)}} className="rounded w-7 h-7 flex items-center justify-center cursor-pointer relative">
              {PROFILE_PLATFORMS_ICON.filter(
                (t) => t.value === platformType || t.name === platformType
              )[0]?.icon}
              <div className='cursor-pointer rounded-full bg-[#347AE2] p-1 absolute right-[-10px] bottom-[-8px]'>
                <PiPencilSimple className="text-white h-3 w-3 aspect-square"/>
              </div>
              </div>
            </Dropdown>
        </div>
        {/* <div className="relative mt-4 w-full">
            <ComboBoxSelect
              inputShown={showProfilePlatform}
              hideInput={(e) => setShowProfilePlatform(e)}
              tweetData={PROFILE_PLATFORMS}
              onTweetChange={onProfilePlatformChange}
              selectedTweet={selectedProfilePlatform}
              error={false}
            />
        </div> */}
        </>
        }

        {
        selectedType?.name === 'Code' &&
        <div className="ml-1 flex items-center mt-4 md:ml-0">
        <Input
          size="small w-full"
          type="text" 
          name="link" 
          placeholder="Website link here..."
          value={assetUrl}
          onChange={handleChangeAssetUrlForCode}
          />
        
        <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5] mx-2" onClick={onCopyCode}>
          <IoCopyOutline className="h-5 w-5"/>
        </div>

        <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justofy-center border border-solid border-[#97A0B5]" onClick={(e) => {
                    e.stopPropagation()
                    setFavorite(prev => !prev)
                  }}>
                    {
                    favorite ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z" fill="#E50000"/>
                      </svg> :
                    <HeartIcon className={`h-5 w-5 text-[#74778B]}`}/>
                    }
                    
        </div>
        </div>
        }

        {
        selectedType?.name === 'SocialFeed' &&
        <div className="flex items-center mt-4 ml-2">
          <div className="w-[150px]">
            <ComboBoxSelect
              inputShown={showTweetType}
              hideInput={(e) => setShowTweetType(e)}
              tweetData={getPostTypes()}
              onTweetChange={onTweetChange}
              selectedTweet={selectedTweet}
              error={false}
            />
          </div>
          <div className="relative ml-4">
            <Dropdown
            // overlayStyle={{ width: isMobile? "100%" : "300px",position: 'fixed'}}
            trigger={["click"]}
            dropdownRender={() => dropdownnRenderSocialFeedUI()}
            onOpenChange={handleOpen}
            open={open}
            >
              <div style={{background: getColorForProfilePlatform(platformType)}} className="rounded w-7 h-7 flex items-center justify-center cursor-pointer relative">
              {PLATFORMS_ICON.filter(
                (t) => t.value === platformType || t.name === platformType
              )[0]?.icon}
              <div className='cursor-pointer rounded-full bg-[#347AE2] p-1 absolute right-[-10px] bottom-[-8px]'>
                <PiPencilSimple className="text-white h-3 w-3 aspect-square"/>
              </div>
              </div>
            </Dropdown>
          </div>

          {/* <div className="w-full relative mr-2">
              <ComboBoxSelect
                inputShown={showPlatform}
                hideInput={(e) => setShowPlatform(e)}
                tweetData={PLATFORMS}
                onTweetChange={onPlatformChange}
                selectedTweet={selectedPlatform}
                error={false}
                disabled={
                page === "bio" ? true : false
                }
              />
          </div> */}
          
        </div>
        }

        {
        (selectedType?.name === 'Image' || selectedType?.name === 'Screenshot') &&
        <div className="flex items-center mt-4">
        {imageSrc && <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justify-center border border-solid border-[#97A0B5] w-fit" onClick={onCopyImageText} disabled={textExtractLoading} title="Text Extract">
          {textExtractLoading ? (
                    <AiOutlineLoading3Quarters  className='h-5 w-5'/>
                  ) : <IoCopyOutline className="h-5 w-5"/>} 
        </div>}

        {action === 'edit' && <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justify-center border border-solid border-[#97A0B5] w-fit ml-2">
          <RiImageEditFill className="cursor-pointer h-5 w-5" onClick={onImageEditClick} />
        </div>}

        {imageSrc && <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justify-center border border-solid border-[#97A0B5] mx-2" onClick={onCopyImageLink} title="Copy Link">
          <LinkIcon className="h-5 w-5"/>
        </div>}

        {((!action && fileType === 'file') || action === 'edit') && <div className="bg-white rounded-[60px] p-1 cursor-pointer flex items-center justify-center border border-solid border-[#97A0B5]" onClick={() => onDownloadImg(imageSrc)} title="Download">
          <ArrowDownTrayIcon className="h-5 w-5"/>
        </div>}
        </div>
        }
        
        </>
    )
}

export default BookmarkOptionComponent