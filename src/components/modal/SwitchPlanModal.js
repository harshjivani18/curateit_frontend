import "./SwitchPlanModal.css";

import { Modal, Spin }      from 'antd';
import { getAllISOCodes }   from 'iso-country-currency';
import { FaArrowRight }     from 'react-icons/fa';

const SwitchPlanModal = ({ visible, obj, onSubmit, onCancel, confirmLoading, fetchingPreview, currentPlan, newPlan  }) => {

    const renderPlanDescription = () => {
        if (!obj) return null;
        const immediateTransaction  = obj?.immediate_transaction?.details?.totals || null;
        const nextTransaction       = obj?.next_transaction?.details?.totals || null;
        const interval              = obj?.billing_cycle?.interval || null;
        const allCurrencies         = getAllISOCodes();
        const currencyIdx           = allCurrencies.findIndex(a => a.currency === obj?.currency_code);
        const currencySymbol        = currencyIdx !== -1 ? allCurrencies[currencyIdx].symbol : obj?.currency_code;
        const amtInNumber           = immediateTransaction?.total ? parseInt(immediateTransaction?.total) : 0;
        return (
            <div className='flex flex-col items-center'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-[22px] leading-[27px] text-[#323543] font-[600] mb-4'>Switching Plans</h2>
                    <p className='text-[16px] leading-[19px] text-[#4B4F5D] text-center'>Your planned will be changed immediately, price and credits adjusted accordingly.</p>
                    {amtInNumber < 0 && <p className='text-[10px] leading-[15px] text-[#ff0000] text-center mt-1'>Note: Your remaining amount will be credited to your balance and it will be automatically reflected in your next transaction.</p>}
                </div>
                <div className='flex flex-row items-center justify-center mt-6'>
                    <span className='text-[20px] leading-[24px] text-[#4B4F5D]'>{currentPlan}</span>
                    <FaArrowRight className='text-[#347AE2] mx-4' />
                    <span className='text-[20px] leading-[24px] text-[#347AE2]'>{newPlan}</span>
                </div>
                <div className='flex flex-row items-center justify-center mt-6'>
                    <h2 className='text-[32px] leading-[39px] text-[#3188E3] mr-2'>{`${currencySymbol}${parseInt(immediateTransaction?.total) / 100}`}</h2>
                    <span className='text-[16px] leading-[19px] text-[#74778B] font-[600]'>inc. Tax</span>
                </div>
                <div className='flex flex-row items-center justify-center mt-1'>
                    <span className='text-[16px] leading-[19px] text-[#74778B]'>{`then ${currencySymbol}${parseInt(nextTransaction?.total) / 100} ${interval === "year" ? "yearly" : interval === "month" ? "monthly" : ""}`}</span>
                </div>
                <div className='flex flex-col mt-8 w-full'>
                    <div className='flex flex-row items-center justify-between w-full mb-2'>
                        <span className='text-[16px] text-[#393939] leading-[19px]'>Plan Type:</span>
                        <span className='text-[16px] text-[#347AE2] leading-[19px] font-[600]'>{interval === "year" ? "Yearly" : interval === "month" ? "Monthly" : ""}</span>
                    </div>
                    <div className='flex flex-row items-center justify-between w-full mb-2'>
                        <span className='text-[16px] text-[#393939] leading-[19px]'>Sub total:</span>
                        <span className='text-[16px] text-[#393939] leading-[19px] font-[600]'>{`${currencySymbol}${parseInt(immediateTransaction?.subtotal) / 100}`}</span>
                    </div>
                    <div className='flex flex-row items-center justify-between w-full mb-2'>
                        <span className='text-[16px] text-[#393939] leading-[19px]'>Tax:</span>
                        <span className='text-[16px] text-[#393939] leading-[19px] font-[600]'>{`${currencySymbol}${parseInt(immediateTransaction?.tax) / 100}`}</span>
                    </div>
                    <div className='flex flex-row items-center justify-between w-full'>
                        <span className='text-[16px] text-[#393939] leading-[19px]'>Due Today:</span>
                        <span className='text-[16px] text-[#393939] leading-[19px] font-[600]'>{`${currencySymbol}${parseInt(immediateTransaction?.total) / 100}`}</span>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center mt-8 w-[200px]'>
                    <button className='bg-[#347AE2] text-white py-2 px-4 rounded-lg w-full' onClick={onSubmit} disabled={confirmLoading}>
                        {confirmLoading ? 'Switching...' : 'Confirm Switch'}
                    </button>
                </div>
            </div>
        )
    }
    return (
        <Modal
            title={null}
            footer={null}
            open={visible}
            onCancel={onCancel}
            maskClosable={false}
            className='ct-switch-plan-modal'
        >
            {fetchingPreview 
                ? <div className='flex flex-col items-center justify-center h-[300px]'><Spin /></div>
                : renderPlanDescription()
            }
        </Modal>
    );
}

export default SwitchPlanModal;