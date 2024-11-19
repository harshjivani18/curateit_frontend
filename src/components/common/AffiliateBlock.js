import { message }  from "antd";
import Script       from "next/script";

const AffiliateBlock = () => {
    const onApply = () => {
        const formId = 'nr6qWM';
        const options =  {
            layout: 'modal', // Open as a centered modal
            width: 700, // Set the width of the modal
            emoji: {
                text: "👋",
                animation: 'wave'
            },
            onSubmit: () => {
                message.success('Application submitted successfully');
                window.Tally.closePopup(formId);
            }
        }
        window.Tally.openPopup(formId, options)
    }
    return (
        <>
            <Script id="tally-js" src="https://tally.so/widgets/embed.js" />
            <div className='mt-6 md:mt-9 bg-[#F8EDFF] rounded'>
                <div className='w-full rounded'>
                    <div className='w-full flex flex-row flex-wrap items-center justify-between border-[0.4px] rounded py-3 px-4 md:py-5 md:px-6 md:rounded-xl'>
                        <div className="flex flex-col">
                            <h4 className="font-semibold text-[22px] text-custom-pink">Become an affiliate</h4>
                            <p className='block md:text-xl md:font-medium md:leading-[38px] text-custom-lighter'>
                                Earn commission each time someone becomes a member at Curateit, through your referral link.
                            </p>
                        </div>
                        <button className='bg-custom-pink w-[130px] text-white min-h-[40px] border-2 border-custom-pink rounded-[87px] transition ease-out delay-150 hover:bg-custom-pink hover:border-custom-pink' onClick={onApply}>
                            Apply Now
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AffiliateBlock;