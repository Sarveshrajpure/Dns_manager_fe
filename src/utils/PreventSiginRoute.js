import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { userIsAuth } from "../Actions/AuthActions";

const PreventSigninRoute = () => {
  /* Track the state of your app instead. Start with a "loading" state */
  const [state, setState] = useState("loading");

  useEffect(() => {
    (async function () {
      try {
        /* Update effect logic to track correct state */
        const isUserLogged = await userIsAuth();
        setState(isUserLogged ? "loggedin" : "redirect");
      } catch {
        setState("redirect");
      }
    })();
  }, []);

  /* If in loading state, return loading message while waiting for 
   isValidToken to complete */
  if (state === "loading") {
    return <div>Loading..</div>;
  }

  return state === "redirect" ? <Outlet /> : <Navigate to="/home" />;
};

export default PreventSigninRoute;
