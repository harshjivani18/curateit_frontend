'use client'

const OutlineButton = (props) => {

    const { url, title, className, target, colour } = props

    return (
        <button
            className='w-full md:w-[225px] min-h-[62px] rounded-[.3rem] border-2 border-dark-blue transition ease-out delay-150 hover:bg-dark-blue '
        >

            <a
                className='text-dark-blue font-semibold min-h-[62px] w-full flex h-full grow flex-row items-center justify-center transition ease-out delay-150 hover:text-white'
                href={url}
                target={target || '_self'}
            >
                {title}
            </a>
        </button>
    )

}

export default OutlineButton