import BioServiceComponent from "@components/common/BioServiceComponent";
import { Bio_Services, Donation_Bio_Services, MediaType_Bio_Services, Meeting_Bio_Services, Profile_Bio_Services,Layout_Bio_Services, Contact_Bio_Services } from "@utils/constants";
import { Input, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const BioModal = ({openModal,setOpenModal,setSelectedMediaType,setOpenDrawer,setSelectedNoteType,setSelectedFileType,setSelectedPlatform,setSelectedProfileType}) => {
    const { isMobileView } = useSelector((state) => state.app);

    const [searchTerm, setSearchTerm] = useState('');

    const filterServices = (services) => {
        if (!searchTerm) return services;
        return services.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()));
    };


    const modalTitle = (
        <div className="w-full flex items-center justify-center">
            <div className="font-medium text-md">Add to Curateit Bio</div>
        </div>
    )

    return(
        <>
        {
        openModal &&
        <Modal
          title={modalTitle}
          open={openModal}
          footer={null}
          maskClosable={false}
          onCancel={() => setOpenModal(false)}
          width={isMobileView ? "90%" : "70%"}
          style={{
            top:20
          }}
        >   
            <Input 
                placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                    className="w-full rounded-lg mb-4"
                    size="large"
            />

            <div style={{
            height: 'calc(100vh - 100px)',
            overflowY:'auto'
          }}>
                {filterServices(Bio_Services)?.length > 0 && <div className="w-full pb-4">
                    <div className="font-medium text-base">
                        Share your content 
                    </div>
                    <div className="text-sm text-[#676b5f]">
                        Share content directly on your Curateit
                    </div>
                </div>}

                {/* services */}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                    {
                    filterServices(Bio_Services)?.map((item,i) => {
                        return(
                            <BioServiceComponent
                                item={item}
                                index={i}
                                type='services'
                                setSelectedMediaType={setSelectedMediaType}
                                setOpenDrawer={setOpenDrawer}
                                setOpenModal={setOpenModal}
                                setSelectedFileType={setSelectedFileType}
                                setSelectedPlatform={setSelectedPlatform}
                            />
                        )
                    })
                    }
                </div>

                {/* profile */}

                {filterServices(Profile_Bio_Services)?.length > 0 && 
                <>
                <hr className="my-4"/>
                <div className="w-full pb-4">
                    <div className="font-medium text-base">
                        Profile 
                    </div>
                    <div className="text-sm text-[#676b5f]">
                        Add Profile directly on your Curateit
                    </div>
                </div>
                </>
                }

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                    {
                    filterServices(Profile_Bio_Services)?.map((item,i) => {
                        return(
                            <BioServiceComponent
                                item={item}
                                index={i}
                                type='profile'
                                setSelectedMediaType={setSelectedMediaType}
                                setOpenDrawer={setOpenDrawer}
                                setOpenModal={setOpenModal}
                                setSelectedNoteType={setSelectedNoteType}
                                setSelectedPlatform={setSelectedPlatform}
                            />
                        )
                    })
                    }
                </div>

                {/* contact */}

                {filterServices(Contact_Bio_Services)?.length > 0 && 
                <>
                <hr className="my-4"/>
                <div className="w-full pb-4">
                    <div className="font-medium text-base">
                        Contact 
                    </div>
                    <div className="text-sm text-[#676b5f]">
                        Add contact form directly on your Curateit
                    </div>
                </div>
                </>
                }

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                    {
                    filterServices(Contact_Bio_Services)?.map((item,i) => {
                        return(
                            <BioServiceComponent
                                item={item}
                                index={i}
                                type='contact'
                                setSelectedMediaType={setSelectedMediaType}
                                setOpenDrawer={setOpenDrawer}
                                setOpenModal={setOpenModal}
                                setSelectedProfileType={setSelectedProfileType}
                                setSelectedPlatform={setSelectedPlatform}
                            />
                        )
                    })
                    }
                </div>

                {/* donations */}

                {filterServices(Donation_Bio_Services)?.length > 0 && 
                <>
                <hr className="my-4"/>
                <div className="w-full pb-4">
                    <div className="font-medium text-base">
                        Payments & Donations 
                    </div>
                    <div className="text-sm text-[#676b5f]">
                        Add payments & donations directly on your Curateit
                    </div>
                </div>
                </>
                }

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                    {
                    filterServices(Donation_Bio_Services)?.map((item,i) => {
                        return(
                            <BioServiceComponent
                                item={item}
                                index={i}
                                type='profile'
                                setSelectedMediaType={setSelectedMediaType}
                                setOpenDrawer={setOpenDrawer}
                                setOpenModal={setOpenModal}
                            />
                        )
                    })
                    }
                </div>

                {/* Meeting */}

                {filterServices(Meeting_Bio_Services)?.length > 0 &&  
                <>
                <hr className="my-4"/>
                <div className="w-full pb-4">
                    <div className="font-medium text-base">
                        Book Meeting 
                    </div>
                    <div className="text-sm text-[#676b5f]">
                        Add meeting directly on your Curateit
                    </div>
                </div>
                </>
                }

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                    {
                    filterServices(Meeting_Bio_Services)?.map((item,i) => {
                        return(
                            <BioServiceComponent
                                item={item}
                                index={i}
                                type='profile'
                                setSelectedMediaType={setSelectedMediaType}
                                setOpenDrawer={setOpenDrawer}
                                setOpenModal={setOpenModal}
                            />
                        )
                    })
                    }
                </div>

                {/* layout */}

                {filterServices(Layout_Bio_Services)?.length>0 && 
                <>
                <hr className="my-4"/>
                <div className="w-full pb-4">
                    <div className="font-medium text-base">
                        Layout
                    </div>
                </div>
                </>
                }

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                    {
                    filterServices(Layout_Bio_Services)?.map((item,i) => {
                        return(
                            <BioServiceComponent
                                item={item}
                                index={i}
                                type='media_type'
                                setSelectedMediaType={setSelectedMediaType}
                                setOpenDrawer={setOpenDrawer}
                                setOpenModal={setOpenModal}
                                setSelectedNoteType={setSelectedNoteType}
                            />
                        )
                    })
                    }
                </div>

                {/* media types */}
                {filterServices(MediaType_Bio_Services)?.length>0 && 
                <>
                <hr className="my-4"/>
                <div className="w-full pb-4">
                    <div className="font-medium text-base">
                        Media Types 
                    </div>
                    <div className="text-sm text-[#676b5f]">
                        Select from our curateit media types
                    </div>
                </div>
                </>
                }

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full">
                    {
                    filterServices(MediaType_Bio_Services)?.map((item,i) => {
                        return(
                            <BioServiceComponent
                                item={item}
                                index={i}
                                type='media_type'
                                setSelectedMediaType={setSelectedMediaType}
                                setOpenDrawer={setOpenDrawer}
                                setOpenModal={setOpenModal}
                                setSelectedNoteType={setSelectedNoteType}
                            />
                        )
                    })
                    }
                </div>

            </div>
        </Modal>
        }
        </>
    )
}

export default BioModal;