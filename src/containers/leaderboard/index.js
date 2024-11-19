"use client";

import { useEffect, useState }    from "react";
import { Pagination, Spin }       from "antd";
import { useRouter }              from "next/navigation";
import { connect }                from "react-redux";
import { RiGlobalLine }         from "react-icons/ri";
import TimelinePageHeading        from "@components/pageHeader/TimelinePageHeading";
import LeaderBoardTable           from "@components/views/LeaderBoardTable";
import CommonLayout               from "@components/layouts/CommonLayout";
import { getLeaderBoard }         from "@actions/activity";

const LeaderBoard = (props) => {
  const router                    = useRouter();
  const [filter, setFilter]       = useState("all time");
  const [page, setPage]           = useState(1);
  const [region, setRegion]       = useState({ value: "Global", label: (
          <div className="flex items-center">
              <RiGlobalLine className="h-5 w-5 mr-2" /> Global
          </div>
        ) });
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    const getCall = async () => {
      setLoading(true);
      const country = region.value === "Global" ? "" : region.value;
      // if (props.leaderBoard.length === 0) {
      //   setLoading(true);
      //   await props.getLeaderBoard(page, country);
      //   setLoading(false);
      // }
      await props.getLeaderBoard(page, country);
      setLoading(false);
    };
    getCall()
  }, [page, region]);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleRegion = (value) => {
    if (!value) {
      setRegion({
        value: "Global",
        label: (
          <div className="flex items-center">
              <RiGlobalLine className="h-5 w-5 mr-2" /> Global
          </div>
        ),
      });
    } else {
      setRegion(value);
    }
    setPage(1);
  };

  const handleLoadMore = async (page) => {
    setLoading(true);
    await props.getLeaderBoard(page, region.label);
    setLoading(false);
    setPage(page);
  };

  return (
    <CommonLayout
    showSecondarySidebar={false}
    >
      <div className="py-4 px-0 md:py-4 md:px-2">
        {loading ? (
          <div className="spinDiv">
            <Spin size="middle" tip="Loading..." />
          </div>
        ) : (
          <>

            <TimelinePageHeading
              page={"leaderBoard"}
              title="Leader Board"
              subtitle=""
              filter={filter}
              handleFilter={handleFilter}
              region={region}
              handleRegion={handleRegion}
            />

            <LeaderBoardTable router={router} data={props.leaderBoard} page={page} />

            <div className="my-1">
              <Pagination
                pageSize={100}
                showTotal={(total) => `Total ${total} items`}
                current={page}
                total={props.leaderBoardCount}
                onChange={handleLoadMore}
                className="my-2"
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </CommonLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    leaderBoard: state.activity.leaderBoard,
    leaderBoardCount: state.activity.leaderBoardCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLeaderBoard: (page, country) => dispatch(getLeaderBoard(page, country)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
