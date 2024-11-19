"use client";
import "react-quill/dist/quill.snow.css";
import { 
  useState, 
  useRef, 
  useEffect 
}                                   from "react";
import {
  CheckIcon,
  FolderIcon,
  FolderOpenIcon,
}                                   from "@heroicons/react/24/outline";
import {
  Button,
  DatePicker,
  Input,
  Rate,
  Select,
  Space,
  Spin,
  Tooltip,
  message,
}                                    from "antd";
import { useDispatch }               from "react-redux";
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
  RiSnapchatFill,
  RiTwitterXFill,
}                                   from "react-icons/ri";
import { DiHackernews }             from "react-icons/di";
import {
  FaQuora,
  FaAppStore,
  FaProductHunt,
  FaGoodreads,
  FaShopify,
  FaAmazon,
  FaYelp,
}                                   from "react-icons/fa";
import { BsGoogle, BsApple }        from "react-icons/bs";
import { IoLogoGooglePlaystore }    from "react-icons/io5";
import { SiSubstack }               from "react-icons/si";
import { PiGoodreadsLogoFill }      from "react-icons/pi";
import moment                       from "moment";
import dynamic                      from "next/dynamic";

import { 
  Delete02Icon, 
  PaintBoardIcon 
}                                   from "src/hugeicons/Stroke";
import ComboBoxSelect               from "@components/collectionCombobox/ComboBoxSelect";
import AudioTranslate               from "@components/audioNote/AudioTranslate";

import { 
  copyText, 
  HIGHLIGHTED_COLORS, 
  CITATIONS 
}                                   from "@utils/constants";
import session                      from "@utils/session";

import { extractImageText }         from "@actions/bookmark";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { Option } = Select;

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
];

