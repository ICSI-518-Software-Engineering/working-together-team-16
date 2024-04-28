import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../Constants";

export default function CheckToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const Token = localStorage.getItem("Token");
    if (Token === null) {
      navigate("/login");
    } else {
      axios.post(BACKEND_URL + "user/VerifyUser/" + Token).then((res) => {
        if (!res.data.status) {
          localStorage.removeItem("Token");
          navigate("/login");
        } else {
          navigate("/home");
        }
      });
    }
  }, []);
  return <div></div>;
}
