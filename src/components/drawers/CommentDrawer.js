import MainContainer from '@components/comment/MainContainer'
import { Drawer } from 'antd'
import { useSelector } from 'react-redux'

const CommentDrawer = ({ hideCommentDrawer, openDrawer, selectedGem, user, onResponded=null }) => {
    const {isMobileView} = useSelector(state => state.app)
    return (
        <Drawer
            placement={isMobileView  ? 'bottom' : 'right'}
            height={isMobileView ? '90%' : 'inherit'}
            width={isMobileView ? '90%' : '400px'}
            open={openDrawer}
            maskClosable={isMobileView ? true :false}
            closable={false}
        >
            <MainContainer hideCommentDrawer={hideCommentDrawer} openDrawer={openDrawer} selectedGem={selectedGem} user={user} onResponded={onResponded} />
        </Drawer>
    )
}

export default CommentDrawer