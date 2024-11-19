import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import { Avatar } from 'antd';

const UserBox = ({ user, userFollowers,gemPublicView=false, className="" }) => {
  const navigate = useRouter();

  return (
    <div className='flex justify-start items-center cursor-pointer gap-1 group' onClick={() => {
      navigate.push(`/u/${user?.attributes?.username}`)
      }}>
      <Avatar
        icon={user?.attributes?.profilePhoto ? <img src={user?.attributes?.profilePhoto} alt={user?.attributes?.username || "Curateit user"} /> : <UserCircleIcon />}
        className="cursor-pointer"
      />
      <div>
        <h3 className={`font-semibold m-0 leading-5 group-hover:underline group-hover:text-[#347AE2] ${className}`}>{user?.attributes?.firstname}</h3>
        {/* <h5 className='text=xs m-0 leading-3'>{userFollowers.length > 0 ? `${userFollowers.length} followers` : null}</h5> */}
      </div>
    </div>
  )
}

export default UserBox