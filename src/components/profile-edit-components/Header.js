import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderComponent = ({handleGoBack=()=>{},isMobile=false,mobileCurrentSidebar,handleGoBackOptions=()=>{}}) => {
    return(
        <>
        {
        !isMobile ?
        <Header style={{background:'white',height:'fit-content',padding:'0px',display:'flex',flexDirection:'column',width: 'calc(100% - 64px)',position:'fixed',zIndex:100}}>
            <div className="flex items-center h-[64px] pl-2">
                <ArrowLeftIcon className='h-5 w-5 cursor-pointer mr-4' onClick={handleGoBack} />
                <span className="text-[#292B38] text-lg">Account Settings</span>
            </div>
            <hr className="h-[1px] border-[#97A0B5]" style={{width: 'calc(100% - 64px)'}}/>
        </Header>
        :
        <>
        <div className="w-full flex items-center justify-between px-4">
            <ArrowLeftIcon className='h-5 w-5 cursor-pointer' onClick={handleGoBackOptions} />
            <span className="text-[#292B38] text-lg block font-semibold">{mobileCurrentSidebar}</span>
            <div></div>
        </div>
        <hr className="h-[1px] border-[#E4E7EC] w-full mt-4"/>
        </>
        }
        </>
    )
}

export default HeaderComponent;