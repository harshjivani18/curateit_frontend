"use client"
import { RiTimeLine }                   from 'react-icons/ri';
import { MdOutlineLeaderboard }         from 'react-icons/md';
import { Tooltip }                      from "antd";
import {  
    MagnifyingGlassIcon, 
    RectangleGroupIcon }                from '@heroicons/react/24/outline';
import { UserCircleIcon }               from '@heroicons/react/20/solid';
import session                          from './session'; 
         
export const MainSidebarData = [
    {
      name: "Search",
      shortName: "search",
    },
    {
      name: "All",
      shortName: "all",
    },
    {
      name: "Profile",
      shortName: "profile",
    },
    {
      name: "Activity",
      shortName: "activity",
    },
    {
      name: "Leader Board",
      shortName: "leader-board",
    },
]

export const generateMenuUi = (item, callbacks, menuClickedName) => {
    const itemName = item?.name?.toLowerCase();
    if (itemName === 'search') {
        return (
            <Tooltip title={item.name} placement="right">
                <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer hover:bg-[#e6f7ff]`}
                onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
                >
                <MagnifyingGlassIcon className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
                </div>
            </Tooltip>
        )
    }
    if (itemName === 'all') {
        return (
            <Tooltip title={item.name} placement="right">
                <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
                onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
                >
                <RectangleGroupIcon className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
                </div>
            </Tooltip>
        )
    }
    if (itemName === 'leader board') {
        return (
            <Tooltip title={item.name} placement="right">
                <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
                onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
                >
                <MdOutlineLeaderboard className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
                </div>
            </Tooltip>
        )
    }
    if (itemName === 'activity') {
        return (
            <Tooltip title={item.name} placement="right">
                <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
                onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
                >
                <RiTimeLine className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
                </div>
            </Tooltip>
        )
    }
    if (itemName === 'profile') {
        return (
            <Tooltip title={item.name} placement="right">
                <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
                onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
                >
                {session?.userProfileImage && session?.userProfileImage !== "null" ? (
                    <img className="object-cover h-5 w-5 cursor-pointer rounded-full" src={session?.userProfileImage} alt={session?.username} />
                ): (
                    <UserCircleIcon className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
                )}
                </div>
            </Tooltip>
        )
    }
}

export const generateMainSidebarTreeData = (menuList, callbacks, menuClickedName) => {
    const arr = [];

    menuList?.forEach((item, i) => {
        const obj = {
        title: generateMenuUi(item, callbacks, menuClickedName),
        key: i,
        label: item
        }
        arr.push(obj)
    });

    return arr;
}