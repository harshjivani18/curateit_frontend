
import { PiAndroidLogoFill, PiAppleLogoFill, PiCaretRight, PiPuzzlePieceFill, PiWindowsLogoFill } from 'react-icons/pi'
import SystemDropdown from '../SystemDropdown/SystemDropdown'


const Hero = (data) => {

    const { title, subTitle, dropdown, getMore } = data

    const SubTitles = () => {

        if (subTitle?.length > 0) {

            return subTitle?.map((text, index) => {

                return (
                    <p className='text-[16px] md:text-[20px] text-[#062046]' key={`hero-subtitle-${index}`}>
                        {text}
                    </p>
                )

            })

        }


    }

    const GetMoreSection = () => {

        return (
            <div className='flex flex-row items-center justify-center gap-[12px] md:gap-[20px]'>
                <PiAndroidLogoFill className='text-[18px] md:text-[25px] text-[#4B4F5D]' />
                <PiAppleLogoFill className='text-[18px] md:text-[25px] text-[#4B4F5D]' />
                <PiWindowsLogoFill className='text-[18px] md:text-[25px] text-[#4B4F5D]' />
                <PiPuzzlePieceFill className='text-[18px] md:text-[25px] text-[#4B4F5D]' />

                <a
                    href={getMore?.href}
                    className='flex flex-row items-center justify-start gap-[8px] text-[14px] ml-[4px]'
                >
                    {getMore?.title}

                    <PiCaretRight 
                        className='text-[16px] md:text-[20px] text-[#000000]'
                    />
                </a>
            </div>
        )

    }
    
    return (
        <div
            id='hero-section'
            className='w-full pt-6 pb-10 text-center lg:pt-8 lg:pb-14 bg-gradient-to-b from-[#E5F0FF] to-[#E0DEF700]'
        >
            <div className='page-layout flex flex-col items-center justify-start'>
                <h1 className='text-[32px] md:text-[64px] font-bold text-[#062046]'>
                    {title}
                </h1>

                <div className='mt-6 text-center'>
                    <SubTitles />
                </div>

                <div className='mt-6 md:mt-8 w-full md:w-auto'>
                    <SystemDropdown 
                        {...dropdown}
                    />
                </div>

                <div className='mt-6 md:mt-8'>
                    <GetMoreSection />
                </div>
            </div>
        </div>
    )

}

export default Hero