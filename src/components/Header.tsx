import { Link, useFetcher } from "react-router-dom";
import auth from "../lib/auth";

export const Header = () => {
  const isAuthenticated = auth.isSignedIn();
  const fetcher = useFetcher();

  return (
    <div className="flex justify-between p-8 border-double border-b-4 border-gray-400">
      <Link to="/">
        <h1 className="text-3xl font-extrabold">ChangEdit</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/create-post">
              <button>New post</button>
            </Link>
            <fetcher.Form method="post" action="/sign-out">
              <button type="submit">Sign out</button>
            </fetcher.Form>
          </>
        ) : (
          <>
            <Link to="/sign-up">
              <button>Sign up</button>
            </Link>
            <Link to="/sign-in">
              <button>Sign in</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
