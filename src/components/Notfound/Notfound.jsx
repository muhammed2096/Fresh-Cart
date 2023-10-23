import React from "react";

import notFound from "../images/error.svg";
import { Helmet } from "react-helmet";

export default function Notfound() {
  return (
    <>
    <Helmet>
        <meta name="description" content="" />
        <title>Not Found</title>
      </Helmet>
      <div className="notFound d-flex justify-content-center align-items-center pt-2">
        <img src={notFound} alt="not found" />
      </div>
    </>
  );
}