import React from "react";

const UserEngagement = ({ user, follower }) => {
  const formatedNumber = (number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  return (
    <div className="flex flex-col border border-gray-200 divide-y-2 md:divide-y-0 rounded-lg md:border-none md:flex-row md:justify-center items-start md:items-center  md:divide-x-2 gap-y-2 md:gap-x-4">
      <div className="flex gap-x-16 md:gap-x-4 px-4 py-2 ">
        <div className="text-center flex flex-col">
          {/* <h1 className='font-bold text-md md:text-lg'>{user.gemCount}</h1> */}
          <span className="font-semibold text-base md:text-2xl">
            {formatedNumber(user.gemCount)}
          </span>
          <span className="text-sm md:text-lg">Gems</span>
        </div>
        <div className="text-center flex flex-col">
          {/* <h1 className='font-bold text-md md:text-lg'>{follower && follower.length}</h1> */}
          <span className="font-semibold text-base md:text-2xl">
            {follower && formatedNumber(follower.length)}
          </span>
          <span className="text-sm md:text-lg">Followers</span>
        </div>
       <div className="text-center flex flex-col">
          <span className="font-semibold text-base md:text-2xl">
            {user?.followingUsers &&
              formatedNumber(user?.followingUsers.length)}
          </span>
          <span className="text-sm md:text-lg">Following</span>
        </div>
      </div>
      <div className="flex gap-x-16 md:gap-x-4 px-4 py-2">
       {/* <div className="text-center flex flex-col">
          <span className="font-semibold text-base md:text-2xl">
            {user?.userDetails?.level}
          </span>
          <span className="text-sm md:text-lg">Level</span>
        </div> */}
       <div className="text-center flex flex-col">
          <span className="font-semibold text-base md:text-2xl">
            {formatedNumber(user?.userDetails?.totalScore)}
          </span>
          <span className="text-sm md:text-lg">Points</span>
        </div>
       {/* <div className="text-center flex flex-col">
          <span className="font-semibold text-base md:text-2xl">12</span>
          <span className="text-sm md:text-lg">Badge Earned</span>
        </div> */}
      </div>
    </div>
  );
};

export default UserEngagement;
