'use client'

const SolidRoundedButtonSm = (props) => {

    const { url, title, className, target, colour } = props

    return (
        <button
            className='bg-primary-blue w-[105px] min-h-[27px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue'
        >

            <a
                className='text-xs text-white font-normal min-h-[27px] w-full flex h-full grow flex-row items-center justify-center'
                href={url}
                target={target || '_self'}
            >
                {title}
            </a>
        </button>
    )
}

export default SolidRoundedButtonSm