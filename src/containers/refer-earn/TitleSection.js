'use client'

import Progress from "@components/Progress/Progress";

import { IoShareSocialOutline } from 'react-icons/io5'
import { PiTrophy } from 'react-icons/pi'
import { useState } from 'react'
import AchievementsDialogMobile from './AchievementsDialogMobile'

const categories = ['All', 'Refer', 'Earn', 'Activity', 'Loyalty']

const TitleSection = ({ currentCategory, setCurrentCategory }) => {

    const [achievementsDialog, setAchievementsDialog] = useState(false)

    // ? Method to render the Category Switcher
    const CategorySwitcher = () => {

        return categories.map((category, index) => {

            return (
                <div
                    key={`category-${index}`}
                    className={`flex flex-row items-center justify-center grow md:w-[92.25px] text-center ${(index === categories?.length - 1) ? 'rounded-r-[8px]' : 'border-r'} ${(index === 0) ? 'rounded-l-[8px]' : ''} ${(currentCategory === category) ? 'bg-primary-blue text-white' : 'text-[#344054]'}`}
                >
                    <button
                        className='text-sm lg:text-[14px] font-medium w-full h-full grow py-3 lg:px-[23px] lg:py-[10px]'
                        onClick={() => setCurrentCategory(category)}
                    >
                        {category}
                    </button>
                </div>
            )

        })

    }

    return (
        <>
            {/* // ? DESKTOP */}
            <div
                className='w-full hidden lg:flex flex-row items-start justify-between'
            >
                {/* // ? Text Section */}
                <div
                    className='w-[70%]'
                >
                    <p
                        className='text-[40px] text-grey-medium font-semibold'
                    >
                        Refer and Earn features
                    </p>


                    <div
                        className='border rounded-[8px] flex flex-row items-center justify-center w-max mt-7'
                    >
                        <CategorySwitcher />
                    </div>
                </div>

                {/* // ? Stats Section */}
                <div
                    className='w-[30%] flex flex-row items-start justify-between gap-4'
                >
                    <div className='w-[50%] flex flex-col items-start justify-start gap-[6px] rounded-[8px] border border-[#5690E7] p-[8px]'>
                        <p className='text-[14px] text-primary-blue font-medium'>
                            Total rewards earned
                        </p>

                        <div className='text-[12px] w-full flex flex-row items-center justify-between'>
                            <p className='text-grey-text'>Gems</p>
                            <p className='text-grey-text'><span className='text-primary-blue font-medium'>40</span> / 9000</p>
                        </div>

                        <div className='text-[12px] w-full flex flex-row items-center justify-between'>
                            <p className='text-grey-text'>AI Words</p>
                            <p className='text-grey-text'><span className='text-primary-blue font-medium'>40</span> / 9000</p>
                        </div>

                        <div className='text-[12px] w-full flex flex-row items-center justify-between'>
                            <p className='text-grey-text'>Tags</p>
                            <p className='text-grey-text'><span className='text-primary-blue font-medium'>40</span> / 9000</p>
                        </div>

                        <div className='text-[12px] w-full flex flex-row items-center justify-between'>
                            <p className='text-grey-text'>Bandwidth</p>
                            <p className='text-grey-text'><span className='text-primary-blue font-medium'>40</span> / 9000</p>
                        </div>

                        <div className='text-[12px] w-full flex flex-row items-center justify-between'>
                            <p className='text-grey-text'>Collections</p>
                            <p className='text-grey-text'><span className='text-primary-blue font-medium'>40</span> / 9000</p>
                        </div>

                    </div>

                    <div className='w-[50%] flex flex-col rounded-[8px]'>
                        <div className='w-full flex flex-row justify-end'>
                            <button className='flex flex-row items-center gap-1 py-[4px] px-[8px] text-primary-blue text-[12px] rounded-[28px] bg-primary-blue-100'>
                                <IoShareSocialOutline />
                                <p>Share</p>
                            </button>
                        </div>

                        <p
                            className='text-[14px] text-grey-light mt-[8px]'
                        >
                            Member since Mar 2, 2020
                        </p>

                        <div className='w-full flex flex-row items-center justify-between text-[14px] mt-[8px]'>
                            <p className='text-grey-text font-medium'>
                                Level 4 <span className='text-primary-blue'>(Rookie)</span>
                            </p>

                            <p className='text-grey-text font-medium'>
                                40 <span className='text-[#74778B] font-normal'>/ 900</span>
                            </p>
                        </div>

                        <div className='mt-[8px]'>
                            <Progress
                                completed={60}
                                width='100%'
                                height='8px'
                            />
                        </div>

                        <div className='w-full flex flex-row justify-between mt-[12px]'>
                            <p className='text-[14px] text-grey-text'>Badges earned</p>
                            <a
                                href='#'
                                className='text-[12px] text-primary-blue'
                            >
                                See all
                            </a>
                        </div>

                        <div className='w-full flex flex-row justify-between mt-[12px] gap-[8px]'>
                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] text-[14px] text-grey-text flex flex-row items-center justify-center rounded-full'>+4</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* // * MOBILE */}
            <div className='block lg:hidden'>
                <div className='w-full flex flex-row items-start justify-between lg:hidden'>
                    <div>
                        <p className='text-xl font-semibold text-[#292B38]'>Refer and earn features</p>
                        <p className='text-xs text-[#74778B] mt-1'>Complete tasks and earn rewards</p>
                    </div>

                    <button
                        className='px-[6.5px] py-[7.5px] rounded-[4px] border-[.5px] border-[#ABB7C9]'
                        onClick={() => setAchievementsDialog(true)}
                    >
                        <PiTrophy className='text-[15px] text-[#74778B]' />
                    </button>
                </div>

                <div
                    className='border rounded-[8px] flex flex-row items-center justify-center w-max mt-7 hidden lg:block'
                >
                    <CategorySwitcher />
                </div>

                <div
                    className='border rounded-[8px] w-full md:w-max flex-row items-center justify-center mt-7 flex lg:hidden'
                >
                    <CategorySwitcher />
                </div>
            </div>

            <div className='block md:hidden'>
                <AchievementsDialogMobile
                    open={achievementsDialog}
                    setIsOpen={setAchievementsDialog}
                    claimed={true}
                />
            </div>
        </>
    )

}

export default TitleSection