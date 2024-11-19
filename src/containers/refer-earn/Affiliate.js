const Affiliate = () => {

    return (
        <div
            id='pricing-try-out-section'
            className='w-full'
        >

            <div className='w-[100%] xl:w-[75%] mx-auto flex flex-row items-center justify-between border-[0.4px] border-[#ABB7C9] bg-[#F8EDFF] rounded py-[24.5px] px-5 shadow-md md:py-5 md:px-6 md:rounded-xl md:shadow-lg'>
                <div>
                    <p
                        id='paragraph-text'
                        className='text-[22px] text-[#BC5BF6] font-semibold'
                    >
                        Become an affiliate
                    </p>

                    <p
                        id='paragraph-text'
                        className='text-[16px] text-[#74778B] mt-1'
                    >
                        Earn commission each time someone becomes a member at Curateit, through your referral link.
                    </p>
                </div>

                <button
                    className='bg-[#BC5BF6] w-max  rounded-[59px] '
                >

                    <a
                        className='text-[14px] text-white flex flex-row items-center justify-center py-2 px-6'
                        href={'/sign-up'}
                    >
                        Apply Now
                    </a>
                </button>
            </div>

        </div>
    )

}

export default Affiliate