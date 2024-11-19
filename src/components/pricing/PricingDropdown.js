import { Select } from "antd";

const { Option } = Select;

const Dropdown = ({ currentValue, onChange }) => {
  return (
    <Select value={currentValue}
            onChange={onChange}
            className="w-[110px] pricing-dropdown-select-box">
      <Option value={5}>5</Option>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={500}>Unlimited</Option>
    </Select>
  )
    // return (
    //   <button className='relative group transition-all duration-200 focus:overflow-visible w-max h-max p-1 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-[15px] pl-3 border border-zinc-200 w-max'>
    //     <span className='text-[10px]'>10</span>
    //     <svg
    //       className='rotate-180 group-focus:rotate-0'
    //       xmlns='http://www.w3.org/2000/svg'
    //       width='22'
    //       height='22'
    //       viewBox='0 0 24 24'
    //     >
    //       <path
    //         fill='currentColor'
    //         d='m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z'
    //       />
    //     </svg>
    //     <div className='absolute shadow-lg top-[3rem] left-0 w-max h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2'>
    //       <span className='flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg'>
    //         <p className='text-[10px]'>25</p>
    //       </span>
    //       <span className='flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg'>
    //         <p className='text-[10px]'>Unlimited</p>
    //       </span>
    //     </div>
    //   </button>
    // );
}

export default Dropdown