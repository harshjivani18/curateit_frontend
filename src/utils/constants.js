import * as MembershipActionTypes from '@actions/membership/action-types';
import * as AnalyticsActions from '@actions/analytics/action-types';
import * as RaindropActions from "@actions/raindrop/action-types";
import * as GemsActions from "@actions/gems/action-types";
import * as LoginActionTypes from '@actions/login/action-types';
import * as PocketActionTypes from '@actions/pocketAccess/action-types';
import { CHECK_IS_PUBLIC_COLLECTION,
         CHECK_IS_PUBLIC_GEM } from '@actions/collection/action-types'
import { CHECK_IS_TAG_PUBLIC } from '@actions/tags/action-types';
//ICONS

import {
  AtSymbolIcon,
  Bars3BottomLeftIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  CodeBracketIcon,
  CubeTransparentIcon,
  DevicePhoneMobileIcon,
  FilmIcon,
  GlobeAltIcon,
  HashtagIcon,
  InboxIcon,
  LinkIcon,
  ListBulletIcon,
  PhoneIcon,
  PhotoIcon,
  QueueListIcon,
  ShoppingBagIcon,
  SpeakerWaveIcon,
  Squares2X2Icon,
  TableCellsIcon,
  UserCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { MdOutlineContactPhone, MdOutlineViewStream } from 'react-icons/md';
import {getAllISOCodes} from 'iso-country-currency'
import { message } from 'antd';
import { VscJson } from "react-icons/vsc";
import { SiImdb, SiMysql, SiSubstack } from "react-icons/si";
import {
  DiCss3,
  DiCodeBadge,
  DiHtml5,
  DiJavascript1,
  DiJava,
  DiPhp,
  DiPython,
  DiRust,
} from "react-icons/di";
import { css } from "@codemirror/lang-css";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { BiNotepad, BiUserCircle } from 'react-icons/bi';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { TfiWrite } from 'react-icons/tfi';
import {
  RiAlignCenter,
  RiArticleLine,
  RiDiscordFill,
  RiDoubleQuotesL,
  RiPinterestFill,
  RiSteamFill,
  RiTelegramFill,
  RiTumblrFill,
  RiTwitchFill,
  RiWhatsappFill,
} from "react-icons/ri";

import { Upload04Icon, Link01Icon, Mic02Icon } from 'src/hugeicons/Stroke';
import { NEW_URL_PATTERN } from './patterns';

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
  RiGitlabFill,
  RiMastodonFill,
  RiSnapchatFill,
  RiTwitterXFill,
} from "react-icons/ri";
import { DiHackernews } from "react-icons/di";
import {
  FaQuora,
  FaAppStore,
  FaProductHunt,
  FaGoodreads,
  FaShopify,
  FaAmazon,
  FaYelp,
  FaPinterest,
} from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { PiGoodreadsLogoFill } from 'react-icons/pi';

export const COLOR_PALLETE = [
  "#FFFFFF",
  "#FFFCEA",
  "#CCDDFF",
  "#FFECDD",
  "#DBFFDA",
  "#FFD6D3",
  "#E0F1B0",
  "#D8FFF2",
  "#DBEEFB",
  "#E3DFFF",
  "#F7DDFF",
  "#E4EDF3"
]

export const LINE_WIDTH_INDEX = {
  1: "X-Small",
  2: "Small",
  3: "Medium",
  4: "Large",
  5: "X-Large"
}

export const SERIF_FONT_FAMILY = {
  '"Literata VF", Georgia, serif': "Literata",
  '"Piazzolla VF", serif': "Piazzolla",
  '"Source Serif VF", serif': "Source Serif", 
}

export const SANS_SERIF_FONT_FAMILY = {
  '"Atkinson Hyperlegible", sans-serif': "Atkinson",
  '"Inter VF", sans-serif': "Inter",
  '"IBM Plex Sans VF", sans-serif': "IBM Plex Sans",
  '"Public Sans VF", Helvetica, sans-serif': "Public Sans",
  '"Source Sans VF", sans-serif': "Source Sans",
  '"Rubik", sans-serif': "Rubik"
}

export const UNAUTHORIZED_ACTION_TYPES = [
    MembershipActionTypes.LOGIN,
    MembershipActionTypes.SOCIAL_LOGIN_CALLBACK,
    MembershipActionTypes.SIGNUP,
    MembershipActionTypes.EMAIL_VERIFICATION,
    MembershipActionTypes.FORGOT_PASSWORD,
    MembershipActionTypes.RESET_PASSWORD,
    RaindropActions.SYNC_RAINDROP_DATA,
    RaindropActions.GET_RAINDROP_DATA,
    RaindropActions.GET_RAINDROP_ACCESS_TOKEN,
    RaindropActions.UPLOAD_RAINDROP_HIGHLIGHTS,
    GemsActions.UPDATE_SCREENSHOT,
    LoginActionTypes.NEW_PASS,
    PocketActionTypes.GET_POCKET_DATA,
    PocketActionTypes.SYNC_POCKET_DATA,
    LoginActionTypes.SET_SOCIAL_LOGIN,
    CHECK_IS_PUBLIC_GEM,
    CHECK_IS_PUBLIC_COLLECTION,
    CHECK_IS_TAG_PUBLIC,
];

export const ANALYTICS_ACTION_ARR = [
  AnalyticsActions.GET_WEBSITE,
  AnalyticsActions.GET_WEBSITE_STATS,
  AnalyticsActions.GET_WEBSITE_METRICS,
  AnalyticsActions.PAGE_VIEWS,
  AnalyticsActions.ACTIVE_USER,
  AnalyticsActions.AUTHORIZED_UMAMI,
];

export const PUBLIC_LINKS = [
  "/api/collection-public",
  "/api/share-public-collection"
]

export const PUBLIC_LOCATIONS = [
  "/g/public-shared",
  "/c/public-shared",
  "/extension-onboarding",
  "/image-editor",
  "/forgot-password",
  "/forgot-password-success",
  "/reset-password",
  "/auth/google/callback",
  "/auth/linkedin/callback",
  "/auth/twitter/callback",
  "/403",
  "/pocket",
  "/raindrop",
  "/sign-in",
  "/sign-up"
]

export const TextMessage = {
  ERROR_TEXT: "Error Occured.Try again",
  COLLECTION_CREATE_TEXT: "Collection created successfully",
  COLLECTION_UPDATE_TEXT: "Collection updated successfully",
  COLLECTION_DELETE_TEXT: "Collection deleted successfully",
  CUSTOM_PROPERTY_CREATE_TEXT: "Custom property created successfully",
  CUSTOM_PROPERTY_UPDATE_TEXT: "Custom property updated successfully",
  CUSTOM_PROPERTY_DELETE_TEXT: "Custom property deleted successfully",
  PROPERTY_HIDE_INFO_TEXT: "Atleast one property should be visible",
  FILE_UNSUPPORT: "File is not supported",
  FILE_SIZE_ERROR: "File size must be less than 5MB",
  TAG_CREATE_TEXT: "Tag created successfully",
  TAG_UPDATE_TEXT: "Tag updated successfully",
  TAG_DELETE_TEXT: "Tag deleted successfully",
  LOGIN_TEXT: "Please login to access the resources",
  BOOKMARK_CREATE_TEXT: "Bookmark created successfully",
  COLLECTION_COPY_TEXT: "Collection copied successfully",
  COLLECTION_COPY_EXISTS_TEXT: "Collection already copied",
  LOGGED_IN: "Logged in successfully",
  PROFILE_UPDATE: "Profile updated successfully",
  PROFILE_SOCIAL_UPDATE: "Social links updated successfully",
  PROFILE_DISPLAY_UPDATE: "Display settings updated successfully",
  PROFILE_COLLECTIONS_DELETE: "All collections deleted successfully",
  PROFILE_GEMS_DELETE: "All gems deleted successfully",
  PROFILE_TAGS_DELETE: "All tags deleted successfully",
  PROFILE_ALL_DATA_DELETE: "All data deleted successfully",
  PROFILE_PIC_UPDATE: "Profile picture updated successfully",
  PASSWORD_UPDATE: "Password updated successfully",
  SEO_UPDATE: "SEO updated successfully",
  BIO_CONTACT_CREATE: "Bio contact created successfully",
  MULTI_SELECT_NAME: "Name is required",
  MULTI_SELECT_OPTIONS: "Option is required",
  MULTI_SELECT_BOTH: "Name and Option are required",
  BIO_IMPORT_SUCCESS: "Socials Imported to Bio successfully",
  BIO_IMPORT_WAITING: "Socials Will be Imported in the Background",
  BOOKMARK_APPROVE_REQUEST_TEXT: "Bookmark submitted for approval successfully",
  GEM_APPROVE_TEXT: "Bookmark approved successfully",
  GEM_REJECT_TEXT: "Bookmark rejected successfully",
  USERNAME_ERROR_TEXT: "Username already exists",
  CONFIRM_TEXT: "Are you sure you want to delete?",
  PROFILE_DELETE: "Profile deleted successfully",
  GEM_PUBLIC_TEXT: "Gem made public successfully",
  GEM_PRIVATE_TEXT: "Gem made private successfully",
  SUB_COLLECTION_REORDER_SUCCESS: "Sub collection reordered successfully",
  SUB_TAG_REORDER_SUCCESS: "Sub tag reordered successfully",
  ONBOARD_STEPS_ERROR_TEXT: "Please select an option",
  ONBOARD_STEPS_OTHERS_ERROR_TEXT: "Please enter value for others",
  GEM_EXISTS_ERROR_TEXT: "Gem already exist",
};


export const HIGHLIGHTED_COLORS = [
    {
      id: 1,
      border: "border-l-violet-500",
      bg: "#C1C1FF",
      text: "text-violet-500",
      colorCode: "#C1C1FF",
      className: "violet-hl",
    },
    {
      id: 2,
      border: "border-l-pink-500",
      bg: "#FFAFED",
      text: "text-pink-500",
      colorCode: "#FFAFED",
      className: "pink-hl",
    },
    {
      id: 3,
      border: "border-l-green-300",
      bg: "#D2F9C8",
      text: "text-green-300",
      colorCode: "#D2F9C8",
      className: "green-hl",
    },
    {
      id: 4,
      border: "border-l-yellow-200",
      bg: "#FFFAB3",
      text: "text-yellow-200",
      colorCode: "#FFFAB3",
      className: "yellow-hl",
    },
];

export const FEEDBACK_TYPES = [
  {
    id:'Feature Request',
    name:'Feature Request',
  },
  {
    id:'Report Bug',
    name:'Report Bug',
  },
  {
    id:'Question',
    name:'Question',
  },
  {
    id:'Appreciate',
    name:'Appreciate',
  },
]

export const FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const KEY_CODES = {
  comma: 188,
  enter: 13,
};


