import React, { useState } from "react";
import { Collapse } from "antd";
import { queryContent } from "@containers/landing-page/pageData";
import { RemoveCircleIcon, AddCircleIcon } from "src/hugeicons/Stroke";
const { Panel } = Collapse;

const QueryComponent = () => {
  const [activeKey, setActiveKey] = useState(["1"]);
  return (
    <div className="items-stretch self-center flex w-auto md:px-6 md:py-4 justify-center gap-5 mt-16 max-md:flex-wrap max-md:mt-10">
      <Collapse
        defaultActiveKey={["1"]}
        accordion
        ghost
        onChange={(key) => setActiveKey(key ? [key] : [])}
      >
        {queryContent.map((item) => (
          <Panel
            header={
              <div className="justify-between px-2 py-2 flex items-center">
                <span className="text-sky-950 text-lg font-medium leading-7 max-md:max-w-full">
                  {item.query}
                </span>
                <div className="flex justify-end items-end text-gray-400">
                  {activeKey.includes(item.key) ? (
                    <RemoveCircleIcon />
                  ) : (
                    <AddCircleIcon />
                  )}
                </div>
              </div>
            }
            showArrow={false}
            key={item.key}
          >
            <div className="text-slate-600 px-2 py-2 text-base leading-6 mt-2 max-md:max-w-full">
              {item.answer}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default QueryComponent;
