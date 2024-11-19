'use client'

import { Disclosure, Transition } from '@headlessui/react'
import { PiPlusCircle, PiMinusCircle } from 'react-icons/pi'

const Disclose = (props) => {
    return (
        <dl className='mt-9 space-y-6 w-full lg:w-[768px] lg:mx-auto'>
            {props?.faqs.map((faq) => (
                <Disclosure 
                    as='div' 
                    key={faq.question} 
                    className='pb-6 border-b'
                >
                    {({ open }) => (
                        <>
                            <dt>
                                <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900 transition ease-out delay-150'>
                                    <span className='text-lg text-[#062046] font-semibold leading-7'>{faq.question}</span>
                                    <span className='ml-6 flex h-7 items-center text-[#475467]'>
                                        {open ? (
                                            <PiMinusCircle className='h-6 w-6 text-medium-grey transition ease-out delay-150' aria-hidden='true' />
                                        ) : (
                                            <PiPlusCircle className='h-6 w-6 text-medium-grey transition ease-out delay-150' aria-hidden='true' />
                                        )}
                                    </span>
                                </Disclosure.Button>
                            </dt>
                            <Transition
                                enter="transition duration-100 ease-in"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel as='dd' className='mt-2 pr-6 md:pr-12 transition ease-out delay-150'>
                                    <p className='text-base leading-7 text-gray-600'>{faq.answer}</p>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
            ))}
        </dl>
    )
}

export default Disclose