export const getPropertiesData = (res,page) => {
  if(page === 'bookmark'){
        const ly = res?.data?.layout

        const mPS = res?.data?.propertyShown?.moodboard?.propertyShown
        const mPO = res?.data?.propertyOrder?.moodboard?.propertyOrder
        const mPH = res?.data?.propertyHidden?.moodboard?.propertyHidden

        const cPS = res?.data?.propertyShown?.card?.propertyShown
        const cPO = res?.data?.propertyOrder?.card?.propertyOrder
        const cPH = res?.data?.propertyHidden?.card?.propertyHidden

        const tPS = res?.data?.propertyShown?.table?.propertyShown
        const tPO = res?.data?.propertyOrder?.table?.propertyOrder
        const tPH = res?.data?.propertyHidden?.table?.propertyHidden

        const lPS = res?.data?.propertyShown?.list?.propertyShown
        const lPO = res?.data?.propertyOrder?.list?.propertyOrder
        const lPH = res?.data?.propertyHidden?.list?.propertyHidden

        const iPS = res?.data?.propertyShown?.inbox?.propertyShown
        const iPO = res?.data?.propertyOrder?.inbox?.propertyOrder
        const iPH = res?.data?.propertyHidden?.inbox?.propertyHidden

        const sPS = res?.data?.propertyShown?.stream?.propertyShown
        const sPO = res?.data?.propertyOrder?.stream?.propertyOrder
        const sPH = res?.data?.propertyHidden?.stream?.propertyHidden

        const PS = ly === 'moodboard' ? mPS : 
                   ly === 'card' ? cPS :
                   ly === 'list' ? lPS :
                   ly === 'table' ? tPS :
                   ly === 'inbox' ? iPS : 
                   ly === 'stream' ? sPS :
                   ''

        const PH = ly === 'moodboard' ? mPH : 
                   ly === 'card' ? cPH :
                   ly === 'list' ? lPH :
                   ly === 'table' ? tPH :
                   ly === 'inbox' ? iPH : 
                   ly === 'stream' ? sPH :
                   ''

        const PO = ly === 'moodboard' ? mPO : 
                   ly === 'card' ? cPO :
                   ly === 'list' ? lPO :
                   ly === 'table' ? tPO :
                   ly === 'inbox' ? iPO : 
                   ly === 'stream' ? sPO :
                   ''

        return {
          PH,PO,PS,ly
        }
  }

  if(page === 'filter'){
  const ly = res?.layout

    const mPS = res?.propertyShown?.moodboard?.propertyShown
    const mPO = res?.propertyOrder?.moodboard?.propertyOrder
    const mPH = res?.propertyHidden?.moodboard?.propertyHidden

    const cPS = res?.propertyShown?.card?.propertyShown
    const cPO = res?.propertyOrder?.card?.propertyOrder
    const cPH = res?.propertyHidden?.card?.propertyHidden

    const tPS = res?.propertyShown?.table?.propertyShown
    const tPO = res?.propertyOrder?.table?.propertyOrder
    const tPH = res?.propertyHidden?.table?.propertyHidden

    const lPS = res?.propertyShown?.list?.propertyShown
    const lPO = res?.propertyOrder?.list?.propertyOrder
    const lPH = res?.propertyHidden?.list?.propertyHidden

    const iPS = res?.propertyShown?.inbox?.propertyShown
    const iPO = res?.propertyOrder?.inbox?.propertyOrder
    const iPH = res?.propertyHidden?.inbox?.propertyHidden

    const sPS = res?.propertyShown?.stream?.propertyShown
    const sPO = res?.propertyOrder?.stream?.propertyOrder
    const sPH = res?.propertyHidden?.stream?.propertyHidden

    const PS = ly === 'moodboard' ? mPS : 
               ly === 'card' ? cPS :
               ly === 'list' ? lPS :
               ly === 'table' ? tPS :
               ly === 'inbox' ? iPS : 
               ly === 'stream' ? sPS :
               ''

    const PH = ly === 'moodboard' ? mPH : 
                ly === 'card' ? cPH :
                ly === 'list' ? lPH :
                ly === 'table' ? tPH :
                ly === 'inbox' ? iPH : 
                ly === 'stream' ? sPH :
                ''

    const PO = ly === 'moodboard' ? mPO : 
              ly === 'card' ? cPO :
              ly === 'list' ? lPO :
              ly === 'table' ? tPO :
              ly === 'inbox' ? iPO : 
              ly === 'stream' ? sPO :
              ''
    return {
          PH,PO,PS,ly
        }
  }

  if(page === 'tag'){
  const ly = res?.configTag?.layout

  const mPS = res?.configTag?.propertyShown?.moodboard?.propertyShown
  const mPO = res?.configTag?.propertyOrder?.moodboard?.propertyOrder
  const mPH = res?.configTag?.propertyHidden?.moodboard?.propertyHidden

  const cPS = res?.configTag?.propertyShown?.card?.propertyShown
  const cPO = res?.configTag?.propertyOrder?.card?.propertyOrder
  const cPH = res?.configTag?.propertyHidden?.card?.propertyHidden

  const tPS = res?.configTag?.propertyShown?.table?.propertyShown
  const tPO = res?.configTag?.propertyOrder?.table?.propertyOrder
  const tPH = res?.configTag?.propertyHidden?.table?.propertyHidden

  const lPS = res?.configTag?.propertyShown?.list?.propertyShown
  const lPO = res?.configTag?.propertyOrder?.list?.propertyOrder
  const lPH = res?.configTag?.propertyHidden?.list?.propertyHidden

  const iPS = res?.configTag?.propertyShown?.inbox?.propertyShown
  const iPO = res?.configTag?.propertyOrder?.inbox?.propertyOrder
  const iPH = res?.configTag?.propertyHidden?.inbox?.propertyHidden

  const sPS = res?.configTag?.propertyShown?.stream?.propertyShown
  const sPO = res?.configTag?.propertyOrder?.stream?.propertyOrder
  const sPH = res?.configTag?.propertyHidden?.stream?.propertyHidden

  const PS = ly === 'moodboard' ? mPS : 
            ly === 'card' ? cPS :
            ly === 'list' ? lPS :
            ly === 'table' ? tPS :
            ly === 'inbox' ? iPS : 
            ly === 'stream' ? sPS :
            ''

  const PH = ly === 'moodboard' ? mPH : 
            ly === 'card' ? cPH :
            ly === 'list' ? lPH :
            ly === 'table' ? tPH :
            ly === 'inbox' ? iPH : 
            ly === 'stream' ? sPH :
            ''

  const PO = ly === 'moodboard' ? mPO : 
            ly === 'card' ? cPO :
            ly === 'list' ? lPO :
            ly === 'table' ? tPO :
            ly === 'inbox' ? iPO : 
            ly === 'stream' ? sPO :
            ''

    return {
          PH,PO,PS,ly
        }
  }

  if(page === 'collection'){
  const ly = res?.configColl?.layout

  const mPS = res?.configColl?.propertyShown?.moodboard?.propertyShown
  const mPO = res?.configColl?.propertyOrder?.moodboard?.propertyOrder
  const mPH = res?.configColl?.propertyHidden?.moodboard?.propertyHidden

  const cPS = res?.configColl?.propertyShown?.card?.propertyShown
  const cPO = res?.configColl?.propertyOrder?.card?.propertyOrder
  const cPH = res?.configColl?.propertyHidden?.card?.propertyHidden

  const tPS = res?.configColl?.propertyShown?.table?.propertyShown
  const tPO = res?.configColl?.propertyOrder?.table?.propertyOrder
  const tPH = res?.configColl?.propertyHidden?.table?.propertyHidden

  const lPS = res?.configColl?.propertyShown?.list?.propertyShown
  const lPO = res?.configColl?.propertyOrder?.list?.propertyOrder
  const lPH = res?.configColl?.propertyHidden?.list?.propertyHidden

  const iPS = res?.configColl?.propertyShown?.inbox?.propertyShown
  const iPO = res?.configColl?.propertyOrder?.inbox?.propertyOrder
  const iPH = res?.configColl?.propertyHidden?.inbox?.propertyHidden

  const sPS = res?.configColl?.propertyShown?.stream?.propertyShown
  const sPO = res?.configColl?.propertyOrder?.stream?.propertyOrder
  const sPH = res?.configColl?.propertyHidden?.stream?.propertyHidden

  const PS = ly === 'moodboard' ? mPS : 
          ly === 'card' ? cPS :
          ly === 'list' ? lPS :
          ly === 'table' ? tPS :
          ly === 'inbox' ? iPS : 
          ly === 'stream' ? sPS :
          ''

  const PH = ly === 'moodboard' ? mPH : 
          ly === 'card' ? cPH :
          ly === 'list' ? lPH :
          ly === 'table' ? tPH :
          ly === 'inbox' ? iPH : 
          ly === 'stream' ? sPH :
          ''

  const PO = ly === 'moodboard' ? mPO : 
          ly === 'card' ? cPO :
          ly === 'list' ? lPO :
          ly === 'table' ? tPO :
          ly === 'inbox' ? iPO : 
          ly === 'stream' ? sPO :
          ''
    return {
          PH,PO,PS,ly
        }
  }

  if(page === 'broken-duplicate'){
  const ly = res?.layout

  const mPS = res?.propertyShown?.moodboard?.propertyShown
  const mPO = res?.propertyOrder?.moodboard?.propertyOrder
  const mPH = res?.propertyHidden?.moodboard?.propertyHidden

  const cPS = res?.propertyShown?.card?.propertyShown
  const cPO = res?.propertyOrder?.card?.propertyOrder
  const cPH = res?.propertyHidden?.card?.propertyHidden

  const tPS = res?.propertyShown?.table?.propertyShown
  const tPO = res?.propertyOrder?.table?.propertyOrder
  const tPH = res?.propertyHidden?.table?.propertyHidden

  const lPS = res?.propertyShown?.list?.propertyShown
  const lPO = res?.propertyOrder?.list?.propertyOrder
  const lPH = res?.propertyHidden?.list?.propertyHidden

  const iPS = res?.propertyShown?.inbox?.propertyShown
  const iPO = res?.propertyOrder?.inbox?.propertyOrder
  const iPH = res?.propertyHidden?.inbox?.propertyHidden

  const sPS = res?.propertyShown?.stream?.propertyShown
  const sPO = res?.propertyOrder?.stream?.propertyOrder
  const sPH = res?.propertyHidden?.stream?.propertyHidden

  const PS = ly === 'moodboard' ? mPS : 
            ly === 'card' ? cPS :
            ly === 'list' ? lPS :
            ly === 'table' ? tPS :
            ly === 'inbox' ? iPS : 
            ly === 'stream' ? sPS :
            ''

  const PH = ly === 'moodboard' ? mPH : 
            ly === 'card' ? cPH :
            ly === 'list' ? lPH :
            ly === 'table' ? tPH :
            ly === 'inbox' ? iPH : 
            ly === 'stream' ? sPH :
            ''

  const PO = ly === 'moodboard' ? mPO : 
            ly === 'card' ? cPO :
            ly === 'list' ? lPO :
            ly === 'table' ? tPO :
            ly === 'inbox' ? iPO : 
            ly === 'stream' ? sPO :
            ''

    return {
          PH,PO,PS,ly
        }
  }
}

export const MEDIA_TYPES = [
  "Text Expander",
  "SocialFeed",
  "Book",
  "Profile",
  "Movie",
  "Note",
  "Quote",
  "Ai Prompt",
  "Product",
  "App",
  "Text",
  "Screenshot",
  "Audio",
  "Image",
  "Video",
  "PDF",
  "Article",
  "Highlight",
  "Code",
  "Link",
  "Citation",
  "Testimonial"
];

