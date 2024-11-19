import "./style.css";

import React from "react";
import { Collapse } from "antd";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import ButtonSetting from "@components/dataShortcuts/ButtonSetting";

const { Panel } = Collapse;

const DataShortcuts = ({ deleteCollections, deleteGems }) => {
  return (
    <div>
      <Collapse
        bordered={true}
        expandIcon={(status) => {
          return (
            <div>
              {status.isActive ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          );
        }}
        expandIconPosition="end"
      >
        <Panel
          header={
            <div className="pl-2">
              <h2 className="font-bold text-gray-600">DATA & SHORTCUSTS</h2>
            </div>
          }
          key="1"
        >
          <div className="p-2">
            <ButtonSetting
              title="All collections"
              btnText="Delete"
              color="text-red-600 bg-red-100 border border-red-500"
              onClick={deleteCollections}
            />
            <ButtonSetting
              title="All gems"
              btnText="Delete"
              color="text-red-600 bg-red-100 border border-red-500"
              onClick={deleteGems}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default DataShortcuts;
