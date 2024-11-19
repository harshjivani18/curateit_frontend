import { SolidRoundedButton, SolidRoundedButtonSm } from "./PricingButtons";

const PricingUnlimited = () => {
    return (
        <div className='mt-6 md:mt-9'>
            <div className='w-full'>
                <div className='w-full bg-primary-blue-bg border border-primary-blue-200 flex flex-row items-center justify-between border-[0.4px] rounded py-3 px-4 shadow-md md:py-5 md:px-6 md:rounded-xl  md:shadow-lg'>
                    <p className='hidden md:block md:text-2xl md:text-dark-blue md:font-medium md:leading-[38px]'>
                        Get unlimited users in team plan for just $299
                    </p>
                    
                    <p className='text-xs font-medium text-grey-light leading-[14.52px] md:hidden'>
                        Get unlimited users in team
                        <br />
                        plan for just <a className='text-primary-blue'>$299</a>
                    </p>

                    <div className='hidden md:block'>
                        <SolidRoundedButton
                            title='Get Started'
                            className=''
                            url='http://curateit.com/sign-up'
                        />
                    </div>

                    <div className='block md:hidden'>
                        <SolidRoundedButtonSm
                            title='Start now'
                            className=''
                            url='http://curateit.com/sign-up'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingUnlimited;