import { CheckIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "antd";
import { VscLayoutCentered, VscLayoutSidebarRight } from "react-icons/vsc";

const DropDownComponent = (props) => {
    const peekItems = [
        {
        key: '1',
        label: <div onClick={() => props.handleEditPagesIn('side peek')} className="w-full flex items-center">
            <div style={{flex:'0.1'}}>
                <VscLayoutSidebarRight className='h-5 w-5'/>
            </div>
            <div className="flex flex-col mx-2" style={{flex:'0.9'}}>
                <div className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f]">Side Peek</div>
                <div className="text-[#37352fa6] break-words">Open edit pages on the side. Keeps the view behind interactive.</div>
            </div>
            {props.editPagesIn === 'side peek' && <CheckIcon className="h-4 w-5"/>}
        </div>,
        },
        {
        key: '2',
        label: <div onClick={() => props.handleEditPagesIn('center peek')} className="w-full flex items-center">
            <div style={{flex:'0.1'}}>
                <VscLayoutCentered className='h-5 w-5' />
            </div>
            <div className="flex flex-col mx-2" style={{flex:'0.9'}}>
                <div className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f]">Center Peek</div>
                <div className="text-[#37352fa6] break-words">Open edit pages in a focused, centered modal.</div>
            </div>
            {props.editPagesIn === 'center peek' && <CheckIcon className="h-4 w-5"/>}
        </div>,
        },
    ]

    const cardSizeItems = [
        {
        key: '1',
        label: <div className="flex items-center" onClick={() => props.handleCardSize('small')}>
            <div className="capitalize mr-1">small</div>
            {props.cardSize === 'small' && <CheckIcon className="h-4 w-5"/>}
        </div>,
        },
        {
        key: '2',
        label: <div className="flex items-center" onClick={() => props.handleCardSize('medium')}>
            <div className="capitalize mr-1">medium</div>
            {props.cardSize === 'medium' && <CheckIcon className="h-4 w-5"/>}
        </div>,
        },
        {
        key: '3',
        label: <div className="flex items-center" onClick={() => props.handleCardSize('large')}>
            <div className="capitalize mr-1">large</div>
            {props.cardSize === 'large' && <CheckIcon className="h-4 w-5"/>}
        </div>,
        },
    ]

    const openItems = [
        {
        key: '1',
        label: <div onClick={() => props.handleOpenPagesIn('side peek')} className="w-full flex items-center">
            <div style={{flex:'0.1'}}>
                <VscLayoutSidebarRight className='h-5 w-5'/>
            </div>
            <div className="flex flex-col mx-2" style={{flex:'0.9'}}>
                <div className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f]">Side Peek</div>
                <div className="text-[#37352fa6] break-words">Open pages on the side. Keeps the view behind interactive.</div>
            </div>
            {props.openPagesIn === 'side peek' && <CheckIcon className="h-4 w-5"/>}
        </div>,
        },
        {
        key: '2',
        label: <div onClick={() => props.handleOpenPagesIn('full page')} className="w-full flex items-center">
            <div style={{flex:'0.1'}}>
                <VscLayoutCentered className='h-5 w-5' />
            </div>
            <div className="flex flex-col mx-2" style={{flex:'0.9'}}>
                <div className="whitespace-nowrap overflow-hidden text-ellipsis text-[#37352f]">Full Page</div>
                <div className="text-[#37352fa6] break-words">Open pages in a separate full page.</div>
            </div>
            {props.openPagesIn === 'full page' && <CheckIcon className="h-4 w-5"/>}
        </div>,
        },
    ]

    const clickItems = [
      {
        key: "1",
        label: (
          <div
            className="flex items-center text-nowrap"
            onClick={() => props.handleGemOnClickEvent("gem view")}
          >
            <div className="capitalize mr-1">gem view</div>
            {props.gemOnClickEvent === "gem view" && (
              <CheckIcon className="h-4 w-5" />
            )}
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div
            className="flex items-center text-nowrap"
            onClick={() => props.handleGemOnClickEvent("new tab")}
          >
            <div className="capitalize mr-1">new tab</div>
            {props.gemOnClickEvent === "new tab" && (
              <CheckIcon className="h-4 w-5" />
            )}
          </div>
        ),
      },
    ];

    return (
      <>
        {props.type === "edit pages in" && (
          <div>
            <Dropdown
              menu={{
                items: peekItems,
              }}
              trigger={["click"]}
              overlayStyle={{ width: "250px" }}
            >
              {props.children}
            </Dropdown>
          </div>
        )}
        {props.type === "card size" && (
          <div>
            <Dropdown
              menu={{
                items: cardSizeItems,
              }}
              trigger={["click"]}
              overlayStyle={{ width: "100px" }}
            >
              {props.children}
            </Dropdown>
          </div>
        )}
        {props.type === "open pages in" && (
          <div>
            <Dropdown
              menu={{
                items: openItems,
              }}
              trigger={["click"]}
              overlayStyle={{ width: "250px" }}
            >
              {props.children}
            </Dropdown>
          </div>
        )}

        {props.type === "click event" && (
          <div>
            <Dropdown
              menu={{
                items: clickItems,
              }}
              trigger={["click"]}
              overlayStyle={{ width: "100px" }}
            >
              {props.children}
            </Dropdown>
          </div>
        )}
      </>
    );
}

export default DropDownComponent;