import { GoArrowRight } from "react-icons/go";

const PricingComparison = () => {
    return (
        <div className='hidden md:block md:mt-8'>
            <div className='w-full'>
                <div className='w-full bg-primary-blue border border-primary-blue flex flex-col items-center justify-center border-[0.4px] rounded py-6 shadow-md md:rounded-xl md:shadow-lg'>
                    <p className='hidden text-white md:block md:text-2xl md:font-medium md:leading-[38px]'>
                        See Complete Feature Comparison
                    </p>
                    

                    <div className='mt-5'>
                        <button
                            className='bg-white w-full md:min-w-[221px] min-h-[44px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue'
                        >
                            <a
                                className='text-primary-blue font-medium text-base px-5 min-h-[44px] w-full flex h-full grow flex-row items-center justify-center transition ease-out delay-150 hover:text-white'
                                href={`${
                                    process.env.NEXT_PUBLIC_BASE_URL
                                }/plan-compare`}
                                target='_blank'
                            >
                                Checkout feature list <GoArrowRight className='text-xl ml-2' />
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingComparison;