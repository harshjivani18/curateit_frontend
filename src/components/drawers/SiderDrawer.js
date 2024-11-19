import { setIsMobileSidebar } from "@actions/app"
import InnerSidebar from "@components/sidebars/InnerSidebar"
import { Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"

const SiderDrawer = () => {
    const dispatch = useDispatch()
    const {isMobileSidebar} = useSelector(state => state.app)
    return(
        <>
        <Drawer
        width={'90%'}
        closable={false}
        // title={title}
        placement="left" 
        onClose={() => dispatch(setIsMobileSidebar(false))}
        open={isMobileSidebar}
        footer={null}>
        <InnerSidebar
            isFooter={true}
        />
        </Drawer>
        </>
    )
}

export default SiderDrawer