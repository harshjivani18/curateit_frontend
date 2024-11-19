
import { FaGoodreads } from 'react-icons/fa'
import { IoLogoTiktok } from 'react-icons/io5'
import {
  RiFacebookCircleFill,
  RiGithubFill,
  RiYoutubeFill,
  RiLinkedinBoxFill,
  RiInstagramFill,
  RiTwitterXFill,
  RiMediumFill,
  RiProductHuntFill,
  RiTwitchFill,
  RiPinterestFill,
  RiThreadsFill,
  RiRedditFill,
  RiDiscordFill,
  RiWhatsappFill,
  RiTelegramFill,
  RiGitlabFill,
  RiSteamFill,
  RiTumblrFill,
  RiMastodonFill
} from "react-icons/ri"
import { SiSubstack } from 'react-icons/si'

const ProfileSocial = ({ socialHandles }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 text-[#347AE2] mt-6 w-full">
      {socialHandles?.facebook && socialHandles?.facebook?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.facebook?.url ? socialHandles?.facebook?.url : `https://facebook.com/${socialHandles?.facebook?.username || socialHandles?.facebook}`}>
        <RiFacebookCircleFill className="h-6 w-6" />
      </a>}
      {socialHandles?.twitter && socialHandles?.twitter?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.twitter?.url ? socialHandles?.twitter?.url : `https://twitter.com/${socialHandles?.twitter?.username || socialHandles.twitter}`}>
        <RiTwitterXFill className="h-6 w-6" />
      </a>}
      {socialHandles?.linkedin && socialHandles?.linkedin?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.linkedin?.username}>
        <RiLinkedinBoxFill className="h-6 w-6" />
      </a>} 
      {socialHandles?.instagram && socialHandles?.instagram?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.instagram?.url ? socialHandles?.instagram?.url : `https://www.instagram.com/${socialHandles?.instagram?.username || socialHandles?.instagram}`}>
        <RiInstagramFill className="h-6 w-6" />
      </a>}
      {socialHandles?.github && socialHandles?.github?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.github?.url ? socialHandles?.github?.url : `https://github.com/${socialHandles?.github?.username || socialHandles?.github}`}>
        <RiGithubFill className="h-6 w-6" />
      </a>}
      {socialHandles?.youtube && socialHandles?.youtube?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.youtube?.url ? socialHandles?.youtube?.url : `https://www.youtube.com/@${socialHandles?.youtube?.username || socialHandles.youtube}`}>
        <RiYoutubeFill className="h-6 w-6" />
      </a>}
      {socialHandles?.tiktok && socialHandles?.tiktok?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.tiktok?.url ? socialHandles?.tiktok?.url : `https://www.tiktok.com/@${socialHandles?.tiktok?.username || socialHandles.tiktok}`}>
        <IoLogoTiktok className="h-6 w-6" />
      </a>}
      {socialHandles?.medium && socialHandles?.medium?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.medium?.username}>
        <RiMediumFill className="h-6 w-6" />
      </a>}
      {socialHandles?.producthunt && socialHandles?.producthunt?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.producthunt?.url ? socialHandles?.producthunt?.url : `https://www.producthunt.com/@${socialHandles?.producthunt?.username || socialHandles?.producthunt}`}>
        <RiProductHuntFill className="h-6 w-6" />
      </a>}
      {socialHandles?.substack && socialHandles?.substack?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.substack?.url ? socialHandles?.substack?.url : `https://substack.com/@${socialHandles?.substack?.username || socialHandles?.substack}`}>
        <SiSubstack className="h-6 w-6" />
      </a>}
      {socialHandles?.pinterest && socialHandles?.pinterest?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.pinterest?.url ? socialHandles?.pinterest?.url : `https://pinterest.com/${socialHandles?.pinterest?.username || socialHandles?.pinterest}`}>
        <RiPinterestFill className="h-6 w-6" />
      </a>}
      {socialHandles?.twitch && socialHandles?.twitch?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.twitch?.url ? socialHandles?.twitch?.url : `https://twitch.tv/${socialHandles?.twitch?.username || socialHandles?.twitch}`}>
        <RiTwitchFill className="h-6 w-6" />
      </a>}
      {socialHandles?.threads && socialHandles?.threads?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.threads?.url ? socialHandles?.threads?.url : `https://threads.net/${socialHandles?.threads?.username || socialHandles?.threads}`}>
        <RiThreadsFill className="h-6 w-6" />
      </a>}
      {socialHandles?.reddit && socialHandles?.reddit?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.reddit?.url ? socialHandles?.reddit?.url : `https://www.reddit.com/user/${socialHandles?.reddit?.username || socialHandles?.reddit}`}>
        <RiRedditFill className="h-6 w-6" />
      </a>}
      {socialHandles?.discord && socialHandles?.discord?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.discord?.url ? socialHandles?.discord?.url : `https://discord.com/invite/${socialHandles?.discord?.username || socialHandles?.discord}`}>
        <RiDiscordFill className="h-6 w-6" />
      </a>}
      {socialHandles?.whatsapp && socialHandles?.whatsapp?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.whatsapp?.url ? socialHandles?.whatsapp?.url : `https://wa.me/${socialHandles?.whatsapp?.username || socialHandles?.whatsapp}`}>
        <RiWhatsappFill className="h-6 w-6" />
      </a>}
      {socialHandles?.telegram && socialHandles?.telegram?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.telegram?.username}>
        <RiTelegramFill className="h-6 w-6" />
      </a>}
      {socialHandles?.gitlab && socialHandles?.gitlab?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.gitlab?.url ? socialHandles?.gitlab?.url : `https://gitlab.com/${socialHandles?.gitlab?.username || socialHandles?.gitlab}`}>
        <RiGitlabFill className="h-6 w-6" />
      </a>}
      {socialHandles?.tumblr && socialHandles?.tumblr?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.tumblr?.url ? socialHandles?.tumblr?.url : `https://${socialHandles?.tumblr?.username}.tumblr.com/`}>
        <RiTumblrFill className="h-6 w-6" />
      </a>}
      {socialHandles?.steam && socialHandles?.steam?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.steam?.username}>
        <RiSteamFill className="h-6 w-6" />
      </a>}
      {socialHandles?.mastodon && socialHandles?.mastodon?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.mastodon?.username}>
        <RiMastodonFill className="h-6 w-6" />
      </a>}
      {socialHandles?.goodreads && socialHandles?.goodreads?.username !== "" && <a target='_blank' rel="noreferrer" href={socialHandles?.goodreads?.username}>
        <FaGoodreads className="h-6 w-6" />
      </a>}
    </div>
  )
}

export default ProfileSocial