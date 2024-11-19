import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Input, List, Modal, Select, Table, Spin, message, Tag, Divider, Drawer } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri';
import "./group.css"
import { useDispatch } from 'react-redux';
import { createGroup, getAllGroup, updateGroup, deleteGroup } from '@actions/group';
import Column from 'antd/lib/table/Column';
import session from '@utils/session';
// import { Validator } from '@utils/validations';
// import { getAllTeams } from '@actions/team';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const { Option } = Select

const DEFAULT_GROUP = {
    key: 1,
    name: 'New Group',
    id: 1,
    members: [
        {
            id: 1,
            email: "harsh@gamil.com",
            name: "Harsh Jivani",
            username: "harsh",
            role: "admin",
            avatar: `${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/curateit-logo.png`
        },
    ],
    membersCount: 1
}

const ROLES = {
    "user": "User",
    "admin": "Admin",
}

const GroupComponent = ({
    allMembers,
    allGuests,isMobile=false
}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [currentGroup, setCurrentGroup] = useState(null);
    const [groupData, setGroupData] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [showMemberBox, setShowMemberBox] = useState(false)
    const [newUsers, setNewUsers] = useState([])
    const [publicUsers, setPublicUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    // const [publicUserData, setPublicUserData] = useState(data);
    const [currentGroupName, setCurrentGroupName] = useState(null)
    const [currentGroupId, setCurrentGroupId] = useState(null)
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const [items, setItems] = useState({})
    const [groupId, setGroupId] = useState(null)
    const elm = useRef()
    let width = 0
    const [isEditClicked, setIsEditClicked] = useState(false)
    const [currentRecord, setCurrentRecord] = useState(null)

    useEffect(() => {
        setLoading(true)
        dispatch(getAllGroup())
            .then((res) => {
                setLoading(false)
                if (res?.payload?.data?.data) {
                    setGroupData(res?.payload?.data?.data?.map((g) => { return { ...g, id: g.id, membersCount: g.members.length } }))
                }
            })

        // dispatch(getAllPublicUsers()).then((res) => {
        //     if (res?.payload?.data?.data) {
        //         const pUsersArr = []
        //         res?.payload?.data?.data?.forEach((u) => {
        //             if (u.firstname !== null && u.lastname !== null) {
        //                 pUsersArr.push({
        //                     id: u.id, 
        //                     username: u.username, 
        //                     name: `${u.firstname} ${u.lastname}`, 
        //                     email: u.email, 
        //                     avatar: u.profilePhoto
        //                 })
        //             }
        //         })
        //         setPublicUsers([ ...pUsersArr ])
        //         setFilteredUsers([ ...pUsersArr ])
        //     }
        // })
        // dispatch(getAllTeams())
        //     .then((res) => {
        //         setLoading(false)
        //         const pUsersArr = []
        //         if (res?.payload?.data?.members) {
        //             res?.payload?.data?.members?.forEach((u) => {
        //                 pUsersArr.push({
        //                     id: u?.username?.id, 
        //                     username: u?.username?.username, 
        //                     name: `${u?.username?.firstname} ${u?.username?.lastname}`, 
        //                     email: u?.username?.email, 
        //                     avatar: u?.username?.profilePhoto
        //                 })
        //             })
        //         }
        //         if (res?.payload?.data?.guests) {
        //             res?.payload?.data?.guests?.forEach((u) => {
        //                 pUsersArr.push({
        //                     id: u?.username?.id, 
        //                     username: u?.username?.username, 
        //                     name: `${u?.username?.firstname} ${u?.username?.lastname}`, 
        //                     email: u?.username?.email, 
        //                     avatar: u?.username?.profilePhoto
        //                 })
        //             })
        //         }
        //         setPublicUsers([ ...pUsersArr ])
        //         setFilteredUsers([ ...pUsersArr ])

        //     })

    }, [])

    useEffect(() => {
        const pUsersArr = []
        if (allMembers) {
            allMembers?.forEach((u) => {
                // if (u?.id) {
                pUsersArr.push({
                    id: u?.id,
                    username: u?.username,
                    name: (u?.firstname && u?.lastname) ? `${u?.firstname} ${u?.lastname}` : (u?.name) ? u?.name : u?.email,
                    email: u?.email,
                    avatar: u?.profilePhoto
                })
                // }
            })
        }
        if (allGuests) {
            allGuests?.forEach((u) => {
                // if (u?.id) {
                pUsersArr.push({
                    id: u?.id,
                    username: u?.username,
                    name: (u?.firstname && u?.lastname) ? `${u?.firstname} ${u?.lastname}` : (u?.name) ? u?.name : u.email,
                    email: u?.email,
                    avatar: u?.profilePhoto
                })
                // }
            })
        }
        setPublicUsers([...pUsersArr])
        setFilteredUsers([...pUsersArr])
    }, [allGuests, allMembers])

    const onUpdateCollection = async (collection) => {
        const gIdx = groupData.findIndex((g) => g.id === collection.id);
        if (gIdx !== -1) {
            groupData[gIdx] = {
                ...groupData[gIdx],
                name: currentGroupName
            }
            const res = await dispatch(updateGroup({
                ...groupData[gIdx],
                name: currentGroupName
            }, collection.id))
            if (res.error === undefined) {
                setGroupData([...groupData])
                message.success("Group updated successfully")
            }
            else {
                message.error("An error occurred while updating")
            }
        }
        setCurrentGroupName(null);
        setCurrentGroupId(null)
        setCurrentRecord(null)
        setIsEditClicked(false)
    }

    const onCreateNewGroup = async () => {
        const res = await dispatch(createGroup({
            data: {
                name: DEFAULT_GROUP.name,
                members: [
                    {
                        id: parseInt(session.userId),
                        username: session.username,
                        email: session.emailAddress,
                        avatar: session.userProfileImage === 'null' ? null : session.userProfileImage,
                        role: "admin",
                        name: session.username
                    }
                ]
            }
        }))
        if (res?.payload?.data?.data) {
            const objId = res?.payload?.data?.data?.id
            const obj = res?.payload?.data?.data?.attributes
            setGroupData([...groupData, { ...obj, id: objId, membersCount: 1 }])
            setExpandedKeys([objId])
            setCurrentGroupName(obj.name)
            setCurrentGroupId(objId)
            message.success("Group created successfully")
        }
        else {
            message.error("Group creation failed")
        }
    }

    const onAddMemberClick = (groupId) => {
        setShowMemberBox(true)
        setCurrentGroup(groupId)
        const gIdx = groupData.findIndex(g => g.id === groupId);
        if (gIdx !== -1) {
            const group = groupData[gIdx];
            const fUsers = []
            publicUsers.forEach((user) => {
                const idx = group.members.findIndex(m => m.id === user.id);
                if (idx === -1) {
                    fUsers.push(user);
                }
            })
            setFilteredUsers([...fUsers])
        }
        else {
            setFilteredUsers([...publicUsers])
        }
    }

    const onMembersAdd = async () => {
        const idx = groupData.findIndex((g) => g.id === currentGroup)
        if (idx !== -1) {
            const userArr = []
            newUsers.forEach((id) => {
                const existingIdx = groupData[idx].members.findIndex((m) => m.id === id)
                if (existingIdx === -1) {
                    const uIdx = publicUsers.findIndex((u) => u.id === id)
                    if (uIdx !== -1) {
                        userArr.push({ ...publicUsers[uIdx], role: "user" })
                    }
                }
            })
            groupData[idx] = {
                ...groupData[idx],
                members: [...groupData[idx].members, ...userArr],
                membersCount: userArr.length + groupData[idx].membersCount
            }
            const res = await dispatch(updateGroup({
                ...groupData[idx]
            }, currentGroup))
            setNewUsers([])
            if (res.error === undefined) {
                setGroupData([...groupData])
                setCurrentGroup(null)
                setShowMemberBox(false)
                message.success("Group updated successfully")
            }
            else {
                message.error("An error occurred while updating")
            }
        }

    }

    const onRoleChange = async (role, member, groupId) => {
        const gIdx = groupData.findIndex(g => g.id === groupId);
        if (gIdx !== -1) {
            const memberIdx = groupData[gIdx].members.findIndex(m => m.id === member.id)
            if (memberIdx !== -1) {
                groupData[gIdx].members[memberIdx] = {
                    ...groupData[gIdx].members[memberIdx],
                    role
                }
                groupData[gIdx].members = [...groupData[gIdx].members]
                const res = await dispatch(updateGroup({
                    ...groupData[gIdx],
                    members: groupData[gIdx].members
                }, groupId))
                if (res.error === undefined) {
                    setGroupData([...groupData])
                    message.success("Group updated successfully")
                }
                else {
                    message.error("An error occurred while updating")
                }
            }
        }
    }

    const onMemberRemoveClick = async (item, groupId) => {
        setShowRemoveModal(true)
        setItems(item)
        setGroupId(groupId)
    }

    const onMemberRemove = async () => {
        const gIdx = groupData.findIndex(g => g.id === groupId);
        if (gIdx !== -1) {
            const memberIdx = groupData[gIdx].members.findIndex(m => m.id === items.id)
            const memberDetail = groupData[gIdx].members[memberIdx]
            const adminLength = groupData[gIdx].members.filter(m => m.role === "admin")
            if (memberDetail.role === "admin" && adminLength.length === 1) {
                message.error("You can't delete this member if u do so there will be no admin for that group.")
                return
            }
            if (memberIdx !== -1) {
                groupData[gIdx].members.splice(memberIdx, 1)
                groupData[gIdx].members = [...groupData[gIdx].members]
                const res = await dispatch(updateGroup({
                    ...groupData[gIdx],
                    members: groupData[gIdx].members
                }, groupId, true))
                if (res.error === undefined) {
                    groupData[gIdx].membersCount = groupData[gIdx].membersCount - 1
                    setGroupData([...groupData])
                    message.success("Group updated successfully")
                    setShowRemoveModal(false)
                }
                else {
                    message.error("An error occurred while updating")
                }
            }
        }
    }

    const onRowExpand = (expanded, row) => {
        if (expanded) {
            setExpandedKeys([row.id])
        }
        else {
            setExpandedKeys([])
        }
    }

    const onDeleteGroup = async (record) => {
        const res = await dispatch(deleteGroup(record.id))
        if (res.error === undefined) {
            const gIdx = groupData.findIndex(g => g.id === record.id)
            if (gIdx !== -1) {
                groupData.splice(gIdx, 1)
                setGroupData([...groupData])
            }
            message.success("Group deleted successfully")
        }
        else {
            message.error("An error occurred while deleting")
        }
    }

    const onTagRemove = (userId) => {
        const idx = newUsers.indexOf(userId)
        if (idx !== -1) {
            newUsers.splice(idx, 1)
            setNewUsers([...newUsers])
        }
    }

    // const onMemberEmailKeyDown = async (e) => {
    //     if (e.code === "Enter" && e.target.value.trim() !== "") {
    //         const inputValue = e.target.value.trim();
    //         const msg        = Validator.validate("email", inputValue, 6, 50, true)
    //         if (elm.current) {
    //           elm.current.blur()
    //         }
    //         if (msg !== "") {
    //           message.error(msg)
    //           return
    //         }

    //         const member = await dispatch(findMemberExist(inputValue))
    //         if (member?.payload?.data === "") {
    //             message.error("This email is not exist in our system.")
    //             return 
    //         }

    //         const m = member?.payload?.data
    //         setFilteredUsers([ ...filteredUsers, m ])
    //         setNewUsers([...newUsers, m.id]);
    //         setPublicUsers([ ...publicUsers, { id: m.id, email: m.email, username: m.username, name: m.name, avatar: m.avatar }])
    //         // const newUser = {
    //         //   id: inputValue,
    //         //   email: inputValue,
    //         //   avatar: null,
    //         //   username: null,
    //         //   name: inputValue
    //         // };
    //         // setFilteredUsers([...filteredUsers, newUser]);
    //         // setNewUsers([...newUsers, newUser.id]);
    //     }
    // }

    const renderMembersList = (members, groupId) => {
        const mIdx = members?.findIndex((member) => { return member.id === Number(session.userId) })
        const isAdmin = members?.[mIdx]?.role === "admin"
        return (
            <div className="">

                <div className="">
                    <List
                        className="demo-loadmore-list"
                        // loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={members || []}
                        // loadMore={loadMore}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    isAdmin
                                        ? <Select
                                            // defaultValue="Click"
                                            value={item.role}
                                            style={{
                                                width: 120,
                                            }}
                                            onChange={(value) => onRoleChange(value, item, groupId)}
                                            options={[
                                                {
                                                    value: 'admin',
                                                    label: 'Admin',
                                                },
                                                {
                                                    value: 'user',
                                                    label: 'User',
                                                },
                                            ]}
                                        />
                                        : <label>{ROLES[item.role]}</label>,
                                    (isAdmin || item.id === Number(session.userId))
                                        ? <RiDeleteBinLine
                                            style={{ color: "red" }}
                                            // onClick={() => onMemberRemove(item, groupId)} 
                                            onClick={() => onMemberRemoveClick(item, groupId)}
                                        />
                                        : ""
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item?.avatar}>{item.name.charAt(0).toUpperCase()}</Avatar>}
                                    title={item.name}
                                    description={item.username}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                {isAdmin && <div className="flex flex-row items-center">
                    <button className='p-2' onClick={() => onAddMemberClick(groupId)}>+ Add Members</button>
                </div>}
            </div>
        )
    };

    const onClose = () => {
        setShowMemberBox(false);
    };

    const GroupTable = () => {
        return (<Table
            onExpand={onRowExpand}
            expandedRowKeys={expandedKeys}
            expandable={{
                expandedRowRender: (record) => {
                    const idx = groupData.findIndex(d => { return d.id === record.id })
                    if (idx === -1) { return null; }
                    return renderMembersList(groupData[idx].members, record.id)
                }
            }}
            dataSource={groupData?.map((m) => { return { key: m.id, id: m.id, name: m.name, members: m.membersCount } })}
        >
            <Column key="name" title="Name" render={(text, record, index) => {
                return (
                    currentGroupName && currentGroupId === record.id
                        ? <div className='flex flex-row justify-between items-center'>
                            <Input placeholder='Enter Group Name' value={currentGroupName} onChange={(e) => setCurrentGroupName(e.target.value)} onBlur={() => onUpdateCollection(record)} />
                        </div>
                        : <span className='font-bold text-md' onClick={() => { setCurrentGroupId(record.id); setCurrentGroupName(record.name) }}>{record.name}</span>
                )
            }} />
            <Column key="members" dataIndex={"members"} title="Members" />
            <Column key="actions" title="Actions" render={(text, record, index) => {
                const gIdx = groupData?.findIndex((g) => g.id === record.id)
                const mIdx = gIdx !== -1 ? groupData[gIdx]?.members?.findIndex((m) => { return m.id === Number(session.userId) }) : -1
                const member = mIdx !== -1 ? groupData[gIdx]?.members[mIdx] : null
                return member?.role === "admin" ? <RiDeleteBinLine style={{ color: "red" }} onClick={() => onDeleteGroup(record)} /> : null
            }} />
        </Table>)
    }

    const GroupTableMobile = () => {
        return (<Table
            onExpand={onRowExpand}
            expandedRowKeys={expandedKeys}
            expandable={{
                expandedRowRender: (record) => {
                    const idx = groupData.findIndex(d => { return d.id === record.id })
                    if (idx === -1) { return null; }
                    return renderMembersList(groupData[idx].members, record.id)
                }
            }}
            dataSource={groupData?.map((m) => { return { key: m.id, id: m.id, name: m.name, members: m.membersCount } })}
        >
            <Column key="name" title="Name" render={(text, record, index) => {
                return (
                    <div className='flex items-center'>
                        <div className='font-bold text-md mr-1' 
                        >{record.name}</div>
                        <PencilSquareIcon className='cursor-pointer h-4 w-4' onClick={() => {
                            setIsEditClicked(true)
                            setCurrentGroupName(record.name)
                            setCurrentRecord(record)
                        }}/>
                    </div>
                )
            }} />
            <Column key="members" dataIndex={"members"} title="Members" />
            <Column key="actions" title="Actions" render={(text, record, index) => {
                const gIdx = groupData?.findIndex((g) => g.id === record.id)
                const mIdx = gIdx !== -1 ? groupData[gIdx]?.members?.findIndex((m) => { return m.id === Number(session.userId) }) : -1
                const member = mIdx !== -1 ? groupData[gIdx]?.members[mIdx] : null
                return member?.role === "admin" ? <RiDeleteBinLine style={{ color: "red" }} onClick={() => onDeleteGroup(record)} /> : null
            }} />
        </Table>)
    }

    return (
        <>
            {loading ? <div className='flex items-center justify-center h-full w-full mr-5 ml-5'>
                <Spin tip="Loading..." />
            </div>
                : <div className="mr-5 ml-5">
                    <div className='flex items-center justify-end w-full mb-2'>
                        <Button type="primary" className="bookmark-addBtn" onClick={onCreateNewGroup}>Create a group</Button>
                    </div>
                    {groupData && groupData.length > 0 ?
                        (isMobile ? GroupTableMobile() : GroupTable())
                        :
                        <div className="text-xl flex justify-center items-center">
                            <div className="relative mt-2">
                                <img
                                    className="h-50 w-50 my-0 mx-auto"
                                    src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/icons/upload-error.svg`}
                                    alt="Cloud ellipse icons"
                                />
                                <div className="justify-center w-full text-xs text-center text-gray-400">
                                    No data!
                                </div>
                            </div>
                        </div>
                    }
                </div>}

            {isMobile ?
                (showMemberBox &&
                    <Drawer
                        className="ct-team-drawer"
                        title={null}
                        placement={"bottom"}
                        closable={false}
                        width={500}
                        height={210}
                        onClose={onClose}
                        open={showMemberBox}
                    >
                        <div className="">
                            <div className="ct-mobile-team-header" onClick={onClose}></div>
                            <Divider className="ct-mobile-team-divider" />
                            <div className="mb-5"><b>Add new guests</b></div>
                        </div>
                        <Select mode="multiple"
                            maxTagCount={1}
                            optionHeight={10}
                            optionFilterProp='title'
                            className='ct-team-select-box ct-team-select-box-mobile'
                            // placeholder="Select members or type email to add new guest"
                            allowClear
                            autoFocus
                            // filterOption={(inputVal, option) => {
                            //     if (inputVal.length >= 4) {
                            //         return option.title.toLowerCase().includes(inputVal.toLowerCase());
                            //     }
                            // }}
                            // tagRender={props => {
                            //     const { value } = props
                            //     const idx = allFilteredUsers.findIndex(user => user?.id === value)
                            //     if (idx !== -1) {
                            //         const user = allFilteredUsers[idx]
                            //         return <Tag className='flex p-1'
                            //             key={user?.id}
                            //             closable={true}
                            //             onClose={() => onTagRemove(user?.id)}>
                            //             <div className='flex flex-row items-center'>
                            //                 <Avatar src={user.avatar} className='mr-2'>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                            //                 <span>{user?.name}</span>
                            //             </div>
                            //         </Tag>
                            //     }
                            //     return null
                            // }}
                            tagRender={props => {
                                const { value } = props
                                const idx = filteredUsers.findIndex(user => user?.id ? user.id === value : user.email === value)

                                if (idx !== -1) {
                                    const user = filteredUsers[idx]
                                    return <Tag className="flex" key={user?.id ? user.id : user?.email} closable={true} onClose={() => onTagRemove(user?.id ? user.id : user?.email)}>
                                        <div className='flex flex-row items-center'>
                                            <Avatar src={user?.avatar} className='mr-2'>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                                            <span>{user?.name !== "Annomyous" ? user.name : user.email}</span>
                                        </div>
                                    </Tag>
                                }
                                return null
                            }}
                            value={newUsers}
                            onChange={(users) => { setNewUsers(users) }}
                            ref={elm}
                            filterOption={(inputVal, option) => {

                                return option.title.toLowerCase().includes(inputVal.toLowerCase());
                            }}
                           // onInputKeyDown={onGuestEmailKeyDown}
                        >
                            {filteredUsers.map(user => {
                                return <Option key={user?.id ? user.id : user?.email} value={user?.id ? user.id : user.email} title={`${user.name}-${user.email}`}>
                                    <div className='flex flex-row items-center'>
                                        <Avatar src={user?.avatar} className='mr-2'>{user.name.charAt(0).toUpperCase()}</Avatar>
                                        <span>{user?.name === "Annomyous" ? user.email : user?.name}</span>
                                    </div>
                                </Option>;
                            })}
                        </Select>
                        <Divider className="ct-mobile-team-divider-bottom" />
                        <div className="flex flex-row justify-between">
                            <Button type="primary" className="w-[45%]" style={{ borderRadius: '250px', color: 'black' }} onClick={onClose}>Cancel</Button>
                            <Button type="primary" className="w-[45%] bookmark-addBtn" style={{ borderRadius: '250px' }} onClick={onMembersAdd}>Add</Button>
                        </div>
                    </Drawer>
                ) : (showMemberBox &&
                    <Modal open={showMemberBox}
                        onCancel={() => {
                            setShowMemberBox(false);
                            setCurrentGroup(null)
                            setNewUsers([])
                        }}
                        onOk={onMembersAdd} okText="Add" title={"Add new members"} okButtonProps={{
                            className: "bg-[#40a9ff] border-[#40a9ff]"
                        }}>
                        <Select mode="multiple"
                            // options={filteredUsers.map((user) => { return { ...user, label: user.email, value: user.email } })}
                            className='w-full'
                            ref={elm}
                            tagRender={props => {
                                const { value } = props
                                const idx = filteredUsers.findIndex(user => user?.id ? user.id === value : user.email === value)

                                if (idx !== -1) {
                                    const user = filteredUsers[idx]
                                    return <Tag className="flex" key={user?.id ? user.id : user?.email} closable={true} onClose={() => onTagRemove(user?.id ? user.id : user?.email)}>
                                        <div className='flex flex-row items-center'>
                                            <Avatar src={user?.avatar} className='mr-2'>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                                            <span>{user?.name !== "Annomyous" ? user.name : user.email}</span>
                                        </div>
                                    </Tag>
                                }
                                return null
                            }}
                            // onInputKeyDown={onMemberEmailKeyDown}
                            value={newUsers}
                            onChange={(users) => {
                                setNewUsers(users)
                            }}
                            optionFilterProp='title'
                            filterOption={(inputVal, option) => {

                                return option.title.toLowerCase().includes(inputVal.toLowerCase());
                            }}
                            allowClear
                            autoFocus
                        >

                            {filteredUsers.map(user => {
                                return <Option key={user?.id ? user.id : user?.email} value={user?.id ? user.id : user.email} title={`${user.name}-${user.email}`}>
                                    <div className='flex flex-row items-center'>
                                        <Avatar src={user?.avatar} className='mr-2'>{user.name.charAt(0).toUpperCase()}</Avatar>
                                        <span>{user?.name === "Annomyous" ? user.email : user?.name}</span>
                                    </div>
                                </Option>;
                            })}
                        </Select>

                    </Modal>
                )}




            {showRemoveModal && <Modal
                open={showRemoveModal}
                title="Remove Member"
                onOk={onMemberRemove}
                okText="Yes"
                okButtonProps={{
                    className: "bg-[#40a9ff] border-[#40a9ff]"
                }}
                onCancel={() => { setShowRemoveModal(false) }}
            >
                <p>It will remove from all the collections of the group, do you want to proceed?</p>
            </Modal>}

            {isEditClicked && isMobile && <Drawer
              className="ct-team-drawer"
              title={null}
              placement={"bottom"}
              closable={false}
              width={'90%'}
              height={240}
              onClose={() => {
                    setCurrentRecord(null)
                    setIsEditClicked(false)
                }}
              open={isEditClicked}
              footer={
                <div className="flex justify-center">
                  <Button type="primary" className="w-[75%] bookmark-addBtn" style={{borderRadius:'250px'}} 
                  onClick={() => onUpdateCollection(currentRecord)}>Save</Button>
                </div>
              }
            >
              <div className="">
                <div className="ct-mobile-team-header" onClick={() => {
                    setCurrentRecord(null)
                    setIsEditClicked(false)
                }}></div>
                <Divider className="ct-mobile-team-divider" />
                <div className="mb-5"><h2 className='text-[20px] font-[bold]' style={{fontFamily: "Inter"}}>Edit Group</h2></div>
              </div>
              <Divider className="ct-mobile-team-divider-bottom" />
              <div className='font-medium text-xs text-[#347AE2]'>Group name</div>
              <Input placeholder='Enter Group Name' 
              value={currentGroupName} 
              onChange={(e) => setCurrentGroupName(e.target.value)} 
              />

            </Drawer>}
        </>
    )
}

export default GroupComponent;