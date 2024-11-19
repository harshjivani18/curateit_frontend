import { getBookmarkInBio } from "@actions/collection";
import AddBookmark from "@components/drawers/AddBookmark";
import session from "@utils/session";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import ContactBlock from "./ContactBlock";
import { deleteBookmark } from "@actions/bookmark";

const BioContact = ({user,bioContactId}) => {
    const dispatch = useDispatch()
    const [loadingState, setLoadingState] = useState(false);
    const [blocksContact, setBlocksContact] = useState([]);
    const [openDrawer, setOpenDrawer]           = useState(false)

    useEffect(() => {
      if(bioContactId){

        const getCall = async() => {
            setLoadingState(true)
            const res = await dispatch(getBookmarkInBio(bioContactId, 1))
            if(res){
            const uniqueData = [...blocksContact, ...res?.payload?.data?.collection?.gems || []].filter((value, index, self) => 
                index === self.findIndex((v) => (
                    v.id === value.id
                ))
            );

            setBlocksContact(uniqueData || []);
            setLoadingState(false)
            }
        }

        getCall()
      }
    },[bioContactId,])

    const handleDelete = (block) => {
        const data = blocksContact.filter(item => item.id !== block.id)
        setBlocksContact(data)
        dispatch(deleteBookmark(block.id))
    }

    if(loadingState){
        return(
            <div className="spinDiv">
                <Spin size="middle" tip="Loading..." />
            </div>
        )
    }

    return(
        <>
        {
        blocksContact?.length >0 ? 
        <div className="flex items-center justify-center mt-4">
        {
        blocksContact?.map((item) => {
            return(
                <div key={item?.id}>
                    <ContactBlock
                        item={item}
                        handleDelete={handleDelete}
                    />
                </div>
            )
        })
        }
        </div>
        :
        <div className="text-xl flex justify-center items-center">
          <div className="relative mt-2">
                <img
                  className="h-50 w-50 my-0 mx-auto"
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                  alt="Cloud ellipse icons"
                />
                <div className="justify-center w-full text-xs text-center text-gray-400">
                  No Contact Form!
                </div>
          </div>
        </div>
        }
        {user?.userDetails?.id === Number(session.userId) &&  blocksContact?.length === 0 && <div className={`fixed bottom-10 right-5 cursor-pointer bg-[#347AE2] text-white p-3 rounded-xl shadow-lg z-[999]`} 
        onClick={() => {
            setOpenDrawer(true)
        }}
        >
            <HiOutlinePlus className="h-6 w-6 text-white"/>
        </div>}

        {
        openDrawer &&
        <AddBookmark open={openDrawer} setOpen={setOpenDrawer} page={'bio-contact'} 
        selectedMediaType={'Profile'}
        setBlocksContact={setBlocksContact} blocksContact={blocksContact}
        />
        }
        </>
    )
}

export default BioContact;