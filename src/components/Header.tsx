import { Link, useFetcher } from "react-router-dom";
import auth from "../lib/auth";

export const Header = () => {
    const isAuthenticated = auth.isSignedIn();
    const fetcher = useFetcher(); 

  return (
    <>
    <Link to="/">
    <h1 className="text-center font-bold text-4xl">ChangEdit</h1>
    </Link>
    <div className="flex justify-center gap-8">

        { isAuthenticated ?
        <>
        <Link to="/create-post">
        <button>New post</button>
        </Link>
        <fetcher.Form method="post" action="/sign-out">
        <button type="submit">Sign out</button>
        </fetcher.Form>
        </>
        :
        <>
        <Link to="/sign-up">
        <button>Sign up</button>
        </Link>
        <Link to="/sign-in">
        <button>Sign in</button>
        </Link>
        </>
        }

    </div>
    </>
  )
}

export default Header;