export const PLATFORMS_URLS = {
    "Twitter": "https://curateit-static-files.s3.amazonaws.com/app-icon/Twitter.png",
    "LinkedIn": "https://curateit-static-files.s3.amazonaws.com/app-icon/Linkedin.png",
    "Reddit": "https://curateit-static-files.s3.amazonaws.com/app-icon/reddit.png.png",
    "Producthunt": "https://curateit-static-files.s3.amazonaws.com/app-icon/producthunt.png.png",
    "Medium": "https://curateit-static-files.s3.amazonaws.com/app-icon/medium.png.jpg",
    "HackerNews": "https://curateit-static-files.s3.amazonaws.com/app-icon/hackernews.png.png",
    "Github": "https://curateit-static-files.s3.amazonaws.com/app-icon/Github.png",
    "Tiktok": "https://curateit-static-files.s3.amazonaws.com/app-icon/TikTok.png",
    "Instagram": "https://curateit-static-files.s3.amazonaws.com/app-icon/Instagram.png",
    "YouTube": "https://curateit-static-files.s3.amazonaws.com/app-icon/Youtube.png",
    "Quora": "https://curateit-static-files.s3.amazonaws.com/app-icon/quora.png.png",
    "PlayStore": "https://curateit-static-files.s3.amazonaws.com/app-icon/playstore.webp",
    "AppStore": "https://curateit-static-files.s3.amazonaws.com/app-icon/appstore.png.png",
    "G2": "https://curateit-static-files.s3.amazonaws.com/app-icon/g2.png.png",
    "Trustpilot": "https://curateit-static-files.s3.amazonaws.com/app-icon/trustpilot.svg",
    "Capterra": "https://curateit-static-files.s3.amazonaws.com/app-icon/capterra.png.png",
    "Google": "https://curateit-static-files.s3.amazonaws.com/app-icon/google.png.png",
    "TripAdvisor": "https://curateit-static-files.s3.amazonaws.com/app-icon/tripadvisor.png.jpg",
    "Yelp": "https://curateit-static-files.s3.amazonaws.com/app-icon/yelp.png.png",
    "Shopify": "https://curateit-static-files.s3.amazonaws.com/app-icon/shopify.png.png",
    "Amazon": "https://curateit-static-files.s3.amazonaws.com/app-icon/amazon.png.png",
    "Goodreads": "https://curateit-static-files.s3.amazonaws.com/app-icon/goodreads.png.png",
    "AppSumo": "https://curateit-static-files.s3.amazonaws.com/app-icon/sumo.png",
    'Curateit':`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`
}

export const ColorForNewProperty = [
  {
    color: "rgba(227, 226, 224, 0.5)",
    name: "Light Gray",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(227, 226, 224)",
    name: "Gray",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(238, 224, 218)",
    name: "Brown",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(250, 222, 201)",
    name: "Orange",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(253, 236, 200)",
    name: "Yellow",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(219, 237, 219)",
    name: "Green",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(211, 229, 239)",
    name: "Blue",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(232, 222, 238)",
    name: "Purple",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(245, 224, 233)",
    name: "Pink",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
  {
    color: "rgb(255, 226, 221)",
    name: "Red",
    boxShadow: "rgb(15 15 15 / 10%) 0px 0px 0px 1px inset",
  },
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * ColorForNewProperty.length);
  return ColorForNewProperty[randomIndex].color;
};

export const NEW_PROPERTY = [
  {
    icon: <Bars3BottomLeftIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Text",
  },
  {
    icon: <HashtagIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Number",
  },
  {
    icon: <CheckIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Select",
  },
  {
    icon: <ListBulletIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Multi-select",
  },
  {
    icon: <CubeTransparentIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Status",
  },
  {
    icon: <CalendarDaysIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Date",
  },
  {
    icon: <CheckCircleIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Checkbox",
  },
  {
    icon: <LinkIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "URL",
  },
  {
    icon: <AtSymbolIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Email",
  },
  {
    icon: <PhoneIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Phone",
  },
  {
    icon: <ClockIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Created time",
  },
  {
    icon: <UserCircleIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Created by",
  },
  {
    icon: <ClockIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Last edited time",
  },
  {
    icon: <UserCircleIcon className="h-5 w-5 mr-[5px] text-[#344054]" />,
    type: "Last edited by",
  },
];

export const LAYOUT_OPTIONS_WITH_ICONS = [
  { name: 'card', icon: <Squares2X2Icon className="h-5 w-5" /> },
  { name: 'table', icon: <TableCellsIcon className="h-5 w-5" /> },
  { name: 'list', icon: <ListBulletIcon className="h-5 w-5" /> },
  { name: 'inbox', icon: <InboxIcon className="h-5 w-5" /> },
  { name: 'moodboard', icon: <QueueListIcon className="h-5 w-5" /> },
  { name: 'stream', icon: <MdOutlineViewStream className="h-5 w-5" /> },
]

export const debounceFunc = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export function aggregateProperties(arr) {
    const result = {};
    
    for (let obj of arr) {
        for (let [key, value] of Object.entries(obj)) {
            if (key === "queryBy" && (obj["filterBy"] === "createddate" || obj["filterBy"] === "updateddate") && Array.isArray(value)) {
                value = value.join(";");
            } 
            else if (key === "queryBy" && (obj["filterBy"] === "media_type" || obj["filterBy"] === "tags" || obj["filterBy"] === "collectionName") && Array.isArray(value)) {
                value = value.join(";");
            }
            else if (Array.isArray(value)) {
                value = value.join(",");
            }
            else if (key === "platform" && value.trim() !== "") {
                result["queryBy"] = result["queryBy"] ? result["queryBy"] + "," + value : value;
                result["filterBy"] += ",platform";
                result["termType"] += ",is";
                // obj["queryBy"] = obj["queryBy"] ? obj["queryBy"] + "," + value : value;
            }
            result[key] = result[key] ? result[key] + "," + value : value;
        }
    }
    
    return result;
}

export const countriesCurreny = getAllISOCodes()

export const FILE_TYPE_OPTIONS = [
  {
    id: 1,
    value: "url",
    text: "URL"
  },
  {
    id: 2,
    value: "file",
    text: "File"
  },
]

export const FILE_TYPE_OPTIONS_ICONS = [
  {
    id: 1,
    value: "url",
    name: "Add link",
    icon: <Link01Icon />
  },
  {
    id: 2,
    value: "file",
    name: "Upload",
    icon: <Upload04Icon />
  },
  {
    id: 3,
    value: "record",
    name : "Record",
    icon: <Mic02Icon/>
  }
]

export const READ_OPTIONS = [
  {
    id: 1,
    value: "read",
    text: "Read"
  },
  {
    id: 2,
    value: "toRead",
    text: "ToRead"
  },
]

export const PROMPT_OPTIONS = [
  {
    id: 1,
    value: "public",
    text: "Public"
  },
  {
    id: 2,
    value: "private",
    text: "Private"
  },
]

export function getCurrencyAndPrice(value) {
    const symbolMatch = value.match(/^\D+/);
    const priceMatch = value.match(/\d+(\.\d+)?/);

    const symbol = symbolMatch ? symbolMatch[0] : null;
    const price = priceMatch ? priceMatch[0] : null;

    return { symbol, price };
}

export const MONTHNAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function rgbToHex(rgb) {
  const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
  const parts = regex.exec(rgb);

  if (!parts) return rgb; // Return original string if it doesn't match

  const r = parseInt(parts[1], 10);
  const g = parseInt(parts[2], 10);
  const b = parseInt(parts[3], 10);
  const a = parts[4] ? Math.round(parseFloat(parts[4]) * 255) : undefined;

  let hexColor =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  if (a !== undefined) hexColor += a.toString(16).padStart(2, "0");

  return hexColor;
}

export const copyText = async (text, content) => {
  try {
    await navigator.clipboard.writeText(text);
    message.success(content);
  } catch (err) {
    message.error("Failed to copy text");
  }
};

