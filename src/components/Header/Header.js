'use client'

import { usePathname } from 'next/navigation'

const Header = () => {

    const pathname = usePathname()

    return (
        <div className='flex justify-between items-center max-w-[1250px] mx-auto md:items-stretch backdrop-blur-2xl bg-white bg-opacity-40 w-full px-12 py-4 md:px-5'>
            <div>
                <a href='/'>
                    <img loading='lazy' src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo1sv.svg`} alt='Curateit' className='aspect-[4.2] object-contain cursor-pointer object-center w-[168px] justify-center items-center overflow-hidden self-center shrink-0 max-w-full my-auto' />
                </a>
            </div>
            <div className='items-stretch hidden self-center md:flex justify-between gap-5 my-auto max-md:justify-center'>
                <a href='/pricing'>
                    <div className={`cursor-pointer text-base font-medium leading-6 whitespace-nowrap ${(pathname === '/pricing') ? 'text-primary-blue font-semibold' : 'text-slate-950'} `}>Pricing</div>
                </a>
                <a href='https://web.curateit.com/use-cases'>
                    <div className='text-slate-950 cursor-pointer text-base font-medium leading-6'>Use cases</div>
                </a>
                <a href='https://web.curateit.com/features'>
                    <div className='text-slate-950 cursor-pointer text-base font-medium leading-6'>Features</div>
                </a>
                <a href='https://web.curateit.com/blog'>
                    <div className='text-slate-950 cursor-pointer text-base font-medium leading-6 whitespace-nowrap'>Blog</div>
                </a>
            </div>
            <div className='justify-between hidden cursor-pointer items-stretch md:flex gap-4'>
                <a href='http://curateit.com/sign-in'>
                    <div className='text-blue-700 text-center text-base font-bold leading-6 whitespace-nowrap justify-center items-stretch border-[color:var(--primary-200,#B8D4FE)] grow px-6 py-3 rounded-lg border-2 border-solid max-md:px-5'>Login</div>
                </a>
                <a href='http://curateit.com/sign-up'>
                    <div className='text-white text-center cursor-pointer text-base font-bold leading-6 whitespace-nowrap justify-center items-stretch bg-blue-700 grow px-6 py-3 rounded-lg max-md:px-5'>Sign up</div>
                </a>
            </div>
            <div className='ml-4 visible md:hidden lg:hidden'>
                <button className='ant-dropdown-trigger'>
                    <svg stroke='currentColor' fill='none' strokeWidth='2' viewBox='0 0 24 24' aria-hidden='true' className='h-5 w-5' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16'></path>
                    </svg>
                </button>
            </div>
        </div>
    )


}

export default Header