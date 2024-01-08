import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData
} from 'react-router-dom'
import { ActionData } from '../types'
import auth from '../lib/auth'

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const { id } = params

  const postData = Object.fromEntries(formData.entries())

  console.log(id)

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/posts/' + id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.getJWT()}`
      },
      body: JSON.stringify(postData)
    }
  )

  if (!response.ok) {
    const { message } = await response.json()

    return { message }
  }

  console.log(request.body)
  return redirect('/posts/' + id)
}

const UpdatePost = () => {
  const error = useActionData() as ActionData

  return (
    <div>
      <h2>Update post</h2>
      <Form method="put">
        {error && (
          <p>
            <b>Error:</b>
            {error.message}
          </p>
        )}
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div>
          <label htmlFor="link">Link (optional)</label>
          <input type="link" name="link" id="link" />
        </div>
        <div>
          <label htmlFor="body">Body (optional)</label>
          <input type="body" name="body" id="body" />
        </div>
        <div>
          <button type="submit">Update post</button>
        </div>
      </Form>
    </div>
  )
}

export default UpdatePost
