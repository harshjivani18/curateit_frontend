
import Progress from '@components/Progress/Progress'
import { Dialog, Transition } from '@headlessui/react'
import { IoShareSocialOutline } from 'react-icons/io5'
import { PiCopySimple } from 'react-icons/pi'

const AchievementsDialogMobile = ({ open, setIsOpen, claimed }) => {

    return (
        <Transition appear show={open}>
            <Dialog as='div' className='absolute z-10 block md:hidden ' onClose={() => setIsOpen(!open)}>
                <Transition.Child
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black/25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto bottom-0'>
                    <div className='flex w-[100vw] min-h-full items-end justify-center text-center'>
                        <Transition.Child
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full transform overflow-hidden rounded-t-2xl bg-white text-left align-middle shadow-xl transition-all'>
                                <div
                                    className='w-full rounded-t-2xl border-[.4px] border-[#E9E9E9] bg-[#FDFDFD] flex flex-row items-center justify-center py-3'
                                // onDrag={() => setIsOpen(!open)}
                                >
                                    <div
                                        className='w-[100px] h-[4px] rounded-[4px] bg-[#BCBCBC]'
                                    />
                                </div>
                                <div className='w-[100vw] flex flex-col items-center p-4'>
                                    <div className='w-full flex flex-row items-center justify-between'>
                                        <p className='text-xl text-primary-blue font-semibold'>
                                            Achievements
                                        </p>

                                        <button className='flex flex-row items-center gap-1 py-[4px] px-[8px] text-primary-blue text-[12px] rounded-[28px] bg-primary-blue-100'>
                                            <IoShareSocialOutline />
                                            <p>Share</p>
                                        </button>
                                    </div>

                                    <div className='w-full flex flex-col mt-4'>
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

                                        <div className='w-full flex flex-row justify-start mt-[12px] gap-[8px]'>
                                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
                                            <div className='w-[32px] h-[32px] bg-[#D9D9D9] text-[14px] text-grey-text flex flex-row items-center justify-center rounded-full'>+4</div>
                                        </div>

                                        <p
                                            className='text-sm text-[#292B38] font-medium mt-4'
                                        >
                                            Earn 25% profit from the people who use your referal
                                        </p>

                                        <div className='w-full flex flex-row items-center justify-between mt-4'>
                                            {/* // ? Referral code block */}
                                            <div className='border border-[#ABB7C9] rounded-[8px] bg-white text-[14px] text-[#74778B] py-[10px] px-[12px] flex flex-row items-center justify-between w-[60%]'>
                                                AVN163VABIK

                                                <button>
                                                    <PiCopySimple className='text-[20px] text-[#74778B]' />
                                                </button>
                                            </div>

                                            {/* // ? Button */}
                                            <button
                                                className='w-[35%] text-white text-[14px] py-[9.5px] bg-primary-blue rounded-[8px]'
                                                onClick={() => navigator?.clipboard.writeText('AVN163VABIK')}
                                            >
                                                Add link to Bio
                                            </button>
                                        </div>

                                        <div className='mt-4'>
                                            <p className='text-xl text-primary-blue font-semibold'>
                                                Rewards Earned
                                            </p>

                                            <div className='text-[12px] w-full flex flex-row items-center justify-between mt-2'>
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
                                    </div>
                                </div>
                                <div className='border-t-[.4px] border-[#BCBCBC] flex flex-row items-center justify-center py-3'>
                                    <button
                                        className='bg-primary-blue outline-none text-white w-[75%] py-3 flex flex-row items-center justify-center rounded-[59px]'
                                        onClick={() => setIsOpen(!open)}
                                    >
                                        {
                                            (claimed) ? 'Claim rewards' : 'Close'
                                        }
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

}

export default AchievementsDialogMobile