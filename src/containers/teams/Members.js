import "./Team.css"
import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Divider, Drawer, Dropdown, List, Modal, Select, Space, Table, Tag, message } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { findMemberExist, getAllPublicUsers } from '@actions/group';
import { addTeam, deleteTeam, updateTeam } from '@actions/team';
import session from '@utils/session';
import { Validator } from '@utils/validations';
import { getPlanService } from "@actions/plan-service";
// import ExceedLimitModal from "@components/modal/ExceedLimitModal";
import { toggleExceedPopup } from "@actions/app";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const columns = [
    {
        title: 'User',
        dataIndex: 'name',
        key: 'name',
        columnWidth: 400,
        render: (val, row) => {
            // return (<div className='flex flex-row items-center'>
            //     <Avatar src={row.avatar} className='mr-2'>{row?.name ? row?.name?.charAt(0).toUpperCase() : row?.email?.charAt(0).toUpperCase()}</Avatar>
            //     <span>{row?.name ? row?.name : row?.email}</span>
            // </div>)
            return <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={row?.avatar} className='mr-2'>{row?.name ? row?.name?.charAt(0).toUpperCase() : row?.email?.charAt(0).toUpperCase()}</Avatar>}
                    title={
                        <span>{row?.name ? row?.name : row?.email}</span>
                    }
                    description={row?.email}
                />
            </List.Item>
        },
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        // render: () => (
        //     <Space size="middle">
        //         <Dropdown
        //             menu={{
        //                 items: roles,
        //             }}
        //         >
        //             <a>
        //                 Roles <DownOutlined />
        //             </a>
        //         </Dropdown>
        //     </Space>
        // ),
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (val, row) => {
            const newItems = items?.map((item) => {
                return { ...item, onClick: item.key === 'remove' ? () => row.onRemoveMemberClick(row.teamId) : () => row.onConvertGuestClick(row.teamId) }
                // onClick: () => row.onRemoveMemberClick && row.onRemoveMemberClick(row.teamId)
            })

            return (<Space size="middle">
                <Dropdown
                    menu={{
                        items: newItems,
                    }}
                    trigger={["click"]}
                >
                   <PencilSquareIcon className='w-4 h-4 cursor-pointer' />
                </Dropdown>
            </Space>)
        },
    },
];

const MobileColumns = [
    {
        title: 'User',
        dataIndex: 'name',
        key: 'name',
        width: '40%',
        render: (_,record) => {
            return(
                <>
                <div className="flex items-center">
                    <Avatar src={record?.avatar} className='mr-2'>{record?.name ? record?.name?.charAt(0).toUpperCase() : record?.email?.charAt(0).toUpperCase()}</Avatar>
                    
                    <div>{record?.name || record?.username || record?.firstname || record?.lastname}</div>
                </div>
                </>
            )
        }
    },
    {
        title:"Role",
        dataIndex: "role",
        key: "role",
        width: '40%',
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        align: "center",
        width: '20%',
        render: (val, row) => {
            const newItems = items?.map((item) => {
                return { ...item, onClick: item.key === 'remove' ? () => row.onRemoveMemberClick(row.teamId) : () => row.onConvertGuestClick(row.teamId) }
            })

            return (<Space size="middle">
                <Dropdown
                    menu={{
                        items: newItems,
                    }}
                    trigger={["click"]}
                >
                    <PencilSquareIcon className='w-4 h-4' />
                </Dropdown>
            </Space>)
        },
    },
]

const items = [
    {
        key: 'remove',
        label: 'Remove as a member',
    },
    {
        key: 'convert',
        label: 'Make a guest',
    },
];


