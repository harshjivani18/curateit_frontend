import { 
    useEffect, 
    useState 
}                            from "react"
import { FaGlobeAmericas }   from "react-icons/fa"
import { IoLogoTiktok }      from "react-icons/io5"
import { useDispatch }       from "react-redux"
import { 
    RiFacebookCircleFill, 
    RiTwitterXFill, 
    RiLinkedinBoxFill, 
    RiInstagramLine, 
    RiGithubFill, 
    RiYoutubeFill, 
    RiMediumFill, 
    RiProductHuntFill 
}                            from "react-icons/ri"
import { SiSubstack }        from "react-icons/si"

import { 
    getOtherUserDetails 
}                            from "@actions/user"
import { Avatar } from "antd"
import Image from "next/image"

const BlogAuthor = ({ bookmark, authorId, isMobile }) => {
    const dispatch              = useDispatch()
    const [author, setAuthor]   = useState(bookmark?.author?.data?.attributes)

    useEffect(() => {
        if (authorId) {
            dispatch(getOtherUserDetails(authorId)).then((res) => {
                if (res?.payload?.data?.userDetails) {
                    const { userDetails } = res?.payload?.data
                    setAuthor({
                        id: userDetails.id,
                        username: userDetails.userName,
                        firstname: userDetails.firstName,
                        lastname: userDetails.lastName,
                        profilePhoto: userDetails.profilePhoto,
                        about: userDetails.about,
                        socialLinks: userDetails.socialLinks
                    })
                }
            })
        }
    }, [])
    
    const renderSocialLinks = (socialLinks) => {
        if (!socialLinks) return null
        return Object.keys(socialLinks).map((key, index) => {
            switch(key) {
                case "facebook":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiFacebookCircleFill className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "twitter":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiTwitterXFill className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "linkedin":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiLinkedinBoxFill className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "instagram":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiInstagramLine className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "github":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiGithubFill className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "youtube":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiYoutubeFill className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "tiktok":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <IoLogoTiktok className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "medium":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiMediumFill className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "producthunt":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                                <RiProductHuntFill className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                case "substack":
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                            <SiSubstack className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
                default:
                    return <a target='_blank' rel="noreferrer" href={socialLinks[key].username}>
                            <FaGlobeAmericas className="h-5 w-5 text-blue-500 ml-2" />
                           </a>
            }
        })
    }

    const a = author
    return (
      <div
        className={`flex justify-between items-center ${
          isMobile ? "flex-col" : "flex-row"
        } shadow-md md:shadow-lg ct-owner-container`}
      >
        {a?.profilePhoto ? (
          <div className={`${isMobile ? "mt-1" : "mx-auto"}`}>
            <Avatar
              icon={
                <Image
                  src={a?.profilePhoto}
                  alt={a.firstName || "Curateit"}
                  priority={true}
                  style={{
                    maxWidth: "100%",
                  }}
                />
              }
              className="cursor-pointer flex flex-col justify-center gap-y-2 items-center bg-white shadow-xl h-20 w-20 md:h-28 md:w-28 border-4 border-white"
            />
          </div>
        ) : (
          <div className={`${isMobile ? "mt-1" : "mx-auto"}`}>
            <Avatar
              size={100}
              style={{
                color: "white",
                backgroundColor: "#347ae2",
                fontSize: "24px",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {a.firstname && a.lastname
                ? `${a.firstname?.charAt(0)} ${a.lastname?.charAt(0)}`
                : a.username?.charAt(0)}
            </Avatar>
          </div>
        )}
        <div
          className="flex ct-blog-owner-details"
          style={{ width: isMobile ? "fit-content" : "425px" }}
        >
          <span className="ct-blog-owner-label">Written By</span>
          <h3 className="ct-owner-name">
            {a.firstname && a.lastname
              ? `${a.firstname} ${a.lastname}`
              : a.username}
          </h3>
          <div
            className="ct-owner-description"
            dangerouslySetInnerHTML={{ __html: a.about }}
          />
          <div className="flex justify-start flex-row items-center mt-5">
            {renderSocialLinks(a.socialLinks)}
          </div>
        </div>
      </div>
    );
}

export default BlogAuthor