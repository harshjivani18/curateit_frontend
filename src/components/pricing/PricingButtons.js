const SolidRoundedButton = (props) => {

    const { url, title, target } = props

    return (
        <button
            className='bg-primary-blue w-full md:min-w-[164px] min-h-[40px] border-2 border-primary-blue rounded-[87px] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue'
        >

            <a
                className='text-white font-semibold min-h-[40px] w-full flex h-full grow flex-row items-center justify-center'
                href={url}
                target={target || '_self'}
            >
                {title}
            </a>
        </button>
    )

}

const SolidRoundedButtonSm = (props) => {

    const { url, title, target } = props

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

export { SolidRoundedButton, SolidRoundedButtonSm }