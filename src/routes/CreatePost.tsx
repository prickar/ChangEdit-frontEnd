import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { ActionData } from "../types";
import auth from "../lib/auth";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const formData = await request.formData();

  const postData = Object.fromEntries(formData.entries());

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getJWT()}`,
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    const { message } = await response.json();

    return { message };
  }

  return redirect("/");
};

export const CreatePost = () => {
  const error = useActionData() as ActionData;
  return (
    <div className="p-11 max-w-lg">
      <h2 className="text-center text-xl">Create post</h2>
      <Form className="flex flex-col gap-8" method="post">
        {error && (
          <p>
            <b>Error:</b> {error.message}
          </p>
        )}

        <div className="border-solid border-2 border-black rounded-md flex flex-col">
          <label htmlFor="title" className="text-center">
            Title
          </label>
          <input type="text" name="title" id="title" required />
        </div>
        <div className="border-solid border-2 border-black rounded-md flex flex-col">
          <label htmlFor="link" className="text-center">
            Link (optional)
          </label>
          <input type="password" name="link" id="link" />
        </div>
        <div className="border-solid border-2 border-black rounded-md flex flex-col">
          <label htmlFor="body" className="text-center">
            Message
          </label>
          <textarea name="body" id="body" required />
        </div>
        <div className="border-solid border-2 border-black rounded-md flex flex-col">
          <button type="submit">Create post</button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
