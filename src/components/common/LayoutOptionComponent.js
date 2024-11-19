import { LAYOUT_OPTIONS_WITH_ICONS } from "../../utils/constants";

const LayoutOptionComponent = ({layout,handleLayout,page=''}) => {
    return(
        <>
            {
            (page !== 'embed' && page !== 'collection-public-shared') ?
            <div className="flex flex-wrap justify-center w-full">
                {
                LAYOUT_OPTIONS_WITH_ICONS.map((item,i) => (
                <div key={i} className={`layout-option-div ${layout === item.name ? 'layout-option-div-selected' : 'layout-option-div-default'}`} onClick={(e) => {
                    e.stopPropagation();
                    handleLayout(item.name)
                }}>
                    {item.icon}
                    <span className="capitalize">{item.name}</span>
                </div>
                ))
                }
            </div>
            :
            <div className="flex flex-wrap justify-center w-full">
                {
                LAYOUT_OPTIONS_WITH_ICONS.filter(item => item.name !== 'inbox').map((item,i) => (
                <div key={i} className={`layout-option-div ${layout === item.name ? 'layout-option-div-selected' : 'layout-option-div-default'}`} onClick={(e) => {
                    e.stopPropagation();
                    handleLayout(item.name)
                }}>
                    {item.icon}
                    <span className="capitalize">{item.name}</span>
                </div>
                ))
                }
            </div>
            }
        </>
    )
}

export default LayoutOptionComponent;