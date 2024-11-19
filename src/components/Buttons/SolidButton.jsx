'use client'


const SolidButton = (props) => {

    const { url, title, className, target, colour } = props

    return (
        <button
            className='bg-primary-blue w-full md:w-[225px] min-h-[62px] border-2 border-primary-blue rounded-[.3rem] transition ease-out delay-150 hover:bg-primary-dark-blue hover:border-primary-dark-blue'
        >

            <a
                className='text-white font-semibold min-h-[62px] w-full flex h-full grow flex-row items-center justify-center'
                href={url}
                target={target || '_self'}
            >
                {title}
            </a>
        </button>
    )

}

export default SolidButton