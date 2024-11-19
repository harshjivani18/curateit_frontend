import { Modal }            from 'antd';

const PlanConfirmModal = ({ visible, message, title, onOk, onCancel, confirmLoading=false }) => {
    return (
        <Modal
            title={title}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={400}
            height={200}
            okButtonProps={{
                className: "bg-[#347AE2]"
            }}
            okText='Yes'
            cancelText='No'
            confirmLoading={confirmLoading}
        >
            {message}
        </Modal>
    );
}

export default PlanConfirmModal;