import * as ActionTypes         from "./action-types"

export const getPlanService = () => ({
    type: ActionTypes.GET_PLAN_SERVICE,
    payload: {
        request: {
            url: `/api/get-plan-services`,
            method: "get"
        }
    }
})

export const getUserPlanDetails = () => ({
    type: ActionTypes.GET_USER_PLAN_DETAILS,
    payload: {
        request: {
            url: `/api/get-user-plan-details`,
            method: "get"
        }
    }
})

export const cancelPlan = (subscriptionId) => ({
    type: ActionTypes.CANCEL_PLAN,
    payload: {
        request: {
            url: `/api/cancel-subscription/${subscriptionId}`,
            method: "post"
        }
    }
})

export const changePlan = (subscriptionId, planId) => ({
    type: ActionTypes.CHANGE_PLAN,
    payload: {
        request: {
            url: `/api/change-subscription/${subscriptionId}`,
            method: "patch",
            data: {
                planId
            }
        }
    }
})

export const downloadInvoice = (invoiceId) => ({
    type: ActionTypes.DOWNLOAD_INVOICE,
    payload: {
        request: {
            url: `/api/invoice-pdf/${invoiceId}`,
            method: "get"
        }
    }
})

export const changeBilledEmail = (customerId, email) => ({
    type: ActionTypes.CHANGE_BILLED_EMAIL,
    payload: {
        request: {
            url: `/api/customers-billed-info/${customerId}`,
            method: "patch",
            data: {
                email
            }
        }
    }   
})

export const fetchSubscriptionPricePerview = (subscriptionId, bodyData) => ({
    type: ActionTypes.FETCH_SUBSCRIPTION_PRICE_PREVIEW,
    payload: {
        request: {
            url: `/api/fetch-pricing-preview/${subscriptionId}`,
            method: "post",
            data: bodyData
        }
    }
})

export const fetchUpdatePaymentMethodTransaction = (subscriptionId) => ({
    type: ActionTypes.FETCH_UPDATE_PAYMENT_METHOD_TRANSACTION,
    payload: {
        request: {
            url: `/api/get-update-payment-method-transaction/${subscriptionId}`,
            method: "get"
        }
    }
})

export const getIsPlanOwner = () => ({
    type: ActionTypes.GET_IS_PLAN_OWNER,
    payload: {
        request: {
            url: `/api/check-is-plan-owner`,
            method: "get"
        }
    }
})