import { Comment } from '../types'

const CommentComponent = ({comment}: {comment: Comment}) => {
  return (
    <div className='p-4'>
      <p>{comment.author.userName}</p>
      <p>{comment.body}</p>
    </div>
  )
}

export default CommentComponent;