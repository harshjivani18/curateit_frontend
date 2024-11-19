import React from 'react'
import { Radio, Tooltip } from "antd"

const ButtonToggleSetting = ({ title, options, handleModeChange, mode, headClassname="", size="medium", isDisabled=false }) => {
  return (
    <div className="flex justify-between items-center py-1">
      <h2 className={`flex-1 ${headClassname}`} >{title}</h2>
      <Radio.Group
        onChange={(e) => handleModeChange(e.target.value)}
        value={mode}
        buttonStyle="solid"
        size={size}
        disabled={isDisabled}
      >
        {options.map((option) => (
          <Radio.Button value={option?.value} key={option?.id}>
            <Tooltip title={option?.name}>
              <div className="flex justify-center items-center gap-1 h-full">
              {option?.icon && option?.icon}
              <span>{option?.text}</span>
              </div>
            </Tooltip>
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  )
}

export default ButtonToggleSetting