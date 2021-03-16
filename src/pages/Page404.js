import React from "react";
import { Link } from "react-router-dom";

import {
  NotFound404,
  NotFoundBody,
  NotFoundHeader,
  NotFoundMsg,
  DefaultBlueBtn,
} from "../styles/styles";

function Page404() {
  let currentPath = window.location.pathname;

  console.log(currentPath);
  return (
    <NotFound404>
      <NotFoundBody>
        <NotFoundHeader>404</NotFoundHeader>
        <NotFoundMsg>
          <p>
            OOPS! <br /> the requested URL {currentPath} <br /> was not found.
          </p>
          <Link to="/">
            <DefaultBlueBtn type="button">Go to Home</DefaultBlueBtn>{" "}
          </Link>
        </NotFoundMsg>
      </NotFoundBody>
    </NotFound404>
  );
}

export default Page404;
