import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "@actions/app";
import { usePathname, useRouter } from "next/navigation";
import Dashboard from "@containers/dashboard/Dashboard";
import { Layout } from 'antd' 

const AnalyticsDrawer = ({
    open,
    setOpenDrawer
}) => {
    const pathname = usePathname();
    const navigate = useRouter();
    const dispatch = useDispatch();
    const {isMobileView,} = useSelector(state => state.app)
    const  { Content } = Layout;


    return (
        <>
            <Drawer
                placement={isMobileView  ? 'bottom' : 'right'}
                height={isMobileView ? '90%' : 'inherit'}
                width={isMobileView ? '90%' : '460px'}
                title={null}
                footer={null}
                onClose={() => {
                    // if (action === "edit") {
                        navigate.push(pathname);
                        setOpenDrawer(false);
                        // return;
                    // }
                    dispatch(openDrawer(""));
                }}
                open={open}
                maskClosable={isMobileView ? true :false}
                bodyStyle={{
                    padding: 0
                    // padding: action !== "create" && isMobileView ? "24px 8px" : "24px",
                }}
            >
                <Dashboard isSticky={false} dashUrl={window.location.href} showClearFilter={false} />
                {/* <div className="h-full">
                <Content style={{
                  padding: '16px',
                  paddingLeft: '16px',
                  backgroundColor: '#FCFCFD',
                  paddingTop: '110px'
                }}>
                  <Dashboard />
                </Content>
              </div> */}
            </Drawer>

        </>
    )
}

export default AnalyticsDrawer;
