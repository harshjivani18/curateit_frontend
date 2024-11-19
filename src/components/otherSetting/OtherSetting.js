
import { Collapse } from "antd"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import ButtonSetting from "@components/dataShortcuts/ButtonSetting"
import "./style.css"

const { Panel } = Collapse

const OtherSetting = ({ handleDeleteAccount }) => {

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
          )
        }}
        expandIconPosition="end"
      >
        <Panel
          header={
            <div className="pl-2">
              <h2 className="font-bold text-gray-600">OTHERS</h2>
            </div>
          }
          key="1"
        >
          <div className="p-2">
            <ButtonSetting
              title="Delete account"
              btnText="Delete"
              color="text-red-600 bg-red-100 border border-red-500"
              onClick={handleDeleteAccount}
            />
          </div>

        </Panel>
      </Collapse>
    </div>
  )
}

export default OtherSetting
