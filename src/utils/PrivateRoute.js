import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { userIsAuth } from "../Actions/AuthActions";

const PrivateRoute = () => {
  const [state, setState] = useState("loading");

  useEffect(() => {
    (async function () {
      try {
        /* Update effect logic to track correct state */
        const isUserLogged = await userIsAuth();
        if (isUserLogged) {
          setState(isUserLogged ? "loggedin" : "redirect");
        } else {
          setState(isUserLogged ? "loggedin" : "redirect");
        }
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

  return state === "loggedin" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
