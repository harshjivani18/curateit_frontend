import "./Team.css"
import { useEffect, useState }          from 'react';
import { useDispatch, useSelector }     from "react-redux";
import { Collapse, List, Table,
         Spin, 
         Avatar,
         Modal}                        from "antd";
import { useRouter }                    from "next/navigation";
import slugify                          from "slugify";

import { getSharedCollections, removeShareWithMeCollection }         from "@actions/collection";
import { getSharedTags, removeShareWithMeTag }                from "@actions/tags";
import { RiDeleteBinLine } from "react-icons/ri";

const { Panel } = Collapse;

const ACCESS_TYPES_OBJ = {
    "viewer": "Viewer",
    "editor": "Editor",
    "owner": "Owner"
}

const collectionCols = [
    {
        title: 'Collection Name',
        dataIndex: 'name',
        key: 'name',
        columnWidth: 400,
        render: (val, row) => {
            const navigate                  = useRouter();
            return <div
                        onClick={() => navigate.push(`/u/${row?.author?.username || "default"}/c/${row?.id}/${row?.slug}`)} 
                    >
                        {row.name}
                    </div>
        }
    },
    {
        title: 'Access Type',
        dataIndex: 'accessType',
        key: 'accessType',
    },
    {
        title: 'Shared By',
        dataIndex: 'ownedBy',
        key: 'ownedBy',
        render: (val, row) => {
            return <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={row?.author?.avatar} className='mr-2'>{row?.author?.name ? row?.author?.name?.charAt(0).toUpperCase() : row?.author?.email?.charAt(0).toUpperCase()}</Avatar>}
                    title={
                        <span>{row?.author?.name ? row?.author?.name : row?.author?.email}</span>
                    }
                    description={row?.author?.email}
                />
            </List.Item>
        }
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (val, row) => {
            return <div>
                <RiDeleteBinLine
                    style={{ color: "red" }} 
                    onClick={() => row.onRemoveCollectionClick(row?.id)} 
                />
         </div>
        }
    }
];

const tagCols = [
    {
        title: 'Tag',
        dataIndex: 'name',
        key: 'name',
        columnWidth: 400,
        render: (val, row) => {
            const navigate                  = useRouter();
            return <div
                        onClick={() => navigate.push(`/u/${row?.author?.username || "default"}/tags/${row?.id}/${row?.slug}`)}
                    >
                        {row.name}
                    </div>
        }
    },
    {
        title: 'Access Type',
        dataIndex: 'accessType',
        key: 'accessType',
    },
    {
        title: 'Shared By',
        dataIndex: 'ownedBy',
        key: 'ownedBy',
        render: (val, row) => {
            return <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={row?.author?.avatar} className='mr-2'>{row?.author?.name?.charAt(0).toUpperCase()}</Avatar>}
                    title={
                        <span>{row?.author?.name}</span>
                    }
                    description={""}
                />
            </List.Item>
        }
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (val, row) => {
            return <div>
                <RiDeleteBinLine
                    style={{ color: "red" }} 
                    onClick={() => row.onRemoveTagClick(row?.id)} 
                />
         </div>
        }
    }
];

const collectionColsMobile = [
    {
        title: 'Collection',
        dataIndex: 'name',
        key: 'name',
        width:'40%',
        render: (val, row) => {
            const navigate                  = useRouter();
            return <div
                        onClick={() => navigate.push(`/u/${row?.author?.username || "default"}/c/${row?.id}/${row?.slug}`)} 
                    >
                        {row.name}
                    </div>
        }
    },
    {
        title: 'Access',
        dataIndex: 'accessType',
        key: 'accessType',
        width:'10%',
    },
    {
        title: 'Shared By',
        dataIndex: 'ownedBy',
        key: 'ownedBy',
        width:'40%',
        render: (val, row) => {
            return <div>{row?.author?.username || row?.author?.firstname ||  row?.author?.email}</div>
        }
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        width:'10%',
        render: (val, row) => {
            return <div>
                <RiDeleteBinLine
                    style={{ color: "red" }} 
                    onClick={() => row.onRemoveCollectionClick(row?.id)} 
                />
         </div>
        }
    }
];