export const CITATIONS = [
    "Harvard",
    "Harvard (Australia style)",
    "AMA (American Medical Association)",
    "American Chemical Society",
    "APA 6 (American Psychological Association 6th edition)",
    "APA 7 (American Psychological Association 7th edition)",
    "Chicago Manual of Style 17th edition (author-date)",
    "Chicago Manual of Style 17th edition (full note)",
    "Council of Science Editors, Name-Year (author-date)",
    "IEEE",
    "MHRA (Modern Humanities Research Association - author-date)",
    "MLA 8 (Modern Language Association 8th edition)",
    "MLA 9 (Modern Language Association 9th edition)",
    "OSCOLA (Oxford University Standard for Citation of Legal Authorities)",
    "Vancouver",
    "2D Materials",
    "3 Biotech",
    "3D Printing and Additive Manufacturing",
    "3D Printing in Medicine",
    "3D Research",
    "3D-Printed Materials and Systems",
    "4OR",
    "AAPG Bulletin",
    "AAPS Open",
    "AAPS PharmSciTech",
    "Abhandlungen aus dem Mathematischen Seminar der Universität Hamburg",
    "ABI Technik (Deutsch)",
    "Academic Medicine",
    "Academic Pediatrics",
    "Academic Psychiatry",
    "Academic Questions",
    "Academy of Management Discoveries",
    "Academy of Management Journal",
    "Academy of Management Learning and Education",
    "Academy of Management Perspectives",
    "Academy of Management Proceedings",
    "Academy of Management Review",
    "Accident Analysis and Prevention",
    "Accounting Forum",
    "Accounting History Review",
    "Accounting, Organizations and Society",
    "Accounts of Chemical Research",
    "Accreditation and Quality Assurance",
    "Achievements in the Life Sciences",
    "ACI Materials Journal",
    "ACI Structural Journal",
    "ACM Computing Surveys",
    "ACM Journal on Emerging Technologies in Computing Systems",
    'ACM SIG Proceedings ("et al." for 15+ authors)',
    'ACM SIG Proceedings ("et al." for 3+ authors)',
    "ACM SIGCHI Proceedings - Extended Abstract Format",
    "ACM SIGCHI Proceedings (2016)",
    "ACM SIGGRAPH",
    "ACM Transactions on Accessible Computing",
    "ACM Transactions on Algorithms",
    "ACM Transactions on Applied Perception",
    "ACM Transactions on Architecture and Code Optimization",
    "ACM Transactions on Asian Language Information Processing",
    "ACM Transactions on Autonomous and Adaptive Systems",
    "ACM Transactions on Computation Theory",
    "ACM Transactions on Computational Logic",
    "ACM Transactions on Computer Systems",
    "ACM Transactions on Computer-Human Interaction",
    "ACM Transactions on Computing Education",
    "ACM Transactions on Database Systems",
    "ACM Transactions on Design Automation of Electronic Systems",
    "ACM Transactions on Embedded Computing Systems",
    "ACM Transactions on Graphics",
    "ACM Transactions on Information and System Security",
    "ACM Transactions on Information Systems",
    "ACM Transactions on Intelligent Systems and Technology",
    "ACM Transactions on Interactive Intelligent Systems",
    "ACM Transactions on Internet Technology",
    "ACM Transactions on Knowledge Discovery from Data",
    "ACM Transactions on Management Information Systems",
    "ACM Transactions on Mathematical Software",
    "ACM Transactions on Modeling and Computer Simulation",
    "ACM Transactions on Multimedia Computing, Communications, and Applications",
    "ACM Transactions on Parallel Computing",
    "ACM Transactions on Programming Languages and Systems",
    "ACM Transactions on Reconfigurable Technology and Systems",
    "ACM Transactions on Sensor Networks",
    "ACM Transactions on Software Engineering and Methodology",
    "ACM Transactions on Spatial Algorithms and Systems",
    "ACM Transactions on Speech and Language Processing",
    "ACM Transactions on Storage",
    "ACM Transactions on the Web",
    "ACME: An International Journal for Critical Geographies",
    "Acoustics Australia",
    "ACS Applied Energy Materials",
    "ACS Applied Materials & Interfaces",
    "ACS Applied Nano Materials",
    "ACS Biomaterials Science & Engineering",
    "ACS Catalysis",
    "ACS Chemical Biology",
    "ACS Chemical Neuroscience",
    "ACS Combinatorial Science",
    "ACS Earth and Space Chemistry",
    "ACS Energy Letters",
    "ACS Infectious Diseases",
    "ACS Macro Letters",
    "ACS Medicinal Chemistry Letters",
    "ACS Nano",
    "ACS Photonics",
    "ACS Sustainable Chemistry & Engineering",
    "ACS Synthetic Biology",
    "Acta Agriculturae Scandinavica, Section B - Soil & Plant Science",
    "Acta Amazonica",
    "Acta Anaesthesiologica Scandinavica",
    "Acta Anaesthesiologica Taiwanica",
    "Acta Analytica",
    "Acta Applicandae Mathematicae",
    "Acta Astronautica",
    "Acta Biologica Sibirica",
    "Acta Biomaterialia",
    "Acta Biotheoretica",
    "Acta Botanica Croatica",
    "Acta Botanica Gallica",
    "Acta Chiropterologica",
    "Acta chirurgiae orthopaedicae et traumatologiae Čechoslovaca",
    "Acta Commercii",
    "Acta Crystallographica Section A: Foundations and Advances",
    "Acta Crystallographica Section B: Structural Science, Crystal Engineering and Materials",
    "Acta Crystallographica Section C: Structural Chemistry",
    "Acta Crystallographica Section D: Biological Crystallography",
    "Acta Crystallographica Section E: Structure Reports Online",
    "Acta Crystallographica Section F: Structural Biology Communications",
    "Acta Cytologica",
    "Acta de Investigación Psicológica",
    "Acta Diabetologica",
    "Acta Ecologica Sinica",
    "acta ethologica",
    "Acta Geochimica",
    "Acta Geodaetica et Geophysica",
    "Acta Geotechnica",
    "Acta Haematologica",
    "Acta Haematologica Polonica",
    "Acta Histochemica",
    "Acta hydrotechnica",
    "Acta Ichthyologica et Piscatoria",
    "Acta Materialia",
    "Acta Mathematica Vietnamica",
    "Acta Mechanica",
    "Acta Mechanica Sinica",
    "Acta Mechanica Solida Sinica",
    "Acta Medica",
    "Acta Médica Colombiana",
    "Acta Médica Peruana",
    "Acta Medica Philippina",
    "Acta Metallurgica Sinica",
    "Acta Naturae",
    "Acta Neurobiologiae Experimentalis",
    "Acta Neurochirurgica",
    "Acta Neurologica Belgica",
    "Acta Neuropathologica",
    "Acta Neuropathologica Communications",
    "Acta Oecologica",
    "Acta Ophthalmologica",
    "Acta Ornithologica",
    "Acta Orthopaedica",
    "Acta Orthopædica Belgica",
    "Acta Orthopaedica et Traumatologica Turcica",
    "Acta Otorrinolaringológica Española (Español)",
    "Acta Paediatrica",
    "Acta Palaeontologica Polonica",
    "Acta Pharmaceutica",
    "Acta Pharmaceutica Sinica B",
    "Acta Pharmacologica Sinica",
    "Acta Philosophica",
    "Acta Physica Sinica (物理学报)",
    "Acta Physiologiae Plantarum",
    "Acta Physiologica",
    "Acta Polytechnica",
    "Acta Psychiatrica Scandinavica",
    "Acta Psychologica",
    "Acta Radiologica",
    "Acta Scientiae Veterinariae",
    "Acta Societatis Botanicorum Poloniae",
    "Acta Sociológica",
    "Acta Tropica",
    "Acta Universitatis Agriculturae et Silviculturae Mendelianae Brunensis",
    "Acta Universitatis Agriculturae Sueciae (Swedish University of Agricultural Sciences)",
    "Acta Veterinaria Scandinavica",
    "Acta Zoologica Academiae Scientiarum Hungaricae",
    "Action Learning: Research and Practice",
    "Actualités pharmaceutiques",
    "Actuators",
    "Acupuncture and Related Therapies",
    "Acupuncture in Medicine",
    "Ad Hoc Networks",
    "Adansonia",
    "Adaptive Human Behavior and Physiology",
    "Addiction Biology",
    "Addiction Science & Clinical Practice",
    "Addictive Behaviors",
    "Addictive Behaviors Reports",
    "Additive Manufacturing",
    "ADHD Attention Deficit and Hyperactivity Disorders",
    "Adipocyte",
    "Administration and Policy in Mental Health and Mental Health Services Research",
    "Administrative Science Quarterly",
    "Administrative Sciences",
    "Adolescent Research Review",
    "Adsorption",
    "Advanced Composite Materials",
    "Advanced Drug Delivery Reviews",
    "Advanced Engineering Informatics",
    "Advanced Engineering Materials",
    "Advanced Functional Materials",
    "Advanced Healthcare Materials",
    "Advanced Industrial and Engineering Polymer Research",
    "Advanced Materials",
    "Advanced Medicinal Chemistry Letters",
    "Advanced Modeling and Simulation in Engineering Sciences",
    "Advanced Optical Materials",
    "Advanced Organic Chemistry Letters",
    "Advanced Pharmaceutical Bulletin",
    "Advanced Powder Technology",
    "Advanced Robotics",
    "Advanced Structural and Chemical Imaging",
    "Advanced Theory and Simulations",
    "Advances in Accounting",
    "Advances in Alzheimer's Disease",
    "Advances in Applied Clifford Algebras",
    "Advances in Biological Regulation",
    "Advances in Biomarker Sciences and Technology",
    "Advances in Building Energy Research",
    "Advances in Climate Change Research",
    "Advances in Colloid and Interface Science",
    "Advances in Complex Systems",
    "Advances in Computational Mathematics",
    "Advances in Cosmetic Surgery",
    "Advances in Data Analysis and Classification",
    "Advances in Difference Equations",
    "Advances in Digestive Medicine",
    "Advances in Eating Disorders: Theory, Research and Practice",
    "Advances in Engineering Software",
    "Advances in Family Practice Nursing",
    "Advances in Geosciences",
    "Advances in Health Sciences Education",
    "Advances in Integrative Medicine",
    "Advances in Life Course Research",
    "Advances in Manufacturing",
    "Advances in Medical Sciences",
    "Advances in Molecular Pathology",
    "Advances in Natural Sciences: Nanoscience and Nanotechnology",
    "Advances in Nutrition",
    "Advances in Oceanography and Limnology",
    "Advances in Ophthalmology and Optometry",
    "Advances in Optics and Photonics",
    "Advances in Physiology Education",
    "Advances in Radiation Oncology",
    "Advances in Radio Science",
    "Advances in School Mental Health Promotion",
    "Advances in Science and Research",
    "Advances in Simulation",
    "Advances in Space Research",
    "Advances in Statistical Climatology, Meteorology and Oceanography",
    "Advances in Therapy",
    "Advances in Water Resources",
    "Advances in Wound Care",
    "Aeolian Research",
    "Aequationes mathematicae",
    "Aerobiologia",
    "Aerosol and Air Quality Research",
    "Aerosol Science and Technology",
    "Aerospace",
    "Aerospace Medicine and Human Performance",
    "Aerospace Science and Technology",
    "Aesthetic Plastic Surgery",
    "Aethiopica",
    "Aethiopistische Forschungen",
    "AEUE - International Journal of Electronics and Communications",
    "Africa Review",
    "African and Black Diaspora: An International Journal",
    "African Archaeological Review",
    "African Evaluation Journal",
    "African Geographical Review",
    "African Identities",
    "African Invertebrates",
    "African Journal of Career Development",
    "African Journal of Disability",
    "African Journal of Emergency Medicine",
    "African Journal of Laboratory Medicine",
    "African Journal of Marine Science",
    "African Journal of Primary Health Care and Family Medicine",
    "African Journal of Psychological Assessment",
    "African Journal of Urology",
    "African Online Scientific Information Systems - Harvard",
    "African Online Scientific Information Systems - Vancouver",
    "African Vision and Eye Health",
    "African Zoology",
    "Africa's Public Service Delivery and Performance Review",
    "Afrika Matematika",
    "Afro-Ásia (Português - Brasil)",
    "AFTE Journal",
    "AGE",
    "Age and Ageing",
    "Ageing & Society",
    "Ageing International",
    "Ageing Research Reviews",
    "Aggression and Violent Behavior",
    "Aging",
    "Aging & Mental Health",
    "Aging and Disease",
    "Aging Cell",
    "Aging Clinical and Experimental Research",
    "Aging Health",
    "Aging, Neuropsychology, and Cognition",
    "Agora",
    "Agri Gene",
    "Agriculturae Conspectus Scientificus",
    "Agricultural and Food Economics",
    "Agricultural and Forest Meteorology",
    "Agricultural Research",
    "Agricultural Systems",
    "Agricultural Water Management",
    "Agriculture",
    "Agriculture & Food Security",
    "Agriculture and Human Values",
    "Agriculture and Natural Resources",
    "Agriculture, Ecosystems and Environment",
    "Agroforestry Systems",
    "Agronomy",
    "Agronomy for Sustainable Development",
    "Agronomy Journal",
    "AI & SOCIETY",
    "AIAA Journal",
    "AIB studi (Italiano)",
    "AIDS",
    "AIDS and Behavior",
    "AIDS Care",
    "AIDS Patient Care and STDs",
    "AIDS Research and Human Retroviruses",
    "AIDS Research and Therapy",
    "AIMS Agriculture and Food",
    "AIMS Allergy and Immunology",
    "AIMS Bioengineering",
    "AIMS Biophysics",
    "AIMS Electronics and Electrical Engineering",
    "AIMS Energy",
    "AIMS Environmental Science",
    "AIMS Genetics",
    "AIMS Geosciences",
    "AIMS Materials Science",
    "AIMS Mathematics",
    "AIMS Medical Science",
    "AIMS Microbiology",
    "AIMS Molecular Science",
    "AIMS Neuroscience",
    "AIMS Press",
    "AIMS Public Health",
    "Ain Shams Engineering Journal",
    "AINS",
    "AIP Advances",
    "Air Quality, Atmosphere & Health",
    "Aix-Marseille Université - Département d'études asiatiques (Français)",
    "AKCE International Journal of Graphs and Combinatorics",
    "Aktuelle Dermatologie",
    "Aktuelle Ernährungsmedizin",
    "Aktuelle Kardiologie",
    "Aktuelle Neurologie",
    "Aktuelle Rheumatologie",
    "Aktuelle Urologie",
    "Albert-Ludwigs-Universität Freiburg - Geschichte (Deutsch)",
    "Alcohol",
    "Alcohol and Alcoholism",
    "Alcoholism and Drug Addiction",
    "Alcoholism: Clinical and Experimental Research",
    "Alergologia Polska- Polish Journal of Allergology",
    "Alexandria Engineering Journal",
    "Alexandria Journal of Medicine",
    "Algal Research",
    "Algebra universalis",
    "Algebras and Representation Theory",
    "Algorithmica",
    "Algorithms",
    "Algorithms for Molecular Biology",
    "Al-Jami'ah - Journal of Islamic Studies",
    "Alkoholizmus a drogové závislosti",
    "Allergology International",
    "Allergy",
    "Allergy, Asthma & Clinical Immunology",
    "Allgemein- und Viszeralchirurgie up2date",
    "Alpine Botany",
    "Alpine Entomology",
    "Alter - European Journal of Disability research, Revue européenne de recherche sur le handicap",
    "Alternatif Politika",
    "Alternatives to Animal Experimentation",
    "Alzheimer's & Dementia: Diagnosis, Assessment & Disease Monitoring",
    "Alzheimer's & Dementia: The Journal of the Alzheimer's Association",
    "Alzheimer's & Dementia: Translational Research & Clinical Interventions",
    "Alzheimer's Research & Therapy",
    "AMAR Analytic Methods in Accident Research.",
    "AMB Express",
    "AMBIO",
    "Ameghiniana",
    "American Anthropological Association",
    "American Antiquity",
    "American Association for Cancer Research",
    "American Association of Petroleum Geologists",
    "American Educational Research Journal",
    "American Entomologist",
    "American Family Physician",
    "American Fisheries Society",
    "American Geophysical Union",
    "American Heart Association",
    "American Heart Journal",
    "American Institute of Aeronautics and Astronautics",
    "American Institute of Physics",
    "American Journal of Agricultural Economics",
    "American Journal of Alzheimer's Disease & Other Dementias",
    "American Journal of Archaeology",
    "American Journal of Botany",
    "American Journal of Cardiovascular Drugs",
    "American Journal of Climate Change",
    "American Journal of Clinical Dermatology",
    "American Journal of Clinical Pathology",
    "American Journal of Community Psychology",
    "American Journal of Criminal Justice",
    "American Journal of Dance Therapy",
    "American Journal of Enology and Viticulture",
    "American Journal of Epidemiology",
    "American Journal of Gastroenterology Supplements",
    "American Journal of Health Behavior",
    "American Journal of Health-System Pharmacy",
    "American Journal of Hypertension",
    "American Journal of Industrial Medicine",
    "American Journal of Infection Control",
    "American Journal of Kidney Diseases",
    "American Journal of Medical Genetics",
    "American Journal of Nephrology",
    "American Journal of Neuroradiology",
    "American Journal of Obstetrics & Gynecology",
    "American Journal of Ophthalmology",
    "American Journal of Ophthalmology Case Reports",
    "American Journal of Orthodontics & Dentofacial Orthopedics",
    "American Journal of Orthopsychiatry",
    "American Journal of Otolaryngology--Head and Neck Medicine and Surgery",
    "American Journal of Physical Anthropology",
    "American Journal of Physiology - Cell Physiology",
    "American Journal of Physiology - Endocrinology and Metabolism",
    "American Journal of Physiology - Gastrointestinal and Liver Physiology",
    "American Journal of Physiology - Heart and Circulatory Physiology",
    "American Journal of Physiology - Lung Cellular and Molecular Physiology",
    "American Journal of Physiology - Regulatory, Integrative, and Comparative Physiology",
    "American Journal of Physiology - Renal Physiology",
    "American Journal of Plant Sciences",
    "American Journal of Political Science",
    "American Journal of Potato Research",
    "American Journal of Primatology",
    "American Journal of Public Health",
    "American Journal of Reproductive Immunology",
    "American Journal of Respiratory and Critical Care Medicine",
    "American Journal of Roentgenology",
    "American Journal of Science",
    "American Journal of Sociology",
    "American Journal of Sonography",
    "American Journal of Surgical Pathology",
    "American Journal of Translational Research",
    "American Journal of Veterinary Research",
    "American Marketing Association",
    "American Medical Association 10th edition",
    "American Medical Association 11th edition",
    "American Medical Association 11th edition (brackets)",
    'American Medical Association 11th edition (no "et al.")',
    "American Medical Association 11th edition (no URL)",
    "American Medical Association 11th edition (no URL, sorted alphabetically)",
    "American Medical Association 11th edition (parentheses)",
    "American Medical Association 11th edition (sorted alphabetically)",
    "American Medical Writers Association Journal",
    "American Meteorological Society",
    "American Mineralogist",
    "American Nuclear Society",
    "American Physical Society",
    "American Physical Society - et al. (if more than 3 authors)",
    "American Physical Society (without titles)",
    "American Physiological Society",
    "American Phytopathological Society",
    "American Political Science Association",
    "American Political Science Review",
    "American Psychological Association 5th edition",
    "American Psychological Association 6th edition",
    'American Psychological Association 6th edition ("doi:" DOI prefix)',
    "American Psychological Association 6th edition (no ampersand)",
    "American Psychological Association 6th edition (no DOIs, no issue numbers)",
    "American Psychological Association 6th edition (Provost) (Français - Canada)",
    "American Psychological Association 6th edition (Türkçe)",
    "American Psychological Association 7th edition",
    "American Psychological Association 7th edition (annotated bibliography)",
    "American Psychological Association 7th edition (curriculum vitae, sorted by descending date)",
    "American Psychological Association 7th edition (no ampersand)",
    "American Psychological Association 7th edition (no initials)",
    "American Psychological Association 7th edition (numeric, brackets)",
    "American Psychological Association 7th edition (numeric, superscript)",
    "American Psychological Association 7th edition (single-spaced bibliography)",
    "American Psychological Association 7th edition (with abstract)",
    "American Psychologist",
    "American Review of Canadian Studies",
    "American School of Classical Studies at Athens",
];

