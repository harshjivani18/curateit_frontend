import { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, FolderIcon, FolderOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ParentTagComboBox({ inputShown, setShowCollectionInput, tagData,setSelectedTag,isSubTag,selectedTag,action='',disabled=false}) {
    const [query, setQuery] = useState('')
    const allTags   = tagData
    //Set selected collection
    useEffect(()=>{
        if(setShowCollectionInput && setSelectedTag){
            setSelectedTag(selectedTag)
            setShowCollectionInput(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTag])

    const onCollectionChange = (e) => {
        if (typeof e === "object") {
            setSelectedTag(e)
        }else{
            setSelectedTag(e)
        }
    }

    const filteredOptions = 
        query === ''
            ? allTags
            : allTags.filter((option) => {
                return option.tag.toLowerCase().includes(query.toLowerCase())
            })
            
    return (
        <>
        <Combobox as="div" value={selectedTag} onChange={onCollectionChange} disabled={disabled}>
            <div className="relative">
                <div className='relative'>
                    {(selectedTag?.id || selectedTag) ?
                        <FolderOpenIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                        : <MagnifyingGlassIcon
                            className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        />}
                    <Combobox.Input   
                        className={`save-input-box w-full outline-none rounded-md border border-gray-300 bg-white pl-8 py-2 pr-6 shadow-sm text-sm ${inputShown? 'text-gray-400':''} ${disabled ? 'cursor-not-allowed type-combobox-input-disable': 'type-combobox-input'}`}
                        placeholder={'Select'}
                        displayValue={(collectionData) => collectionData?.tag || selectedTag?.tag || selectedTag}  
                        onChange={(event) => setQuery(event.target.value)}
                        disabled={disabled}
                    />

                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md pr-2 focus:outline-none" disabled={disabled}>
                        {inputShown ? <ChevronUpIcon className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`} aria-hidden="true" disabled={disabled}/> : <ChevronDownIcon className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`} aria-hidden="true" disabled={disabled}/>}
                    </Combobox.Button>
                </div>

                {filteredOptions?.length > 0 && (
                    <Combobox.Options static={inputShown} className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {
                        isSubTag === false &&
                        <Combobox.Option
                            value={'Parent folder'}
                            className='relative select-none py-2 pl-3 pr-9 cursor-pointer'>
                            <div className="flex items-center">
                                <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                <span className={classNames('ml-3 truncate text-sm')}>{'Parent folder'}</span>
                            </div>
                        </Combobox.Option>
                        }
                        {
                        isSubTag && <Combobox.Option
                            value={'Make it parent folder'}
                            className='relative select-none py-2 pl-3 pr-9 cursor-pointer'>
                            <div className="flex items-center">
                                {/* <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" /> */}
                                <span className={classNames('ml-3 truncate text-sm text-blue-500')}>{'Make it parent folder'}</span>
                            </div>
                        </Combobox.Option>
                        }
                        {
                        action === 'create' &&
                        <Combobox.Option
                            value={'Parent folder'}
                            className='relative select-none py-2 pl-3 pr-9 cursor-pointer'>
                            <div className="flex items-center">
                                <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                <span className={classNames('ml-3 truncate text-sm')}>{'Parent folder'}</span>
                            </div>
                        </Combobox.Option>
                        }
                        {filteredOptions?.map((option) => (
                            <Combobox.Option
                                key={option.id}
                                value={option}
                                className='relative cursor-default select-none py-2 pl-3 pr-9 text - gray - 900'>
                                {({ active, selected }) => (
                                    <>
                                        <div className="flex items-center">
                                            {selected ? <FolderOpenIcon className="h-4 w-4 text-gray-500" aria-hidden="true" /> : <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />}
                                            <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.tag}</span>
                                        </div>
                                       
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
        </>
    )
}
