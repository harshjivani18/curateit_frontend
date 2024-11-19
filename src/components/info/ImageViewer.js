import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ImageViewer({ showModal, hideModal, image }) {

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={hideModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <button onClick={hideModal} className='absolute top-5 right-5  z-20'>
                        <XMarkIcon className="h-10 w-10 text-white" aria-hidden="true" />
                    </button>
                    <div className="flex min-h-full justify-center p-4 items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            {/* <Dialog.Panel className="relative transform overflow-hidden rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"> */}
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg shadow-xl transition-all sm:max-w-[95vw] sm:max-h-[95vh] sm:my-2">
                                <img className='object-contain sm:max-w-[100%] sm:max-h-[95vh]' src={image} alt="Curateit image viewer" />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