export const defaultPropertyShown = {
    moodboard: {
        propertyShown:[],
    },
    table : {
        propertyShown:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        },
        {
          "name": "Collection",
          "type": "folder"
        }
        ]
    },
    list: {
        propertyShown:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        }
        ]
    },
    card: {
        propertyShown:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        }
        ]
    },
    inbox: {
        propertyShown:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        }
        ]
    },
    stream: {
        propertyShown:[],
    },
}

export const defaultPropertyOrder = {
    moodboard: {
        propertyOrder:[],
    },
    table : {
        propertyOrder:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        },
        {
          "name": "Collection",
          "type": "folder"
        }
        ]
    },
    list: {
        propertyOrder:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        }
        ]
    },
    card: {
        propertyOrder:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        }
        ]
    },
    inbox: {
        propertyOrder:[
        {
            "name": "Thumbnail",
            "type": "image"
        },
        {
            "name": "Title",
            "type": "text"
        },
        {
            "name": "Description",
            "type": "text"
        },
        {
            "name": "Tags",
            "type": "tags"
        }
        ]
    },
    stream: {
        propertyOrder:[],
    },
}

export const defaultPropertyHidden = {
    moodboard: {
        propertyHidden:[
    {
        "name": "Thumbnail",
        "type": "image"
    },
    {
        "name": "Title",
        "type": "text"
    },
    {
        "name": "Description",
        "type": "text"
    },
    {
        "name": "Tags",
        "type": "tags"
    },
    {
        "name": "Url",
        "type": "url"
    },
    {
        "name": "Collection",
        "type": "folder"
    },
    {
        "name": "Media Type",
        "type": "mediaType"
    },
    {
        "name": "Remarks",
        "type": "remarks"
    },
],
    },
    table : {
        propertyHidden:[
    {
        "name": "Url",
        "type": "url"
    },
    {
        "name": "Media Type",
        "type": "mediaType"
    },
    {
        "name": "Remarks",
        "type": "remarks"
    },
]
    },
    list: {
        propertyHidden:[
    {
        "name": "Url",
        "type": "url"
    },
    {
        "name": "Collection",
        "type": "folder"
    },
    {
        "name": "Media Type",
        "type": "mediaType"
    },
    {
        "name": "Remarks",
        "type": "remarks"
    },
]
    },
    card: {
        propertyHidden:[
    {
        "name": "Url",
        "type": "url"
    },
    {
        "name": "Collection",
        "type": "folder"
    },
    {
        "name": "Media Type",
        "type": "mediaType"
    },
    {
        "name": "Remarks",
        "type": "remarks"
    },
]
    },
    inbox: {
        propertyHidden:[
    {
        "name": "Url",
        "type": "url"
    },
    {
        "name": "Collection",
        "type": "folder"
    },
    {
        "name": "Media Type",
        "type": "mediaType"
    },
    {
        "name": "Remarks",
        "type": "remarks"
    },
]
    },
    stream: {
        propertyHidden:[
    {
        "name": "Thumbnail",
        "type": "image"
    },
    {
        "name": "Title",
        "type": "text"
    },
    {
        "name": "Description",
        "type": "text"
    },
    {
        "name": "Tags",
        "type": "tags"
    },
    {
        "name": "Url",
        "type": "url"
    },
    {
        "name": "Collection",
        "type": "folder"
    },
    {
        "name": "Media Type",
        "type": "mediaType"
    },
    {
        "name": "Remarks",
        "type": "remarks"
    },
],
    },
}

