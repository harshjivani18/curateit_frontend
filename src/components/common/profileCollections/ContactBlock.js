import { PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Avatar } from "antd";
import { MdOutlineMail } from "react-icons/md";

const ContactBlock = ({item}) => {
    
    if(item?.media_type === 'Profile' && item?.media?.type === 'subscriber'){
        const profilePic = item?.media?.subscriber?.profilePic
        const firstName = item?.media?.subscriber?.firstName
        const lastName = item?.media?.subscriber?.lastName
        const email = item?.media?.subscriber?.email
        const phoneNumber = item?.media?.subscriber?.phoneNumber

        const avatarName = firstName?.charAt(0).toUpperCase() || lastName?.charAt(0).toUpperCase() || email?.split('@')[0]?.charAt(0).toUpperCase()

    return(
        <div className='rounded-[8px] px-3 pb-1 pt-3 border border-1 border-[#DFE4EC] relative cursor-pointer hover:shadow-xl shadow-gray-700 my-2'>
            <div className='flex flex-col items-center justify-center'>
                        {
                        profilePic ?   
                        <Avatar
                            icon={<img src={profilePic || `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`} alt={firstName || 'Curateit user'} />}
                            className="cursor-pointer"
                            size={60}
                        />
                        :
                        <Avatar size={60} className="cursor-pointer" style={{
                        color: 'white',
                        backgroundColor: '#347ae2',
                    }}>
                            {avatarName}
                        </Avatar>
                        }

                        <div>
                            {(firstName || lastName) && 
                            <div className="flex items-center my-1">
                                <UserCircleIcon className="h-4 w-4 mr-1"/>
                                <div className="text-base">{firstName} {lastName}</div>
                            </div>
                            }

                            {
                            email && <div className="flex items-center my-1">
                                <MdOutlineMail  className="h-4 w-4 mr-1"/>
                                <div className="text-base">{email}</div>
                            </div>
                            }

                            {
                            phoneNumber && <div className="flex items-center my-1">
                                <PhoneIcon className="h-4 w-4 mr-1"/>
                                <div className="text-base">{phoneNumber}</div>
                            </div>
                            }
                        </div>
            </div>
        </div>
    )
    }
    
}

export default ContactBlock;