import { Avatar, List, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import session from '@utils/session';
import { getReferralUSers } from '@actions/referral';
import { PiCopySimple, PiFacebookLogo, PiTwitterLogo } from 'react-icons/pi';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { IoArrowForward } from 'react-icons/io5';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (val, row) => {
      return <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={row?.avatar} className='mr-2'>{row?.name ? row?.name?.charAt(0).toUpperCase() : row?.email?.charAt(0).toUpperCase()}</Avatar>}
          title={
            <span>{row?.name ? row?.name : row?.email}</span>
          }
        // description={row?.email}
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
];

const ReferralComponent = ({ }) => {

  const dispatch = useDispatch();
  const [allReferralUsers, setAllReferralUsers] = useState([]);

  useEffect(() => {
    dispatch(getReferralUSers())
      .then((res) => {
        setAllReferralUsers(res?.payload?.data?.data);
      })
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

  return (
    <>
      <div className='w-full flex flex-row items-center justify-between py-[16px] px-[28px] border border-[#78A6EC] rounded-[12px] bg-primary-lighterblue-100'>
        {/* // ? Text Section */}
        <div className='flex flex-col items-start justify-start '>

          <p className='text-[24px] text-primary-blue font-semibold'>
            Refer people to earn rewards
          </p>

          <p className='text-[14px] text-#323543'>
            Earn 25% profit from the people who use your referal
          </p>

          <div className='flex flex-row justify-start gap-[8px] mt-[8px]'>
            {/* // ? Referral code block */}
            <div className='border border-[#ABB7C9] rounded-[8px] bg-white text-[16px] text-[#74778B] py-[12.5px] px-[12px] flex flex-row items-center justify-between gap-[50px]'>
              {`${embedUrl}`}

              <button>
                <PiCopySimple
                  className='text-[20px] text-[#74778B]'
                  onClick={onTextCopy}
                />
              </button>
            </div>

            {/* // ? Button */}
            <button
              className='py-[11px] px-[22px] text-white text-[16px] bg-primary-blue rounded-[8px]'
              onClick={() => navigator?.clipboard.writeText('AVN163VABIK')}
            >
              Add link to Bio
            </button>
          </div>

          <div className='flex flex-row items-center justify-start gap-[20px] mt-[8px]'>
            <button className='bg-transparent text-primary-blue text-[24px]'>
              <FaInstagram />
            </button>
            <button className='bg-transparent text-primary-blue text-[24px]'>
              <FaLinkedin />
            </button>
            <button className='bg-transparent text-primary-blue text-[26px]'>
              <PiFacebookLogo />
            </button>
            <button className='bg-transparent text-primary-blue text-[24px]'>
              <PiTwitterLogo />
            </button>
            <button className='bg-transparent text-primary-blue text-[24px]'>
              <AiOutlineMail />
            </button>
          </div>

        </div>

        {/* // ? Steps Section */}
        <div className='flex flex-row items-start justify-between gap-[16px]'>
          <div className='flex flex-col items-center gap-[8px] max-w-[210px] text-center'>
            <div className='min-h-[44px] min-w-[210px] px-[12px] py-[8px] bg-primary-blue rounded-[66px] flex flex-row items-center justify-center gap-[10px]'>
              <div className='bg-white w-[20px] h-[20px] rounded-full flex flex-row items-center justify-center'>
                <p className='text-[12px] text-primary-blue font-semibold'>1</p>
              </div>

              <p className='text-white text-[16px] font-medium'>Share and Invite</p>
            </div>

            <p className='text-[12px] text-grey-light'>
              Share your referral link with the community.
            </p>
          </div>
          <div>
            <p className='text-primary-blue text-[28px] mt-[8px]'>
              <IoArrowForward />
            </p>
          </div>
          <div className='flex flex-col items-center gap-[8px] max-w-[210px] text-center'>
            <div className='min-h-[44px] min-w-[210px] bg-primary-blue rounded-[66px] flex flex-row items-center justify-center gap-[10px]'>
              <div className='bg-white w-[20px] h-[20px] rounded-full flex flex-row items-center justify-center'>
                <p className='text-[12px] text-primary-blue font-semibold'>2</p>
              </div>

              <p className='text-white text-[16px] font-medium'>Sign up on CurateIt</p>
            </div>

            <p className='text-[12px] text-grey-light'>
              Your friend signs up through your link.
            </p>
          </div>
          <div>
            <p className='text-primary-blue text-[28px] mt-[8px]'>
              <IoArrowForward />
            </p>
          </div>
          <div className='flex flex-col items-center gap-[8px] max-w-[210px] text-center'>
            <div className='min-h-[44px] min-w-[210px] px-[12px] py-[8px] bg-primary-blue rounded-[66px] flex flex-row items-center justify-center gap-[10px]'>
              <div className='bg-white w-[20px] h-[20px] rounded-full flex flex-row items-center justify-center'>
                <p className='text-[12px] text-primary-blue font-semibold'>3</p>
              </div>

              <p className='text-white text-[16px] font-medium'>Start Earning</p>
            </div>

            <p className='text-[12px] text-grey-light'>
              Earn 25% profit per referral
            </p>
          </div>
        </div>
      </div>
      <div className=''>
        <Table
          columns={columns}
          rowClassName={"ct-team-row"}
          dataSource={allReferralUsers}
        />
      </div>
    </>
  )
}

export default ReferralComponent;