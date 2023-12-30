import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import CommentForm from "../components/CommentForm";
import VoteComponent from "../components/Vote";
import CommentComponent from "../components/Comment";
import DeleteComments from "../components/DeleteComments";

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const posts = await response.json();

  console.log(posts)
  return posts;
};

const ShowPost = () => {
  const post = useLoaderData() as Post;

  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row">
        <VoteComponent post={post} /> 
        <div className="pl-11">
          { post.link ? (
            <Link to={post.link}>
              <h2>{post.title}<span>({post.link})</span></h2>
            </Link>
          ) : (
            <h2>{post.title}</h2>
          )}
          <p>by {post.author.userName}</p>
          { post.body && (
            <div>
              <p>{post.body}</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-11">
      <CommentForm postId={post._id} /> 
      { post.comments?.map(comment => <>
       <CommentComponent key={comment._id} comment={comment} /> 
       <DeleteComments post={post} comment={comment} /> </>
            ) }
      </div>
    </div>
  );
}

export default ShowPost;