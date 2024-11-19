import { Button, Input, Modal } from "antd"

const DeleteModal = ({openModal,modalType,loading='',
        handleDeleteCollections=() => {},
        handleDeleteTags=() => {},
        handleDeleteEmptyCollections=() => {},
        handleDeleteEmptyTags=() => {},
        handleDeleteAllData=() => {},
        handleDeleteGems=() => {},newPassword='',setNewPassword='',confirmPassword='',setConfirmPassword='',newPasswordError='',confirmPasswordError='',handleChangePassword=() => {},handleCancel=() =>{},handleDeleteAccount=()=>{},}) => {

    return(
        <>
        {
        openModal && <Modal
          title={null}
          open={openModal}
          footer={null}
          maskClosable={true}
          onCancel={handleCancel}
          width={"fit-content"}

          bodyStyle={{
            padding:'0px',
            width:'fit-content'
          }}
          closable={false}
          centered={true}
        >
        {
        (modalType === 'collections' || modalType === 'gems' || modalType === 'tags' || modalType === 'empty_collections' || modalType === 'empty_tags' || modalType === 'all_data') &&
        <div className="py-4 px-6">
            <div>Are you sure you want to delete?</div>

            <div className="flex items-center mt-4 justify-center">
                <Button className="rounded-md text-[#347AE2] bg-[#E5F0FF] hover:bg-[#E5F0FF] hover:text-[#347AE2] border-[#347AE2] hover:border-[#347AE2] mr-4"
                onClick={handleCancel}
                disabled={loading}
                >
                    Cancel
                </Button>
                <Button className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
                disabled={loading}
                onClick={() => {
                    if(modalType === 'collections'){
                        handleDeleteCollections()
                        return
                    }else if(modalType === 'gems') {
                        handleDeleteGems()
                        return;
                    } else if(modalType === 'tags') {
                        handleDeleteTags()
                        return;
                    } else if(modalType === 'empty_tags') {
                        handleDeleteEmptyTags()
                        return;
                    } else if(modalType === 'empty_collections') {
                        handleDeleteEmptyCollections()
                        return;
                    } else if(modalType === 'all_data') {
                        handleDeleteAllData()
                        return;
                    }
                }}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </div>
        }

        {
        modalType === 'password' &&
        <div className="py-4 px-6">
            <div className="text-center font-medium mb-4">Set your new password</div>

            
            {/* <div>
                <Input
                    placeholder="Current Password"
                    className="rounded-md block"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <span className="error-label">{currentPasswordError}</span>
            </div> */}

            <div>
                <Input
                    placeholder="New Password"
                    className="rounded-md block my-4"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <span className="error-label">{newPasswordError}</span>
            </div>

            <div>
                <Input
                    placeholder="Confirm Password"
                    className="rounded-md block"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="error-label">{confirmPasswordError}</span>
            </div>

            <div className="flex items-center mt-4 justify-center">
                <Button className="rounded-md text-[#347AE2] hover:text-[#347AE2] border-[#347AE2] hover:border-[#347AE2] mr-4"
                onClick={handleCancel}
                disabled={loading}
                >
                    Cancel
                </Button>
                <Button type='primary' className="rounded-md bg-[#347AE2] hover:bg-[#347AE2] border-[#347AE2] hover:border-[#347AE2]" onClick={handleChangePassword} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </div>
        }

        {
        modalType === 'account' &&
        <div className="py-4 px-6">
            <div>Are you sure you want to delete your account?</div>

            <div className="flex items-center mt-4 justify-center">
                <Button className="rounded-md text-[#347AE2] bg-[#E5F0FF] hover:bg-[#E5F0FF] hover:text-[#347AE2] border-[#347AE2] hover:border-[#347AE2] mr-4"
                onClick={handleCancel}
                disabled={loading}
                >
                    No, Cancel
                </Button>
                <Button className="rounded-md text-[#E23434] bg-[#FFE5E5] hover:bg-[#FFE5E5] hover:text-[#E23434] border-[#E23434] hover:border-[#E23434]"
                disabled={loading}
                onClick={handleDeleteAccount}
                >
                    {loading ? 'Deleting...' : 'Yes, Delete'}
                </Button>
            </div>
        </div>
        }
        </Modal>
        }
        </>
    )
}

export default DeleteModal;