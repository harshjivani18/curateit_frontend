import CompareTitle         from './CompareTitle'
import PricingMidSection    from './PricingMidSection'
import PricingTryout        from '@components/pricing/PricingTryout'
import PricingUnlimited     from '@components/pricing/PricingUnlimited'

const PricingComparisonMobile = () => {

    return (
        <div className='page-layout py-5 md:py-9'>
            <CompareTitle />

            <div className='mt-6'>
                <PricingTryout />
            </div>

            <div className='mt-6'>
                <PricingMidSection />
            </div>

            <div className='mt-6'>
                <PricingUnlimited />
            </div>
        </div>
    )
}

export default PricingComparisonMobile