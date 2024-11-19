
import { addTeam, deleteTeam, updateTeam } from '@actions/team';
import { Avatar, Button, Divider, Drawer, Dropdown, List, Modal, Select, Space, Table, Tag, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FolderOpenIcon,
  HashtagIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";
import { findMemberExist, getAllPublicUsers } from '@actions/group';
import { Validator } from '@utils/validations';
import session from '@utils/session';
import { getPlanService } from '@actions/plan-service';
import { toggleExceedPopup } from '@actions/app';

const columns = [
  {
    title: 'User',
    dataIndex: 'name',
    key: 'name',
    columnWidth: 400,
    render: (val, row) => {
      // return (<div className='flex flex-row items-center'>
      //   <Avatar src={row.avatar} className='mr-2'>{row?.name ? row?.name?.charAt(0).toUpperCase() : row?.email?.charAt(0).toUpperCase()}</Avatar>
      //   <span>{row?.name ? row?.name : row?.email}</span>
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
    title: 'Access',
    colSpan: 2,
    dataIndex: 'collections',
    key: 'collections',
    render: (val, row) => {
      if (row.collections?.length === 0 || row.collections === undefined) {
        return <span className='text-blue-500 cursor-pointer'>{`0 Collections`}</span>
      }
      const colls = row?.collections?.map((c) => {
        return {
          key: c?.id,
          label: <List.Item>
            <List.Item.Meta
              avatar={<FolderOpenIcon className="h-4 w-4 text-[#97A0B5]" />}
              title={c.author ? <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${c.author?.username}/c/${c?.id}/${c?.slug}`}>{c?.name}</a> : c.name}
              description={c?.accesstype}
            />
          </List.Item>
        }
      })

      return (<Space size="middle">
        <Dropdown
          overlayStyle={{ width: 250 }}
          menu={
            { items: colls }
          }
        >
          <a>
            <span className='text-blue-500 cursor-pointer'>{row?.collections ? `${row?.collections?.length} Collections` : `0 Collections`}</span>
          </a>
        </Dropdown>
      </Space>)
    },
  },
  {
    title: 'Tags',
    colSpan: 0,
    dataIndex: 'tags',
    key: 'tags',
    render: (val, row) => {
      if (row.tags?.length === 0 || row.tags === undefined) {
        return <span className='text-blue-500 cursor-pointer'>{row?.tags ? `${row?.tags?.length} Tags` : `0 Tags`}</span>
      }
      return (<Space size="middle">
        <Dropdown
          overlayStyle={{ width: 250 }}
          menu={
            {
              items: row?.tags?.map((t) => {
                return {
                  key: t?.id,
                  label: <List.Item>
                    <List.Item.Meta
                      avatar={<FolderOpenIcon className="h-4 w-4 text-[#97A0B5]" />}
                      title={t.users?.length > 0 ? <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${t.users[0]?.username}/tags/${t?.id}/${t?.slug}`}>{t?.tag}</a> : t.tag}
                      description={t?.accesstype}
                    />
                  </List.Item>
                }
              })
            }
          }
        >
          <span className='text-blue-500 cursor-pointer'>{row?.tags ? `${row?.tags?.length} Tags` : `0 Tags`}</span>
        </Dropdown>
      </Space>)
    },
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    render: (val, row) => {
      const newItems = items?.map((item) => {
        return { ...item, onClick: item.key === 'remove' ? () => row.onRemoveGuestClick(row.teamId) : () => row.onUpgradeMemberClick(row.teamId) }
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

const items = [
  {
    key: 'remove',
    label: 'Remove as a guest',
  },
  {
    key: 'upgrade',
    label: 'Upgrade to a member',
  },
];

const MobileColumns = [
  {
    title: 'User',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
    ellipsis: true,
    render: (_,record) => {
            return(
                <>
                <div className="flex items-center">
                    {
                    record?.avatar ? <Avatar src={record?.avatar} className='mr-2'>
                    </Avatar> :
                    <Avatar className='mr-2'>
                        {record?.name ? record?.name?.charAt(0).toUpperCase() : record?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                    }
                    <div>{record?.name || record?.username || record?.firstname || record?.lastname}</div>
                </div>
                </>
            )
    }
  },
  {
    title: "Collections",
    dataIndex: "collections",
    key: "collections",
    align: "center",
    width: "30%",
    render: (val, row) => {
      return (
        <div className='text-blue-500 cursor-pointer' >
          <button onClick={() => row.onCollectionShowDrawerClick(row)}> {row?.tags ? `${row?.tags?.length}` : 0} </button>
        </div>
      )
    }
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    align: "center",
    width: "20%",
    render: (val, row) => {
      return (
        <div className='text-blue-500 cursor-pointer' >
          <button onClick={() => row.onTagShowDrawerClick(row)}> {row?.tags ? `${row?.tags?.length}` : 0} </button>
        </div>
      )
    }
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    align: "center",
    // fixed: true,
    width: '20%',
    render: (val, row) => {
      const newItems = items?.map((item) => {
        return { ...item, onClick: item.key === 'remove' ? () => row.onRemoveGuestClick(row.teamId) : () => row.onUpgradeMemberClick(row.teamId) }
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

const GuestsComponent = ({
  allGuests, onGuestChange, onMemberChange, allMembers, guestsLimit, guestsCount, guestTotalCount, guestUsedCount,isMobile=false
}) => {

  const dispatch = useDispatch()
  const elm = useRef()
  let width = 0;
  // const [loading, setLoading] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [allFilteredUsers, setAllFilteredUsers] = useState([])
  const [currentId, setCurrentId] = useState(null)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showMemberBox, setShowMemberBox] = useState(false)
  const [newUsers, setNewUsers] = useState([])
  // const [isMobile, setIsMobile] = useState(false)
  const [openTagDrawer, setOpenTagDrawer] = useState(false);
  const [openCollectionDrawer, setOpenCollectionDrawer] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const guestInviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&t=guest`

  const onRemoveGuest = async () => {
    const guestIdx = allGuests.findIndex((g) => { return g.teamId === currentId })
    if (guestIdx !== -1) {
      const res = await dispatch(deleteTeam(currentId))
      dispatch(getPlanService())

      if (res.error === undefined) {
        if (guestIdx !== -1) {
          allGuests.splice(guestIdx, 1)
          onGuestChange([...allGuests])
        }
        setShowRemoveModal(false)
      }
    }
  }

  const onUpgradeGuest = async () => {
    const guestIdx = allGuests.findIndex((g) => { return g.teamId === currentId })
    if (guestIdx !== -1) {
      const guest = allGuests[guestIdx]
      const obj = {
        isGuest: false,
        isMember: true,
        role: "Member"
      }
      const res = await dispatch(updateTeam(currentId, obj))
      dispatch(getPlanService())

      if (res.error === undefined) {
        if (guestIdx !== -1) {
          allGuests.splice(guestIdx, 1)
          onGuestChange(allGuests)
          onMemberChange([...allMembers, guest])
        }
        setShowUpgradeModal(false)
      }
    }
  }

  const onRemoveGuestClick = async (guestId) => {
    setCurrentId(guestId)
    setShowRemoveModal(true)
  }

  const onUpgradeMemberClick = async (guestId) => {
    setCurrentId(guestId)
    setShowUpgradeModal(true)
  }

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


  const onGuestAdd = async () => {
    const newGuests = []
    newUsers.forEach((id) => {
      const existIdx = allUsers.findIndex((m) => m.id === id)
      if (existIdx !== -1) {
        newGuests.push({
          email: allUsers[existIdx].email,
          isGuest: true,
          author: session.userId,
          username: isNaN(allUsers[existIdx].id) ? null : allUsers[existIdx].id
        })
      }
    })

    let validation = false
    const validMembers = []
    for (const guest of newGuests) {
      const res = await dispatch(addTeam(guest))
      if (res?.error === undefined) {
        validation = true
        const existIdx = allUsers.findIndex((m) => parseInt(m.id) === parseInt(guest?.username))
        if (existIdx !== -1) {
          guest.teamId = res?.payload?.data?.id
          guest.name = allUsers[existIdx].name
          guest.username = allUsers[existIdx].username
          guest.id = allUsers[existIdx].id
          guest.onRemoveGuestClick = onRemoveGuestClick
          guest.avatar = allUsers[existIdx].profilePhoto
        }
        const obj = {
          author: session.userId,
          avatar: guest.avatar,
          email: allUsers[existIdx]?.email ? allUsers[existIdx]?.email : guest.email,
          teamId: guest.teamId,
          name: guest.name,
          username: guest.username,
          id: guest.id,
          onRemoveGuestClick: guest.onRemoveGuestClick,
          isGuest: true,
          role: "Guest",
        }
        validMembers.push(obj)
      }
      else {
        const idx = newGuests.findIndex((g) => {
          return g.email === guest?.email
        })
        if (idx !== -1) {
          newGuests.splice(idx, 1)
        }
        setNewUsers([])
        setAllFilteredUsers([...allFilteredUsers.filter((a) => { return a.id !== a.username })])
        setAllUsers([...allUsers.filter((a) => { return a.id !== a.username })])
        setShowMemberBox(false)
      }
    }
    dispatch(getPlanService())
    validation ? onGuestChange && onGuestChange([...allGuests, ...validMembers]) : onGuestChange([...allGuests])
    setNewUsers([])
    setAllFilteredUsers([])
    setShowMemberBox(false)
  }

  const onGuestEmailKeyDown = async (e) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && e.target.value.trim() !== "") {
      if (newUsers.length >= guestsCount) {
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

      const guest = await dispatch(findMemberExist(inputValue))
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
      const guestIdx = allGuests?.findIndex((guest) => guest.email === inputValue)
      if (guestIdx !== -1) return message.error("User already exist")
      const g = {
        id: guest?.payload?.data?.id ? guest?.payload?.data?.id : inputValue,
        email: inputValue,
        avatar: guest?.payload?.data?.avatar ? guest?.payload?.data?.avatar : null,
        username: guest?.payload?.data?.username ? guest?.payload?.data?.username : null,
        name: guest?.payload?.data?.name ? guest?.payload?.data?.name : inputValue,
      };
      // const m = member?.payload?.data
      setAllFilteredUsers([...allFilteredUsers, g])
      setNewUsers([...newUsers, g.id]);
      setAllUsers([...allUsers, { id: g.id, email: g.email, username: g.username, name: g.name, avatar: g.avatar }])
    }
  }

  const onGuestsAddClick = () => {
    if (guestsLimit) {
      dispatch(toggleExceedPopup(true, "Guest Limit exceeded, please upgrade your plan, buy add-ons or earn some credits to unlock more!"))
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

  const onTagShowDrawerClick = (record) => {
    setCurrentRecord(record)
    setOpenTagDrawer(true)
  }

  const onCollectionShowDrawerClick = (record) => {
    setCurrentRecord(record)
    setOpenCollectionDrawer(true)
  }

  const onClose = () => {
    setOpenTagDrawer(false);
    setOpenCollectionDrawer(false);
    setCurrentRecord(null)
    setShowMemberBox(false);
  }

  const onTextCopy = () => {
    window.navigator.clipboard
      .writeText(
        `${guestInviteUrl}`
      )
      .then(() => message.success("Link copied"))
      .catch(() => message.error("Not have permission"));
  };

  return (
    <div className={isMobile ? "ml-2 mr-2" : ""}>
      <div className='flex flex-col items-center justify-end w-full mb-2'>
        <div className="flex flex-row items-center justify-center md:justify-end w-full">
          <div className={`${isMobile ? 'w-full' : 'w-[50%]'} border border-[#ABB7C9] rounded-[8px] bg-white text-[12px] text-[#74778B] py-2 px-2 flex flex-row items-center justify-between gap-[25px] h-[40px]'`}>
            {`${guestInviteUrl}`}
          </div>
          <div className="">
            <Button className="border rounded-[8px] ml-2 h-[40px]" onClick={onTextCopy}>Copy link</Button>
          </div>
        </div>
        <Divider />
        <div className='flex items-center justify-between md:justify-end w-full mb-2'>
          <p className='mr-5'><b>Guests Used: {guestUsedCount}/{guestTotalCount}</b></p>
          <Button type="primary" className="bookmark-addBtn" onClick={onGuestsAddClick}>Add Guest</Button>
        </div>
      </div>
      {isMobile ?
          <>

            <Table
              columns={MobileColumns}
              dataSource={allGuests?.map((g) => {
                  return {
                    ...g,
                    onRemoveGuestClick,
                    onUpgradeMemberClick,
                    onTagShowDrawerClick,
                    onCollectionShowDrawerClick
                  }
                })}
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
                //   ...rowSelection,
                // }}
                dataSource={allGuests?.map((g) => {
                  return {
                    ...g,
                    onRemoveGuestClick,
                    onUpgradeMemberClick
                  }
                })}
              />
            </div>
          </>
      }

      {openTagDrawer ? <Drawer
              className="ct-team-drawer"
              title={null}
              placement={"bottom"}
              closable={false}
              width={500}
              onClose={onClose}
              open={openTagDrawer}
              footer={
                <div className="flex items-center justify-center">
                  <Button type="primary" className="w-[75%] bookmark-addBtn" onClick={onClose} style={{borderRadius:'250px'}}>Close</Button>
                </div>
              }
            >
              <div className="">
                <div className="ct-mobile-team-header" onClick={onClose}></div>
                <Divider className="ct-mobile-team-divider" />
                <div className="mb-5"><h2 className='text-[20px] font-[bold]' style={{fontFamily: "Inter"}}>Tags</h2></div>
              </div>
              <Divider className="ct-mobile-team-divider-bottom" />
              <List className='h-[212px]'>
                {currentRecord?.tags?.map((t) => {
                  return (
                    <>
                      <List.Item style={{ borderBottom: "none", padding: "0px" }}>
                        <List.Item.Meta className="item-center"
                          avatar={<HashtagIcon className="h-4 w-4 " />}
                          title={t?.users?.length > 0 ? <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${t?.users[0]?.username}/tags/${t?.id}/${t?.slug}`}>{t?.tag}</a> : t.tag}
                          description={t?.accesstype}
                        />
                        <Divider />
                      </List.Item>
                    </>
                  )
                })
                }
              </List>
            </Drawer> : <></>}

            {openCollectionDrawer ? <Drawer
              className="ct-team-drawer"
              title={null}
              placement={"bottom"}
              closable={false}
              width={500}
              onClose={onClose}
              open={openCollectionDrawer}
              footer={
                <div className="flex justify-center">
                  <Button type="primary" className="w-[75%] bookmark-addBtn" style={{borderRadius:'250px'}} onClick={onClose}>Close</Button>
                </div>
              }
            >
              <div className="">
                <div className="ct-mobile-team-header" onClick={onClose}></div>
                <Divider className="ct-mobile-team-divider" />
                <div className="mb-5"><h2 className='text-[20px] font-[bold]' style={{fontFamily: "Inter"}}>Collections</h2></div>
              </div>
              <Divider className="ct-mobile-team-divider-bottom" />
              <List className='overflow-y-auto'>
                {currentRecord?.collections?.map((c) => {
                  return (
                    <>
                      <List.Item style={{ borderBottom: "none", padding: "0px" }}>
                        <List.Item.Meta
                          avatar={<FolderOpenIcon className="h-4 w-4 text-[#97A0B5]" />}
                          title={c?.author ? <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${c?.author?.username}/c/${c?.id}/${c?.slug}`}>{c?.name}</a> : c?.name}
                          description={c?.accesstype}
                        />
                        <Divider />
                      </List.Item>
                    </>
                  )
                })
                }
              </List>

            </Drawer> : <></>}


      {showRemoveModal && <Modal
              open={showRemoveModal}
              title="Remove Guest"
              onOk={onRemoveGuest}
              okText="Yes"
              okButtonProps={{
                className: "bg-[#40a9ff] border-[#40a9ff]"
              }}
              onCancel={() => { setShowRemoveModal(false) }}
            >
              <p>Are you sure you want to remove?</p>
            </Modal>}

            {showMemberBox && !isMobile &&
              <Modal open={showMemberBox}
                onCancel={() => {
                  setShowMemberBox(false)
                  setNewUsers([])
                }}
                okText="Add"
                title={"Add new guests"}
                okButtonProps={{
                  className: "bg-[#40a9ff] border-[#40a9ff]"
                }}
                onOk={onGuestAdd}
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
                  onInputKeyDown={onGuestEmailKeyDown}

                >
                  {allFilteredUsers.map(user => {
                    return <Option
                      disabled={newUsers.length >= guestsCount}
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

            {showMemberBox && isMobile &&
              <Drawer
                className="ct-team-drawer"
                title={null}
                placement={"bottom"}
                closable={false}
                width={500}
                height={240}
                onClose={onClose}
                open={showMemberBox}
              >
                <div className="">
                  <div className="ct-mobile-team-header" onClick={onClose}></div>
                  <Divider className="ct-mobile-team-divider" />
                  <div className="mb-5"><h2 className='text-[20px] font-[bold]' style={{fontFamily: "Inter"}}>Add new guests</h2></div>
                </div>
                <Divider className="ct-mobile-team-divider-bottom" />
                <Select mode="multiple"
                  maxTagCount={1}
                  optionHeight={10}
                  optionFilterProp='title'
                  className='ct-team-select-box ct-team-select-box-mobile'
                  placeholder="Select members or type email to add new guest"
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
                  onInputKeyDown={onGuestEmailKeyDown}
                >
                  {allFilteredUsers.map(user => {
                    return <Option
                      disabled={newUsers.length >= guestsCount}
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
                  <Button type="primary" className="w-[45%] bookmark-addBtn" style={{ borderRadius: '250px' }} onClick={onGuestAdd}>Add</Button>
                </div>
              </Drawer>
            }

            {showUpgradeModal && <Modal
              open={showUpgradeModal}
              title="Upgrade Guest"
              onOk={onUpgradeGuest}
              okText="Yes"
              okButtonProps={{
                className: "bg-[#40a9ff] border-[#40a9ff]"
              }}
              onCancel={() => { setShowUpgradeModal(false) }}
            >
              <p>Are you sure you want to Upgrade?</p>
            </Modal>}
    </div>
  )
}

export default GuestsComponent;