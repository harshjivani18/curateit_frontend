"use client"

import { Layout } from "antd";
import OptionComponent from "./OptionComponent";


const { Sider } = Layout;

const Sidebar = ({currentSidebar,setCurrentSidebar,handleOpenDeleteModal=()=>{},options,logout}) => {

    return(
        <>
        <Sider
            trigger={null}
            collapsed={false}
            // width={50}
            className="profile-edit-sidebar"
        >
           <div className="flex flex-col items-start justify-start pt-4 h-full relative">
                <div>
                    {
                    options?.map((item,i) => {
                        return(
                            <div key={i}>
                                <OptionComponent
                                item={item}
                                currentSidebar={currentSidebar} setCurrentSidebar={setCurrentSidebar}
                                handleOpenDeleteModal={handleOpenDeleteModal}
                                />
                            </div>
                        )
                    })
                    }
                </div>

                <div className="profile-edit-sider-footer cursor-pointer px-2" onClick={logout}>
                    <img
                        className="h-5 w-5 mr-4"
                        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/log-out.svg`}
                        alt="logout icon"
                    />
                    <span>Logout</span>
                </div>
            </div>     
        </Sider>
        </>
    )
}

export default Sidebar;