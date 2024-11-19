import { FaChevronRight } from 'react-icons/fa6'

const StartNow = ({ title, subTitle, cta }) => {

    return (
        <div
            id='tags-manager-start-now-section'
            className='w-full py-14 bg-[#F0F6FF]'
        >
            <div className='page-layout flex flex-col items-center jusity-center text-center'>
                <p className='text-[24px] md:text-[30px] text-[#062046] md:text-[#101828] font-bold md:font-semibold leading-[36px] md:leading-[38px]'>{title}</p>
                <p className='text-[16px] leading-[22.4px] md:text-[20px] md:leading-[30px] text-[#475467] mt-4 tracking-tight'>{subTitle}</p>
                <button
                    className='lg:block bg-[#105FD3] py-3 px-8 lg:py-4 lg:px-8 rounded-[8px] mt-9 md:mt-12'
                >

                    <a
                        className='text-white text-[16px] font-semibold w-full flex grow flex-row items-center justify-center gap-2'
                        href={cta?.href}
                        target='_self'
                    >
                        {cta?.title}
                        <span>
                            <FaChevronRight className='text-[16px]' />
                        </span>
                    </a>
                </button>
            </div>
        </div>
    )

}

export default StartNow