import { SolidRoundedButton, SolidRoundedButtonSm } from "./PricingButtons"

const PricingTryout = () => {
    return (
        <div className='mt-6 md:mt-9'>
            <div className='w-full'>
                <div className='w-full flex flex-row items-center justify-between border-[0.4px] rounded py-3 px-4 shadow-md md:py-5 md:px-6 md:rounded-xl  md:shadow-lg'>
                    <p className='hidden md:block md:text-xl md:text-grey-light md:font-medium md:leading-[38px]'>
                        Want to try out for free? Try out our Explorer plan.
                    </p>
                    <p className='text-xs font-medium text-grey-light leading-[14.52px] md:hidden'>
                        Want to try out for free? 
                        <br />
                        Try out <a className='text-primary-blue'>Explorer</a>
                    </p>

                    <div className='hidden md:block'>
                        <SolidRoundedButton
                            title='Start for Free'
                            className=''
                            url='http://curateit.com/sign-up'
                        />
                    </div>

                    <div className='block md:hidden'>
                        <SolidRoundedButtonSm
                            title='Start for Free'
                            className=''
                            url='http://curateit.com/sign-up'
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PricingTryout