export const GALLEY_UPLOAD_COLORS = [
  {
    id: 1,
    bg: "#fac96c",
  },
  {
    id: 2,
    bg: "#ee7070",
  },
  {
    id: 3,
    bg: "#3ea9d5",
  },
  {
    id: 4,
    bg: "#0079bf",
  },
  {
    id: 5,
    bg: "#d29034",
  },
  {
    id: 6,
    bg: "#519839",
  },
  {
    id: 7,
    bg: "#b04632",
  },
  {
    id: 8,
    bg: "#89609e",
  },
  {
    id: 9,
    bg: "#cd5a91",
  },
  {
    id: 10,
    bg: "#4bbf6b",
  },
  {
    id: 11,
    bg: "#00aecc",
  },
  {
    id: 12,
    bg: "#838c91",
  },
  {
    id: 13,
    bg: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'
  },
  {
    id: 14,
    bg: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)'
  },
  {
    id: 15,
    bg: 'linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)'
  },
  {
    id: 16,
    bg: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'
  },
  {
    id: 17,
    bg: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)'
  },
  {
    id: 18,
    bg: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)'
  },
  {
    id: 19,
    bg: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)'
  },
  {
    id: 20,
    bg: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 21,
    bg: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 22,
    bg: 'linear-gradient(45deg, #874da2 0%, #c43a30 100%)'
  },
  {
    id: 23,
    bg: 'linear-gradient(to right, #f83600 0%, #f9d423 100%)'
  },
  {
    id: 24,
    bg: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)'
  },
];
export function debounceFunction(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export const  getBackgroundStyle = (wallpaper, layout) =>{
  if (!wallpaper || layout === 'table') {
    return '#fff';
  }

  switch (wallpaper.type) {
    case 'unsplash':
    case 'upload':
      return `url(${wallpaper.icon?.includes("/1000x1000_cover") ? wallpaper.icon : wallpaper.icon?.replace(process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL, `${process.env.NEXT_PUBLIC_STATIC_S3_BASE_URL}/1000x1000_cover`)}) 50% /cover no-repeat fixed`;
    case 'gallery':
      return `${wallpaper.icon}`;
    default:
      return '#fff';
  }
}

export const getDomainFromURL = (url) => {
    if (url) {
      const urlObj = new URL(url)
      return urlObj.hostname.replace("www.", "")
    }
    return ''
}

//LANGUAGES
export const LANGUAGES = [
  {
    id: 1,
    name: "CSS",
    mode: "css",
    lng: css(),
    iconComponent: <DiCss3 className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 2,
    name: "C++",
    mode: "cpp",
    lng: cpp(),
    iconComponent: <DiCodeBadge className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 3,
    name: "HTML",
    mode: "html",
    lng: html(),
    iconComponent: <DiHtml5 className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 4,
    name: "Java",
    mode: "java",
    lng: java(),
    iconComponent: <DiJava className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 5,
    name: "JavaScript",
    mode: "javascript",
    lng: javascript(),
    iconComponent: <DiJavascript1 className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 6,
    name: "Json",
    mode: "json",
    lng: json(),
    iconComponent: <VscJson className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 7,
    name: "Php",
    mode: "php",
    lng: php(),
    iconComponent: <DiPhp className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 8,
    name: "Python",
    mode: "python",
    lng: python(),
    iconComponent: <DiPython className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 9,
    name: "Rust",
    mode: "rust",
    lng: rust(),
    iconComponent: <DiRust className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
  {
    id: 10,
    name: "Sql",
    mode: "sql",
    lng: sql(),
    iconComponent: <SiMysql className="h-5 w-5 text-white mr-2" />,
    code: "<!--Paste your code here -- >",
  },
];

//THEMES
export const THEMES = [
  {
    id: 1,
    name: "Dark",
    mode: "dark",
    theme: "dark",
  },
  {
    id: 2,
    name: "Light",
    mode: "light",
    theme: "light",
  },
  {
    id: 3,
    name: "Dracula",
    mode: "dracula",
    theme: dracula,
  },
  {
    id: 4,
    name: "Okaidia",
    mode: "okaidia",
    theme: okaidia,
  },
];

export const copyLinkToHighlight = async (url, text) => {
    if (!url || !text) return false;
    let currentUrl = url;
    // If URL already has a fragment identifier, remove it
    if (currentUrl.indexOf("#") > -1) {
        currentUrl = currentUrl.substring(0, currentUrl.indexOf("#"));
    }

    const splitArr = text.split(' ');
    //If highlighted words are more than 50 split it to smaller words
    if (splitArr.length > 50) {
        const firstWords = splitArr.slice(0, 3).join(' ');
        const LastWords = splitArr.slice(-3).join(' ');
        currentUrl += `#:~:text=${encodeURIComponent(firstWords)},${encodeURIComponent(LastWords)}`;
    } else {
        currentUrl += `#:~:text=${encodeURIComponent(text)}`;
    }

    window.navigator.clipboard.writeText(currentUrl)
}

export const openLinkToHighlight = async (url, text) => {
    if (!url || !text) return false;
    let currentUrl = url;
    // If URL already has a fragment identifier, remove it
    if (currentUrl.indexOf("#") > -1) {
        currentUrl = currentUrl.substring(0, currentUrl.indexOf("#"));
    }

    const splitArr = text.split(' ');
    //If highlighted words are more than 50 split it to smaller words
    if (splitArr.length > 50) {
        const firstWords = splitArr.slice(0, 3).join(' ');
        const LastWords = splitArr.slice(-3).join(' ');
        currentUrl += `#:~:text=${encodeURIComponent(firstWords)},${encodeURIComponent(LastWords)}`;
    } else {
        currentUrl += `#:~:text=${encodeURIComponent(text)}`;
    }

    window.open(currentUrl, "_blank");

}

export const menuData = [
  {
    name: "Search",
    shortName: "search",
  },
  {
    name: "All Bookmarks",
    shortName: "all",
  },
  {
    name: "Filter",
    shortName: "filter",
  },
  {
    name: "Tag",
    shortName: "tag",
  },
  {
    name: "Collection",
    shortName: "collection",
  },
  {
    name: "Leader Board",
    shortName: "leader-board",
  },
  {
    name: "Activity",
    shortName: "activity",
  },
  {
    name: "Broken Links",
    shortName: "broken",
  },
  {
    name: "Duplicate Links",
    shortName: "duplicate",
  },
  {
    name: "Profile",
    shortName: "profile",
  },
];

export const Bio_Services = [
  {
    name:'Facebook',
    description: 'Add Facebook posts',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/facebook.png",
    media_type:'SocialFeed',
    platform: 'Facebook'
  },
  {
    name:'Pinterest',
    description: 'Showcase Pins, boards and more',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/pinterest.png",
    media_type:'Image'
  },
  {
    name:'Soundcloud',
    description: 'Get your music heard on SoundCloud',
    type: 'logo', 
    imgSrc:'https://curateit-files.s3.amazonaws.com/sidebar/common/icon/soundcloud.png',
    media_type:'Audio'
  },
  {
    name:'TikTok',
    description: 'Share a TikTok video',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/TikTok.png",
    media_type:'SocialFeed',
    platform: 'Tiktok'
  },
  {
    name:'Spotify',
    description: 'Share your latest or favorite music',
    type: 'logo', 
    imgSrc:'https://curateit-files.s3.amazonaws.com/sidebar/common/icon/Spotify.png',
    media_type:'Audio'
  },
  // {
  //   name:'Twitch',
  //   description: 'Get more stream viewers and engagement',
  //   type: 'logo', 
  //   imgSrc:'https://curateit-static-files.s3.amazonaws.com/app-icon/Twitch.png',
  //   media_type:'Profile'
  // },
  {
    name:'Instagram',
    description: 'Share a Instagram post',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/Instagram.png",
    media_type:'SocialFeed',
    platform: 'Instagram'
  },
  {
    name:'Vimeo',
    description: 'Add Vimeo videos',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/vimeo.png",
    media_type:'Video'
  },
  {
    name:'YouTube',
    description: 'Share YouTube videos',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/Youtube.png",
    media_type:'Video'
  },
  {
    name:'X',
    description: 'Showcase your posts and X feed',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/Twiiter_X.png",
    media_type:'SocialFeed',
    platform: 'Twitter'
  },
  {
    name:'LinkedIn',
    description: 'Share LinkedIn post',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/Linkedin.png",
    media_type:'SocialFeed',
    platform:'LinkedIn',
  },
  {
    name:'Threads',
    description: 'Share threads post',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/thread.png",
    media_type:'SocialFeed',
    platform:'Threads',
  },
  {
    name:'Github',
    description: 'Add github',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/Github.png",
    media_type:'SocialFeed',
    platform:'Github',
  },
  {
    name:'Medium',
    description: 'Share medium post',
    type: 'logo', 
    imgSrc: "https://curateit-static-files.s3.amazonaws.com/app-icon/medium.png.jpg",
    media_type:'SocialFeed',
    platform:'Medium',
  },
  {
    name:'Reddit',
    description: 'Share Reddit post',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/reddit.png.png",
    media_type:'SocialFeed',
    platform:'Reddit',
  },

  {
    name:'Snapchat',
    description: 'Share Snapchat',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/snapchat.png",
    media_type:'SocialFeed',
    platform:'Snapchat',
  },
  {
    name:'Amazon',
    description: 'Save Amazon product',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/amazon.png.png",
    media_type:'Product',
  },
  {
    name:'Apple Music',
    description: 'Share your latest or favorite music',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/AppleMusic.png",
    media_type:'Audio',
  },
  {
    name:'Apple TV',
    description: 'Share your favourite link',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/apple_tv.png",
    media_type:'Link',
  },
  {
    name:'Apple Podcasts',
    description: 'Share your favourite podcasts',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/apple_podcasts.png",
    media_type:'Link',
  },
  {
    name:'Apple Books',
    description: 'Share your favourite books',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/apple_books.png",
    media_type:'Book',
  },
  {
    name:'Google Play',
    description: 'Share your favourite google play app',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/playstore.webp",
    media_type:'App',
  },
  {
    name:'App Store',
    description: `Share your favourite app stores's app`,
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/appstore.png.png",
    media_type:'App',
  },
  {
    name:'Gitlab',
    description: 'Add Gitlab',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/gitlab.png",
    media_type:'SocialFeed',
    platform:'Gitlab',
  },
  {
    name:'Goodreads',
    description: 'Share your goodreads book',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/goodreads.png.png",
    media_type:'Book',
  },
  {
    name:'Mastodon',
    description: 'Share your mastodon post',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/mastodon.png",
    media_type:'SocialFeed',
    platform:'Mastodon',
  },
  {
    name:'IMDB',
    description: 'Share your IMDB ',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/IMDb.png",
    media_type:'Link',
  },
]

export const MediaType_Bio_Services = [
 {
    name:'Link',
    description: 'Add link to your curateit',
    type: 'icon', 
    icon: <LinkIcon className="h-4 w-4" />,
    bgColor:'#BBBEAC',
    media_type:'Link'
  }, 
  {
    name:'Book',
    description: 'Add book to your curateit',
    type: 'icon', 
    icon: <BookOpenIcon className="h-4 w-4" />,
    bgColor:'#FF9E47',
    media_type:'Book'
  },
  {
    name:'Profile',
    description: 'Add profile to your curateit',
    type: 'icon', 
    icon: <BiUserCircle className="h-4 w-4" />,
    bgColor:'#C2C9D1',
    media_type:'Profile'
  },
  {
    name:'Movie',
    description: 'Add movie to your curateit',
    type: 'icon', 
    icon: <FilmIcon className="h-4 w-4" />,
    bgColor:'#E9C0E9',
    media_type:'Movie'
  },
  {
    name:'Quote',
    description: 'Add quote to your curateit',
    type: 'icon', 
    icon: <RiDoubleQuotesL className="h-4 w-4" />,
    bgColor:'#D6A336',
    media_type:'Quote'
  },
  {
    name:'Product',
    description: 'Add product to your curateit',
    type: 'icon', 
    icon: <ShoppingBagIcon className="h-4 w-4" />,
    bgColor:'#43E660',
    media_type:'Product'
  },
  {
    name:'App',
    description: 'Add app to your curateit',
    type: 'icon', 
    icon: <DevicePhoneMobileIcon className="h-4 w-4" />,
    bgColor:'#FC3E4B',
    media_type:'App'
  },
  {
    name:'Audio',
    description: 'Add audio to your curateit',
    type: 'icon', 
    icon: <SpeakerWaveIcon className="h-4 w-4" />,
    bgColor:'#D2E823',
    media_type:'Audio'
  },
  {
    name:'Image',
    description: 'Add image to your curateit',
    type: 'icon', 
    icon: <PhotoIcon className="h-4 w-4" />,
    bgColor:'#BBBEAC',
    media_type:'Image'
  },
  {
    name:'Video',
    description: 'Add video to your curateit',
    type: 'icon', 
    icon: <VideoCameraIcon className="h-4 w-4" />,
    bgColor:'#FF9E47',
    media_type:'Video'
  },
  {
    name:'PDF',
    description: 'Add PDF to your curateit',
    type: 'icon', 
    icon: <AiOutlineFilePdf className="h-4 w-4" />,
    bgColor:'#C2C9D1',
    media_type:'PDF'
  },
  {
    name:'Article',
    description: 'Add article to your curateit',
    type: 'icon', 
    icon: <RiArticleLine className="h-4 w-4" />,
    bgColor:'#E9C0E9',
    media_type:'Article'
  },
  {
    name:'Code',
    description: 'Add code to your curateit',
    type: 'icon', 
    icon: <CodeBracketIcon className="h-4 w-4" />,
    bgColor:'#D6A336',
    media_type:'Code'
  },
  {
    name:'Citation',
    description: 'Add citation to your curateit',
    type: 'icon', 
    icon: <RiAlignCenter className="h-4 w-4" />,
    bgColor:'#43E660',
    media_type:'Citation'
  },
  {
    name:'Testimonial',
    description: 'Add testimonial to your curateit',
    type: 'icon', 
    icon: <TfiWrite className="h-4 w-4" />,
    bgColor:'#FC3E4B',
    media_type:'Testimonial'
  },
]

export const Profile_Bio_Services = [
  {
    name:'Facebook',
    description: 'Add Facebook profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/facebook.png",
    media_type:'Profile',
    platform: 'Facebook'
  },
  {
    name:'TikTok',
    description: 'Add TikTok profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/TikTok.png",
    media_type:'Profile',
    platform:'Tiktok',
  },
  {
    name:'Twitch',
    description: 'Add Twitch profile',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/app-icon/Twitch.png',
    media_type:'Profile',
    platform:'Twitch',
  },
  {
    name:'Instagram',
    description: 'Add Instagram profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/Instagram.png",
    media_type:'Profile',
    platform:'Instagram',
  },
  {
    name:'X',
    description: 'Add X profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/Twiiter_X.png",
    media_type:'Profile',
    platform:'Twitter',
  },
  {
    name:'LinkedIn',
    description: 'Add LinkedIn profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/Linkedin.png",
    media_type:'Profile',
    platform:'LinkedIn',
  },
  {
    name:'Threads',
    description: 'Add Threads profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/thread.png",
    media_type:'Profile',
    platform:'Threads',
  },
  {
    name:'Github',
    description: 'Add Github profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/Github.png",
    media_type:'Profile',
    platform:'Github',
  },
  {
    name:'Medium',
    description: 'Add Medium profile',
    type: 'logo', 
    imgSrc: "https://curateit-static-files.s3.amazonaws.com/app-icon/medium.png.jpg",
    media_type:'Profile',
    platform:'Medium',
  },
  {
    name:'YouTube',
    description: 'Add YouTube profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/Youtube.png",
    media_type:'Profile',
    platform:'YouTube',
  },
  {
    name:'Pinterest',
    description: 'Add Pinterest profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/pinterest.png",
    media_type:'Profile',
    platform:'Pinterest',
  },
  {
    name:'Reddit',
    description: 'Add Reddit profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/reddit.png.png",
    media_type:'Profile',
    platform:'Reddit',
  },
  {
    name:'Producthunt',
    description: 'Add Producthunt profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/producthunt.png.png",
    media_type:'Profile',
    platform:'Producthunt',
  },
  {
    name:'Substack',
    description: 'Add Substack profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/substack.png",
    media_type:'Profile',
    platform:'Substack',
  },
  {
    name:'Discord',
    description: 'Add Discord profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/discord.png",
    media_type:'Profile',
    platform:'Discord',
  },
  {
    name:'Whatsapp',
    description: 'Add Whatsapp profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/WhatsApp.png",
    media_type:'Profile',
    platform:'Whatsapp',
  },
  {
    name:'Telegram',
    description: 'Add Telegram profile',
    type: 'logo', 
    imgSrc:"https://curateit-files.s3.amazonaws.com/sidebar/common/icon/Telegram.png",
    media_type:'Profile',
    platform:'Telegram',
  },
  {
    name:'Steam',
    description: 'Add Steam profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/steam.png",
    media_type:'Profile',
    platform:'Steam',
  },
  {
    name:'Tumblr',
    description: 'Add Tumblr profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/tumblr.png",
    media_type:'Profile',
    platform:'Tumblr',
  },
  {
    name:'Gitlab',
    description: 'Add Gitlab profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/gitlab.png",
    media_type:'Profile',
    platform:'Gitlab',
  },
  {
    name:'Goodreads',
    description: 'Add Goodreads profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/goodreads.png.png",
    media_type:'Profile',
    platform:'Goodreads',
  },
  {
    name:'Mastodon',
    description: 'Add Mastodon profile',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/mastodon.png",
    media_type:'Profile',
    platform:'Mastodon',
  },
]

export const Donation_Bio_Services = [
  {
    name:'Ko-fi',
    description: 'Add Ko-fi',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/ko-fi.png",
    media_type:'Link',
  },
  {
    name:'Buy me a coffee',
    description: 'Add Buy me a coffee',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/buy-me-a-coffee.png",
    media_type:'Link',
  },
  {
    name:'Patreon',
    description: 'Add Patreon',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/app-icon/patreon.png',
    media_type:'Link',
  },
  {
    name:'Venmo',
    description: 'Add Venmo',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/app-icon/venmo.png',
    media_type:'Link',
  },
  {
    name:'CashApp',
    description: 'Add CashApp',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/app-icon/cashapp.png',
    media_type:'Link',
  },
  {
    name:'PayPal',
    description: 'Add PayPal',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/webapp/paypal.png',
    media_type:'Link',
  },
  {
    name:'SendOwl',
    description: 'Add SendOwl',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/webapp/sendowl.png',
    media_type:'Link',
  },
  {
    name:'Square',
    description: 'Add Square',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/webapp/square+logo.png',
    media_type:'Link',
  },
  {
    name:'Tip Jar',
    description: 'Add Tip Jar',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/webapp/tipjar-logo.png',
    media_type:'Link',
  },
  {
    name:'GoFundMe',
    description: 'Add GoFundMe',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/webapp/Gofundme_logo.png',
    media_type:'Link',
  },
  {
    name:'Shopify',
    description: 'Add GoFundMe',
    type: 'logo', 
    imgSrc:'https://curateit-static-files.s3.amazonaws.com/webapp/shopify.png',
    media_type:'Link',
  },
]

export const Contact_Bio_Services = [
  {
    name:'Contact Form',
    description: 'Add Contact Form',
    media_type:'Profile',
    type: 'icon', 
    icon: <MdOutlineContactPhone className="h-4 w-4" />,
  },
]

export const Meeting_Bio_Services = [
  {
    name:'Calendly',
    description: 'Add Calendly',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/calendly.png",
    media_type:'Link',
  },
  {
    name:'Cal.com',
    description: 'Add Cal.com',
    type: 'logo', 
    imgSrc:"https://curateit-static-files.s3.amazonaws.com/app-icon/cal.png",
    media_type:'Link',
  },
]

export const Layout_Bio_Services = [
  {
    name:'Title',
    description: 'Add title to your curateit',
    type: 'icon', 
    icon: <BiNotepad className="h-4 w-4" />,
    bgColor:'#FC3E4B',
    media_type:'Note',
    noteType: 'title'
  },
  {
    name:'Note',
    description: 'Add Note to your curateit',
    type: 'icon', 
    icon: <BiNotepad className="h-4 w-4" />,
    bgColor:'#D2E823',
    media_type:'Note',
    noteType:'description'
  },
]

export function hexToRGBA(hexCode, alpha = 0.3) {
    // Check if the hexCode starts with '#' and is the correct length
    if (hexCode.startsWith('#') && (hexCode.length === 7 || hexCode.length === 4)) {
        let r, g, b;

        if (hexCode.length === 7) {
            // If hex code is in the format #RRGGBB
            r = parseInt(hexCode.slice(1, 3), 16);
            g = parseInt(hexCode.slice(3, 5), 16);
            b = parseInt(hexCode.slice(5, 7), 16);
        } else {
            // If hex code is in the short format #RGB, convert to full format
            r = parseInt(hexCode[1] + hexCode[1], 16);
            g = parseInt(hexCode[2] + hexCode[2], 16);
            b = parseInt(hexCode[3] + hexCode[3], 16);
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
        throw new Error("Invalid hex code format. It should start with '#' and be either 4 or 7 characters long.");
    }
}

export function validateProperties(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value === "" || value === null || value === undefined) {
                return true; // Found an empty property
            }
        }
    }
    return false; // No empty properties found
}

export const TEXT_MESSAGE = {
  ERROR_TEXT: "Error Occured.Try again",
  ERROR_UPLOAD_LOGO_APP_USER:
    "Error Occured while uploading app logo.Try again",
  SIDEBAR_APP_CREATE_TEXT: "App added to sidebar successfully",
  SIDEBAR_APP_DELETE_TEXT: "App deleted successfully",
  CURATEIT_APP_CREATE_TEXT: "Curateit app added to sidebar successfully",
  CURATEIT_APP_DELETE_TEXT: "Curateit app removed from sidebar successfully",
  SIDEBAR_APP_UPDATE_TEXT: "App updated successfully",
  COLLECTION_CREATE_TEXT: "Collection created successfully",
  COLLECTION_UPDATE_TEXT: "Collection updated successfully",
  COLLECTION_DELETE_TEXT: "Collection deleted successfully",
  SHARED_COLLECTION_GEM_ERROR_TEXT:
    "You cant move shared collection gem to own collection",
  FILE_SIZE_ERROR: "File size must be less than 5MB",
  TOO_MANY_TAB: "Too many tabs to open",
};

export const defaultBioContactFields = [
    { name: 'First Name', key: 'firstName' },
    { name: 'Last Name', key: 'lastName' },
    { name: 'Email', key: 'email' },
    { name: 'Phone Number', key: 'phoneNumber' },
  ]

export const CHART_COLORS = [
  "#FF5733" , "#34A853" , "#FFC107" , "#2196F3" , "#E91E63" , "#9C27B0" , "#FF9800" , "#795548" , "#00BCD4" , "#FF5252" , "#8BC34A" , "#673AB7" , "#FFEB3B" , "#3F51B5" , "#FF4081" , "#CDDC39" , "#607D8B" , "#03A9F4" , "#588157" , "#F4A261" , "#C1121F" , "#7371FC"
]

