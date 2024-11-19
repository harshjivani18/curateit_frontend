import Comment from './Comment'

const Replies = ({ replies, loading }) => {

  return (
    <div>
        <div>
            {loading && 'loading'}
        </div>
        {replies.length > 0 && replies.map((reply => 
            <Comment key={reply?._id} comment={reply} isReply={true} />    
        ))}
    </div>
  )
}

export default Replies