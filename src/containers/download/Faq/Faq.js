import Image from 'next/image'

import Disclose from './Disclose'

const Faq = ({ title, subTitle, faqs, more }) => {

    return (
        <div className='bg-white page-layout'>
            <div className='mx-auto md:mt-0 md:py-18 lg:pt-8'>
                <div className=''>
                    <h2 className='self-center text-[#101828] text-center text-[32px] leading-[40px] font-bold md:text-4xl md:font-semibold md:leading-10 tracking-tighter'>{title}</h2>
                    <Disclose 
                        faqs={faqs}
                    />
                </div>
            </div>

            <div className='mt-16 w-full flex flex-col items-center rounded-xl p-4 md:pt-8 md:pb-10 md:px-4 bg-[#F8FBFF] text-center'>
                <div>
                    <Image
                        src={more?.image?.source}
                        alt={more?.image?.altText}
                        width={124}
                        height={60}
                        loading='lazy'
                    />
                </div>

                <p className=' text-[#062046] mt-8 text-[20px] leading-[32px] font-bold md:font-semibold md:leading-[30px]'>{more?.title}</p>
                <p className='mt-4 text-[#475467] text-[16px] leading-[22.4px] md:mt-2 md:text-[18px] md:text-[#575C70] md:leading-[28px]'>{more?.subTitle}</p>

                <a
                    href={more?.cta?.href}
                    className='px-8 py-3 rounded-[8px] mt-8 text-white text-[16px] font-semibold leading-[24px] md:rounded-md bg-[#105FD3]'
                >
                    {more?.cta?.title}
                </a>
            </div>
        </div>
    )
}

export default Faq