import ProgressBar from '@ramonak/react-progress-bar'
const Progress = ({ completed, height, width, colour }) => {

    return (
        <ProgressBar
            completed={Number(completed)}
            isLabelVisible={false}
            height={height}
            width={width}
            bgColor={colour || '#347AE2'}
            baseBgColor='#B8D4FE'
        />
    )


}

export default Progress