export const URL_REGEX = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
export const SLUG_REGEX = /[\s&,+()$~%.'":*?<>|{}/\/]/gm
// export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/gm
export const backgroundGradients = [
  "linear-gradient(to right, #ff6e7f, #bfe9ff)",
  "linear-gradient(to right, #f7971e, #ffd200)",
  "linear-gradient(to right, #00c6ff, #0072ff)",
  "linear-gradient(to right, #ee0979, #ff6a00)",
  "linear-gradient(to right, #76b852, #8DC26F)",
  "linear-gradient(to right, #6a3093, #a044ff)",
  "linear-gradient(to right, #4568dc, #b06ab3)",
  "linear-gradient(to right, #FFAFBD, #ffc3a0)",
  "linear-gradient(to right, #43C6AC, #191654)",
  "linear-gradient(to right, #FF512F, #DD2476)",
  "linear-gradient(to right, #ff6e7f, #bfe9ff)",
  "linear-gradient(to right, #f7971e, #ffd200)",
  "linear-gradient(to right, #00c6ff, #0072ff)",
  "linear-gradient(to right, #ee0979, #ff6a00)",
  "linear-gradient(to right, #ffafbd, #ffc3a0)",
  "linear-gradient(to right, #c2e59c, #64b3f4)",
  "linear-gradient(to right, #a8edea, #fed6e3)",
  "linear-gradient(to right, #ff9a9e, #fecfef)",
  "linear-gradient(to right, #ffe259, #ffa751)",
  "linear-gradient(to right, #b2fefa, #0ed2f7)",
  "linear-gradient(to right, #ffd194, #70e1f5)",
  "linear-gradient(to right, #ff0844, #ffb199)",
  "linear-gradient(to right, #c33764, #1d2671)",
  "linear-gradient(to right, #fd746c, #ff9068)",
  "linear-gradient(to right, #fc5c7d, #6a82fb)",
  "linear-gradient(to right, #ff7e5f, #feb47b)",
  "linear-gradient(to right, #fceabb, #f8b500)",
  "linear-gradient(to right, #00c9ff, #92fe9d)",
  "linear-gradient(to right, #fbc2eb, #a6c1ee)",
  "linear-gradient(to right, #ff758c, #ff7eb3)",
  "linear-gradient(to right, #c79081, #dfa579)",
  "linear-gradient(to right, #8e9eab, #eef2f3)",
  "linear-gradient(to right, #f8ffae, #43e97b)",
  "linear-gradient(to right, #799f0c, #acbb78)",
  "linear-gradient(to right, #a18cd1, #fbc2eb)",
  "linear-gradient(to right, #9796f0, #fbc7d4)",
  "linear-gradient(to right, #abecd6, #fbed96)"
];

export const backgroundColors = [
  "#C3C8D7",
  "#667C89",
  "#ED6337",
  "#FF416C",
  "#FF8900",
  "#FFE400",
  "#A5EA20",
  "#33FFF3",
  "#60F6AD",
  "#46E6D1",
  "#BAE1FF",
  "#4C89F8",
  "#7844E9",
  "#3F2B96",
  "#CD5AEC",
];

export const outlineColors = [
  {
    color: "#C3C8D7",
  },
  {
    color: "#667C89",
  },
  {
    color: "#FF416C",
  },
  {
    color: "#FF8900",
  },
  {
    color: "#FFE400",
  },
  {
    color: "#A5EA20",
  },
  {
    color: "#60F6AD",
  },
  {
    color: "#4C89F8",
  },
  {
    color: "#7844E9",
  },
  {
    color: "#CD5AEC",
  },
];


export const getDomainFromURLForBookmark = (url) => {
    if (url && url.match(NEW_URL_PATTERN)) {
      const urlObj = new URL(url)
      return urlObj.hostname.replace("www.", "")
    }
    return ''
}

export const getDomainFromURLForBookBookmark = (url) => {
    const pattern = new RegExp(
      '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    )
    if (url && pattern.test(url)) {
      const urlObj = new URL(url)
      return urlObj.hostname.replace("www.", "")
    }
    return ''
}

export const PLATFORMS_ICON = [
  {
    id: 1,
    name: "Twitter",
    value: "Twitter",
    icon: (
      <RiTwitterXFill className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 2,
    name: "LinkedIn",
    value: "LinkedIn",
    icon: (
      <RiLinkedinFill className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 3,
    name: "Reddit",
    value: "Reddit",
    icon: <RiRedditLine className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 4,
    name: "Producthunt",
    value: "Producthunt",
    icon: (
      <RiProductHuntLine className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 5,
    name: "Medium",
    value: "Medium",
    icon: <RiMediumLine className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 6,
    name: "Hacker News",
    value: "Hacker News",
    icon: <DiHackernews className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 7,
    name: "Github",
    value: "Github",
    icon: <RiGithubLine className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 8,
    name: "Tiktok",
    value: "Tiktok",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tiktok.svg`}
        className="h-5 w-5 text-white"
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
      <RiInstagramLine className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 10,
    name: "Youtube" || 'YouTube',
    value: "Youtube" || 'YouTube',
    icon: (
      <RiYoutubeLine className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 11,
    name: "Quora",
    value: "Quora",
    icon: <FaQuora className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 12,
    name: "PlayStore",
    value: "PlayStore",
    icon: (
      <IoLogoGooglePlaystore
        className="h-5 w-5 text-white"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 13,
    name: "AppStore",
    value: "AppStore",
    icon: <FaAppStore className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 14,
    name: "G2",
    value: "G2",
    icon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/g2.png`}
        className="h-5 w-5 text-white"
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
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/capterra.png`}
        className="h-5 w-5 text-white"
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
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/trustpilot.png`}
        className="h-5 w-5 text-white"
        aria-hidden="true"
        alt="Trustpilot"
      />
    ),
  },
  {
    id: 17,
    name: "Google",
    value: "Google",
    icon: <BsGoogle className="h-5 w-5 text-white" aria-hidden="true" />,
    
  },
  {
    id: 18,
    name: "ProductHunt",
    value: "ProductHunt",
    icon: (
      <FaProductHunt className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 19,
    name: "AppSumo",
    value: "AppSumo",
    icon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/app_sumo.png`}
        className="h-5 w-5 text-white"
        aria-hidden="true"
        alt="AppSumo"
      />
    ),
  },
  {
    id: 20,
    name: "Goodreads",
    value: "Goodreads",
    icon: <FaGoodreads className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 21,
    name: "TripAdvisor",
    value: "TripAdvisor",
    icon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/tripadvisor.png`}
        className="h-5 w-5 text-white"
        aria-hidden="true"
        alt="TripAdvisor"
      />
    ),
  },
  {
    id: 22,
    name: "Yelp",
    value: "Yelp",
    icon: <FaYelp className="h-5 w-5 text-white" aria-hidden="true" />,

  },
  {
    id: 23,
    name: "Shopify",
    value: "Shopify",
    icon: <FaShopify className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 24,
    name: "Amazon",
    value: "Amazon",
    icon: <FaAmazon className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 25,
    name: "Threads",
    value: "Threads",
    icon: (
      <RiThreadsFill className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 26,
    name: "Facebook",
    value: "Facebook",
    icon: (
      <RiFacebookLine className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 27,
    name: "Snapchat",
    value: "Snapchat",
    icon: (
      <RiSnapchatFill className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  {
    id: 28,
    name: "Gitlab",
    value: "Gitlab",
    icon: <RiGitlabFill className="h-5 w-5 text-white" aria-hidden="true" />,
  },
  {
    id: 29,
    name: "Mastodon",
    value: "Mastodon",
    icon: (
      <RiMastodonFill className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
];

export const PLATFORMS = [
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
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/g2.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="G2"
      />
    ),
    selectOptionIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/g2.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="G2"
      />
    ),
    selectedIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/g2.png`}
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
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/capterra.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Capterra"
      />
    ),
    selectOptionIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/capterra.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Capterra"
      />
    ),
    selectedIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/capterra.png`}
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
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/trustpilot.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Trustpilot"
      />
    ),
    selectOptionIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/trustpilot.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Trustpilot"
      />
    ),
    selectedIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/trustpilot.png`}
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
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/app_sumo.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="AppSumo"
      />
    ),
    selectOptionIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/app_sumo.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="AppSumo"
      />
    ),
    selectedIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/app_sumo.png`}
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
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/tripadvisor.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="TripAdvisor"
      />
    ),
    selectOptionIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/tripadvisor.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="TripAdvisor"
      />
    ),
    selectedIcon: (
      <img
        src={`https://curateit-static-files.s3.amazonaws.com/webapp/tripadvisor.png`}
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
        alt="TripAdvisor"
      />
    ),
  },
  {
    id: 22,
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
    id: 23,
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
    id: 24,
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
  {
    id: 30,
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

export const PROFILE_PLATFORMS_ICON = [
    {
      id: 1,
      name: "Twitter",
      value: "Twitter",
      icon: (
        <RiTwitterXFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 2,
      name: "LinkedIn",
      value: "LinkedIn",
      icon: (
        <RiLinkedinFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 3,
      name: "Reddit",
      value: "Reddit",
      icon: <RiRedditLine className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 4,
      name: "Producthunt",
      value: "Producthunt",
      icon: (
        <RiProductHuntLine className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 5,
      name: "Medium",
      value: "Medium",
      icon: <RiMediumLine className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 6,
      name: "Hacker News",
      value: "Hacker News",
      icon: <DiHackernews className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 7,
      name: "Github",
      value: "Github",
      icon: <RiGithubLine className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 8,
      name: "Tiktok",
      value: "Tiktok",
      icon: (
        <img
          src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/tiktok.svg`}
          className="h-5 w-5 text-white"
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
        <RiInstagramLine className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 10,
      name: "Youtube" || 'YouTube',
      value: "Youtube" || 'YouTube',
      icon: (
        <RiYoutubeLine className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 11,
      name: "Threads",
      value: "Threads",
      icon: (
        <RiThreadsFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 12,
      name: "Facebook",
      value: "Facebook",
      icon: (
        <RiFacebookLine className="h-5 w-5 text-white" aria-hidden="true" />
      )
    },
    {
      id: 13,
      name: "Twitch",
      value: "Twitch",
      icon: <RiTwitchFill className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 14,
      name: "Substack",
      value: "Substack",
      icon: <SiSubstack className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 15,
      name: "Pinterest",
      value: "Pinterest",
      icon: (
        <RiPinterestFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 16,
      name: "Discord",
      value: "Discord",
      icon: (
        <RiDiscordFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 17,
      name: "Whatsapp",
      value: "Whatsapp",
      icon: (
        <RiWhatsappFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 18,
      name: "Telegram",
      value: "Telegram",
      icon: (
        <RiTelegramFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 19,
      name: "Steam",
      value: "Steam",
      icon: <RiSteamFill className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 20,
      name: "Tumblr",
      value: "Tumblr",
      icon: <RiTumblrFill className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 21,
      name: "Gitlab",
      value: "Gitlab",
      icon: <RiGitlabFill className="h-5 w-5 text-white" aria-hidden="true" />,
    },
    {
      id: 22,
      name: "Goodreads",
      value: "Goodreads",
      icon: (
        <PiGoodreadsLogoFill className="h-5 w-5 text-white" aria-hidden="true"/>
      ),
    },
    {
      id: 23,
      name: "Mastodon",
      value: "Mastodon",
      icon: (
        <RiMastodonFill className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    {
      id: 24,
      name: "Imdb",
      value: "Imdb",
      icon: (
        <SiImdb className="h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
    ]

export function normalizeUrl(inputUrl) {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
        inputUrl = 'https://' + inputUrl;
    }
    const parsedUrl = new URL(inputUrl);
    
    parsedUrl.protocol = 'https:';
    
    parsedUrl.hostname = parsedUrl.hostname.replace('www.', '');
    return parsedUrl.toString();
}

export const platformsArray = [
  'Twitter', 'LinkedIn', 'Reddit', 'Producthunt', 'Medium', 'Hacker News',
  'Github', 'Tiktok', 'Instagram', 'Youtube', 'Threads', 'Facebook',
  'Twitch', 'Substack', 'Pinterest', 'Discord', 'Whatsapp', 'Telegram',
  'Steam', 'Tumblr', 'Gitlab', 'Goodreads', 'Mastodon', 'Quora', 'PlayStore',
  'G2', 'Capterra', 'Trustpilot', 'Google', 'AppSumo', 'TripAdvisor', 'Yelp',
  'Shopify', 'Snapchat', 'Amazon', 'AppStore'
];


export function getPlatformFromURL(url) {
  const normalizedUrl = url.toLowerCase();
  const foundPlatform = platformsArray.find(platform => normalizedUrl.includes(platform.toLowerCase()));

  return foundPlatform || 'Twitter';
}

export const MediaTypesInfoButton = ['Book','Movie','SocialFeed','Profile','Ai Prompt','Text Expander','Screenshot','Image','App','Code','PDF','Link']

export const TESTIMONIAL_PLATFORMS_ICON = [
  {
    id: 0,
    name: "Globe",
    value: "Globe",
    icon: (
      <GlobeAltIcon className="h-5 w-5 text-white" aria-hidden="true" />
    ),
  },
  ...PLATFORMS_ICON,
  {
    id: 30,
    name: "Curateit",
    value: "Curateit",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
        className="h-5 w-5 text-white"
        aria-hidden="true"
        alt="Curateit"
      />
    ),
  },
];

export const TESTIMONIAL_PLATFORMS = [
  {
    id: 0,
    name: "Globe",
    value: "Globe",
    icon: (
      <GlobeAltIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectOptionIcon: (
      <GlobeAltIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
    ),
    selectedIcon: (
      <GlobeAltIcon
        className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
    ),
  },
 ...PLATFORMS,
  {
    id: 30,
    name: "Curateit",
    value: "Curateit",
    icon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Curateit"
      />
    ),
    selectOptionIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Curateit"
      />
    ),
    selectedIcon: (
      <img
        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo192.png`}
        className="h-4 w-4 text-gray-500"
        aria-hidden="true"
        alt="Curateit"
      />
    ),
  },
];

export const ONBOARDING_ROLES = [
  "Student (Education)",
  "Professional",
  "Productivity Enthusiast",
  "Content Curator",
  "Influencer / Content Creator",
  "Sales",
  "Marketing",
  "Customer Service",
  "Freelancer",
  "Agency",
  "Startup",
  "SEO Manager",
  "Other"
]

export const ONBOARDING_DISCOVER_CATEGORIES = [
  "LinkedIn",
  "Google",
  "Facebook",
  "Twitter",
  "Reddit",
  "Newsletter",
  "Blog post",
  "YouTube",
  "Podcast",
  "Recommendation (friend, co-worker, communitiy)",
  "Other"
]

export const MEDIUM_REGEX = /resize:fill:\d+:\d+/gi
export const MEDIUM_REPLACEMENT_STR = "resize:fit:2400"

export const IMPORT_FILE_TYPE = ["HTML",'CSV','TXT']

export const download_options_browsers = [
  {
    name: "Google",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/chrome-logo.png`,
  },
  {
    name: "Microsoft Edge",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/edge-logo.png`,
    url: "https://microsoftedge.microsoft.com/addons/detail/curateit-ai-bookmark-ma/gdjgbhcijenmgmaagejhofijihdfjjob",
  },
  {
    name: "Opera",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/opera-logo.png`,
  },
  {
    name: "Avanta",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/avanta-logo.png`,
  },
  {
    name: "Brave",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/brave-logo.png`,
  },
  {
    name: "Vivaldi",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/vivaldi-logo.png`,
  },
  {
    name: "Falkon",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/falkon-logo.png`,
  },
  {
    name: "Yandex",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/yandex-logo.png`,
  },
  {
    name: "Cliqz",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/cliqz-logo.png`,
  },
  {
    name: "Epic privacy",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/epic-privacy-logo.png`,
  },
  {
    name: "Firefox",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/firefox-logo.png`,
    comingSoon: true,
  },
  {
    name: "Safari",
    imgSrc: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/safari-logo.png`,
    comingSoon: true,
  },
];