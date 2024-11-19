'use client'

import { Menu, Transition } from '@headlessui/react'
import { useState } from 'react'

import { PiWindowsLogo, PiAppleLogo, PiLinuxLogo, PiCaretDown } from 'react-icons/pi'

const osList = ['win', 'mac', 'linux']

const SystemDropdown = (dropdown) => {

    const [os, setOs] = useState(osList[0])

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };

    const renderOptions = (operatingSystem) => {

        switch (operatingSystem) {

            case 'win':
                return (
                    <div className='flex flex-row items-center justify-start gap-3 text-[18px]'>
                        <PiWindowsLogo className='text-[18px] md:text-[22px]' />
                        <p className='text-[16px] md:text-[22px]'>
                            {dropdown?.[0]?.title}
                        </p>
                    </div>
                )

            case 'mac':
                return (
                    <div className='flex flex-row items-center justify-start gap-3 text-[18px]'>
                        <PiAppleLogo className='text-[18px] md:text-[22px]' />
                        <p className='text-[16px] md:text-[22px]'>
                            {dropdown?.[1]?.title}
                        </p>
                    </div>
                )

            case 'linux':
                return (
                    <div className='flex flex-row items-center justify-start gap-3 text-[18px]'>
                        <PiLinuxLogo className='text-[18px] md:text-[22px]' />
                        <p className='text-[16px] md:text-[22px]'>
                            {dropdown?.[2]?.title}
                        </p>
                    </div>
                )

            default:
                return '`'
        }

    }

    const getDownloadLink = () => {

        switch (os) {

            case 'win':
                return (dropdown?.[0]?.href)

            case 'mac':
                return (dropdown?.[2]?.href)

            case 'linux':
                return (dropdown?.[2]?.href)

            default:
                return '#'
        }

    }

    return (
        <div className='flex flex-col items-center md:flex-row md:items-stretch gap-4 w-full'>
            <Menu as='div' className='relative inline-block text-left w-full'>
                <div>
                    <Menu.Button
                        // className='inline-flex items-center w-full justify-center gap-x-1.5 rounded-[8px] bg-white px-4 py-[10px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        className='w-full md:min-w-[335px] rounded-[8px] border-[0.4px] border-[#ABB7C9] px-4 py-[10px] flex flex-row items-center justify-between'
                    >
                        <p
                            className='tracking-tight text-[#4B4F5D] text-center'
                        >
                            {renderOptions(os)}
                        </p>
                        <PiCaretDown className=' text-[#4B4F5D] text-[20px]' aria-hidden='true' />
                    </Menu.Button>
                </div>

                <Transition
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  w-full'>
                        <div className='py-1 gap-5'>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => setOs(osList[0])}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-4 text-sm cursor-pointer'
                                        )}
                                    >
                                        {renderOptions('win')}
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => setOs(osList[1])}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-4 text-sm cursor-pointer'
                                        )}
                                    >
                                        {renderOptions('mac')}
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => setOs(osList[2])}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-4 text-sm cursor-pointer'
                                        )}
                                    >
                                        {renderOptions('linux')}
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>

            <a 
                href={getDownloadLink()}
                className='bg-[#347AE2] py-[10px] w-full px-8 md:py-0 md:w-auto rounded-[8px] text-[16px] text-[#FFFFFF] text-center font-semibold flex flex-row items-center justify-center'
            >
                Download
            </a>
        </div>
    )

}

export default SystemDropdown
