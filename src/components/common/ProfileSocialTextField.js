import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { rendeProfilePlatfromLogo } from "@utils/commonFunctions";
import { Input } from "antd";

const ProfileSocialTextField = ({platform='',socialUserName,setSocialUsername,}) => {

    return(
        <>
        <div className="flex items-center">
            {rendeProfilePlatfromLogo(platform,socialUserName)}

            {
            (platform === 'Twitter' || platform === 'Pinterest' || platform === 'Producthunt' || platform === 'Facebook' || platform === 'Instagram' || platform === 'Tiktok' || platform === 'Github' || platform === 'YouTube' || platform === 'Substack' || platform === 'Twitch' || platform === 'Reddit' || platform === 'Threads' || platform === 'Discord' || platform === 'Whatsapp' || platform === 'Tumblr' || platform === 'Gitlab') && 
            <Input
                prefix={<AtSymbolIcon className="h-4 w-4 text-gray-400"/>}
                className="ml-2 rounded-lg"
                placeholder={`${(platform === 'YouTube' || platform === 'Discord') ? 'channel' : (platform === 'Whatsapp' || platform === 'Telegram') ? 'mobile number' : 'username'}`}
                size="large"
                value={socialUserName}
                onChange={(e) => setSocialUsername(e.target.value)}
            />
            }
            
            {
            (platform === 'Medium' || platform === 'LinkedIn' || platform === 'Goodreads' || platform === 'Mastodon' || platform === 'Steam' || platform === 'Telegram') && 
            <Input
                className="ml-2 rounded-lg"
                placeholder={`Enter ${platform} profile url`}
                size="large"
                value={socialUserName}
                onChange={(e) => setSocialUsername(e.target.value)}
            />
            }
        </div>
        </>
    )
}

export default ProfileSocialTextField;