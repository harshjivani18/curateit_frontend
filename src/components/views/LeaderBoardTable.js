import { Table, Avatar } from "antd";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BiMedal } from "react-icons/bi";
import countryList from "react-select-country-list";
import dynamic from "next/dynamic";
// import Flag from "react-world-flags";
const Flag = dynamic(() => import("react-world-flags"), { ssr: false });
const LeaderBoardTable = ({ data, router }) => {
  const { isMobileView } = useSelector((state) => state.app);
  const countryOptions = useMemo(() => countryList().getData(), []);
  
  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (text, record, index) => {
        if (text === 1) {
          return (
            <div className="w-[30px] h-[30px] p-1 rounded-[50%] bg-[#FFBE86] flex items-center justify-center">
              <BiMedal className="h-5 w-5 text-[#DC6803]" />
            </div>
          );
        } else if (text === 2) {
          return (
            <div className="w-[30px] h-[30px] p-1 rounded-[50%] bg-[#CED4DE] flex items-center justify-center">
              <BiMedal className="h-5 w-5 text-[#98A2B3]" />
            </div>
          );
        } else if (text === 3) {
          return (
            <div className="w-[30px] h-[30px] p-1 rounded-[50%] bg-[#D2B8AF] flex items-center justify-center">
              <BiMedal className="h-5 w-5 text-[#9A7F75]" />
            </div>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text, record, index) => {
        const initialsData = `${record?.author?.username?.[0]}`;
        return (
          <div className="flex items-center">
            <Avatar src={record?.author?.profilePhoto}>
              {initialsData.toUpperCase()}
            </Avatar>
            <span className="ml-2">{record?.author?.username || ""}</span>
          </div>
        );
      },
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      render: (text, record, index) => record?.totalScore || "",
    },
  ];
  if (!isMobileView) {
    columns.push(
      {
        title: "Levels",
        dataIndex: "level",
        key: "level",
        render: (text, record, index) => record?.level || "",
      },
      {
        title: "Region",
        dataIndex: "region",
        key: "region",
        render: (text, record, index) => {
          if (record?.author?.country) {
            const found = countryOptions.filter(
              (item) => item.label === record?.author?.country
            );
            const code = found[0]?.value;
            return (
              <div className="flex items-center">
                <Flag code={code} style={{ width: "20px", height: "20px" }} />
                <span className="ml-2">{record?.author?.country}</span>
              </div>
            );
          } else {
            return "-";
          }
        },
      }
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto text-base font-medium text-[#292B38]">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                if (record && record.author) {
                  const un = record?.author?.username;
                  router.push(`/u/${un}`);
                }
              },
            };
          }}
          rowClassName="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default LeaderBoardTable;
