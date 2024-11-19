"use client"
import { AiOutlineTag }             from 'react-icons/ai';
import { RiTimeLine }               from 'react-icons/ri';
import { BiGhost }                  from 'react-icons/bi';
import { MdOutlineLeaderboard }     from 'react-icons/md';
import { HiOutlineDuplicate }       from 'react-icons/hi';
import { Tooltip }                  from "antd";
import { AdjustmentsHorizontalIcon, 
         FolderOpenIcon, 
         MagnifyingGlassIcon, 
         RectangleGroupIcon }       from '@heroicons/react/24/outline';
import { UserCircleIcon }           from '@heroicons/react/20/solid';
import session                      from './session';

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
  if (itemName === 'all bookmarks') {
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
  if (itemName === 'filter') {
    return (
      <Tooltip title={item.name} placement="right">
        <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
          onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
        >
          <AdjustmentsHorizontalIcon className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
        </div>
      </Tooltip>
    )
  }
  if (itemName === 'tag') {
    return (
      <Tooltip title={item.name} placement="right">
        <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
          onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
        >
          <AiOutlineTag className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
        </div>
      </Tooltip>
    )
  }
  if (itemName === 'collection') {
    return (
      <Tooltip title={item.name} placement="right">
        <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
          onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
        >
          <FolderOpenIcon className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
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
  if (itemName === 'broken links') {
    return (
      <Tooltip title={item.name} placement="right">
        <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
          onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
        >
          <BiGhost className={`h-5 w-5 cursor-pointer text-red-400`} />
        </div>
      </Tooltip>
    )
  }
  if (itemName === 'duplicate links') {
    return (
      <Tooltip title={item.name} placement="right">
        <div className={`${menuClickedName === item.shortName ? 'bg-[#e6f7ff]' : ''} mb-4 p-2 cursor-pointer`}
          onClick={() => callbacks.handleChangeMenuClickName(item.shortName)}
        >
          <HiOutlineDuplicate className={`h-5 w-5 cursor-pointer  ${menuClickedName === item.shortName ? 'text-[#1890ff]' : 'text-black'}`} />
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

export const generateMenuTreeData = (menuList, callbacks, menuClickedName) => {
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