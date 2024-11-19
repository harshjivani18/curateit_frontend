import { Bars3BottomLeftIcon, Bars3BottomRightIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { HIGHLIGHTED_COLORS } from "@utils/constants";
import {  Modal } from "antd";
import { useState } from "react";
import { MdOutlineFormatItalic, MdOutlineFormatUnderlined, MdOutlineVerticalAlignBottom, MdOutlineVerticalAlignCenter, MdOutlineVerticalAlignTop } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";
import { SketchPicker } from 'react-color'
import { BiBold } from "react-icons/bi";
import { RiFontSize } from "react-icons/ri";

const BioMoreOptionModal = ({openMoreOptionModal, setOpenMoreOptionModal,selectedItem,handleChangeOtherOptions,setSelectedItem,optionType='',handleChangeColorOptions,setOptionType,setSelectedBlock}) => {
    const [showColorOptions,setShowColorOptions] = useState(false)
    return(
        <>
        {openMoreOptionModal && <Modal
          title={null}
          open={openMoreOptionModal}
          footer={null}
          maskClosable={true}
          onCancel={() => {
            setOpenMoreOptionModal(false)
            setSelectedItem(null)
            setOptionType('')
            setSelectedBlock(null)
        }}
          width={"fit-content"}
          style={{
            top:20
          }}
          bodyStyle={{
            padding:'0px',
            width:'fit-content'
          }}
          closable={false}
        >
        {
        !optionType ?
        <div className="flex items-center justify-center">
            <div className={`flex flex-col w-fit items-center bg-black p-1 group-hover:flex drag-cancel h-auto`}>
                                <div className="flex items-center">
                                    <div className="cursor-pointer flex items-center">
                                        <div className={`p-1 rounded-md ${selectedItem.media.textAlign === 'left' ? 'bg-white text-black' : 'text-white'}`}>
                                            <Bars3BottomLeftIcon className='h-5 w-5' 
                                            onClick={(e) => handleChangeOtherOptions(e,'text-align','left',selectedItem)}/>
                                        </div>

                                        <div className={`p-1 rounded-md ${selectedItem.media.textAlign === 'center' ? 'bg-white text-black' : 'text-white'}`}>
                                            <Bars3CenterLeftIcon  className='h-5 w-5 mx-1' onClick={(e) => handleChangeOtherOptions(e,'text-align','center',selectedItem)}/>
                                        </div>
                                        

                                        <div className={`p-1 rounded-md ${selectedItem.media.textAlign === 'right' ? 'bg-white text-black' : 'text-white'}`}>
                                            <Bars3BottomRightIcon className='h-5 w-5' onClick={(e) => handleChangeOtherOptions(e,'text-align','right',selectedItem)}/>
                                        </div>
                                        
                                    </div>

                                    <TbMinusVertical className="h-5 w-5 text-[#2e2e2e]"/>

                                    <div className="cursor-pointer flex items-center">
                                        <div className={`p-1 rounded-md ${selectedItem.media.justifyContent === 'flex-start' ? 'bg-white text-black' : 'text-white'}`}>
                                            <MdOutlineVerticalAlignTop className='h-5 w-5' 
                                            onClick={(e) => handleChangeOtherOptions(e,'justify-content','flex-start',selectedItem)}/>
                                        </div>
                                        
                                        <div className={`p-1 rounded-md ${selectedItem.media.justifyContent === 'center' ? 'bg-white text-black' : 'text-white'}`}>
                                            <MdOutlineVerticalAlignCenter className='h-5 w-5 mx-1' onClick={(e) => handleChangeOtherOptions(e,'justify-content','center',selectedItem)}/>
                                        </div>

                                        <div className={`p-1 rounded-md ${selectedItem.media.justifyContent === 'flex-end' ? 'bg-white text-black' : 'text-white'}`}>
                                            <MdOutlineVerticalAlignBottom className='h-5 w-5' onClick={(e) => handleChangeOtherOptions(e,'justify-content','flex-end',selectedItem)}/>
                                        </div>
                                        
                                    </div>

                                    <TbMinusVertical className="h-5 w-5 text-[#2e2e2e]"/>

                                    <div 
                                    className={`p-1 rounded-md ${showColorOptions ? 'bg-white' : ''}`}
                                    >
                                        <div className="rounded-full h-5 w-5 cursor-pointer border border-solid border-gray-400" 
                                        style={{background: selectedItem.media.color.colorCode}} onClick={() => setShowColorOptions(!showColorOptions)}></div>
                                    </div>
                                </div>

                                {
                                showColorOptions && 
                                <div className="flex items-center mt-2 w-full justify-around">
                                    {
                                    HIGHLIGHTED_COLORS.map(color => (
                                        <div className={`p-1 rounded-md ${selectedItem.media.color.colorCode === color.bg ? 'bg-white' : ''}`}>
                                            <div 
                                            key={color.id} 
                                            style={{backgroundColor: `${color.bg}`}}
                                            className={`'lex justify-center items-center h-4 w-4 rounded-full border border-solid border-gray-400 cursor-pointer`}
                                            onClick={(e) => handleChangeOtherOptions(e,'color',color,selectedItem)}
                                            >
                                            </div>
                                        </div>
                                    ))
                                    }
                                </div>   
                                }
            </div>
        </div>
        :
        optionType === 'colorPicker' ?
        <div className="flex flex-col items-center justify-center" style={{background:'rgba(0,0,0,0.5)'}}>

        <div className="flex items-center">
            <div className={`h-4 w-4 mr-1`} style={{background: selectedItem?.media?.cardBgColor || ''}}>
            </div>
            <div className="text-white">{selectedItem?.media?.cardBgColor}</div>
        </div>

        <div className='pt-4'>
                <div>
                    <SketchPicker
                    color={selectedItem?.media?.cardBgColor || ''}
                    onChangeComplete={(color) => handleChangeColorOptions(color.hex,selectedItem)}
                    />
                </div>

        </div>
        </div>
        :
        optionType === 'titleAlign' ? 
        <div className="flex items-center justify-center">
            <div className={`flex flex-col w-fit items-center bg-black p-1 group-hover:flex drag-cancel h-auto`}>
                                <div className="flex items-center">
                                    <div className="cursor-pointer flex items-center">
                                        <div className={`p-1 rounded-md ${selectedItem.media.textAlign === 'left' ? 'bg-white text-black' : 'text-white'}`}>
                                            <Bars3BottomLeftIcon className='h-5 w-5' 
                                            onClick={(e) => handleChangeOtherOptions(e,'text-align','left',selectedItem)}/>
                                        </div>

                                        <div className={`p-1 rounded-md ${selectedItem.media.textAlign === 'center' ? 'bg-white text-black' : 'text-white'}`}>
                                            <Bars3CenterLeftIcon  className='h-5 w-5 mx-1' onClick={(e) => handleChangeOtherOptions(e,'text-align','center',selectedItem)}/>
                                        </div>
                                        

                                        <div className={`p-1 rounded-md ${selectedItem.media.textAlign === 'right' ? 'bg-white text-black' : 'text-white'}`}>
                                            <Bars3BottomRightIcon className='h-5 w-5' onClick={(e) => handleChangeOtherOptions(e,'text-align','right',selectedItem)}/>
                                        </div>
                                        
                                    </div>

                                    <TbMinusVertical className="h-5 w-5 text-[#2e2e2e]"/>

                                    <div className="cursor-pointer flex items-center">
                                        <div className={`p-1 rounded-md ${selectedItem.media.fontWeight === true ? 'bg-white text-black' : 'text-white'}`}>
                                            <BiBold className='h-5 w-5' 
                                            onClick={(e) => handleChangeOtherOptions(e,'bold',selectedItem.media.fontWeight === true ? false : true,selectedItem)}/>
                                        </div>
                                        
                                        <div className={`p-1 rounded-md ${selectedItem.media.textItalic === true ? 'bg-white text-black' : 'text-white'}`}>
                                            <MdOutlineFormatItalic className='h-5 w-5 mx-1' onClick={(e) => handleChangeOtherOptions(e,'italic',selectedItem.media.textItalic === true ? false : true,selectedItem)}/>
                                        </div>

                                        <div className={`p-1 rounded-md ${selectedItem.media.textUnderline === true ? 'bg-white text-black' : 'text-white'}`}>
                                            <MdOutlineFormatUnderlined className='h-5 w-5' onClick={(e) => handleChangeOtherOptions(e,'underline',selectedItem.media.textUnderline === true ? false : true,selectedItem)}/>
                                        </div>
                                        
                                    </div>

                                    <TbMinusVertical className="h-5 w-5 text-[#2e2e2e]"/>

                                    <div className="cursor-pointer flex items-center">
                                        <div className={`p-1 rounded-md ${selectedItem.media.fontSize === '12px' ? 'bg-white text-black' : 'text-white'}`}>
                                            <RiFontSize className='h-3 w-3' 
                                            onClick={(e) => handleChangeOtherOptions(e,'fontSize','12px',selectedItem)}/>
                                        </div>
                                        
                                        <div className={`p-1 rounded-md ${selectedItem.media.fontSize === '14px' ? 'bg-white text-black' : 'text-white'}`}>
                                            <RiFontSize className='h-4 w-4 mx-1' onClick={(e) => handleChangeOtherOptions(e,'fontSize','14px',selectedItem)}/>
                                        </div>

                                        <div className={`p-1 rounded-md ${selectedItem.media.fontSize === '18px' ? 'bg-white text-black' : 'text-white'}`}>
                                            <RiFontSize className='h-5 w-5' onClick={(e) => handleChangeOtherOptions(e,'fontSize','18px',selectedItem)}/>
                                        </div>
                                        
                                    </div>
                                </div>
            </div>
        </div> :
        <></>
        }
        </Modal>
        }
        </>
    )
}

export default BioMoreOptionModal;