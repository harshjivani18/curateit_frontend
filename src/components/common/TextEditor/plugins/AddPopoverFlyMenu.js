import "./AddPopoverFlyMenu.css"

// import * as React               from 'react';
import * as ReactDOM            from 'react-dom';

const AddPopoverFlyMenu = ({ popoverElem }) => {
    return ReactDOM.createPortal(
        <div className="typeahead-popover component-picker-menu">
          <ul>
            {options.map((option, i) => (
              <ComponentPickerMenuItem
                index={i}
                isSelected={selectedIndex === i}
                onClick={() => {
                  setHighlightedIndex(i);
                  selectOptionAndCleanUp(option);
                }}
                onMouseEnter={() => {
                  setHighlightedIndex(i);
                }}
                key={option.key}
                option={option}
              />
            ))}
          </ul>
        </div>,
        popoverElem
    )
}

export default AddPopoverFlyMenu;