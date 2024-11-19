const Blob = ({text}) => {

    return (
        <div
            id='tags-manager-blob'
            className='w-max px-3 py-1 border-[1.5px] border-[#105FD3] rounded-full'
        >
            <p className='hidden md:block text-[14px] text-[#105FD3] font-medium leading-[20px]'>
                {text}
            </p>
            <p className='block md:hidden text-[14px] text-[#105FD3] font-medium leading-[20px]'>
                {text}
            </p>
        </div>
    )

}

export default Blob