const MembersComponent = ({
    allMembers, onMemberChange, onGuestChange, membersLimit, membersCount, allGuests, membersTotalCount, membersUsedCount, isPlanOwner = true, ownerDetails = null, plan = null,isMobile=false
}) => {

    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false)
    const [showMemberBox, setShowMemberBox] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    // const [allMembers, setAllMembers] = useState([])
    const [allFilteredUsers, setAllFilteredUsers] = useState([])
    const [newUsers, setNewUsers] = useState([])
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const [showConvertModal, setShowConvertModal] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    // const [isMobile, setIsMobile] = useState(false)
    const elm = useRef()
    let width = 0;
    const memberInviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&t=member`

    useEffect(() => {
        dispatch(getAllPublicUsers())
            .then((res) => {
                // setLoading(false)
                if (res?.payload?.data?.data) {
                    const usersArr = []
                    res?.payload?.data?.data?.forEach((u) => {
                        if (u.firstname !== null && u.lastname !== null && u.firstname !== undefined && u.lastname !== undefined) {
                            usersArr.push({
                                id: u.id,
                                username: u.username,
                                name: `${u.firstname} ${u.lastname}`,
                                email: u.email,
                                avatar: u.profilePhoto
                            })
                        }
                    })

                    const loginUserIdx = usersArr.findIndex((u) => parseInt(u.id) === parseInt(session.userId))
                    if (loginUserIdx !== -1) {
                        usersArr.splice(loginUserIdx, 1)
                    }
                    setAllUsers([...usersArr])
                    setAllFilteredUsers([...usersArr])
                }
            })
    }, [])

    // const onMembersAddClick = () => {
    //     dispatch(getPlanService())
    //     .then((res) => {
    //         if (res?.payload?.data?.data?.included_members_used >= res?.payload?.data?.data?.included_members) {
    //             dispatch(toggleExceedPopup(true, "Member Limit exceeded, please upgrade your plan, buy add-ons or earn some credits to unlock more!"))
    //             return
    //         } else {
    //             setShowMemberBox(true)
    //             const fUsers = []
    //             allUsers.forEach((user) => {
    //                 const idx = allMembers.findIndex((m) => parseInt(m.id) === parseInt(user.id))
    //                 if (idx === -1) {
    //                     fUsers.push(user);
    //                 }
    //             })
    //             setAllFilteredUsers([...fUsers])
    //         }
    //     })
    // }

    const onMembersAddClick = () => {
        if (membersLimit) {
            dispatch(toggleExceedPopup(true, "Member Limit exceeded, please upgrade your plan, buy add-ons or earn some credits to unlock more!"))
            return
        }
        setShowMemberBox(true)
        const fUsers = []
        allUsers.forEach((user) => {
            const existUsers = [...allMembers, ...allGuests]
            const idx = existUsers.findIndex((m) => parseInt(m.id) === parseInt(user.id))
            if (idx === -1) {
                fUsers.push(user);
            }
        })
        setAllFilteredUsers([...fUsers])
    }

    const onMemberAdd = async () => {

        const newMembers = []
        newUsers.forEach((id) => {
            const existIdx = allUsers.findIndex((m) => m.id === id)
            if (existIdx !== -1) {
                newMembers.push({
                    email: allUsers[existIdx].email,
                    isMember: true,
                    author: session.userId,
                    role: "Member",
                    username: isNaN(allUsers[existIdx].id) ? null : allUsers[existIdx].id
                })
            }
        })

        let validation = false
        const validMembers = []
        for (const member of newMembers) {

            const res = await dispatch(addTeam(member))

            if (res?.error === undefined) {
                validation = true
                const existIdx = allUsers.findIndex((m) => parseInt(m.id) === parseInt(member?.username))
                if (existIdx !== -1) {
                    member.teamId = res?.payload?.data?.id
                    member.name = allUsers[existIdx].name
                    member.username = allUsers[existIdx].username
                    member.id = allUsers[existIdx].id
                    member.onRemoveMemberClick = onRemoveMemberClick
                    // member.onConvertGuestClick = onConvertGuestClick
                    member.avatar = allUsers[existIdx].profilePhoto
                }
                const obj = {
                    author: session.userId,
                    avatar: member.avatar,
                    email: allUsers[existIdx]?.email ? allUsers[existIdx]?.email : member.email,
                    teamId: member.teamId,
                    name: member.name,
                    username: member.username,
                    id: member.id,
                    onRemoveMemberClick: member.onRemoveMemberClick,
                    // onConvertGuestClick: member.onConvertGuestClick,
                    isMember: true,
                    role: "Member",
                }
                validMembers.push(obj)
            }
            else {
                const idx = newMembers.findIndex((m) => {
                    return m.email === member?.email
                })

                if (idx !== -1) {
                    newMembers.splice(idx, 1)
                }

                setNewUsers([])
                setAllFilteredUsers([...allFilteredUsers.filter((a) => { return a.id !== a.username })])
                setAllUsers([...allUsers.filter((a) => { return a.id !== a.username })])
                setShowMemberBox(false)
            }
        }

        dispatch(getPlanService())
        validation ? onMemberChange && onMemberChange([...allMembers, ...validMembers]) : onMemberChange([...allMembers])
        setNewUsers([])
        setAllFilteredUsers([])
        setShowMemberBox(false)
    }

    const onTagRemove = (userId) => {
        const idx = newUsers.indexOf(userId)

        if (idx !== -1) {
            newUsers.splice(idx, 1)
            setNewUsers([...newUsers])
        }

        const filteredIdx = allFilteredUsers.findIndex(user => user.id === userId)
        if (filteredIdx !== -1) {
            allFilteredUsers.splice(filteredIdx, 1)
            setAllFilteredUsers([...allFilteredUsers])
        }
    }

    const onMemberEmailKeyDown = async (e) => {
        if ((e.code === "Enter" || e.code === "NumpadEnter") && e.target.value.trim() !== "") {
            if (newUsers.length >= membersCount) {
                message.error("You can't add more members than your plan limit")
                return
            }
            const inputValue = e.target.value.trim();

            const uIdx = allFilteredUsers.findIndex((u) => (u?.email === inputValue || u?.username === inputValue))
            if (uIdx !== -1) {
                const user = allFilteredUsers[uIdx]
                setNewUsers([...newUsers, user.id])
                return
            }

            const filteredArr = allFilteredUsers.filter((u) => `${u.username}-${u.email}`.toLowerCase().includes(inputValue.toLowerCase()))
            if (filteredArr.length > 0) {
                setNewUsers([...newUsers, filteredArr[0].id])
                return
            }
            const msg = Validator.validate("email", inputValue, 6, 50, true)

            if (elm.current) {
                elm.current.blur()
            }
            if (msg !== "") {
                message.error(msg)
                return
            }

            const member = await dispatch(findMemberExist(inputValue))
            // if (member?.payload?.data === "") {
            //     message.error("This email is not exist in our system.")
            //     return
            // }
            // if (ENV === "production") {
            //     const emailVerificationResult = await dispatch(
            //         emailVerification(inputValue)
            //     );
            //     const invalidStatuses = ["invalid", "disposable", "disabled"];
            //     const status = emailVerificationResult?.payload?.data?.status;

            //     if (invalidStatuses.includes(status)) {
            //     message.error("Please enter a valid email address");
            //     return;
            //     }
            // }
            const memberIdx = allMembers?.findIndex((member) => member.email === inputValue)
            if (memberIdx !== -1) return message.error("User already exist")
            const m = {
                id: member?.payload?.data?.id ? member?.payload?.data?.id : inputValue,
                email: inputValue,
                avatar: member?.payload?.data?.avatar ? member?.payload?.data?.avatar : null,
                username: member?.payload?.data?.username ? member?.payload?.data?.username : null,
                name: member?.payload?.data?.name ? member?.payload?.data?.name : inputValue,
            };
            // const m = member?.payload?.data
            setAllFilteredUsers([...allFilteredUsers, m])
            setNewUsers([...newUsers, m.id]);
            setAllUsers([...allUsers, { id: m.id, email: m.email, username: m.username, name: m.name, avatar: m.avatar }])
        }
    }

    const onRemoveMember = async () => {

        const memberIdx = allMembers.findIndex((m) => { return m.teamId === currentId })
        if (memberIdx !== -1) {
            const res = await dispatch(deleteTeam(currentId))
            if (res.error === undefined) {
                if (memberIdx !== -1) {
                    allMembers.splice(memberIdx, 1)
                    onMemberChange && onMemberChange([...allMembers])
                }
                setShowRemoveModal(false)
                dispatch(getPlanService())
            }
        }
    }

    const onRemoveMemberClick = async (guestId) => {
        setCurrentId(guestId)
        setShowRemoveModal(true)
    }

    const onConvertGuest = async () => {
        const memberIdx = allMembers.findIndex((m) => { return m.teamId === currentId })
        if (memberIdx !== -1) {
            const member = allMembers[memberIdx]
            const obj = {
                isGuest: true,
                isMember: false
            }
            const res = await dispatch(updateTeam(currentId, obj))
            dispatch(getPlanService())

            if (res.error === undefined) {
                if (memberIdx !== -1) {
                    allMembers.splice(memberIdx, 1)
                    onMemberChange(allMembers)
                    onGuestChange([...allGuests, member])
                }
                setShowConvertModal(false)
            }
        }
    }

    const onConvertGuestClick = async (guestId) => {
        setCurrentId(guestId)
        setShowConvertModal(true)
    }

    const onTextCopy = () => {
        window.navigator.clipboard
            .writeText(
                `${memberInviteUrl}`
            )
            .then(() => message.success("Link copied"))
            .catch(() => message.error("Not have permission"));
    };

    const onClose = () => {
        setShowMemberBox(false);
        setNewUsers([])
    };

    let obj = {
        email: session?.email,
        firstname: session?.firstname,
        lastname: session?.lastname,
        id: session?.userId,
        username: session?.username,
        teamId: null,
        role: "Workspace Owner",
        name: `${session?.firstname} ${session?.lastname}`,
        avatar: session?.userProfileImage
    }

    

    if (ownerDetails) {
        obj = {
            email: ownerDetails?.email,
            firstname: ownerDetails?.firstname,
            lastname: ownerDetails?.lastname,
            id: ownerDetails?.userId,
            username: ownerDetails?.username,
            teamId: null,
            role: "Workspace Owner",
            name: `${ownerDetails?.firstname} ${ownerDetails?.lastname}`,
            avatar: ownerDetails?.userProfileImage
        }
    }

    if (!isPlanOwner) {
        const index = columns.findIndex((c) => { return c.key === "operation" })
        if (index !== -1) {
            columns.splice(index, 1)
        }
    }

    

    return (
        <div 
        // className={isMobile ? "ml-2 mr-2" : ""}
        >
            <div className='flex flex-col items-center justify-end w-full mb-2'>
                {isPlanOwner && (plan==="Team L" || plan==="Team M" || plan==="Team S" || plan==="Team XL") && <div className="flex flex-row items-center justify-between md:justify-end w-full">
                    <div className='w-[50%] border border-[#ABB7C9] rounded-[8px] bg-white text-[12px] text-[#74778B] py-2 px-2 flex flex-row items-center justify-between gap-[25px] h-[40px]'>
                        {`${memberInviteUrl}`}
                    </div>
                    <div className="">
                        <Button className="border rounded-[8px] ml-2 h-[40px]" onClick={onTextCopy}>Copy link</Button>
                    </div>
                </div> }
                {isPlanOwner && (plan==="Team L" || plan==="Team M" || plan==="Team S" || plan==="Team XL") && <Divider />}
                <div className='flex items-center justify-between md:justify-end w-full mb-2'>
                    <p className="md:mr-5"><b>{membersTotalCount === 100000 ? `Total Members: ${membersUsedCount}` : `Member Used: ${membersUsedCount}/${membersTotalCount}`}</b></p>
                    {isPlanOwner && <Button type="primary" className="bookmark-addBtn" onClick={onMembersAddClick}>Add Member</Button>}
                </div>
            </div>
            {
                isMobile ?
                    <>
                    <Table
                    columns={MobileColumns}
                    dataSource={[obj, ...allMembers?.map((g) => {
                        return {
                            ...g,
                            onRemoveMemberClick,
                            onConvertGuestClick
                        }
                    })]}
                    />
                    </>
                    :
                    <>
                       
                        <div className=''>
                            <Space
                                align="center"
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                            </Space>
                            <Table
                                columns={columns}
                                rowClassName={"ct-team-row"}
                                // rowSelection={{
                                //     ...rowSelection,
                                // }}
                                dataSource={[obj, ...allMembers?.map((g) => {
                                    return {
                                        ...g,
                                        onRemoveMemberClick,
                                        onConvertGuestClick
                                    }
                                })]}
                            />
                        </div>
                    </>

            }

            {
            showMemberBox && isMobile &&
            <Drawer
            className="ct-team-drawer"
            open={showMemberBox}
            placement={'bottom'}
            width={'90%'}
            title={null}
            closable={false}
            height={240}
            onClose={onClose}
            >
                <div className="">
                  <div className="ct-mobile-team-header" onClick={onClose}></div>
                  <Divider className="ct-mobile-team-divider" />
                  <div className="mb-5"><h2 className='text-[20px] font-[bold]' style={{fontFamily: "Inter"}}>Add new Members</h2></div>
                </div>
                <Divider className="ct-mobile-team-divider-bottom" />
                <Select mode="multiple"
                                    optionFilterProp='title'
                                    className='ct-team-select-box'
                                    placeholder="Select members or type email to add new member"
                                    allowClear
                                    autoFocus
                                    filterOption={(inputVal, option) => {
                                        if (inputVal.length >= 4) {
                                            return option.title.toLowerCase().includes(inputVal.toLowerCase());
                                        }
                                    }}
                                    tagRender={props => {
                                        const { value } = props
                                        const idx = allFilteredUsers.findIndex(user => user?.id === value)
                                        if (idx !== -1) {
                                            const user = allFilteredUsers[idx]
                                            return <Tag className='flex p-1'
                                                key={user?.id}
                                                closable={true}
                                                onClose={() => onTagRemove(user?.id)}>
                                                <div className='flex flex-row items-center'>
                                                    <Avatar src={user.avatar} className='mr-2'>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                                                    <span>{user?.name}</span>
                                                </div>
                                            </Tag>
                                        }
                                        return null
                                    }}
                                    value={newUsers}
                                    onChange={(users) => { setNewUsers(users) }}
                                    ref={elm}
                                    onInputKeyDown={onMemberEmailKeyDown}

                                >
                                    {allFilteredUsers.map(user => {
                                        return <Option
                                            disabled={newUsers.length >= membersCount}
                                            key={user.id}
                                            value={user.id}
                                            title={`${user.username}-${user.email}`}
                                        >
                                            <div className='flex flex-row items-center'>
                                                <Avatar src={user.avatar} className='mr-2'>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                                                <span>{user?.username ? user.username : user.email}</span>
                                            </div>
                                        </Option>;
                                    })}
                </Select>
                <Divider className="ct-mobile-team-divider-bottom" />
                <div className="flex flex-row justify-between">
                  <Button type="primary" className="w-[45%]" style={{ borderRadius: '250px', color: 'black' }} onClick={onClose}>Cancel</Button>
                  <Button type="primary" className="w-[45%] bookmark-addBtn" style={{ borderRadius: '250px' }} onClick={onMemberAdd}>Add</Button>
                </div>
            </Drawer>
            }


            {showMemberBox && !isMobile &&
                            <Modal open={showMemberBox}
                                onCancel={() => {
                                    setShowMemberBox(false)
                                    setNewUsers([])
                                }}
                                okText="Add"
                                title={"Add new members"}
                                okButtonProps={{
                                    className: "bg-[#40a9ff] border-[#40a9ff]"
                                }}
                                onOk={onMemberAdd}
                            >
                                <Select mode="multiple"
                                    optionFilterProp='title'
                                    className='ct-team-select-box'
                                    placeholder="Select members or type email to add new member"
                                    allowClear
                                    autoFocus
                                    filterOption={(inputVal, option) => {
                                        if (inputVal.length >= 4) {
                                            return option.title.toLowerCase().includes(inputVal.toLowerCase());
                                        }
                                    }}
                                    tagRender={props => {
                                        const { value } = props
                                        const idx = allFilteredUsers.findIndex(user => user?.id === value)
                                        if (idx !== -1) {
                                            const user = allFilteredUsers[idx]
                                            return <Tag className='flex p-1'
                                                key={user?.id}
                                                closable={true}
                                                onClose={() => onTagRemove(user?.id)}>
                                                <div className='flex flex-row items-center'>
                                                    <Avatar src={user.avatar} className='mr-2'>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                                                    <span>{user?.name}</span>
                                                </div>
                                            </Tag>
                                        }
                                        return null
                                    }}
                                    value={newUsers}
                                    onChange={(users) => { setNewUsers(users) }}
                                    ref={elm}
                                    onInputKeyDown={onMemberEmailKeyDown}

                                >
                                    {allFilteredUsers.map(user => {
                                        return <Option
                                            disabled={newUsers.length >= membersCount}
                                            key={user.id}
                                            value={user.id}
                                            title={`${user.username}-${user.email}`}
                                        >
                                            <div className='flex flex-row items-center'>
                                                <Avatar src={user.avatar} className='mr-2'>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                                                <span>{user?.username ? user.username : user.email}</span>
                                            </div>
                                        </Option>;
                                    })}
                                </Select>

                            </Modal>
                        }

                        {showRemoveModal && <Modal
                            open={showRemoveModal}
                            title="Remove Guest"
                            onOk={onRemoveMember}
                            okText="Yes"
                            okButtonProps={{
                                className: "bg-[#40a9ff] border-[#40a9ff]"
                            }}
                            onCancel={() => { setShowRemoveModal(false) }}
                        >
                            <p>Are you sure you want to remove?</p>
                        </Modal>}

                        {showConvertModal && <Modal
                            open={showConvertModal}
                            title="Convert To Guest"
                            onOk={onConvertGuest}
                            okText="Yes"
                            okButtonProps={{
                                className: "bg-[#40a9ff] border-[#40a9ff]"
                            }}
                            onCancel={() => { setShowConvertModal(false) }}
                        >
                            <p>Are you sure you want to Convert?</p>
                        </Modal>}
        </div>
    )
}

export default MembersComponent;