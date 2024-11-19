// import { downloadInvoice } from "@actions/plan-service"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { Modal, Table, Tooltip, Button, message }            from "antd"
import { getAllISOCodes } from "iso-country-currency"
import moment from "moment"
// import { title } from "process"
import { GoStopwatch } from "react-icons/go"
import { IoCloseCircle } from "react-icons/io5"
// import { useDispatch } from "react-redux"

const TransactionModal = ({ items, showTransactions, isMobile, onHideModal }) => {

    // const dispatch = useDispatch()

    /* const onDownloadInvoice = async (record) => {
        const invoice = await dispatch(downloadInvoice(record.invoiceMainId))
        if (invoice?.payload?.data?.data?.url) {
            const aElement      = document.createElement("a")
            aElement.href       = invoice.payload.data.data.url
            aElement.download   = `invoice-${record.invoiceMainId}.pdf`
            document.body.appendChild(aElement)
            aElement.click()
            document.body.removeChild(aElement)
            message.success("Invoice downloaded successfully")
            return
        }
        message.error("Failed to download invoice")
    } */

    const onCopyTransactionId = (text) => {
        navigator.clipboard.writeText(text)
        message.success("Transaction Id copied to clipboard")
    }

    const renderTransactionData = () => {
        const transactions = items.map((item) => {
            const afterDate             = moment(item.createdAt).add(1, item.tenure === "Yearly" ? "year" : "month").format("DD-MM-YYYY")
            const paymentType           = item.payment_details?.length > 0 ? item.payment_details?.[0]?.method_details?.type : null
            const paymentObj            = paymentType ? item.payment_details?.[0]?.method_details[paymentType] : null
            const paymentMethod         = paymentObj && paymentType ? `${paymentType} - ${paymentObj?.type} ending with ${paymentObj?.last4}` : "-"
            const allCurrencies         = getAllISOCodes();
            const currencyIdx           = allCurrencies.findIndex(a => a.currency === item?.currency_code);
            const currencySymbol        = currencyIdx !== -1 ? allCurrencies[currencyIdx].symbol : item?.currency_code;
            const amountInNumber        = item.transaction_amount && item.transaction_amount !== "" ? parseInt(item.transaction_amount) / 100 : 0
            return {
                key: item.id,
                id: item.id,
                transactionId: item.transaction_id,
                createdDate: item.createdAt,
                paidFor: `${item.plan?.display_name} - ${item?.plan?.tenure}`,
                billingCycle: moment(item.createdAt).format("DD-MM-YYYY") + " to " + afterDate,
                amount: `${currencySymbol} ${amountInNumber.toFixed(2)}`,
                paymentMethod: item.credit_to_balance && item.credit_to_balance !== "0" ? `Credit to balance - ${(parseInt(item.credit_to_balance) / 100).toFixed(2)}` : item.status === "billed" ?  `Total switch amount - ${amountInNumber.toFixed(2)}` : paymentMethod,
                paymentStatus: item.status,
                invoiceMainId: item.invoice_id,
                invoiceId: item.invoice_number,
                invoice_number: item.invoice_number
            }
        })
        const columns = [
            {
                title: 'Created Date',
                dataIndex: 'createdDate',
                key: 'createdDate',
                render: (text) => <span className="font-[600]">{moment(text).format("DD-MM-YYYY")}</span>
            },
            {
                title: 'Transaction Id',
                dataIndex: 'transactionId',
                key: 'transactionId',
                render: (text) => {
                    return (<span className="font-[600] text-[#347AE2] cursor-pointer" onClick={() => onCopyTransactionId(text)}>{text}</span>)
                }
            },
            {   
                title: 'Paid For',
                dataIndex: 'paidFor',
                key: 'paidFor',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',

            },
            {
                title: 'Payment Method',
                dataIndex: 'paymentMethod',
                key: 'paymentMethod',
            },
            {
                title: 'Payment Status',
                dataIndex: 'paymentStatus',
                key: 'paymentStatus',
                render: (text) => {
                    return <div className="w-full flex items-center justify-center">
                        {text === "paid" 
                            ? <Tooltip title="Successfully paid" placement="bottom"><CheckCircleIcon className="h-5 w-5 text-green-500" /></Tooltip>
                                : text === "billed" || text === "pending"
                                    ? <Tooltip placement="bottom" title="Bill generated or due to some reason it is not paid but its not paid yet"><GoStopwatch className="h-5 w-5 text-yellow-500" /></Tooltip>
                                    : <Tooltip placement="bottom" title="Payment failed due to some technical or bank issues"><IoCloseCircle className="h-5 w-5 text-red-500" /></Tooltip>
                        }
                    </div>  
                }
            },
            {
                title: 'Invoice Id',
                dataIndex: 'invoiceId',
                key: 'invoiceId',
                render: (text, record) => {
                    return record.invoice_number ? <span>{text}</span> : <span>Not generated yet</span>
                    /* return record.invoice_number
                        ? <Button type="link" onClick={() => onDownloadInvoice(record)}>{text}</Button> 
                        : <span>Not generated yet</span> */
                }
            }
        ]

        return (
            <Table dataSource={transactions}
                   columns={columns}
                   scroll={{ x: isMobile ? "90%" : "70%" }}
                   pagination={transactions.length > 10 ? { pageSize: 10 } : false}
                   bordered />
        )
    }
    return (
        <Modal open={showTransactions}
               footer={null}
               title="Billing History"
               maskClosable={false}
               onCancel={onHideModal}
               width={isMobile ? "90%" : "70%"}>
            {items.length === 0  
                ?   <div className="flex flex-col items-center justify-center h-screen">
                        <img className="h-50 w-50 my-0 mx-auto" src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`} alt="Cloud ellipse icons" data-current-src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}></img>
                        <h1 className="text-4xl font-bold text-gray-800">403 Forbidden</h1>
                        <p className="text-gray-600 text-lg">You don't have permission to access this page.</p>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push("/")}>Back to home</button>
                    </div>
                :   renderTransactionData()
            }
        </Modal>
               
    )
}

export default TransactionModal;