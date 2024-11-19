const CompareTitle = () => {
    return (
        <div className='w-full flex flex-col items-start gap-1 md:items-center md:justify-center md:gap-[11px]'>
            <h1
                id='h1-text'
                className='text-grey-medium font-semibold text-xl leading-6 md:text-dark-blue md:text-4xl md:tracking-tight md:leading-[44px]'
            >
                Features List
            </h1>

            <h3
                id='h3-text'
                className='block text-grey-light text-xs font-normal leading-[14.52px] md:hidden'
            >
                See all the features for different pricings
            </h3>

        </div>
    )
}

export default CompareTitle