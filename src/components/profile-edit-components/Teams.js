import Tabs from '@components/tabs/Tabs';
import { useEffect, useState } from 'react';
import GroupComponent from './group';
import MembersComponent from '@containers/teams/Members';
import GuestsComponent from '@containers/teams/Guests';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeams } from '@actions/team';
import { getPlanService } from '@actions/plan-service';
import ShareWithMeComponent from '@containers/teams/ShareWithMe';
// import { tableBodyClasses } from '@mui/material';

const TABS = [
    {
        name: "Members",
        current: true,
        disabled: false
    },
    {
        name: "Guests",
        current: false,
        disabled: false
    },
    {
        name: "Groups",
        current: false,
        disabled: false
    },
    {
        name: "Shared with me",
        current: false,
        disabled: false
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const TeamsComponent = ({ }) => {
    const dispatch = useDispatch()
    const [tabs, setTabs] = useState(TABS)
    const [allMembers, setAllMembers] = useState([])
    const [allGuests, setAllGuests] = useState([])
    const [membersLimit, setMembersLimit] = useState(false)
    const [membersCount, setMembersCount] = useState(0)
    const [membersUsedCount, setMembersUsedCount] = useState(0)
    const [membersTotalCount, setMembersTotalCount] = useState(0)
    const [guestsLimit, setGuestsLimit] = useState(false)
    const [guestsCount, setGuestsCount] = useState(0)
    const [guestUsedCount, setGuestsUsedCount] = useState(0)
    const [guestTotalCount, setGuestTotalCount] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    let width = 0;
    const { planService, isPlanOwner, ownerDetails, plan } = useSelector(state => state.planService)

    //mobile
    const [selectedMobileTab,setSelectedMobileTab] = useState('members')

    useEffect(() => {
        if (planService) {
            setMembersCount(parseInt(planService?.included_members) - parseInt(planService?.included_members_used))
            setGuestsCount(parseInt(planService?.guest_users) - parseInt(planService?.guest_users_used))
            setMembersTotalCount(parseInt(planService?.included_members))
            setGuestTotalCount(parseInt(planService?.guest_users))
            setGuestsUsedCount(parseInt(planService?.guest_users_used))
            setMembersUsedCount(parseInt(planService?.included_members_used))
            if (parseInt(planService?.included_members_used) >= parseInt(planService?.included_members)) {
                setMembersLimit(true)
            } else {
                setMembersLimit(false)
            }

            if (parseInt(planService?.guest_users_used) >= parseInt(planService?.guest_users)) {
                setGuestsLimit(true)
            } else {
                setGuestsLimit(false)
            }
        } else {
            dispatch(getPlanService())
                .then((res) => {
                    setMembersCount(parseInt(res?.payload?.data?.data?.included_members) - parseInt(res?.payload?.data?.data?.included_members_used))
                    setGuestsCount(parseInt(res?.payload?.data?.data?.guest_users) - parseInt(res?.payload?.data?.data?.guest_users_used))
                    setGuestTotalCount(parseInt(res?.payload?.data?.data?.guest_users))
                    setMembersTotalCount(parseInt(res?.payload?.data?.data?.included_members))
                    setGuestsUsedCount(parseInt(res?.payload?.data?.data?.guest_users_used))
                    setMembersUsedCount(parseInt(res?.payload?.data?.data?.included_members_used))
                    if (parseInt(res?.payload?.data?.data?.included_members_used) >= parseInt(res?.payload?.data?.data?.included_members)) {
                        setMembersLimit(true)
                    } else {
                        setMembersLimit(false)
                    }
                    if (parseInt(res?.payload?.data?.data?.guest_users_used) >= parseInt(res?.payload?.data?.data?.guest_users)) {
                        setGuestsLimit(true)
                    } else {
                        setGuestsLimit(false)
                    }
                })
        }
    }, [planService])

    useEffect(() => {
        dispatch(getAllTeams())
            .then((res) => {
                // setLoading(false)
                if (res?.payload?.data?.members) {
                    setAllMembers([...res?.payload?.data?.members?.map((g) => {
                        return {
                            ...g.username,
                            avatar: g?.username?.profilePhoto,
                            teamId: g?.id,
                            name: g.username ? `${g.username.firstname} ${g.username.lastname}` : "Annomyous",
                            role: g?.role ? g.role : "Member",
                            email: g?.email
                            // onRemoveMemberClick,
                        }
                    })])
                }
                if (res?.payload?.data?.guests) {
                    setAllGuests([...res?.payload?.data?.guests?.map((g) => {
                        return {
                            ...g.username,
                            teamId: g?.id,
                            name: g.username ? `${g?.username?.firstname} ${g?.username?.lastname}` : "Annomyous",
                            avatar: g?.username?.profilePhoto,
                            collections: g?.collections,
                            tags: g?.tags,
                            email: g?.email
                        }
                    })])
                }
            })
    }, [])

    useEffect(() => {
        function handleResize() {
            if (window?.innerWidth <= 768) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        if (typeof window !== "undefined") {
            width = window.innerWidth;
            window.addEventListener("resize", handleResize);
        }

        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);

        };
    }, []);

    const activateTab = (name) => {
        const newTab = tabs.map(t => {
            if (t.name === name) {
                return { ...t, current: true }
            } else {
                return { ...t, current: false }
            }
        })

        setTabs(newTab);
    }

    const checkAtive = (name) => {
        const currentTab = tabs.filter(t => t.name === name)[0];
        if (currentTab?.current) {
            return true
        }
        return false
    }

    const onMemberChange = (newMembers) => {
        setAllMembers(newMembers)
    }

    const onGuestChange = (newMembers) => {
        setAllGuests(newMembers)
    }

    return (
        <>
            {/* <CommonLayout showSecondarySidebar={false}> */}
            {isMobile ? (
                <div className='py-4 px-2'>
                    <div className="w-full flex p-1 rounded-md bg-[#F8FAFB] cursor-pointer items-center justify-between mb-6">
                        <div className={`shareInviteBtn ${selectedMobileTab === 'members' ? 'rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white' : ''} w-fit`} 
                        onClick={() => { setSelectedMobileTab('members')}}>
                        <div className={`${selectedMobileTab === 'members' ? 'text-[#347AE2]' : 'text-[#74778B]'} font-medium text-sm`}>Members</div>
                        </div>

                        <div className={`shareInviteBtn ${selectedMobileTab === 'guests' ? 'rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white' : ''} w-fit`} 
                        onClick={() => setSelectedMobileTab('guests')}
                        >
                        <div className={`font-medium text-sm ${selectedMobileTab === 'guests' ? 'text-[#347AE2]' : 'text-[#74778B]'}`}>Guests</div>
                        </div>

                        <div className={`shareInviteBtn ${selectedMobileTab === 'groups' ? 'rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white' : ''} w-fit`} 
                        onClick={() => setSelectedMobileTab('groups')}
                        >
                        <div className={`font-medium text-sm ${selectedMobileTab === 'groups' ? 'text-[#347AE2]' : 'text-[#74778B]'}`}>Groups</div>
                        </div>

                        <div className={`shareInviteBtn ${selectedMobileTab === 'shared with me' ? 'rounded shadow border-[0.4px] border-solid border-[#78A6EC] bg-white' : ''} w-fit`} 
                        onClick={() => setSelectedMobileTab('shared with me')}
                        >
                        <div className={`font-medium text-sm ${selectedMobileTab === 'shared with me' ? 'text-[#347AE2]' : 'text-[#74778B]'}`}>Shared with me</div>
                        </div>
                    </div>

                    {
                    selectedMobileTab === 'members' &&
                    <div>
                        <MembersComponent
                            allMembers={allMembers}
                            onMemberChange={onMemberChange}
                            onGuestChange={onGuestChange}
                            membersLimit={membersLimit}
                            membersCount={membersCount}
                            allGuests={allGuests}
                            membersTotalCount={membersTotalCount}
                            membersUsedCount={membersUsedCount}
                            isPlanOwner={isPlanOwner}
                            ownerDetails={ownerDetails}
                            plan={plan}
                            isMobile={true}
                        />
                    </div>
                    }

                    {
                    selectedMobileTab === 'guests' &&
                    <div>
                        <GuestsComponent
                            allGuests={allGuests}
                            onGuestChange={onGuestChange}
                            onMemberChange={onMemberChange}
                            allMembers={allMembers}
                            guestsLimit={guestsLimit}
                            guestsCount={guestsCount}
                            guestTotalCount={guestTotalCount}
                            guestUsedCount={guestUsedCount}
                            isMobile={true}
                        />
                    </div>
                    }

                    {
                    selectedMobileTab === 'groups' &&
                    <div>
                        <GroupComponent
                            allMembers={allMembers}
                            allGuests={allGuests}
                            onMemberChange={onMemberChange}
                            onGuestChange={onGuestChange}
                            isMobile={true}
                        />
                    </div>
                    }

                    {
                    selectedMobileTab === 'shared with me' &&
                    <div>
                        <ShareWithMeComponent isMobile={true}/>
                    </div>
                    }
                </div>
            ) :
                (<div>
                    <div className='flex justify-start items-center p-4'>
                        <Tabs showTabs={tabs} page="timeline" activateTab={activateTab} />
                    </div>
                    <div className='h-full'>
                        <div className='mt-4'>
                            <div className={classNames(checkAtive('Members') ? '' : 'hidden')}>
                                <MembersComponent
                                    allMembers={allMembers}
                                    onMemberChange={onMemberChange}
                                    onGuestChange={onGuestChange}
                                    membersLimit={membersLimit}
                                    membersCount={membersCount}
                                    allGuests={allGuests}
                                    membersTotalCount={membersTotalCount}
                                    membersUsedCount={membersUsedCount}
                                />
                            </div>
                            <div className={classNames(checkAtive('Shared with me') ? '' : 'hidden')}>
                                <ShareWithMeComponent />
                            </div>
                            <div className={classNames(checkAtive('Guests') ? '' : 'hidden')}>
                                <GuestsComponent
                                    allGuests={allGuests}
                                    onGuestChange={onGuestChange}
                                    onMemberChange={onMemberChange}
                                    allMembers={allMembers}
                                    guestsLimit={guestsLimit}
                                    guestsCount={guestsCount}
                                    guestTotalCount={guestTotalCount}
                                    guestUsedCount={guestUsedCount}
                                />
                            </div>
                            <div className={classNames(checkAtive('Groups') ? '' : 'hidden')}>
                                <GroupComponent
                                    allMembers={allMembers}
                                    allGuests={allGuests}
                                    onMemberChange={onMemberChange}
                                    onGuestChange={onGuestChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>)
            }
            {/* </CommonLayout>   */}
        </>
    )
}

export default TeamsComponent;