const PLATFORMS = [
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
        alt="titok"
      />
    ),
    selectOptionIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tiktok.svg`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="titok"
      />
    ),
    selectedIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tiktok.svg`}
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
        alt="titok"
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
    name: "YouTube",
    value: "YouTube",
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
    name: "Quora",
    value: "Quora",
    icon: <FaQuora className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FaQuora className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FaQuora
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 12,
    name: "PlayStore",
    value: "PlayStore",
    icon: (
      <IoLogoGooglePlaystore
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
      />
    ),
    selectOptionIcon: (
      <IoLogoGooglePlaystore
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
      />
    ),
    selectedIcon: (
      <IoLogoGooglePlaystore
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 13,
    name: "AppStore",
    value: "AppStore",
    icon: <FaAppStore className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FaAppStore className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FaAppStore
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 14,
    name: "G2",
    value: "G2",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/g2.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="G2"
      />
    ),
    selectOptionIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/g2.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="G2"
      />
    ),
    selectedIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/g2.png`}
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
        alt="G2"
      />
    ),
  },
  {
    id: 15,
    name: "Capterra",
    value: "Capterra",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/capterra.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Capterra"
      />
    ),
    selectOptionIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/capterra.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Capterra"
      />
    ),
    selectedIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/capterra.png`}
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
        alt="Capterra"
      />
    ),
  },
  {
    id: 16,
    name: "Trustpilot",
    value: "Trustpilot",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/trustpilot.svg`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Trustpilot"
      />
    ),
    selectOptionIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/trustpilot.svg`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Trustpilot"
      />
    ),
    selectedIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/trustpilot.svg`}
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
        alt="Trustpilot"
      />
    ),
  },
  {
    id: 17,
    name: "Google",
    value: "Google",
    icon: <BsGoogle className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <BsGoogle className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <BsGoogle
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 18,
    name: "ProductHunt",
    value: "ProductHunt",
    icon: (
      <FaProductHunt className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectOptionIcon: (
      <FaProductHunt className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FaProductHunt
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 19,
    name: "AppSumo",
    value: "AppSumo",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/appsumo.webp`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="AppSumo"
      />
    ),
    selectOptionIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/appsumo.webp`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="AppSumo"
      />
    ),
    selectedIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/appsumo.webp`}
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
        alt="AppSumo"
      />
    ),
  },
  {
    id: 20,
    name: "Goodreads",
    value: "Goodreads",
    icon: <FaGoodreads className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FaGoodreads className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FaGoodreads
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 21,
    name: "TripAdvisor",
    value: "TripAdvisor",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tripadvisor.svg`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="TripAdvisor"
      />
    ),
    selectOptionIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tripadvisor.svg`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="TripAdvisor"
      />
    ),
    selectedIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tripadvisor.svg`}
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
        alt="TripAdvisor"
      />
    ),
  },
  {
    id: 22,
    name: "AppStore",
    value: "AppStore",
    icon: <BsApple className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <BsApple className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <BsApple
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 23,
    name: "Yelp",
    value: "Yelp",
    icon: <FaYelp className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FaYelp className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FaYelp
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 24,
    name: "Shopify",
    value: "Shopify",
    icon: <FaShopify className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FaShopify className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FaShopify
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 25,
    name: "Amazon",
    value: "Amazon",
    icon: <FaAmazon className="h-4 w-4 text-gray-500" aria-hidden="true" />,
    selectOptionIcon: (
      <FaAmazon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <FaAmazon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 25,
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
    id: 26,
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
    id: 27,
    name: "Snapchat",
    value: "Snapchat",
    icon: (
      <RiSnapchatFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectOptionIcon: (
      <RiSnapchatFill className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <RiSnapchatFill
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 28,
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
    id: 29,
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
    name: "YouTube",
    value: "YouTube",
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
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MediaTypeRender = ({
  mediaType,
  mediaData,
  highlightedText,
  highlightedColor,
  setHighlightedColor,
  setHighlightClass,
  imageSrc = "",
  audioSrc = "",
  videoSrc = "",
  codeLanguage,
  code,
  setCode,
  setCodeLanguage,
  pdfSrc,
  screenshotImageSrc,
  tweetType,
  setTweetType,
  platformType,
  citation,
  citationText,
  credibility,
  citationAuthor,
  citationDate,
  handleCitationChange,
  setCitationAuthor,
  setCitationDate,
  setCitationText,
  setCredibility,
  fetching,
  setHtmlText,
  htmlText,
  setPlainText,
  plainText,
  setShortendurl,
  shortendurl,
  fileType,
  gemSingleId = "",
  setPlatformType,
  action = "",
  setHighlightedText,
  onFileChange,
  pdfFilename = "",
  testimonial,
  testimonialAttachImage,
  testimonialAuthor,
  testimonialDate,
  testimonialProduct,
  testimonialRating,
  testimonialTagLine,
  testimonialUrl,
  setTestimonial,
  setTestimonialAttachImage,
  setTestimonialAuthor,
  setTestimonialDate,
  setTestimonialProduct,
  setTestimonialRating,
  setTestimonialTagLine,
  setTestimonialUrl,
  setTestimonialPlatform,
  testimonialPlatform,
  rate,
  setRate,
  readStatus,
  watchStatus,
  setReadStatus,
  setWatchStatus,
  dateRead,
  setDateRead,
  page = "",
  audioEnhancedText,
  setAudioEnhancedText,
  audioOriginalText,
  setAudioOriginalText,
  audioRecordSrc ,
  setAudioRecordSrc,
  setAudioSrc
}) => {
  const { NEXT_PUBLIC_STATIC_S3_BASE_URL } = process.env;
  const dispatch = useDispatch();
  const highlightRef = useRef();
  const testimonialRef = useRef();
  const fileRef = useRef();
  const [textExtractLoading, setTextExtractLoading] = useState(false);
  const [textExtract, setTextExtract] = useState("");
  const [showTweetType, setShowTweetType] = useState(false);
  const [showPlatform, setShowPlatform] = useState(false);
  //socialfeed
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
  //profile platform
  const [showProfilePlatform, setShowProfilePlatform] = useState(false);
  const [selectedProfilePlatform, setSelectedProfilePlatform] = useState(
    platformType
      ? PROFILE_PLATFORMS.filter(
          (t) => t.value === platformType || t.name === platformType
        )[0]
      : PROFILE_PLATFORMS[0]
  );
  const [showTestimonialPlatform, setShowTestimonialPlatform] = useState(false);
  const [selectedTestimonialPlatform, setSelectedTestimonialPlatform] =
    useState(
      testimonialPlatform
        ? PLATFORMS.filter(
            (t) =>
              t.value === testimonialPlatform || t.name === testimonialPlatform
          )[0]
        : PLATFORMS[0]
    );
  const [showColorOptions, setShowColorOptions] = useState(false);
  useEffect(() => {
    if (mediaType === "Profile") {
      setSelectedProfilePlatform(
        platformType
          ? PROFILE_PLATFORMS.filter(
              (t) => t.value === platformType || t.name === platformType
            )[0]
          : PROFILE_PLATFORMS[0]
      );
    }
    if (mediaType === "SocialFeed") {
      setSelectedPlatform(
        platformType
          ? PLATFORMS.filter(
              (t) => t.value === platformType || t.name === platformType
            )[0]
          : PLATFORMS[0]
      );
    }
  }, [platformType, mediaType]);

  const onProfilePlatformChange = (e) => {
    setSelectedProfilePlatform(
      PROFILE_PLATFORMS.filter((platform) => platform.value === e)[0]
    );
    setShowProfilePlatform(false);
    setPlatformType(e);
  };
  const codeRef = useRef();

  const onTextCopy = () => {
    copyText(highlightedText, "Highlight copied to clipboard");
  };

  const onTextDelete = () => {
    setHighlightedText("");
    setAudioEnhancedText("");
    setAudioOriginalText("");
  };

  const handleColorToggle = () => {
    setShowColorOptions(!showColorOptions);
  };
  const onHighlightBlur = () => {
    if (highlightRef) {
      setHighlightedText(highlightRef.current.innerText);
    }
  };
  const onTestimonialBlur = () => {
    if (testimonialRef) {
      setTestimonial(testimonialRef.current.innerText);
    }
  };
  const onUploadFileClick = () => {
    if (fileRef) {
      fileRef.current.click();
    }
  };

  const onDownloadImg = (url) => {
    const element = document.createElement("a");
    element.href = url;
    element.download = url;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const onCopyImageLink = () => {
    if (mediaType === "Image") {
      copyText(imageSrc, "Image copied to clipboard");
      return;
    }
    if (mediaType === "Screenshot") {
      copyText(screenshotImageSrc, "Image copied to clipboard");
    }
  };

  const onCopyImageText = async () => {
    if (mediaType === "Image") {
      if (imageSrc.startsWith("blob")) {
        message.error("Image is not uploaded yet. So not able to extract text");
        return;
      }
      if (textExtract) {
        message.info("Text Already Copied to clipboard");
        return;
      } else {
        setTextExtractLoading(true);
        const resp = await dispatch(extractImageText(imageSrc));
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

    if (mediaType === "Screenshot") {
      if (screenshotImageSrc.startsWith("blob")) {
        message.error("Image is not uploaded yet. So not able to extract text");
        return;
      }
      if (textExtract) {
        message.info("Text Already Copied to clipboard");
        return;
      } else {
        setTextExtractLoading(true);
        const resp = await dispatch(extractImageText(screenshotImageSrc));
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
    }
  };

  const onDownloadAudio = () => {
    if (audioSrc && mediaType === "Audio") {
      const link = document.createElement("a");
      link.href = audioSrc;
      link.download = audioSrc;

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      return;
    }

    if (videoSrc && mediaType === "Video") {
      const link = document.createElement("a");
      link.href = videoSrc;
      link.download = videoSrc;

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }

    if (pdfSrc && mediaType === "PDF") {
      const link = document.createElement("a");
      link.href = pdfSrc;
      link.download = pdfSrc;

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const onCopyAudioLink = () => {
    if (mediaType === "Audio") {
      try {
        copyText(audioSrc, "Audio link copied to clipboard");
      } catch (err) {
        message.error("Not have permission");
      }
      return;
    }

    if (mediaType === "Video") {
      try {
        copyText(videoSrc, "Video link copied to clipboard");
      } catch (err) {
        message.error("Not have permission");
      }
    }

    if (mediaType === "PDF") {
      try {
        copyText(pdfSrc, "PDF link copied to clipboard");
      } catch (err) {
        message.error("Not have permission");
      }
    }
  };

  const onCodeBlur = (e) => {
    if (codeRef) {
      setCode(codeRef.current.innerText);
    }
  };

  const onCopyCode = () => {
    if (codeRef) {
      try {
        copyText(codeRef.current.innerText, "Code copied to clipboard");
      } catch (err) {
        message.error("An error occured while copyinh this code", "error");
      }
    }
  };

  const renderPDFThumbnail = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/pdf.png`}
          alt="PDF file icon"
          className="w-20 h-20"
        />
        <a href={pdfSrc} target="_blank" rel="noreferrer">
          <span>{pdfFilename ? pdfFilename : pdfSrc.split("/").pop()}</span>
        </a>
      </div>
    );
  };

  const onExpnaderChange = (content, delta, source, editor) => {
    setHtmlText(content);
    setPlainText(editor.getText());
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };
  const onEditImageClick = async () => {
    const { NEXT_PUBLIC_BASE_URL } = process.env;
    if (mediaType === "Image") {
      window.open(
        `${NEXT_PUBLIC_BASE_URL}/u/${session.username}/image-editor/${gemSingleId}/${session.token}?url=${imageSrc}` ||
          "",
        "_blank"
      );
      return;
    }
    if (mediaType === "Screenshot") {
      window.open(
        `${NEXT_PUBLIC_BASE_URL}/u/${session.username}/image-editor/${gemSingleId}/${session.token}?url=${screenshotImageSrc}` ||
          "",
        "_blank"
      );
      return;
    }
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
  };
  const onTestimonialPlatformChange = (e) => {
    setSelectedTestimonialPlatform(
      PLATFORMS.filter((platform) => platform.value === e)[0]
    );
    setShowTestimonialPlatform(false);
    setTestimonialPlatform(e);
  };
  const getPostTypes = () => {
    if (
      selectedPlatform?.name === "Producthunt" ||
      selectedPlatform?.name === "LinkedIn" ||
      selectedPlatform?.name === "Medium" ||
      selectedPlatform?.name === "YouTube" ||
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
      selectedPlatform?.name === "AppStore" ||
      selectedPlatform?.name === "Yelp" ||
      selectedPlatform?.name === "Shopify" ||
      selectedPlatform?.name === "Amazon"
    ) {
      return TWEETTYPE.filter((t) => {
        return t.name === "Post";
      });
    } else if (
      selectedPlatform?.name === "Twitter" ||
      selectedPlatform?.name === "X"
    ) {
      return TWEETTYPE.filter((t) => {
        return t.name === "Post" || t.name === "Bookmark" || t.name === "Like";
      });
    } else if (selectedPlatform?.name === "Reddit") {
      return TWEETTYPE.filter((t) => {
        return (
          t.name === "Saved Post" ||
          t.name === "Bookmark" ||
          t.name === "Upvoted"
        );
      });
    } else if (selectedPlatform?.name === "Github") {
      return TWEETTYPE.filter((t) => {
        return t.name === "Star";
      });
    }
    return TWEETTYPE;
  };

  const renderFileUpload = () => {
    if (mediaType === "PDF") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="application/pdf"
          />
          <Button onClick={onUploadFileClick}>Upload PDF!</Button>
        </>
      );
    }
    if (mediaType === "Audio") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="audio/*"
          />
          <Button onClick={onUploadFileClick}>Upload Audio!</Button>
        </>
      );
    }
    if (mediaType === "Video") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="video/*"
          />
          <Button onClick={onUploadFileClick}>Upload Video!</Button>
        </>
      );
    }
    if (mediaType === "Image") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="image/*"
          />
          <Button onClick={onUploadFileClick}>Upload Image!</Button>
        </>
      );
    }
    if (mediaType === "Testimonial") {
      return (
        <>
          <input
            type={"file"}
            className={"hidden"}
            onChange={onFileChange}
            ref={fileRef}
            accept="image/*"
          />
          <Button onClick={onUploadFileClick}>Upload Image!</Button>
        </>
      );
    }
  };

  return (
    <>
      {(mediaType === "Highlight" || mediaType === "Quote") && (
        <div className="pt-4">
          <div className="bg-white rounded-md p-2 border-2 relative">
            <div>
              <svg
                className="highlight-copy-svg"
                onClick={onTextCopy}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" />
              </svg>
              <div
                style={{ height: "auto" }}
                ref={highlightRef}
                onBlur={onHighlightBlur}
                contentEditable={action === "add" ? true : false}
                className={classNames(
                  highlightedColor?.border,
                  "flex-1 text-xs text-gray-500 border-l-4 pl-2 py-0 outline-none highlight-content-container"
                )}
              >
                {highlightedText}
              </div>
            </div>
            <div className="flex justify-end items-baseline space-x-3">
              <div className="flex justify-end space-x-2 items-center">
                {HIGHLIGHTED_COLORS.map((color) => (
                  <button
                    key={color.id}
                    style={{ backgroundColor: `${color.bg}` }}
                    className={classNames(
                      "flex justify-center items-center h-4 w-4 rounded-full border-[1px] border-gray-400"
                    )}
                    onClick={() => {
                      setHighlightedColor(color);
                      setHighlightClass(color.className);
                    }}
                  >
                    <CheckIcon
                      className={classNames(
                        color.id === highlightedColor?.id ? "" : color.text,
                        "h-2 w-2"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {mediaType === "Note" && (
        <div className="pt-4">
          <div className="pb-4">
            <AudioTranslate
              audioOriginalText={audioOriginalText}
              setAudioOriginalText={setAudioOriginalText}
              audioEnhancedText={audioEnhancedText}
              setAudioEnhancedText={setAudioEnhancedText}
              audioRecordSrc={audioRecordSrc}
              setAudioRecordSrc={setAudioRecordSrc}
            />
          </div>
          <div
            style={{ backgroundColor: `${highlightedColor.bg}` }}
            className=" rounded-md py-2 px-3 border border-[#ABB7C9] relative"
          >
            <div>
              {/* <svg 
                                className='highlight-copy-svg'
                                onClick={onTextCopy}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"/></svg> */}
              <div
                style={{
                  minHeight: "50px",
                  overflow: "visible",
                  wordBreak: "break-word",
                }}
                ref={highlightRef}
                id="highlightbox"
                onBlur={onHighlightBlur}
                contentEditable={action === "add" ? true : false}
                className={classNames(
                  highlightedColor?.border,
                  "flex-1 text-xs text-black  pl-2 py-0 outline-none highlight-content-container"
                )}
              >
                {highlightedText || audioEnhancedText}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 space-x-3">
              <div className={`flex space-x-4`}>
                <div
                  className={`cursor-pointer select-none text-xs rounded-full p-[4px] ${
                    showColorOptions && "bg-blue-100 text-blue-500"
                  }`}
                  onClick={handleColorToggle}
                >
                  <PaintBoardIcon height={18} width={18} />
                </div>
                {showColorOptions && (
                  <div className="flex space-x-2 items-center">
                    {HIGHLIGHTED_COLORS.map((color) => (
                      <button
                        key={color.id}
                        style={{ backgroundColor: `${color.bg}` }}
                        className={classNames(
                          "flex justify-center items-center h-4 w-4 rounded-full border-[1px] border-gray-400"
                        )}
                        onClick={() => {
                          setHighlightedColor(color);
                          setHighlightClass(color.className);
                        }}
                      >
                        <CheckIcon
                          className={classNames(
                            color.id === highlightedColor?.id ? "" : color.text,
                            "h-2 w-2"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div
                className="cursor-pointer text-red-500"
                onClick={onTextDelete}
              >
                <Delete02Icon height={18} width={18} />
              </div>
            </div>
          </div>
        </div>
      )}

      {mediaType === "Image" && fileType === "file" && (
        <div className="pt-4 relative">
          <div className="image-header">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Image
            </h6>
            {imageSrc && (
              <div className="flex items-center justify-end w-full">
                <Tooltip
                  title={
                    textExtractLoading
                      ? "Extracting Image Text"
                      : "Copy image text"
                  }
                  placement="bottom"
                >
                  {textExtractLoading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      title="Extracting Image Text"
                      className="mr-10 cursor-pointer"
                      height="20"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z" />
                    </svg>
                  ) : (
                    <svg
                      onClick={onCopyImageText}
                      className="mr-10 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      title="Extracting Image Text"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />
                    </svg>
                  )}
                </Tooltip>
                <Tooltip title="Download Image" placement="bottom">
                  <svg
                    onClick={() => onDownloadImg(imageSrc)}
                    className="mr-10 cursor-pointer"
                    title="Download"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" />
                  </svg>
                </Tooltip>
                <Tooltip title="Copy Image Link" placement="bottom">
                  <svg
                    onClick={onCopyImageLink}
                    className="mr-5 cursor-pointer"
                    title="Copy Text"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" />
                  </svg>
                </Tooltip>
                {action !== "add" && (
                  <Tooltip title="Edit Image" placement="bottom">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      width="20"
                      height="20"
                      onClick={onEditImageClick}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
          <div className="bg-[#F8FBFF] rounded-t-[16px] imgWrapperContainer">
            <div>
              {imageSrc ? (
                <img src={imageSrc ? imageSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : ""} alt={"Highlighted image"} 
                     onError={(e) => {
                      e.target.onerror = null;
                      if (mediaData?.fallbackURL) {
                        e.target.src = mediaData?.fallbackURL;
                      }
                     }}
                />
              ) : (
                renderFileUpload()
              )}
            </div>
          </div>
        </div>
      )}

      {mediaType === "Audio" && fileType === "file" && (
        <div className="pt-4 relative">
          <div className="image-header">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Audio
            </h6>
            {audioSrc && (
              <svg
                onClick={onCopyAudioLink}
                className="linkSvg cursor-pointer"
                title="Copy Audio link"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" />
              </svg>
            )}
          </div>
          <div className="bg-[#F8FBFF] rounded-t-[16px] imgWrapperContainer">
            <div>
              {audioSrc ? (
                <audio src={audioSrc} autoPlay={false} controls>
                  <source src={audioSrc} />
                </audio>
              ) : fileType === "file" ? (
                renderFileUpload()
              ) : null}
            </div>
          </div>
        </div>
      )}

      {mediaType === "Audio" && fileType === "record" && (
        <AudioTranslate
          audioOriginalText={audioOriginalText}
          setAudioOriginalText={setAudioOriginalText}
          audioRecordSrc={audioRecordSrc}
          setAudioRecordSrc={setAudioRecordSrc}
          showAudioTag={true}
          audioEnhancedText={audioEnhancedText}
          setAudioEnhancedText={setAudioEnhancedText}
        />
      )}

      {mediaType === "Video" && fileType === "file" && (
        <div className="pt-4 relative">
          <div className="image-header">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Video
            </h6>
            {videoSrc && (
              <svg
                onClick={onCopyAudioLink}
                className="linkSvg cursor-pointer"
                title="Copy video link"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" />
              </svg>
            )}
          </div>
          <div className="bg-[#F8FBFF] rounded-t-[16px] imgWrapperContainer">
            <div>
              {videoSrc ? (
                <video autoPlay={false} controls>
                  <source src={videoSrc} />
                </video>
              ) : fileType === "file" ? (
                renderFileUpload()
              ) : null}
            </div>
          </div>
        </div>
      )}

      {mediaType === "Code" && (
        <>
          <div className="pt-4">
            <Input
              size="medium w-full mb-2"
              type="text"
              name="language"
              placeholder="Enter Language"
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
            />
          </div>

          <div className="pt-4 relative">
            <div className="code-header">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Code Snippet
              </h6>
              <svg
                onClick={onCopyCode}
                className="linkSvg cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" />
              </svg>
            </div>
            <div className="bg-[#F8FBFF] rounded-t-[16px] p-relative">
              <pre className="pre-tag-style" style={{ height: "250px" }}>
                <code
                  className="code-tag-style"
                  style={{ height: "250px" }}
                  contenteditable="true"
                  spellcheck="false"
                  ref={codeRef}
                  onBlur={onCodeBlur}
                >
                  {code}
                </code>
              </pre>
            </div>
          </div>
        </>
      )}

      {mediaType === "PDF" && fileType === "file" && (
        <div className="pt-4 relative">
          <div className="image-header">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              PDF
            </h6>
            {pdfSrc && (
              <svg
                onClick={onDownloadAudio}
                className="dwldSvg cursor-pointer"
                title="Download"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" />
              </svg>
            )}
            {pdfSrc && (
              <svg
                onClick={onCopyAudioLink}
                className="linkSvg cursor-pointer"
                title="Copy PDF link"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" />
              </svg>
            )}
          </div>
          <div className="bg-[#F8FBFF] rounded-t-[16px] imgWrapperContainer">
            <div>{pdfSrc ? renderPDFThumbnail() : renderFileUpload()}</div>
          </div>
        </div>
      )}

      {mediaType === "Screenshot" && (
        <div className="pt-4 relative">
          <div className="image-header">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Screenshot
            </h6>
            {screenshotImageSrc && (
              <div className="flex items-center justify-end w-full">
                <Tooltip
                  title={
                    textExtractLoading
                      ? "Extracting Image Text"
                      : "Copy image text"
                  }
                  placement="bottom"
                >
                  {textExtractLoading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      title="Extracting Image Text"
                      className="mr-10 cursor-pointer"
                      height="20"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z" />
                    </svg>
                  ) : (
                    <svg
                      onClick={onCopyImageText}
                      className="mr-10 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      title="Extracting Image Text"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" />
                    </svg>
                  )}
                </Tooltip>
                <Tooltip title="Download Image" placement="bottom">
                  <svg
                    onClick={() => onDownloadImg(screenshotImageSrc)}
                    className="mr-10 cursor-pointer"
                    title="Download"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" />
                  </svg>
                </Tooltip>
                <Tooltip title="Copy Image Link" placement="bottom">
                  <svg
                    onClick={onCopyImageLink}
                    className="mr-5 cursor-pointer"
                    title="Copy Text"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" />
                  </svg>
                </Tooltip>
                {action !== "add" && (
                  <Tooltip title="Edit Image" placement="bottom">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      width="20"
                      height="20"
                      onClick={onEditImageClick}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
          <div className="bg-[#F8FBFF] rounded-t-[16px] imgWrapperContainer">
            <div>
              {screenshotImageSrc ? (
                <img
                  src={screenshotImageSrc ? screenshotImageSrc?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : ""}
                  onError={(e) => {
                    e.target.onerror = null;
                    if (mediaData?.fallbackURL) {
                      e.target.src = mediaData?.fallbackURL;
                    }
                  }}
                  alt={"Screenshot captured image"}
                />
              ) : (
                renderFileUpload()
              )}
            </div>
          </div>
        </div>
      )}

      {mediaType === "SocialFeed" && (
        <>
          <div className="pt-4">
            <div className="flex-1">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Platform
              </h6>
              <div className="relative">
                <div className="w-full">
                  <ComboBoxSelect
                    inputShown={showPlatform}
                    hideInput={(e) => setShowPlatform(e)}
                    tweetData={PLATFORMS}
                    onTweetChange={onPlatformChange}
                    selectedTweet={selectedPlatform}
                    error={false}
                    disabled={
                      action === "edit" || page === "bio" ? true : false
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <div className="flex-1">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Post Type
              </h6>
              <div className="relative">
                <div className="w-full">
                  <ComboBoxSelect
                    inputShown={showTweetType}
                    hideInput={(e) => setShowTweetType(e)}
                    tweetData={getPostTypes()}
                    onTweetChange={onTweetChange}
                    selectedTweet={selectedTweet}
                    error={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {mediaType === "Profile" && (
        <>
          <div className="pt-4">
            <div className="flex-1">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Platform
              </h6>
              <div className="ct-relative">
                <div className="w-full">
                  <ComboBoxSelect
                    inputShown={showProfilePlatform}
                    hideInput={(e) => setShowProfilePlatform(e)}
                    tweetData={PROFILE_PLATFORMS}
                    onTweetChange={onProfilePlatformChange}
                    selectedTweet={selectedProfilePlatform}
                    error={false}
                    disabled={action === "edit" ? true : false}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {(mediaType === "Ai Prompt" || mediaType === "Text Expander") && (
        <>
          <div className="pt-4">
            <div className="bg-white rounded-md p-2 border-2 border-[#e5e7eb] mediaAiDiv">
              <ReactQuill
                theme="snow"
                value={htmlText}
                onChange={onExpnaderChange}
                modules={quillModules}
                style={{ height: 200 }}
              />
            </div>
          </div>
        </>
      )}

      {mediaType === "Citation" ? (
        fetching ? (
          <div className="pt-4">
            <Spin tip="Fetching citation" />
          </div>
        ) : (
          <>
            <div className="pt-4">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Citation style
              </h6>
              <Select
                value={citation}
                onChange={handleCitationChange}
                placeholder="Select citation"
                showSearch={true}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={CITATIONS.map((c) => {
                  return { value: c, label: c };
                })}
                className={"w-full"}
              >
                {CITATIONS.map((c) => {
                  return (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="pt-4">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Citation
              </h6>
              <Input.TextArea
                value={citationText}
                onChange={(e) => setCitationText(e.target.value)}
                placeholder="Enter citation text"
                rows={6}
              />
            </div>
            <div className="pt-4">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Author
              </h6>
              <Input
                value={citationAuthor}
                onChange={(e) => setCitationAuthor(e.target.value)}
                placeholder="Enter citation author"
              />
            </div>
            <div className="pt-4">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Accessed Date
              </h6>
              <Input
                value={citationDate}
                onChange={(e) => setCitationDate(e.target.value)}
                className="w-full"
                placeholder="Enter Accessed Date"
              />
            </div>
            <div className="pt-4">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Credibility
              </h6>
              <Select
                onChange={(value) => setCredibility(value)}
                value={credibility}
                className={"w-full"}
                placeholder="Select credibility"
              >
                <Option value={"low"}>Low</Option>
                <Option value={"high"}>High</Option>
                <Option value={"medium"}>Medium</Option>
              </Select>
            </div>
          </>
        )
      ) : (
        <></>
      )}

      {mediaType === "Testimonial" && (
        <>
          {action === "add" ? (
            <></>
          ) : (
            <div className="pt-4">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                URL
              </h6>
              <Input
                size="medium w-full mb-2"
                type="text"
                name="url"
                placeholder="Enter url"
                value={testimonialUrl}
                onChange={(e) => setTestimonialUrl(e.target.value)}
              />
            </div>
          )}

          <div className="pt-4">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Author
            </h6>
            <Input
              size="medium w-full mb-2"
              type="text"
              name="author"
              placeholder="Enter author"
              value={testimonialAuthor}
              onChange={(e) => setTestimonialAuthor(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Tag line
            </h6>
            <Input
              size="medium w-full mb-2"
              type="text"
              name="tagLine"
              placeholder="Enter tag line"
              value={testimonialTagLine}
              onChange={(e) => setTestimonialTagLine(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Testimonial
            </h6>
            <div
              style={{ height: "300px", overflowY: "auto" }}
              contentEditable={action === "add" ? true : false}
              ref={testimonialRef}
              onBlur={onTestimonialBlur}
              className={
                "flex-1 text-sm border-2 border-[#e5e7eb] p-2 outline-none w-full"
              }
            >
              {testimonial}
            </div>
          </div>

          <div className="pt-4">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Product
            </h6>
            <Input
              size="medium w-full mb-2"
              type="text"
              name="product"
              placeholder="Enter product"
              value={testimonialProduct}
              onChange={(e) => setTestimonialProduct(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <div className="flex-1">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Platform
              </h6>
              <div className="ct-relative">
                <div className="w-full">
                  <ComboBoxSelect
                    inputShown={showTestimonialPlatform}
                    hideInput={(e) => setShowTestimonialPlatform(e)}
                    tweetData={PLATFORMS}
                    onTweetChange={onTestimonialPlatformChange}
                    selectedTweet={selectedTestimonialPlatform}
                    error={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 star-rating">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Rating
            </h6>
            <Rate
              value={testimonialRating}
              onChange={(value) => setTestimonialRating(value)}
              allowHalf
            />
          </div>

          <div className="pt-4">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Date
            </h6>
            <Input
              size="medium w-full mb-2"
              type="text"
              name="product"
              placeholder="Enter date"
              value={testimonialDate}
              onChange={(e) => setTestimonialDate(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <div className="image-header">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Attach Image
              </h6>
            </div>
            <div className="bg-[#F8FBFF] rounded-t-[16px] imgWrapperContainer">
              <div>
                {!testimonialAttachImage ? (
                  renderFileUpload()
                ) : (
                  <img
                    src={testimonialAttachImage ? testimonialAttachImage?.replace(NEXT_PUBLIC_STATIC_S3_BASE_URL, `${NEXT_PUBLIC_STATIC_S3_BASE_URL}/250x250_min`) : ""}
                    alt={"Testimonial attached image"}
                    // onLoad={onImageLoadCompleted}
                    // style={{
                    //   display: showImageLoader ? "none" : "block",
                    // }}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {mediaType == "Book" && (
        <>
          <div className="pt-4 star-rating">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Rating
            </h6>
            <Rate value={rate} allowHalf onChange={(value) => setRate(value)} />
          </div>

          <div className="pt-1 flex justify-between space-x-2">
            <div className="pt-4 star-rating">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Date Read
              </h6>
              <Space direction="vertical" size={12}>
                <DatePicker
                  value={
                    dateRead === "" ? dateRead : moment(dateRead)
                  }
                  onChange={(date, dateStirng) => setDateRead(dateStirng)}
                  format={"YYYY-MM-DD"}
                  allowClear={false}
                  showToday={false}
                />
              </Space>
            </div>

            <div className="pt-4 star-rating">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Status
              </h6>
              <Space wrap>
                <Select
                  placeholder="Select status"
                  value={readStatus}
                  style={{ width: 170 }}
                  onChange={(value) => setReadStatus(value)}
                  allowClear
                  options={[
                    { value: "read", label: "Read" },
                    { value: "currently-reading", label: "Currently Reading" },
                    { value: "to-read", label: "To Read" },
                  ]}
                />
              </Space>
            </div>
          </div>
        </>
      )}

      {mediaType == "Movie" && (
        <>
          <div className="pt-4 star-rating">
            <h6 className="block text-xs font-medium text-gray-500 mb-1">
              Rating
            </h6>
            <Rate value={rate} allowHalf onChange={(value) => setRate(value)} />
          </div>

          <div className="pt-1 flex justify-between space-x-2">
            <div className="pt-4 star-rating">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Watch Date
              </h6>
              <Space direction="vertical" size={12}>
                <DatePicker
                  value={
                    dateRead === "" ? dateRead : moment(dateRead)
                  }
                  onChange={(date, dateStirng) => setDateRead(dateStirng)}
                  format={"YYYY-MM-DD"}
                  allowClear={false}
                  showToday={false}
                />
              </Space>
            </div>

            <div className="pt-4 star-rating">
              <h6 className="block text-xs font-medium text-gray-500 mb-1">
                Status
              </h6>
              <Space wrap>
                <Select
                  placeholder="Select status"
                  value={watchStatus ? watchStatus : "To Watch"}
                  style={{ width: 170 }}
                  onChange={(value) => setWatchStatus(value)}
                  allowClear
                  options={[
                    { value: "watched", label: "Watched" },
                    { value: "to-watch", label: "To Watch" },
                  ]}
                />
              </Space>
            </div>
          </div>
        </>
      )}

    </>
  );
};

export default MediaTypeRender;
