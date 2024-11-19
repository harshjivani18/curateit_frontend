import { ChevronRightIcon } from "@heroicons/react/24/outline";
import session from "@utils/session";
import { useSearchParams,
         useRouter }        from "next/navigation";

const OptionComponent = ({item,currentSidebar='',setCurrentSidebar=()=>{},isMobile=false,setMobileCurrentSidebar=()=>{}}) => {
    const searchParams = useSearchParams();
    const navigate     = useRouter()
    return(
        <>
        {
        !isMobile ?
        <>
        <div className={`flex items-center mb-4 cursor-pointer p-2 ${currentSidebar === item.title ? 'bg-[#E5F0FF] hover:bg-[#E5F0FF]' : 'hover:bg-[#F8F8F8]' }`}
        onClick={() => {
            if (searchParams.get("billing") && item.title !== "Billing") {
              navigate.push(`/u/${session.username}/edit-profile`);
            }
            setCurrentSidebar(item.title);
        }}
        >
            {item?.icon}
            <span className={`${item.title === 'Delete Account' ? "text-[#E23434]" : 'text-black'}`}>{item?.title}</span>
        </div>
        </>
        :
        <>
        <div className="flex items-center justify-between w-full py-4" onClick={() => {
            if (searchParams.get("billing") && item.title !== "Billing") {
              navigate.push(`/u/${session.username}/edit-profile`);
            }
            setMobileCurrentSidebar(item.title);
        }}> 
            <div className="flex items-center">
                {item?.icon}
                <div className={`font-medium text-base ${item.title === 'Delete Account' ? "text-[#E23434]" : 'text-black'}`}>{item.title}</div>
            </div>
            {item.title !== 'Delete Account' && <ChevronRightIcon className="h-4 w-4 cursor-pointer"/>}
        </div>
        </>
        }
        </>
    )
}

export default OptionComponent;