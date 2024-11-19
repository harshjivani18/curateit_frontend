import "./TransactionFailedPopup.css"
import { useEffect, useState }  from "react";
import { useDispatch }          from "react-redux";
import { Alert, Button }        from "antd";

import session                  from "@utils/session";

import { getUserPlanDetails }   from "@actions/plan-service";
import { initializePaddle } from "@paddle/paddle-js";

const TransactionFailedPopup = () => {
    const dispatch                  = useDispatch()
    const [userPlanDetails,
           setUserPlanDetails]      = useState(null)

    useEffect(() => {
        if (session.token) {
            dispatch(getUserPlanDetails()).then((res) => {
                if (res?.payload?.data) {
                    setUserPlanDetails(res?.payload?.data)
                }
            })
        }
    }, [])

    const onTransactionFailedClick = (transaction) => {
        initializePaddle({ 
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV, 
            token: process.env.NEXT_PUBLIC_PADDLE_TOKEN,
            pwCustomer: {
                email: session.emailAddress || ""
            },
            // eventCallback: (event) => {
            //     if (event.name === "checkout.loaded") {
            //         const iframe = document.querySelector(".paddle-frame-overlay")
            //         console.log("Iframe ===>", iframe.contentWindow.document)
            //         const doc = iframe.contentDocument || iframe.contentWindow.document
            //         if (doc) {
            //             const elem   = doc.querySelector("div[data-testid='quantity-row']")
            //             console.log("Elem ===>", elem)
            //             if (elem) {
            //                 elem.style.display = "none" 
            //             }
            //         }
            //     }
            // }

        }).then((paddleInstance) => {
            paddleInstance.Checkout.open({
                transactionId: transaction?.transaction_id,
                settings: {
                    successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${session.username}/edit-profile?billing=true`,
                }
            })
        });
    }

    const lastTransaction = userPlanDetails?.transactions?.length > 1 ? userPlanDetails.transactions.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })[0] : userPlanDetails?.transactions?.length > 0 ? userPlanDetails.transactions[0] : null
    // console.log("Last Transaction ===>", lastTransaction)
    if ((lastTransaction && lastTransaction.status !== "failed") || lastTransaction === null) return null
    return (
        // <Space direction="vertical" style={{ width: "100%" }}>
        <div className="ct-transaction-popup">
            <Alert
                message="Payment Failed"
                showIcon
                description="Your last payment attempt has failed. To resume plan"
                type="error"
                className="ct-transaction-alert-box"
                closable
                action={
                    <Button size="small" danger onClick={() => onTransactionFailedClick(lastTransaction)}>
                        Click here
                    </Button>
                }
            />
        </div>
        // </Space>
    );
};
  
export default TransactionFailedPopup;
  