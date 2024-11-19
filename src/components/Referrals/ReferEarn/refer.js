import '../referrals.css'
import { Avatar, Button, List, Modal, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import session from '@utils/session';
import { getReferralUSers, inviteViaEmail } from '@actions/referral';
import { PiCopySimple, PiFacebookLogo, PiTwitterLogo } from 'react-icons/pi';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { IoArrowForward } from 'react-icons/io5';
import TitleSection from './titleSection';
import { getAllRegisteredUsers } from '@actions/group';
import AffiliateBlock from '@components/common/AffiliateBlock';
import { RiMenuFill } from 'react-icons/ri';
import { openAuthModal, setIsMobileSidebar } from '@actions/app';
import CurateitLogo from '@components/common/CurateitLogo';
import OnboardingRightImage from '@components/onboarding/common/OnboardingRightImage';
import TitleComponent from '@components/onboarding/common/TitleComponents';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import TextareaAutosize from "react-textarea-autosize";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed:'left',
    width:'200px',
    render: (val, row) => {
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
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
    render: (val, row) => {
      return <List>
        <span>
          {
            row?.platform === "link" ? "Link"
              : row?.platform === "wp" ? "WhatsApp"
                : row?.platform === "fb" ? "Facebook"
                  : row?.platform === "ig" ? "Instagram"
                    : row?.platform === "li" ? "LinkedIn"
                      : row?.platform === "tw" ? "Twitter"
                        : row?.platform === "email" ? "Email"
                          : row?.platform === "tag" ? "Tag"
                            : row?.platform === "collection" ? "Collection"
                              : "Link"
          }
        </span>
      </List>
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (val, row) => {
      return <List>
        <span>
          {
            row?.status === "pending" ? "Pending" : "Accepted"
          }
        </span>
      </List>
    },
  },
  {
    title: "Date/Time",
    dataIndex: "date-time",
    key: "date-time",
  },
  {
    title: "Trigger",
    dataIndex: "trigger",
    key: "trigger",
    render: (val, row) => {
      return <List>
        <span>
          {
            row?.trigger === "signup" ? "Sign Up"
              : row?.trigger === "createyourown" ? "Create Your Own"
                : row?.trigger === "userfollow" ? "User Follow"
                  : row?.trigger === "follow" ? (row?.platform === "collections") ? "Collection Follow" : (row?.platform === "tags") ? "Tag Follow" : (row?.platform === "gems") ? "Gem Follow" : (row?.platform === "profile") ? "Profile Follow" : null
                    : row?.trigger === "like" ? "Like"
                      : row?.trigger === "comment" ? "Comment"
                        : row?.trigger === "share" ? "Share"
                          : row?.trigger === "save" ? "Save"
                            : row?.trigger === "copy" ? (row?.platform === "collections") ? "Copy Collection" : "Copy Tag"
                              : row?.trigger === "userunfollow" ? "User Unfollow"
                                : "Link"
          }
        </span>
      </List>
    },
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
    render: (val, row) => {
      const ct_module = row?.platform === "collections" ? "c" : "tags";
      return <List>
        <span>
          {
            (row?.source_id && row?.slug && row?.code && row?.platform) ? <a style={{cursor: "pointer", color: "blue"}} onClick={() => row.goToSourceLink(`${process.env.NEXT_PUBLIC_BASE_URL}/u/${row?.code}/${ct_module}/${row?.source_id}/${row?.slug}`)}><u>{(!row?.slug || row?.slug === "undefined") ? "" : row.slug}</u></a> : null
          }
        </span>
      </List>
    }
  }
];

const ReferralComponent = ({ }) => {

  const dispatch = useDispatch();
  const [allReferralUsers, setAllReferralUsers] = useState([]);
  const [showInviteEmailModel, setShowInviteEmailModel] = useState(false);
  const [emails, setEmails] = useState('');
  const [allRegisteredUsers, setAllRegisteredUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    dispatch(getReferralUSers())
      .then((res) => {
        setAllReferralUsers(res?.payload?.data?.data);
      })

    dispatch(getAllRegisteredUsers())
      .then((res) => {
        setAllRegisteredUsers(res?.payload?.data?.data);
      })

    if (typeof window === "undefined") return;
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [])
  const embedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&p=link`;
  const onTextCopy = () => {
    window.navigator.clipboard
      .writeText(
        `${embedUrl}`
      )
      .then(() => message.success("Code copied"))
      .catch(() => message.error("Not have permission"));
  };

  const onInstaUrlCopy = () => {
    const instaUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&p=ig`;
    window.navigator.clipboard
      .writeText(
        `${instaUrl}`
      )
      .then(() => message.success("Code copied"))
      .catch(() => message.error("Not have permission"));
  }
  const onLinkedInUrlCopy = () => {
    const linkedinUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&p=li`;
    window.navigator.clipboard
      .writeText(
        `${linkedinUrl}`
      )
      .then(() => message.success("Code copied"))
      .catch(() => message.error("Not have permission"));
  }
  const onFbUrlCopy = () => {
    const fbUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&p=fb`;
    window.navigator.clipboard
      .writeText(
        `${fbUrl}`
      )
      .then(() => message.success("Code copied"))
      .catch(() => message.error("Not have permission"));
  }
  const onTwUrlCopy = () => {
    const twUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&p=tw`;
    window.navigator.clipboard
      .writeText(
        `${twUrl}`
      )
      .then(() => message.success("Code copied"))
      .catch(() => message.error("Not have permission"));
  }
  const onEmailInviteClick = () => {
    const emailUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-up?c=${session?.username}&p=email`;
    setShowInviteEmailModel(true)
  }

  const onEmailInvite = (e) => {
    if (emails){
      setLoading(true);
      const email = emails.split(",");
      const cleanedEmails = email.map((mail) => mail.trim());
      dispatch(inviteViaEmail(cleanedEmails)).then((res) => {
        if (res?.error === undefined) {
          setLoading(false);

          setShowInviteEmailModel(false);

          cleanedEmails.forEach((email) => {
            const registerdUserIdx = allRegisteredUsers.findIndex(
              (user) => user.email === email
            );
            if (registerdUserIdx !== -1) {
              return message.error(`${email} is already registered`);
            }
            const existIdx = allReferralUsers.findIndex(
              (user) => user.email === email
            );
            if (existIdx !== -1) {
              return message.error(`${email} is already invited`);
            }
            message.success("Email sent");
            setAllReferralUsers((prev) => {
              return [
                ...prev,
                {
                  name: email,
                  email: email,
                  platform: "email",
                  status: "pending",
                },
              ];
            });
          });
        } else {
          setLoading(false);
          setShowInviteEmailModel(false);
        }
      });
    }else{
      message.error('Please enter email address')
    }
  }

  // return (
  //   <>
  //     <div className=''>
  //       <Card
  //         style={{
  //           width: 300,
  //         }}
  //       >
  //         <p>Refer people to earn rewards</p>
  //         <p>Earn 25% profit from the people who use your referal</p>
  //         <div className='flex relative'>
  //           <Input
  //             placeholder={`${embedUrl}`}
  //             maxLength={16}
  //             disabled
  //             className='pr-8' // Add padding to the right to accommodate the copy icon
  //           />
  //           <RiFileCopyLine className='absolute top-1/2 transform -translate-y-1/2 right-2 h-4 w-4 text-gray-500 cursor-pointer' onClick={onTextCopy} />
  //         </div>
  //       </Card>
  //     </div>
  //     <div className=''>
  //       <Table
  //         columns={columns}
  //         rowClassName={"ct-team-row"}
  //         dataSource={allReferralUsers}
  //       />
  //     </div>
  //   </>
  // )

  const renderMobileHeader = () => {
    return (
      <>
        <div className="flex flex-col">
          <div className="flex sm:items-center flex-col sm:flex-row w-full  justify-between">
            <div className={`flex items-center mt-2`}>
              <RiMenuFill
                className="h-5 w-5 cursor-pointer text-[#575C70] mr-2"
                onClick={() => {
                  if(!session?.userId){
                      dispatch(openAuthModal({
                          open: true,
                          action : 'login'
                      }))
                      return;
                  }
                  dispatch(setIsMobileSidebar(true))
                }}
              />
              <div className='m-auto'>
                <CurateitLogo />
              </div>
            </div>
          </div>
        </div>
        <hr className="pageHeadingHr mt-2" />
      </>
    )
  }

  const goToSourceLink = (source) => {
    window.open(source, "_blank")
  }

  return (
    <>
      {isMobile && renderMobileHeader()}
      <div className="w-[100%] flex justify-center items-center">
        <div className="w-[100%] lg:w-max-[1779.5px] mx-auto">
          <TitleSection />
          {/* // ? Mobile Section */}

          <div className="block lg:hidden">
            <div className="flex flex-col">
              <div className="w-full flex flex-row items-center justify-between py-2 px-2 border border-[#78A6EC] rounded-[12px] bg-primary-lighterblue-100 mt-2">
                <div className="flex flex-col items-start justify-start ">
                  <p className="text-[20px] text-primary-blue font-semibold">
                    Refer people to earn rewards
                  </p>

                  <p className="text-[12px] text-#323543">
                    Earn free credits from people who use referral link
                  </p>

                  <div className="flex flex-row justify-start gap-[8px] mt-[8px]">
                    {/* // ? Referral code block */}
                    <div className="border border-[#ABB7C9] rounded-[8px] bg-white text-[12px] text-[#74778B] py-2 px-2 flex flex-row items-center justify-between gap-[25px]">
                      {`${embedUrl}`}

                      <button>
                        <PiCopySimple
                          className="text-[20px] text-[#74778B]"
                          onClick={onTextCopy}
                        />
                      </button>
                    </div>

                    {/* // ? Button */}
                  </div>
                  <button
                    className="py-2 px-2 text-white text-[14px] bg-primary-blue rounded-[8px] mt-2"
                    onClick={() =>
                      navigator?.clipboard.writeText("AVN163VABIK")
                    }
                  >
                    Add link to Bio
                  </button>

                  <div className="flex flex-row items-center justify-start gap-[10px] mt-[8px]">
                    <button className="bg-transparent text-primary-blue text-[20px]">
                      <FaInstagram onClick={onInstaUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[20px]">
                      <FaLinkedin onClick={onLinkedInUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[22px]">
                      <PiFacebookLogo onClick={onFbUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[20px]">
                      <PiTwitterLogo onClick={onTwUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[20px]">
                      <AiOutlineMail onClick={onEmailInviteClick} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Table
                  columns={columns}
                  rowClassName={"ct-team-row"}
                  dataSource={allReferralUsers}
                  scroll={{
                    x: 1300,
                  }}
                />
              </div>
              <div className="mt-5 mb-10">
                <AffiliateBlock />
              </div>
            </div>
          </div>
          <div className="mt-[40px] hidden xl:block">
            <div className="flex flex-col">
              <div className="w-full flex flex-row items-center justify-between py-[16px] px-[28px] border border-[#78A6EC] rounded-[12px] bg-primary-lighterblue-100">
                {/* // ? Text Section */}
                <div className="flex flex-col items-start justify-start ">
                  <p className="text-[24px] text-primary-blue font-semibold">
                    Refer people to earn rewards
                  </p>

                  <p className="text-[14px] text-#323543">
                    Earn free credits from people who use referral link
                  </p>

                  <div className="flex flex-row justify-start gap-[8px] mt-[8px]">
                    {/* // ? Referral code block */}
                    <div className="border border-[#ABB7C9] rounded-[8px] bg-white text-[16px] text-[#74778B] py-[12.5px] px-[12px] flex flex-row items-center justify-between gap-[50px]">
                      {`${embedUrl}`}

                      <button>
                        <PiCopySimple
                          className="text-[20px] text-[#74778B]"
                          onClick={onTextCopy}
                        />
                      </button>
                    </div>

                    {/* // ? Button */}
                    <button
                      className="py-[11px] px-[22px] text-white text-[16px] bg-primary-blue rounded-[8px]"
                      onClick={() =>
                        navigator?.clipboard.writeText("AVN163VABIK")
                      }
                    >
                      Add link to Bio
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-start gap-[20px] mt-[8px]">
                    <button className="bg-transparent text-primary-blue text-[24px]">
                      <FaInstagram onClick={onInstaUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[24px]">
                      <FaLinkedin onClick={onLinkedInUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[26px]">
                      <PiFacebookLogo onClick={onFbUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[24px]">
                      <PiTwitterLogo onClick={onTwUrlCopy} />
                    </button>
                    <button className="bg-transparent text-primary-blue text-[24px]">
                      <AiOutlineMail onClick={onEmailInviteClick} />
                    </button>
                  </div>
                </div>

                {/* // ? Steps Section */}
                <div className="flex flex-row items-start justify-between gap-[16px]">
                  <div className="flex flex-col items-center gap-[8px] max-w-[210px] text-center">
                    <div className="min-h-[44px] min-w-[210px] px-[12px] py-[8px] bg-primary-blue rounded-[66px] flex flex-row items-center justify-center gap-[10px]">
                      <div className="bg-white w-[20px] h-[20px] rounded-full flex flex-row items-center justify-center">
                        <p className="text-[12px] text-primary-blue font-semibold">
                          1
                        </p>
                      </div>

                      <p className="text-white text-[16px] font-medium">
                        Share and Invite
                      </p>
                    </div>

                    <p className="text-[12px] text-grey-light">
                      Share your referral link with the community.
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-blue text-[28px] mt-[8px]">
                      <IoArrowForward />
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-[8px] max-w-[210px] text-center">
                    <div className="min-h-[44px] min-w-[210px] bg-primary-blue rounded-[66px] flex flex-row items-center justify-center gap-[10px]">
                      <div className="bg-white w-[20px] h-[20px] rounded-full flex flex-row items-center justify-center">
                        <p className="text-[12px] text-primary-blue font-semibold">
                          2
                        </p>
                      </div>

                      <p className="text-white text-[16px] font-medium">
                        Sign up on CurateIt
                      </p>
                    </div>

                    <p className="text-[12px] text-grey-light">
                      Your friend signs up through your link.
                    </p>
                  </div>
                  <div>
                    <p className="text-primary-blue text-[28px] mt-[8px]">
                      <IoArrowForward />
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-[8px] max-w-[210px] text-center">
                    <div className="min-h-[44px] min-w-[210px] px-[12px] py-[8px] bg-primary-blue rounded-[66px] flex flex-row items-center justify-center gap-[10px]">
                      <div className="bg-white w-[20px] h-[20px] rounded-full flex flex-row items-center justify-center">
                        <p className="text-[12px] text-primary-blue font-semibold">
                          3
                        </p>
                      </div>

                      <p className="text-white text-[16px] font-medium">
                        Start Earning
                      </p>
                    </div>

                    <p className="text-[12px] text-grey-light">
                      Earn credits per referral
                    </p>
                  </div>
                </div>
              </div>
              {allReferralUsers && allReferralUsers.length > 0 && (
                <div className="mt-5">
                  <Table
                    columns={columns}
                    rowClassName={"ct-team-row"}
                    dataSource={allReferralUsers?.map((rf) => {
                      return {
                        ...rf,
                        goToSourceLink,
                      };
                    })}
                  />
                </div>
              )}
              <div className="mt-5">
                <AffiliateBlock />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showInviteEmailModel && (
        <Modal
          open={showInviteEmailModel}
          title="Refer via email"
          onCancel={() => {
            setShowInviteEmailModel(false);
          }}
          width={"90%"}
          bodyStyle={{ padding: "0px" }}
          footer={null}
          style={{
            top:20
          }}
        >
          <div className="h-full grid grid-cols-1 md:grid-cols-5">
            <div className="px-4 py-2 md:px-8 md:py-8 col-span-1 md:col-span-3">
              <TitleComponent
                title={"Invite friends to collaborate"}
                subTitle={`Let your friends discover your curated gems and collections`}
              />

              <div className="flex my-4">
                <EnvelopeOpenIcon className="h-6 w-6 text-[#347AE2] mr-4" />

                <TextareaAutosize
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="Enter email addresses, separated by coma"
                  minRows={4}
                  className="w-full rounded-md resize-none !outline-none !focus:outline-none textarea-border h-auto"
                />
              </div>

              <div className='flex items-center justify-end'>
                <Button
                  className="!bg-[#347AE2] !hover:bg-[#347AE2] rounded"
                  type="primary"
                  onClick={onEmailInvite}
                  disabled={loading}
                >
                  Invite
                </Button>
              </div>
            </div>

            <OnboardingRightImage
              imgSrc={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/600x600_cover/onboarding-images/invite-new.png`}
              alt={
                "Share your gems, collections, blogs with colleagues, teams or publish on web | Curateit"
              }
              title={
                "Share your gems, collections, blogs with colleagues, teams or publish on web"
              }
              subTitle={
                "Discover how to share collections with friends, make your content public, and publish your site, blogs, collections on Google."
              }
              divCls="px-9"
              titleCls="pb-2"
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ReferralComponent;