import { Dialog, Transition } from '@headlessui/react'
import { PiCheckCircleFill, PiPlusCircle } from 'react-icons/pi'

const InstallDialogDesktop = ({ open, setIsOpen, claimed }) => {

    const RenderIcon = () => {

        if (claimed) {

            return (<PiCheckCircleFill className='text-lg md:text-base text-[#099356]' />)

        }

        return (<PiPlusCircle className='text-lg md:text-base text-primary-blue' />)

    }

    return (
        <>
            <div className='hidden md:block'>
                {/* DESKTOP */}
                <Transition appear show={open}>
                    <Dialog as='div' className='absolute z-10 ' onClose={() => setIsOpen(false)}>
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
                            <div className='flex min-h-full items-end md:items-center justify-center md:p-4 text-center'>
                                <Transition.Child
                                    enter='ease-out duration-300'
                                    enterFrom='opacity-0 scale-95'
                                    enterTo='opacity-100 scale-100'
                                    leave='ease-in duration-200'
                                    leaveFrom='opacity-100 scale-100'
                                    leaveTo='opacity-0 scale-95'
                                >
                                    <Dialog.Panel className='w-[100vw] md:w-[610px] transform overflow-hidden rounded-2xl bg-white md:py-4 md:px-[15px] text-left align-middle shadow-xl transition-all'>
                                        <div
                                            className='w-full rounded-t-2xl border-[.4px] border-[#E9E9E9] bg-[#FDFDFD] flex md:hidden flex-row items-center justify-center py-3'
                                        // onDrag={() => setIsOpen(!open)}
                                        >
                                            <div
                                                className='w-[100px] h-[4px] rounded-[4px] bg-[#BCBCBC]'
                                            />
                                        </div>

                                        <div className='w-full flex flex-col items-center '>
                                            <div className='px-4 md:p-0'>
                                                <p className='text-[22px] text-[#323543] font-semibold hidden md:block'>Install the extension</p>

                                                <div className='flex md:hidden flex-col w-full mt-4'>
                                                    <div className='flex flex-row justify-start items-center gap-2'>
                                                        <p className='text-xl text-primary-blue font-semibold'>
                                                            Install Extension
                                                        </p>

                                                        <p
                                                            className='py-1 px-3 text-[#004440] text-xs font-medium bg-[#EFFCF6] rounded-[59px]'
                                                        >
                                                            Reward
                                                        </p>
                                                    </div>

                                                    <p className='w-full text-xs text-[#74778B] mt-1'>
                                                        Install the extension from the chrome web store to earn credits.
                                                    </p>
                                                </div>

                                                <div className={`w-full flex flex-col items-center mt-5 py-2 px-3 md:py-5 md:px-4  border-[0.4px]  rounded-lg shadow-sm ${(claimed) ? 'bg-[#EDFFE7] border-[#099356]' : 'bg-primary-blue-100 border-[#B8D4FE]'}`}>

                                                    <p className={`text-lg font-semibold ${(claimed) ? 'text-[#099356]' : 'text-primary-blue'}`}>
                                                        Rewards
                                                    </p>

                                                    <div className='w-full mt-2 flex flex-wrap flex-row items-center justify-around md:justify-between gap-4' >
                                                        <div className='w-[42%] flex flex-row gap-1 items-center justify-center md:justify-start'>
                                                            <RenderIcon />
                                                            <p className='text-sm md:text-base text-grey-text'>1000 AI Words</p>
                                                        </div>
                                                        <div className='w-[42%] flex flex-row gap-1 items-center justify-center md:justify-start'>
                                                            <RenderIcon />
                                                            <p className='text-sm md:text-base text-grey-text'>Get 50 gems</p>
                                                        </div>
                                                        <div className='w-[42%] flex flex-row gap-1 items-center justify-center md:justify-start'>
                                                            <RenderIcon />
                                                            <p className='text-sm md:text-base text-grey-text'>1000 AI Words</p>
                                                        </div>
                                                        <div className='w-[42%] flex flex-row gap-1 items-center justify-center md:justify-start'>
                                                            <RenderIcon />
                                                            <p className='text-sm md:text-base text-grey-text'>Get 50 gems</p>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className={`mt-5 w-full flex flex-col ${(claimed) ? 'hidden md:block' : ''}`}>

                                                    <p className='text-sm text-[#4B4F5D]'>
                                                        Go to Chrome webstore. <br />
                                                        Search Curateit in Chrome webstore. <br />
                                                        Install the extension from the chrome web store to earn credits.
                                                    </p>

                                                    <video
                                                        controls={false}
                                                        autoPlay
                                                        muted
                                                        loop={true}
                                                        // width={500}?
                                                        // height={500}
                                                        className='w-full mt-3'
                                                    >
                                                        <source src='/videos/only_web_clipper.mp4' />
                                                    </video>

                                                </div>
                                            </div>

                                            <div className='w-full flex flex-row items-center justify-center mt-5 border-t-[.5px] md:border-none py-3 md:p-0'>
                                                <button
                                                    className='w-[75%] md:w-max bg-primary-blue outline-none text-white px-9 py-3 flex flex-row items-center justify-center rounded-[59px]'
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {
                                                        (claimed) ? 'Claim rewards' : 'Close'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>

                </Transition>
            </div>
        </>

    )
}

export default InstallDialogDesktop