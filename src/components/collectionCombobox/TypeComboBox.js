import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { BiNotepad,
         BiUserCircle } from 'react-icons/bi'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { 
         RiDoubleQuotesL,
         RiScreenshot2Line,
         RiArticleLine,
         RiEdit2Line,
         RiRobotLine, 
         RiAlignCenter,
         RiTextSpacing} from 'react-icons/ri'
import { ChevronDownIcon, ChevronUpIcon, 
         MagnifyingGlassIcon, SpeakerWaveIcon, 
         CodeBracketIcon, PhotoIcon,
         VideoCameraIcon, LinkIcon,
         ShoppingBagIcon,
         FilmIcon,
         BookOpenIcon,
         DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { TbSocial } from 'react-icons/tb'
import { TfiWrite } from 'react-icons/tfi'
import { LiaBlogSolid } from "react-icons/lia"

const optionData = [
    {
        id: 1,
        name: 'Audio',
    },
    {
        id: 2,
        name: 'Code',
    },
    {
        id: 3,
        name: 'Image',
    },
    {
        id: 4,
        name: 'Note',
    },
    {
        id: 5,
        name: 'Video',
    },
    {
        id: 6,
        name: 'Link',
    },
    {
        id: 7,
        name: 'PDF',
    },
    {
        id: 8,
        name: 'Article',
    },
    {
        id: 9,
        name: 'Highlight',
    },
    {
        id: 10,
        name: 'App',
    },
    {
        id: 11,
        name: 'Product',
    },
    {
        id: 12,
        name: 'Book',
    },
    {
        id: 13,
        name: 'Movie',
    },
    {
        id: 14,
        name: 'Profile',
    },
    {
        id: 15,
        name: 'Ai Prompt',
    },
    {
        id: 16,
        name: 'Text Expander',
    },
    {
        id: 17,
        name: 'Quote',
    },
    {
        id: 18,
        name: 'Screenshot',
    },
    {
        id: 19,
        name: 'SocialFeed',
    },
    {
        id: 20,
        name: 'Citation',
    },
    {
        id: 21,
        name: 'Testimonial',
    },
    {
        id: 22,
        name: 'Blog',
    }
]

const optionDataAdd = optionData.filter(item => item.name !== 'Highlight' && item.name !== 'Screenshot')

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TypeComboBox({ inputShown,setShowTypeInput, setSelectedType, type,disabled=false,action='',page='',publicOptionData=[] }) {
    const [query, setQuery] = useState('')

    const mediaTypeData =
      (action === "add" && !page)
        ? optionDataAdd
        : (action === "add" && page === "public")
        ? optionData.filter((item) => publicOptionData.includes(item.name))
        : optionData;

    //initializing type value
    const [selectedOption, setSelectedOption] = useState(null)
  
    useEffect(() => {
        if(type && !selectedOption){
            const typeVal        = typeof type === "object" ? type?.name : type 
            const selectedObjArr = typeVal ? mediaTypeData.filter(item => item.name === typeVal) : []
            const selectedObj    = selectedObjArr.length !== 0 ? selectedObjArr[0] : null
            setSelectedOption({
            id: selectedObj ? selectedObj.id : 6, 
            name: selectedObj ? selectedObj.name : "Link"})
        }

        if (type && selectedOption && typeof type === "string") {
          const typeVal = typeof type === "object" ? type?.name : type;
          const selectedObjArr = typeVal
            ? mediaTypeData.filter((item) => item.name === typeVal)
            : [];
          const selectedObj =
            selectedObjArr.length !== 0 ? selectedObjArr[0] : null;
          setSelectedOption({
            id: selectedObj ? selectedObj.id : 6,
            name: selectedObj ? selectedObj.name : "Link",
          });
        }
    },[type])

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Escape") {
                setShowTypeInput(false);
            }
        }

        if (typeof window !== "undefined") window.addEventListener("keydown", handleKeyPress);

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("keydown", handleKeyPress);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //Set selected type value
    useEffect(()=>{
        if(selectedOption && setSelectedType){
        setSelectedType(selectedOption)
        if(setShowTypeInput){
        setShowTypeInput(false)
        }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption,type])

    //Get type list
    const filteredOptionData =
        query === ''
            ? mediaTypeData
            : mediaTypeData.filter((data) => {
                return data.name.toLowerCase().includes(query.toLowerCase())
            })

    const handleOptionChange = (e) => {
        setSelectedOption({
            id: e.id,
            name: e.name
        })

    }

    return (
        <Combobox as="div" value={selectedOption} onChange={handleOptionChange} disabled={disabled}>
            <div className="relative">
                <div className='relative'>
                    {selectedOption?.id ?
                        (
                            <>
                                {selectedOption?.name === "Audio" && <SpeakerWaveIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Book" && <BookOpenIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Ai Prompt" && <RiRobotLine className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Profile" && <BiUserCircle className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Movie" && <FilmIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Quote" && <RiDoubleQuotesL className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Screenshot" && <RiScreenshot2Line className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "SocialFeed" && <TbSocial className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Product" && <ShoppingBagIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "App" && <DevicePhoneMobileIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Code" && <CodeBracketIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Text Expander" && <RiTextSpacing className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Note" && <BiNotepad className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Video" && <VideoCameraIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "PDF" && <AiOutlineFilePdf className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Link" && <LinkIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Image" && <PhotoIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Article" && <RiArticleLine className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Highlight" && <RiEdit2Line className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}                                
                                {selectedOption?.name === "Citation" && <RiAlignCenter className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Testimonial" && <TfiWrite className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                                {selectedOption?.name === "Blog" && <LiaBlogSolid className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />}
                            </>
                            )
                        : <MagnifyingGlassIcon
                            className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        />}
                    <Combobox.Input
                        className={`w-full outline-none rounded-md pl-8 py-2 pr-10 shadow-sm text-sm ${disabled ? 'cursor-not-allowed type-combobox-input-disable': 'type-combobox-input'}`}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={inputShown && !selectedOption?.id ? "Search or create new collection..." : selectedOption?.name && selectedOption?.name}
                        displayValue={(optionData) => !inputShown ? optionData?.name : ""}
                        disabled={disabled}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none" disabled={disabled}>
                        {inputShown ? <ChevronUpIcon className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`} aria-hidden="true" /> : <ChevronDownIcon className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`} aria-hidden="true" />}
                    </Combobox.Button>
                </div>

                {(filteredOptionData.length > 0) && (
                    <Combobox.Options static={inputShown} className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredOptionData?.map((option) => (
                            <Combobox.Option
                                disabled={disabled}
                                key={option.id}
                                value={option}
                                className='ct-relative cursor-default select-none py-2 pl-3 pr-9 text - gray - 900'>
                                {({ active, selected }) => (
                                    <>
                                        {option?.name === "Audio" && (
                                            <>
                                                <div className="flex items-center">
                                                    <SpeakerWaveIcon className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Screenshot" && (
                                            <>
                                                <div className="flex items-center">
                                                    <RiScreenshot2Line className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Quote" && (
                                            <>
                                                <div className="flex items-center">
                                                    <RiDoubleQuotesL className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Ai Prompt" && (
                                            <>
                                                <div className="flex items-center">
                                                    <RiRobotLine className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Text Expander" && (
                                            <>
                                                <div className="flex items-center">
                                                    <RiTextSpacing className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Profile" && (
                                            <>
                                                <div className="flex items-center">
                                                    <BiUserCircle className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "SocialFeed" && (
                                            <>
                                                <div className="flex items-center">
                                                    <TbSocial className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Movie" && (
                                            <>
                                                <div className="flex items-center">
                                                    <FilmIcon className="h-4 w-4 text-gray-500"/>
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Book" && (
                                            <>
                                                <div className="flex items-center">
                                                    <BookOpenIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Product" && (
                                            <>
                                                <div className="flex items-center">
                                                    <ShoppingBagIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "App" && (
                                            <>
                                                <div className="flex items-center">
                                                    <DevicePhoneMobileIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Code" && (
                                            <>
                                                <div className="flex items-center">
                                                    <CodeBracketIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Note" && (
                                            <>
                                                <div className="flex items-center">
                                                    <BiNotepad className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "Video" && (
                                            <>
                                                <div className="flex items-center">
                                                    <VideoCameraIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                        {option?.name === "PDF" && (
                                            <>
                                                <div className="flex items-center">
                                                    <AiOutlineFilePdf className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}

                                        {option?.name === "Link" && (
                                            <>
                                                <div className="flex items-center">
                                                    <LinkIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}

                                        {option?.name === "Image" && (
                                            <>
                                                <div className="flex items-center">
                                                    <PhotoIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}

                                    {option?.name === "Article" && (
                                            <>
                                                <div className="flex items-center">
                                                    <RiArticleLine className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}

                                        {option?.name === "Highlight" && (
                                            <>
                                                <div className="flex items-center">
                                                    <RiEdit2Line className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}

                                        {option?.name === "Citation" && (
                                            <>
                                                <div className="flex items-center">
                                                    <RiAlignCenter className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}

                                        {option?.name === "Testimonial" && (
                                            <>
                                                <div className="flex items-center">
                                                    <TfiWrite className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}

                                        {option?.name === "Blog" && (
                                            <>
                                                <div className="flex items-center">
                                                    <LiaBlogSolid className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                                    <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
                                                </div>
                                                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm'>
                                                    {option.count}
                                                </span>
                                            </>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}