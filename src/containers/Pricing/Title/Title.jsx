const Title = () => {

    return (
        <div
            id='pricing-title-section'
            className='w-full flex flex-col items-start gap-1 md:items-center md:justify-center md:gap-[11px]'
        >

            <h1
                id='h1-text'
                className='text-grey-medium font-semibold text-xl leading-6 md:text-dark-blue md:text-4xl md:tracking-tight md:leading-[44px]'
            >
                Plans and pricing
            </h1>

            <h3
                id='h3-text'
                className='hidden md:block md:text-dark-blue md:font-normal md:text-2xl md:tracking-tight md:leading:[44px]'
            >
                A Plan for evey scale of your growth
            </h3>

            <h3
                id='h3-text'
                className='block text-grey-light text-xs font-normal leading-[14.52px] md:hidden'
            >
                Choose the best plan according to your needs.
            </h3>

        </div>
    )

}

export default Title