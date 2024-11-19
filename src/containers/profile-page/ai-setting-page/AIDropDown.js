import { 
    useRef, 
    useState,
    useEffect
}                           from "react";
import dynamic              from "next/dynamic";
import { Button, Tag, Typography } from "antd";
import { BiPlayCircle } from "react-icons/bi";

const Flag = dynamic(() => import("react-world-flags"), { ssr: false });

const AIDropDown = ({ items, currentValue, onItemChange, label, originalOptions=[], onDemoClick=null, isAudioLoading=false, isCountryFlag=false, showSearch = false, showEdit = false, isEnableIcon=false }) => {
    const [isOpen, setIsOpen]           = useState(false);
    const [searchTerm, setSearchTerm]   = useState('');
    const [currentDemo, setCurrentDemo] = useState(null);
    const dropdownRef                   = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const onSelectItem = (item) => {
        onItemChange(item);
        setIsOpen(false);
    }

    const filteredOptions = items.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mb-6" ref={dropdownRef}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-2 pr-10 border border-gray-300 rounded-md text-sm bg-white flex justify-between items-center"
            >
                <div className="flex items-center justify-between">
                    {isEnableIcon && isCountryFlag && <Flag code={originalOptions.find(a => a.label === currentValue || a.name === currentValue)?.code} className="h-5 w-5 mr-2" />}
                    {isEnableIcon && !isCountryFlag && <img className="h-5 w-5 mr-2" src={originalOptions.find(a => a.name === currentValue || a.label === currentValue)?.icon} />}
                    <span>{currentValue}</span>
                </div>
                <div className="flex items-center">
                    {/* <span className="text-green-500 text-xs mr-2">Default</span> */}
                    {onDemoClick && (<Button type="text" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const original = originalOptions.find(a => a.name === currentValue || a.label === currentValue)
                        setCurrentDemo(original.name)
                        onDemoClick(original, setCurrentDemo)
                        return false
                    }} className="p-0 mr-2 text-blue-600 text-xs flex items-center">
                        {!isAudioLoading && <BiPlayCircle className="h-4 w-4 mr-1" />}
                        {isAudioLoading ? "Loading..." : "Demo"}
                    </Button>)}
                    <Tag color="green">Default</Tag>
                    <span>▼</span>
                </div>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-b border-gray-300 text-sm "
                    />
                )}
                <ul className="max-h-60 overflow-auto">
                    {filteredOptions.map((option) => {
                        return (<li
                            key={option}
                            className="p-2 hover:bg-gray-100 cursor-pointer group"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onSelectItem(originalOptions.find(a => a.label === option || a.name === option))
                                return false
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {isEnableIcon && isCountryFlag && <Flag code={originalOptions.find(a => a.label === option || a.name === option)?.code} className="h-5 w-5 mr-2" />}
                                    {isEnableIcon && !isCountryFlag && <img className="h-5 w-5 mr-2" src={originalOptions.find(a => a.name === option || a.label === option)?.icon} />}
                                    <span>{option}</span>
                                </div>
                                {!onDemoClick 
                                    ? 
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onSelectItem(originalOptions.find(a => a.label === option || a.name === option))
                                            return false
                                        }} 
                                        className="text-sm text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Set as default
                                    </button>
                                    : 
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const idx = originalOptions.findIndex(a => a.label === option || a.name === option)
                                            if (idx === -1) return
                                            const obj = originalOptions[idx]
                                            setCurrentDemo(obj.name)
                                            onDemoClick(obj, setCurrentDemo)
                                            return false
                                        }} 
                                        className="text-xs text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity p-0 mr-2 flex items-center">
                                            {!isAudioLoading && option !== currentDemo && <BiPlayCircle className="h-4 w-4 mr-1" />}
                                            {isAudioLoading && option === currentDemo ? "Loading..." : "Demo"}
                                        </button>
                                    
                                }
                            </div>
                        </li>)
        })}
                </ul>
                {showEdit && (
                    <button
                    onClick={() => {/* Handle create new */}}
                    className="w-full p-2 text-blue-600 border-t border-gray-300 text-sm"
                    >
                    + Create new {label.toLowerCase()}
                    </button>
                )}
                </div>
            )}
            </div>
        </div>
    )
}

export default AIDropDown;