const tagColsMobile = [
    {
        title: 'Tag',
        dataIndex: 'name',
        key: 'name',
        width:'40%',
        render: (val, row) => {
            const navigate                  = useRouter();
            return <div
                        onClick={() => navigate.push(`/u/${row?.author?.username || "default"}/tags/${row?.id}/${row?.slug}`)}
                    >
                        {row.name}
                    </div>
        }
    },
    {
        title: 'Access',
        dataIndex: 'accessType',
        key: 'accessType',
        width:'10%',
    },
    {
        title: 'Shared By',
        dataIndex: 'ownedBy',
        key: 'ownedBy',
        width:'40%',
        render: (val, row) => {
            return <div>{row?.author?.username || row?.author?.firstname ||  row?.author?.email}</div>
        }
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        width:'10%',
        render: (val, row) => {
            return <div>
                <RiDeleteBinLine
                    style={{ color: "red" }} 
                    onClick={() => row.onRemoveTagClick(row?.id)} 
                />
         </div>
        }
    }
];


const ShareWithMeComponent = ({isMobile=false}) => {
    const dispatch                  = useDispatch();
    const navigate                  = useRouter();
    const { sharedCollections }     = useSelector((state) => state.collections);
    const { sharedTags }            = useSelector((state) => state.tags);   
    const [isLoading, setLoading]   = useState(false)
    const [currentId, setCurrentId]   = useState(null)
    const [showRemoveCollectionModal, setShowRemoveCollectionModal]   = useState(false)
    const [showRemoveTagModal, setShowRemoveTagModal]   = useState(false)
    const [selectedTab,setSelectedTab] = useState('collections')


    useEffect(() => {
        setLoading(true)
        dispatch(getSharedCollections()).then(res => {
            dispatch(getSharedTags()).then(tagRes => {
                setLoading(false)
            })
        })
    }, [])

    const onRemoveCollectionClick = (collectionId) => {
        setCurrentId(collectionId)
        setShowRemoveCollectionModal(true)
    }

    const onRemoveCollection = async () => {
        setLoading(true)
        await dispatch(removeShareWithMeCollection(currentId))
        const index = sharedCollections.findIndex((c) => c.id === currentId)
        sharedCollections.splice(index, 1)
        setLoading(false)
        setShowRemoveCollectionModal(false)
        dispatch(getSharedCollections())
    }

    const onRemoveTagClick = (collectionId) => {
        setCurrentId(collectionId)
        setShowRemoveTagModal(true)
    }

    const onRemoveTag = async () => {
        setLoading(true)
        await dispatch(removeShareWithMeTag(currentId))
        const index = sharedTags.findIndex((t) => t.id === currentId)
        sharedTags.splice(index, 1)
        setLoading(false)
        setShowRemoveTagModal(false)
        dispatch(getSharedTags())
    }

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-full flex-col">
            <Spin className="mb-2" size="middle" />
        </div>
    }

    return (
        <>
            {
            isMobile ? <>
            <div className="flex items-center p-[2px] bg-white rounded border-[0.6px] border-solid border-[#ABB7C9] mb-4">
                <div className={`rounded p-2 flex items-center justify-center gap-2 ${selectedTab === 'collections' ? 'bg-[#347AE2] text-white' : 'bg-white text-black'}`}
                onClick={() => setSelectedTab('collections')}
                style={{flex: '1 0 0'}}
                >
                    Collections
                </div>
                <div className={`rounded p-2 flex items-center justify-center gap-2 ${selectedTab === 'tags' ? 'bg-[#347AE2] text-white' : 'bg-white text-black'}`} onClick={() => setSelectedTab('tags')} 
                style={{flex: '1 0 0'}}>
                    Tags
                </div>
            </div>

            {
            selectedTab === 'collections' &&
            <>
            <Table
            columns={collectionColsMobile}
            rowClassName={"cursor-pointer"}
            dataSource={sharedCollections.map((c) => {
                return {
                    key: c.id,
                    id: c.id,
                    name: c.name,
                    slug: c.slug || slugify(c.name, { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }),
                    accessType: ACCESS_TYPES_OBJ[c.accessType],
                    author: {
                        avatar: c?.author?.profilePhoto,
                        username: c?.author?.username,
                        name: c?.author?.firstname && c?.author?.lastname ? `${c?.author?.firstname} ${c?.author?.lastname}` : c?.author?.username
                    },
                    onRemoveCollectionClick
                }
            })}
            />
            </>
            }

            {
            selectedTab === 'tags' &&
            <>
            <Table
                        columns={tagColsMobile}
                        rowClassName={"cursor-pointer"}
                        dataSource={sharedTags.map((c) => {
                            const author = c?.author;
                            return {
                                key: c.id,
                                id: c.id,
                                name: c.tag,
                                slug: c.slug || slugify(c.tag, { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }),
                                accessType: ACCESS_TYPES_OBJ[c.accessType],
                                author: {
                                    avatar: author?.profilePhoto,
                                    username: author?.username,
                                    name: author?.firstname && author?.lastname ? `${author?.firstname} ${author?.lastname}` : author?.username
                                },
                                onRemoveTagClick
                            }
                        })}
            />
            </>
            }


            </>
            :
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Shared Collections" key="1">
                    <Table
                        columns={collectionCols}
                        rowClassName={"cursor-pointer"}
                        dataSource={sharedCollections.map((c) => {
                            return {
                                key: c.id,
                                id: c.id,
                                name: c.name,
                                slug: c.slug || slugify(c.name, { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }),
                                accessType: ACCESS_TYPES_OBJ[c.accessType],
                                author: {
                                    avatar: c?.author?.profilePhoto,
                                    username: c?.author?.username,
                                    name: c?.author?.firstname && c?.author?.lastname ? `${c?.author?.firstname} ${c?.author?.lastname}` : c?.author?.username
                                },
                                onRemoveCollectionClick
                            }
                        })}
                        // onRow={(record, rowIndex) => {
                        //     return {
                        //         onClick: event => {
                        //             navigate.push(`/u/${record?.author?.username || "default"}/c/${record?.id}/${record?.slug}`)
                        //         }
                        //     }
                        // }}
                        />
                </Panel>
                <Panel header="Shared Tags" key="2">
                    <Table
                        columns={tagCols}
                        rowClassName={"cursor-pointer"}
                        dataSource={sharedTags.map((c) => {
                            const author = c?.author;
                            return {
                                key: c.id,
                                id: c.id,
                                name: c.tag,
                                slug: c.slug || slugify(c.tag, { lower: true, remove: /[&,+()$~%.'":*?<>{}]/g }),
                                accessType: ACCESS_TYPES_OBJ[c.accessType],
                                author: {
                                    avatar: author?.profilePhoto,
                                    username: author?.username,
                                    name: author?.firstname && author?.lastname ? `${author?.firstname} ${author?.lastname}` : author?.username
                                },
                                onRemoveTagClick
                            }
                        })}
                        // onRow={(record, rowIndex) => {
                        //     return {
                        //         onClick: event => {
                        //             navigate.push(`/u/${record?.author?.username || "default"}/tags/${record?.id}/${record?.slug}`)
                        //         }
                        //     }
                        // }} 
                        />
                </Panel>
            </Collapse>
            }
            {showRemoveCollectionModal && <Modal
                open={showRemoveCollectionModal}
                title="Remove Collection"
                onOk={onRemoveCollection}
                okText="Yes"
                okButtonProps={{
                    className: "bg-[#40a9ff] border-[#40a9ff]"
                }}
                onCancel={() => { setShowRemoveCollectionModal(false) }}
            >
                <p>Are you sure you want to remove?</p>
            </Modal>}
            {showRemoveTagModal && <Modal
                open={showRemoveTagModal}
                title="Remove Tag"
                onOk={onRemoveTag}
                okText="Yes"
                okButtonProps={{
                    className: "bg-[#40a9ff] border-[#40a9ff]"
                }}
                onCancel={() => { setShowRemoveTagModal(false) }}
            >
                <p>Are you sure you want to remove?</p>
            </Modal>}
        </>
    )
}

export default ShareWithMeComponent;