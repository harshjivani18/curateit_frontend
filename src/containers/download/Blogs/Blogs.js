import Image from 'next/image'

import { FaChevronRight } from 'react-icons/fa6'
import { PiArrowUpRightBold } from 'react-icons/pi'
import Link from 'next/link'

const Blogs = ({ title, subTitle, cta, blogs }) => {

    const renderBlogBlocks = () => {

        return blogs && blogs?.length > 0 && blogs?.map((blog, index) => {

            return (
                <>
                    <a
                        href={blog?.href}
                        className='w-full h-full flex flex-col'
                        key={`blog-blocks-${index}`}
                    >
                        <Image
                            src={blog?.image?.source}
                            alt={blog?.image?.altText}
                            className='w-full h-[240px] sm:h-[350px]  md:w-full lg:h-[240px] rounded-2xl object-cover'
                            width={1000}
                            height={1000}
                            loading='lazy'
                        />

                        <div className='mt-[20px] flex flex-row items-start justify-start lg:justify-between gap-4'>
                            <p className='text-[#062046] text-[20px] leading-[32px] font-medium md:font-semibold tracking-tight'>{blog?.title}</p>
                            <p><PiArrowUpRightBold className='text-[#062046] text-[20px] leading-[32px] mt-2' /></p>
                        </div>

                        <p className='mt-2 text-[16px] text-[#475467] leading-[22.4px] md:text-[14px] md:leading-[24px] tracking-tight'>
                            {blog?.description}
                        </p>
                    </a>
                </>
            )

        })

    }

    return (

        <div
            id='latest-blogs'
            className='w-full pt-10'
        >
            <div className='page-layout flex flex-col items-center md:items-start gap-8 lg:gap-16'>

                <div className='w-full flex flex-row items-start justify-center md:justify-between '>
                    <div>
                        <p className='text-center md:text-left text-[32px] text-[#062046] font-bold leading-[40px] md:text-[40px] md:font-semibold md:leading-[44px]'>{title}</p>
                        <p className='text-center md:text-left text-[16px] text-[#475467] leading-[22.4px] md:text-[20px] md:leading-[30px] mt-5'>{subTitle}</p>
                    </div>

                    <button
                        className='hidden lg:block bg-[#105FD3] py-3 px-8 lg:py-3 lg:px-5 rounded-[8px]'
                    >

                        <Link
                            className='text-white text-[16px] font-semibold w-full flex grow flex-row items-center justify-center gap-2'
                            href={cta?.href}
                            target='_self'
                        >
                            {cta?.title}
                            <span>
                                <FaChevronRight className='text-[16px]' />
                            </span>
                        </Link>
                    </button>
                </div>

                <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-5'>
                    {
                        renderBlogBlocks()
                    }
                </div>

                <div className='w-full lg:hidden flex flex-row items-center justify-center'>
                    <a
                        href={cta?.href}
                        className='py-3 px-8 rounded-[8px] border-[2px] border-[#B8D4FE] text-[16px] text-[#105FD3] font-semibold leading-[24px] text-center'
                    >
                        {cta?.title}
                    </a>
                </div>

            </div>
        </div>
    )

}

export default Blogs