import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import auth from "../lib/auth";
import { Comment, Post } from "../types";
import { Trash2 } from "lucide-react";

export const action = async (args: ActionFunctionArgs) => {
  const { postId, commentId } = args.params;

  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        "/posts/" +
        postId +
        "/comments/" +
        commentId,
      {
        headers: {
          Authorization: "Bearer " + auth.getJWT(),
        },
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return redirect("/posts/" + postId);
  } catch (error) {
    console.error("Error deleting comment: " + error);
    throw error;
  }
};

const DeleteComments = ({
  comment,
  post,
}: {
  comment: Comment;
  post: Post;
}) => {
  return (
    <>
      <Form
        method="delete"
        action={`/posts/${post._id}/comments/${comment._id}/delete-comment`}
      >
        <input type="hidden" name="delete" />
        <button type="submit">
          <Trash2 />
        </button>
      </Form>
    </>
  );
};

export default DeleteComments;
