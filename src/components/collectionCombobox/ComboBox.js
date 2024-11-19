import { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, FolderIcon, FolderPlusIcon, FolderOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd';
import { getAllCollectionWithSub,checkCollectionExists } from '@utils/find-collection-id';
import { addCollections,addCollectionReset,getUserCollections } from '@actions/collection';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ComboBox({ inputShown, setShowCollectionInput, collectionData, userId, setSelectedCollection, selectedCollection, hideCount = false , error,handleCollectionChange,index,isSelectDrawer=false,disabled=false}) {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const [collections, setCollections] = useState(collectionData)
    const [selectedOption, setSelectedOption] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [isQuery, setIsQuery] = useState(false)
    //set collection

    useEffect(()=>{
        if(selectedCollection && !selectedOption?.id){
            setSelectedOption({id:selectedCollection?.id, name: selectedCollection.name ? selectedCollection?.name : selectedCollection?.attributes?.name})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedCollection])

    useEffect(()=>{
        if (collectionData.length === 0) {
            dispatch(getUserCollections()).then((res) => {
                if (res.error === undefined && res.payload.error === undefined) {
                    setCollections(res.payload.data)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    const allCollections   = collectionData.length === 0 ? collections : getAllCollectionWithSub(collectionData)
    const allCollectionsSorted = allCollections.sort((a, b) => {
      if (b.gems_count !== a.gems_count) {
        return b.gems_count - a.gems_count;
      } else {
        return a.id - b.id;
      }
    });
    const uniqueCollectionData = allCollectionsSorted.filter(
      (value, index, self) => index === self.findIndex((v) => v.id === value.id)
    );

    // //Get collection list
    let filteredOptionData =
        query === ''
            ? (uniqueCollectionData? uniqueCollectionData : [])
            : uniqueCollectionData?.filter((data) => {
                return data?.name?.toLowerCase().includes(query.toLowerCase())
            }) 

    

    const addedCollectionData = useSelector(state => state.collections.addedCollectionData)

    //Set selected collection
    useEffect(()=>{
        if(setShowCollectionInput && setSelectedCollection && selectedOption?.id){
            setSelectedCollection(selectedOption)
            setShowCollectionInput(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption])

    //Set new added collection
    useEffect(()=>{
        if(addedCollectionData){
            filteredOptionData?.push({id: addedCollectionData?.id, name: addedCollectionData?.name})
            setSelectedOption({id: addedCollectionData.id, name: addedCollectionData?.name})
            isSelectDrawer && handleCollectionChange({id: addedCollectionData?.id, name: addedCollectionData?.name},index)
            setIsQuery(false)
            dispatch(addCollectionReset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[addedCollectionData])
     
    //Add new collection
    const addCollectionHandler = () => {
        if (query === "") return
        if(query?.toLowerCase() === 'bio'){
            messageApi.open({
                type: 'error',
                content: 'Bio collection name already taken.',
            })
            setQuery('')
            return;
        }
        const result = checkCollectionExists(filteredOptionData,query)
        if(result){
            setQuery("")
             return ( messageApi.open({
            type: 'error',
            content: 'Collection Already Exists',
          }))}
        dispatch(addCollections({
                        data: {
                            name: query,
                            author: userId
                        }
                    }))
        setIsQuery(false)
        setQuery("")
    }

    const onCollectionChange = (e) => {
        if (typeof e === "object") {
            setSelectedOption(e)
            isSelectDrawer && handleCollectionChange(e,index)
        }
    }
            
    return (
        <>
        {contextHolder}
        <Combobox as="div" value={selectedOption} onChange={onCollectionChange} disabled={disabled}>
            <div className="relative">
                <div className='relative'>
                    {isQuery ?
                        <FolderOpenIcon className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400" aria-hidden="true" />
                        : <MagnifyingGlassIcon
                            className="pointer-events-none absolute top-[10px] left-2 h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        />}
                    <Combobox.Input            
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                addCollectionHandler()
                            }
                        }}
                        className={`save-input-box w-full outline-none rounded-md border border-gray-300 bg-white pl-8 py-2 pr-6 shadow-sm text-sm ${inputShown? 'text-gray-400':''} ${disabled ? 'cursor-not-allowed type-combobox-input-disable': 'type-combobox-input'}`}
                        onChange={(event) => setQuery(event.target.value)}
                        onClick={() => setIsQuery(true)}
                        onBlur={() => setIsQuery(false)}          
                        placeholder={isQuery && query === "" ? "Search or create new collection..." : query }
                        displayValue={(collectionData) => isQuery ? query : collectionData?.name}          
                        disabled={disabled}
                    />

                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md pr-2 focus:outline-none" disabled={disabled}>
                        {inputShown ? <ChevronUpIcon className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`} aria-hidden="true" disabled={disabled}/> : <ChevronDownIcon className={`h-4 w-4 ${disabled ? 'text-[#d9d9d9] cursor-not-allowed' : 'text-gray-400'}`} aria-hidden="true" onClick={() => setIsQuery(true)} disabled={disabled}/>}
                    </Combobox.Button>
                </div>

                    {error !== true ? "":(selectedCollection && selectedCollection.id)? '' : <span className='error-label'>Please select a collection</span>}
                {(query?.length > 0 || filteredOptionData.length > 0) && (
                    <Combobox.Options static={inputShown} className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <Combobox.Option
                            disabled={disabled}
                            value={query}
                            className='relative select-none py-2 pl-3 pr-9 cursor-pointer'>
                            <div className="flex items-center" onClick={addCollectionHandler} disabled={disabled}>
                                <FolderPlusIcon className="h-4 w-4 text-blue-500" aria-hidden="true" />
                                <span className='ml-3 truncate text-sm text-blue-500'>{`${query ? `"${query}"` : ""} Type to create new collection `}</span>
                            </div>
                        </Combobox.Option>
                        {filteredOptionData?.map((option) => (
                            <Combobox.Option
                                key={option.id}
                                value={option}
                                className='relative cursor-default select-none py-2 pl-3 pr-9 text - gray - 900'>
                                {({ active, selected }) => (
                                    <>
                                        <div className="flex items-center">
                                            {selected ? <FolderOpenIcon className="h-4 w-4 text-gray-500" aria-hidden="true" /> : <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />}
                                            <span className={classNames('ml-3 truncate text-sm', selected && 'text-gray-400')}>{option.name}</span>
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