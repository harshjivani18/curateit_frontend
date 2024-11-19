

const ErrorPage = ({ message }) => {
  return (
    <div className=' min-h-[80vh]  h-full flex flex-col justify-center items-center'>
        <span className='text-3xl font-semibold'>{message}</span>
    </div>
  )
}

export default ErrorPage;