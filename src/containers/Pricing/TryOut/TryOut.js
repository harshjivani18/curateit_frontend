import SolidRoundedButton from '@components/Buttons/SolidRoundedButton'
import SolidRoundedButtonSm from '@components/Buttons/SolidRoundedButtonSm'

const TryOut = () => {

    return (
        <div
            id='pricing-try-out-section'
            className='w-full'
        >

            <div className='w-full flex flex-row items-center justify-between border-[0.4px] rounded py-3 px-4 shadow-md md:py-5 md:px-6 md:rounded-xl  md:shadow-lg'>
                <p
                    id='paragraph-text'
                    className='hidden md:block md:text-xl md:text-grey-light md:font-medium md:leading-[38px]'
                >
                    Want to try out for free? Try out Explorer.
                </p>

                <p
                    id='paragraph-text'
                    className='text-xs font-medium text-grey-light leading-[14.52px] md:hidden'
                >
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
    )

}

export default TryOut