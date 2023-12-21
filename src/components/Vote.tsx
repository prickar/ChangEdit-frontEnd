import { ActionFunctionArgs, Form, redirect, useLocation } from "react-router-dom";
import { Post } from "../types";
import auth from "../lib/auth";

export const action = async (args: ActionFunctionArgs) => {
    const { postId } = args.params; 
    const formData = await args.request.formData();

    const vote = formData.get('vote'); 
    const path = vote === 'up' ? `/posts/${postId}/upVote` : `/posts/${postId}/downVote`;

    const response = await fetch (import.meta.env.VITE_BACKEND_URL + path, {
        headers: {
            'Authorization' : `Bearer ${auth.getJWT()}`
        },
        method: 'POST'
    })

    if(!response.ok) {
        const {message} = await response.json()
        return {message}
    }
    return redirect(formData.get('returnTo')?.toString() || '/')
}


const VoteComponent = ({post}: {post: Post}) => {
    const location = useLocation();

  return (
    <div>
        <Form method="post" action={`/posts/${post._id}/vote`}>
            <input type="hidden" name="returnTo" value={location.pathname + location.search} /> 
            <input type="hidden" value="up" name="vote" /> 
            <button>△</button>
        </Form>
        <span>{post.score}</span>
        <Form method="post" action={`/posts/${post._id}/vote`}>
            <input type="hidden" name="returnTo" value={location.pathname + location.search} /> 
            <input type="hidden" value="down" name="vote" /> 
            <button type="submit">▽</button>
        </Form>
    </div>

  )
}

export default VoteComponent;