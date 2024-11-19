import { useEffect, useState }             from 'react';
import { Button, Select, 
         Input, 
         Dropdown,
         message,
         Tag}                from 'antd';
import { MdMore, MdMoreVert, MdSearch }             from 'react-icons/md';


import session                  from '@utils/session';
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import { BsPencil, BsTrash } from 'react-icons/bs';

// const { Option }  = Select;

const AIAntSelect = ({ items, value, onChange, newItemLabel, onNewItemCreate, onEditClick=null, onDeleteClick=null, type="personas" }) => {
    const [searchTerm, setSearchTerm]       = useState("")
    const [filteredItems, setFilteredItems] = useState(items)
    const [selectedItem, setSelectedItem]   = useState(value)

    useEffect(() => {
        setFilteredItems([ ...items ])
    }, [items])

    useEffect(() => {
        setSelectedItem(value)
    }, [value])

    const renderItem = (item) => {
        const defaultItems = [
            {
                label: "Set as default",
                key: "set_as_default",
                icon: <CheckCircleIcon className='h-4 w-4 mr-2' />
            }
        ]
        if (item.author) {
            defaultItems.push({
                label: "Edit",
                key: "edit",
                icon: <BsPencil className='h-4 w-4 mr-2' />
            })
            defaultItems.push({
                label: "Delete",
                key: "delete",
                icon: <BsTrash className='h-4 w-4 mr-2' />,
                danger: true
            })
        }
        return (
            <div className='flex items-center justify-between'>
                <span>{item.name}</span>
                {item.id === parseInt(value) && <div className='flex items-center'>
                    <Tag color="green" className='mr-2'>Default</Tag>
                    <BsPencil className='h-4 w-4 ct-ant-selected-btn' onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onEditClick && onEditClick(item)
                        return false
                    }}/>
                </div>}
                {item.id !== parseInt(value) && <Dropdown menu={{
                    items: defaultItems,
                    onClick: (e) => {
                        e.domEvent?.preventDefault()
                        e.domEvent?.stopPropagation()
                        const { key } = e
                        if (parseInt(value) === item.id && key === "delete") {
                            message.error("You can't delete the default item")
                            return
                        }
                        if (key === "set_as_default" && onChange) {
                            onChange(item.id)
                            return false
                        }
                        else if (key === "edit" && onEditClick) {
                            onEditClick(item)
                            return false
                        }
                        else if (key === "delete" && onDeleteClick) {
                            onDeleteClick(item)
                            return false
                        }
                    }
                }}>
                    <MdMoreVert className='h-5 w-5' />
                </Dropdown>}
            </div>
        )
    }

    return (
        <Select 
            style={{
                width: "100%",
            }}
            className='mb-6 ct-ai-ant-select-box'
            value={selectedItem}
            onChange={(value) => {
                setSelectedItem(value)
                onChange(value)
            }}
            dropdownRender={(menu) => (
                <>
                    <Input placeholder="Search" 
                           prefix={<MdSearch style={{ color: "rgba(0,0,0,.25)" }} />}
                           value={searchTerm}
                           onChange={(e) => {
                                const { value } = e.target;
                                setSearchTerm(value)
                                if (value === "") {
                                    setFilteredItems(items)
                                    return;
                                }
                                setFilteredItems(items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())))
                           }}
                           style={{
                                width: "98%",
                           }}
                           className='ct-ant-ai-input-search'
                    />
                    <Button type='text' onClick={onNewItemCreate} className='ct-ant-ai-select-btn'>
                        {newItemLabel}
                    </Button>
                    {menu}
                </>
            )}
            options={[
                {
                    label: <span>{`Saved ${type}`}</span>,
                    title: `Saved ${type}`,
                    options: filteredItems.filter((item) => item.author && item.author.id === parseInt(session.userId)).map((item) => {
                        return {
                            label: renderItem(item),
                            value: item.id,
                        }
                    })
                },
                {
                    label: <span>{`Suggested ${type}`}</span>,
                    title: `Suggested ${type}`,
                    options: filteredItems.filter((item) => item.author === null).map((item) => {
                        return {
                            label: renderItem(item),
                            value: item.id,
                        }
                    })
                }
            ]}
        />
    )
}

export default AIAntSelect;