import { Modal } from "antd"
import { ForwardIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { speedRead } from "@utils/speed-reader"

const ReaderSettingModal = ({open,onCancel,article,setting,setSetting,setFontFamily, setFontSize,setTextColor}) => {

    const handleSpeedRead = () => {
        const text = article.title + article.textContent
        speedRead(text)
    }

    const handleSetting = (obj) => {
        let newObj = { ...setting, ...obj }
        setSetting(newObj);
        if (obj?.showColorPallate === undefined){
            if (obj.dark_mode){
                setTextColor("#ffffff")
            }else{
                setTextColor("#000000")
            }
        }
    }

    const handleFontSize = (flag) => {
        const changeBy = 0.2
        if (flag === "increase"){
            setFontSize(prev => prev + changeBy)
        } else if (flag === "decrease"){
            setFontSize(prev => prev - changeBy)
        }else{
            setFontSize(1)
        }
    }

    return(
        <>
        <Modal title="Reader Settings"
        open={open}
        // className="welcome-modal-container"
        onCancel={onCancel}
        footer={null}
        >
            <div className='flex flex-col justify-start items-center gap-1 bg-gray-100 p-[0.2rem] rounded-md'>
                            <button 
                            onClick={() => handleSetting({ dark_mode: !setting.dark_mode })} className='close-btn action-btns h-5 w-5 flex justify-center items-center rounded-md'>
                                {setting?.dark_mode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                            </button>
                            <div className='relative'>
                                <button onClick={() => handleSetting({ showFontSize: !setting.showFontSize })} className='close-btn action-btns h-5 w-5 flex justify-center items-center rounded-md'>
                                    {setting?.showFontSize ? <XMarkIcon className="h-4 w-4 text-red-600" /> : <span>T</span>}
                                </button>
                                {setting?.showFontSize && <div className='options-container font-controller'>
                                    <button onClick={() => handleFontSize("increase")} className='large-button change-font-size'>
                                        <span>T</span>
                                    </button>
                                    <button onClick={() => handleFontSize("reset" )} className='small-medium change-font-size'>
                                        <span>T</span>
                                    </button>
                                    <button onClick={() => handleFontSize("decrease")} className='small-button change-font-size'>
                                        <span>T</span>
                                    </button>
                                </div>}
                            </div>
                            <div className='relative'>
                                <button onClick={() => handleSetting({ showFontFamily: !setting.showFontFamily })} className='close-btn action-btns h-5 w-5 flex justify-center items-center rounded-md'>
                                    {setting?.showFontFamily ?  <XMarkIcon className="h-4 w-4 text-red-600" /> : <span className='default-btn'>Aa</span>}
                                </button>
                                {setting?.showFontFamily && <div className="options-container font-controller typography-control-container">
                                    <button onClick={() => setFontFamily("sans-font")} className='text-black'>
                                        <span>Sans</span>
                                    </button>
                                    <button onClick={() => setFontFamily("helvetica-font")} className='text-[#347AE2]'>
                                        <span>Serif</span>
                                    </button>
                                </div>}
                            </div>
                            <button onClick={handleSpeedRead} className='close-btn action-btns h-5 w-5 flex justify-center items-center rounded-md'>
                                <ForwardIcon className="h-4 w-4" />
                            </button>

                            <div className='relative'>
                                <button onClick={() => handleSetting({ showColorPallate: !setting.showColorPallate })} className='close-btn action-btns h-5 w-5 flex justify-center items-center rounded-md'>
                                    {setting?.showColorPallate ?  <XMarkIcon className="h-4 w-4 text-red-600" /> : <img src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/colors-selector.svg`} alt='color-pallate' />}
                                </button>
                            {setting?.showColorPallate && <div className='color-list-container-web'>
                                    <button onClick={() => setTextColor("#000000")} className='bg-[#000000]'></button>
                                    <button onClick={() => setTextColor("#FFFCEA")} className='bg-[#FFFCEA]'></button>
                                    <button onClick={() => setTextColor("#CCDDFF")} className='bg-[#CCDDFF]'></button>
                                    <button onClick={() => setTextColor("#FFECDD")} className='bg-[#FFECDD]'></button>
                                    <button onClick={() => setTextColor("#DBFFDA")} className='bg-[#DBFFDA]'></button>
                                    <button onClick={() => setTextColor("#FFD6D3")} className='bg-[#FFD6D3]'></button>
                                    <button onClick={() => setTextColor("#E0F1B0")} className='bg-[#E0F1B0]'></button>
                                    <button onClick={() => setTextColor("#D8FFF2")} className='bg-[#D8FFF2]'></button>
                                    <button onClick={() => setTextColor("#DBEEFB")} className='bg-[#DBEEFB]'></button>
                                    <button onClick={() => setTextColor("#E3DFFF")} className='bg-[#E3DFFF]'></button>
                                    <button onClick={() => setTextColor("#F7DDFF")} className='bg-[#F7DDFF]'></button>
                                    <button onClick={() => setTextColor("#E4EDF3")} className='bg-[#E4EDF3]'></button>
                                </div>}
                            </div>
            </div>
        </Modal>
        </>
    )
}

export default ReaderSettingModal