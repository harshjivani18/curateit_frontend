import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Select as AntSelect } from "antd";
import Select from "react-select";
import countryList from "react-select-country-list";
// import Flag from "react-world-flags";
import { RiGlobalLine } from "react-icons/ri";
import { HiOutlineChevronLeft } from "react-icons/hi";
import dynamic from "next/dynamic";

const Flag = dynamic(() => import("react-world-flags"), { ssr: false });

const TimelinePageHeading = ({
  page,
  title,
  region,
  handleRegion,
  filter,
  handleFilter,
  subtitle,
}) => {
  const router = useRouter();
  const { isMobileView } = useSelector((state) => state.app);
  const countryOptions = useMemo(() => countryList().getData(), []);

  const countryOptionsWithFlags = useMemo(() => {
    return countryOptions.map((countryOption) => {
      const flagCode = countryOption.value;
      return {
        label: (
          <div className="flex items-center">
            <Flag code={flagCode} className="h-5 w-5 mr-2" />
            {countryOption.label}
          </div>
        ),
        value: countryOption.label,
      };
    });
  }, [countryOptions]);

  const customStyles = {
    control: (base) => ({
      ...base,

      width: 180,
    }),
  };

  const handleRouterBack = () => {
    router.back();
  }

  return (
    <>
      <div className="flex w-full items-center justify-between flex-row">
        {isMobileView ? (
          <Button
            icon={<HiOutlineChevronLeft className="h-5 w-5" />}
            className="text-sm font-medium text-gray-900 border-none outline-none flex flex-row"
            onClick={handleRouterBack}
          >
            Back
          </Button>
        ) : (
          <div className="hidden sm:block">
            <span className="text-lg md:text-3xl font-semibold capitalize">
              {title}
            </span>
            <p className="text-base font-normal text-[#475467]">{subtitle}</p>
          </div>
        )}

        {page === "leaderBoard" && (
          <div className="ml-2 md:ml-0">
            <Select
              style={{ height: "20px" }}
              options={[
                ...countryOptionsWithFlags,
                // { value: "Global", label: "Global" },
                {
                  value: "Global",
                  label: (
                    <div className="flex items-center">
                      <RiGlobalLine className="h-5 w-5 mr-2" /> Global
                    </div>
                  ),
                },
              ]}
              value={region}
              onChange={handleRegion}
              placeholder="Select region"
              styles={customStyles}
              isClearable={region?.value !== "Global" ? true : false}
            />
          </div>
        )}

        {/* {page === "timeline" && (
          <div className="ml-2 md:ml-0">
            <Radio.Group
              value={filter}
              buttonStyle="solid"
              onChange={handleFilter}
            >
              <Radio.Button
                value="all time"
                style={
                  filter === "all time"
                    ? {
                        background: "#347AE2",
                        color: "white",
                        borderTopLeftRadius: "3px solid #347AE2",
                        borderBottomLeftRadius: "3px solid #347AE2",
                      }
                    : {
                        background: "#fff",
                        color: "black",
                        borderTopLeftRadius: "3px solid black",
                        borderBottomLeftRadius: "3px solid black",
                      }
                }
              >
                All Time
              </Radio.Button>
              <Radio.Button
                value="today"
                style={
                  filter === "today"
                    ? { background: "#347AE2", color: "white" }
                    : { background: "#fff", color: "black" }
                }
              >
                Today
              </Radio.Button>
              <Radio.Button
                value="weekly"
                style={
                  filter === "weekly"
                    ? { background: "#347AE2", color: "white" }
                    : { background: "#fff", color: "black" }
                }
              >
                Weekly
              </Radio.Button>
              <Radio.Button
                value="monthly"
                style={
                  filter === "monthly"
                    ? {
                        background: "#347AE2",
                        color: "white",
                        borderTopRightRadius: "3px solid #347AE2",
                        borderBottomRightRadius: "3px solid #347AE2",
                      }
                    : {
                        background: "#fff",
                        color: "black",
                        b: "3px solid black",
                        borderTopRightRadius: "3px solid black",
                        borderBottomRightRadius: "3px solid black",
                      }
                }
              >
                Monthly
              </Radio.Button>
            </Radio.Group>
          </div>
        )} */}

        {page === "timeline" && (
          <div className="ml-2 md:ml-0 md:pr-4">
            <AntSelect
              style={{ width: 120 }}
              defaultValue="all time"
              value={filter}
              onChange={handleFilter}
              options={[
                {
                  value: "all time",
                  label: "All Time",
                },
                {
                  value: "today",
                  label: "Today",
                },
                {
                  value: "weekly",
                  label: "Weekly",
                },
                {
                  value: "monthly",
                  label: "Monthly",
                },
              ]}
            />
          </div>
        )}
      </div>

      <hr className="pageHeadingHr mt-2" />
    </>
  );
};

export default TimelinePageHeading;
