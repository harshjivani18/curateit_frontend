import Link from "next/link";
import { PiCaretRightBold } from "react-icons/pi";

const Breadcrumbs = ({ breadcrumbs }) => {
  const Crumbs = () => {
    return (
      breadcrumbs &&
      breadcrumbs?.length > 0 &&
      breadcrumbs?.map(({ title, href, active }, index) => {
        return (
          <div
            className="flex flex-row items-center gap-1 m-0"
            key={`crumb-${index}`}
          >
            <Link
              href={active ? "#" : href}
              className={`text-[16px]  font-medium ${
                active ? "text-[#105FD3]" : "text-[#4B4F5D]"
              }`}
            >
              {title}
            </Link>

            {index !== breadcrumbs?.length - 1 && (
              <p className="m-0">
                <PiCaretRightBold className="text-[12px] text-[#4B4F5D]" />
              </p>
            )}
          </div>
        );
      })
    );
  };

  return (
    <div className="w-full flex flex-row items-center justify-start">
      <div className="flex flex-row items-center gap-1">
        <Crumbs />
      </div>
    </div>
  );
};

export default Breadcrumbs;
