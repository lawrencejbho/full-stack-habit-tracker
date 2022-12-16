import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }, []);

  return (
    <>
      <h1 className="not-found-text">Not Found</h1>
    </>
  );
}

export default NotFound;
