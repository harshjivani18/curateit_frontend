import { useEffect }                from "react";
import { useDispatch }              from "react-redux";
import slugify                      from "slugify";
import { message }                  from "antd";
import { 
  useParams, 
  usePathname, 
  useRouter 
}                                   from "next/navigation";
import axios                        from "axios";

import session                      from "@utils/session";

import { setUserInformation,
         setSocialLoginDetails,
         setSocialLoginLoader,}     from "@actions/membership";
import { 
  openAuthModal, 
  setIsMobileSidebar 
}                                   from "@actions/app";
import { 
  checkCollectionExpiration, 
  checkCollectionViaLink, 
  configCollections, 
  updateUnRegisteredUser 
}                                   from "@actions/collection";
import { 
  checkTagExpiration, 
  checkTagViaLink, 
  getSharedTags, 
  updateUnRegisteredUserTag 
}                                   from "@actions/tags";


const SocialLoginOptions = ({redirectUrl='',page='',inviteId='',collectionId='',email='',isNew='',tokenId='',tagId='', extraInfo=null, onSocialReferralComplete=null}) => {
  const router            = useRouter();
  const dispatch          = useDispatch();
  const STATIC_IMAGES_CDN = process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN; 
  const API_URL           = process.env.NEXT_PUBLIC_API_URL;

  const searchParams = useParams();
  const searchPathname = usePathname();
  const uname = searchParams?.username;
  const module = searchPathname?.includes("/g/") ? "gems" : searchPathname?.includes("/tags/") ? "tags" : searchPathname?.includes("/c/") ? "collections" : null;
  const sourceId = searchParams?.gemId || searchParams?.colllectionId || searchParams?.tagId || searchParams?.id;
  const slug = searchParams?.name;

  // const searchParams = window.location.pathname.split("/");
  // const uname = searchParams[2];
  // const module = searchParams[3] === "tags" ? "tags" : searchParams[3] === "c" ? "collections" : searchParams[3] === "g" ? "gems" : null;
  // const sourceId = searchParams[4];
  // const slug = searchParams[5];

  useEffect(() => {
    const onMessageReceived = (e) => {
      if (!e.data || e?.data?.includes('MENU')) return;
      if (e.data && !e.data.startsWith("?")) {
        const obj         = JSON.parse(e.data)
        const uDetails    = obj.userDetails ? JSON.parse(obj.userDetails) : {}
        if (obj.isSignedIn) {
          const user  = uDetails.user
          const token = uDetails.jwt
          dispatch(setSocialLoginLoader(true))
          axios.post('/api/cookies', { messages: token, userId: user.id, userName: user.username }).then((res) => {
            dispatch(setSocialLoginDetails(uDetails))
              if (user.isNewlyCreated) {
                  onSocialReferralComplete && onSocialReferralComplete()
                  dispatch(setUserInformation()).then((userRes) => {
                      if (userRes.error === undefined) {
                        if (extraInfo?.onRegistrationComplete) {
                          extraInfo?.onRegistrationComplete()
                          return
                        }
                        if(!page){
                          router.push(`/onboarding`);
                        } else if(page === 'collection-public' || page === 'single-gem-public'){
                          dispatch(openAuthModal({
                              open: false,
                              action: 'sociallogin',
                              extraInfo: {
                                trigger: 'reply',
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug
                              }
                          }))
                        } else if (page === 'collection-link'){
                          dispatch(checkCollectionViaLink(inviteId,collectionId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              // dispatch(getSharedCollections())
                              const cObj = res?.payload?.data?.data?.[0]
                              const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/c/${cObj?.id}/${slug}`)
                          }else{
                              message.error(res.payload.data.msg)
                              session.clear();
                          }
                          })
                        }else if(page === 'collection-mail'){
                          dispatch(checkCollectionExpiration(email,collectionId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              // dispatch(getSharedCollections())
                              const cObj = res?.payload?.data?.data?.[0]
                              const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/c/${cObj?.id}/${slug}`)
                              isNew && dispatch(updateUnRegisteredUser(tokenId,collectionId))
                          }else{
                            message.error(res?.payload?.data?.msg || 'Collection shared is expired. Please contact the owner')
                            session.clear();
                          }
                          })
                        }else if (page === 'tag-link'){
                          dispatch(checkTagViaLink(inviteId,tagId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              dispatch(getSharedTags())
                              const tObj = res?.payload?.data?.data?.[0]
                              const slug = tObj?.slug || slugify(tObj?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/tags/${tObj?.id}/${slug}`)
                          }else{
                              message.error(res.payload.data.msg)
                              session.clear();
                          }
                          })
                        } else if(page === 'tag-mail'){
                          dispatch(checkTagExpiration(email,tagId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              dispatch(getSharedTags())
                              const tObj = res?.payload?.data?.data?.[0]
                              const slug = tObj?.slug || slugify(tObj?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/tags/${tObj?.id}/${slug}`)
                              isNew && dispatch(updateUnRegisteredUserTag(tokenId,tagId))
                          }else{
                            message.error(res.payload.data.msg || 'Tag shared is expired. Please contact the owner')
                            session.clear();
                          }
                          })
                        }else{
                          router.push(`/onboarding`);
                        }
                      }
                  })
                  dispatch(configCollections())
                  dispatch(setIsMobileSidebar(true))
              }
              else {
                if(!page){
                          router.push(`/u/${user.username}/all-bookmarks`)
                } else if(page === 'collection-public' || page === 'single-gem-public'){
                          dispatch(openAuthModal({
                              open: false,
                              action: 'login',
                              extraInfo: {
                                trigger: 'sociallogin',
                                username: uname,
                                id: sourceId,
                                module: module,
                                slug: slug
                              }
                          }))
                } else if (page === 'collection-link'){
                          dispatch(checkCollectionViaLink(inviteId,collectionId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              // dispatch(getSharedCollections())
                              const cObj = res?.payload?.data?.data?.[0]
                              const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/c/${cObj?.id}/${slug}`)
                          }else{
                              message.error(res.payload.data.msg)
                              session.clear();
                          }
                          })
                }else if(page === 'collection-mail'){
                          dispatch(checkCollectionExpiration(email,collectionId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              // dispatch(getSharedCollections())
                              const cObj = res?.payload?.data?.data?.[0]
                              const slug = cObj?.slug || slugify(cObj?.name || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/c/${cObj?.id}/${slug}`)
                              isNew && dispatch(updateUnRegisteredUser(tokenId,collectionId))
                          }else{
                            message.error(res?.payload?.data?.msg || 'Collection shared is expired. Please contact the owner')
                            session.clear();
                          }
                          })
                }else if (page === 'tag-link'){
                          dispatch(checkTagViaLink(inviteId,tagId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              dispatch(getSharedTags())
                              const tObj = res?.payload?.data?.data?.[0]
                              const slug = tObj?.slug || slugify(tObj?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/tags/${tObj?.id}/${slug}`)
                          }else{
                              message.error(res?.payload?.data?.msg || 'You are not allowed to open this tag')
                              session.clear();
                          }
                          })
                } else if(page === 'tag-mail'){
                          dispatch(checkTagExpiration(email,tagId)).then((res) => {
                            if(res.error === undefined && res.payload.data.status === 200){
                              dispatch(getSharedTags())
                              const tObj = res?.payload?.data?.data?.[0]
                              const slug = tObj?.slug || slugify(tObj?.tag || "", { lower: true, remove: /[&,+()$~%.'":*?<>{}/\/]/g })
                              router.push(`/u/${user.username}/tags/${tObj?.id}/${slug}`)
                              isNew && dispatch(updateUnRegisteredUserTag(tokenId,tagId))
                          }else{
                            message.error(res?.payload?.data?.msg || 'Tag shared is expired. Please contact the owner')
                            session.clear();
                          }
                          })
                }else{
                          router.push(`/u/${user.username}/all-bookmarks`)
                }
                dispatch(configCollections())

              }
          })
        }
        else {
          router.push("/sign-in")
        }
      }
    }
    window.addEventListener("message", onMessageReceived, false)
    return () => {
      window.removeEventListener("message", onMessageReceived, false)
    }
  }, [])

  const onLogin = (e, url) => {
    window.open(url, window.location.href, "width=600,height=600,modal=yes")
  }

  return (
    <div className="flex justify-evenly py-4" id="social-container">
      <button onClick={(e) => onLogin(e, `${API_URL}/api/connect/google`)}>
        <div className="h-[48px] w-[48px] bg-white flex justify-center [align-items:center] rounded-xl hover:border-2 hover:border-blue-300">
          <img
            className="h-[21px]"
            src={`${STATIC_IMAGES_CDN}/webapp/icons/google.png`}
            alt="google"
          />
        </div>
      </button>
      <button onClick={(e) => onLogin(e, `${API_URL}/api/connect/linkedin`)}>
        <div className="h-[48px] w-[48px] bg-white flex justify-center [align-items:center] rounded-xl hover:border-2 hover:border-blue-300">
          <img
            className="h-[21px]"
            src={`${STATIC_IMAGES_CDN}/webapp/icons/linkedin.png`}
            alt="linkedin"
          />
        </div>
      </button>
      <button onClick={(e) => onLogin(e, `${API_URL}/api/connect/twitter`)}>
        <div className="h-[48px] w-[48px] bg-white flex justify-center [align-items:center] rounded-xl hover:border-2 hover:border-blue-300">
          <img
            className="h-[21px]"
            src={`${STATIC_IMAGES_CDN}/webapp/icons/twitter.png`}
            alt="twitter"
          />
        </div>
      </button>
    </div>
  )
}

export default SocialLoginOptions