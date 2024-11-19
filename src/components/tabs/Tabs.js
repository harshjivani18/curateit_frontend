function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs({page, showTabs, activateTab }) {
    return (
        <div className="overflow-hidden overflow-x-auto">
            <div className="flex">
                <nav className={`flex space-x-4 md:space-x-6 border-[1px] border-custom-gray py-1 px-2 rounded-lg ${page==='timeline' ? 'w-auto':'w-screen' } justify-center items-center bg-white`} aria-label="Tabs">
                    {showTabs.map((tab) => (
                        <button
                            key={tab.name}
                            className={classNames(
                                tab.current ? 'text-[#347AE2] bg-[#E5F0FF]' : 'text-[#667085] hover:text-gray-700',
                                'px-6 py-2 font-medium text-sm rounded-md flex justify-center items-center'
                            )}
                            style={{
                              
                                    transition: "background-color 0.3s ease, color 0.2s ease, transform 0.3s ease",
                                
                            }}
                            aria-current={tab.current ? 'page' : undefined}
                            onClick={() => activateTab(tab.name)}
                            disabled={tab.disabled}
                        >
                            {tab?.icon}
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    )
}