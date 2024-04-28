import { Card, Divider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Verifyotp from "./Verifyotp";
import axios from "axios";
import { BACKEND_URL } from "../Constants";
import Header from "./Header";
import Notify from '../Componnets/Notify';
import backgroundimage from "../background.png"

export default function Login() {
  const [Email, setEmail] = useState("");

  const [password, setpassword] = useState("");
  const [Err, setErr] = useState("");

  const [notify,setNotify]=useState(false)

  const [msg,setmsg]=useState({
      severity:"",
      message:""
  })

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Box sx={{backgroundImage:`url(${backgroundimage})`,height:"93vh"}}>
      <Container
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: "100vh",
          height: "60vh",
          display: "flex",
          
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 370,
            pb: 3,
            pt: 1,
            opacity: 0.8,
            p: 2,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "start" }}>
            Signin
          </Typography>
          <InputBase
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              border: "1px solid black",
              px: 1,
              py: 0.5,
              mt: 2,
              borderRadius: 1,
            }}
            placeholder="Email"
          />
          <InputBase
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            sx={{
              border: "1px solid black",
              px: 1,
              py: 0.5,
              mt: 2,
              borderRadius: 1,
            }}
            placeholder="Password"
          />
          <Typography
            sx={{
              fontWeight: "bold",
              color: "blue",
              textAlign: "start",
              mt: 2,
            }}
          >
            {" "}
            <Link style={{ textDecoration: "none" }} to="/forgotpassword">
              Forgot Password?
            </Link>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              axios
                .get(BACKEND_URL + "user/signin/" + Email + "/" + password)
                .then((res) => {
                  if (res.data.verified) {

                    localStorage.setItem("Token", res.data.Token);
                    navigate("/");
                    setmsg({
                      severity:"success",
                      message:"Log in successfully"
                    })
                    setNotify(true)
                  } else {
                    setmsg({
                      severity:"error",
                      message:"Invalid Log in details"
                    })
                    setNotify(true)
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Sigin
          </Button>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "blue",
              textAlign: "center",
              mt: 2,
            }}
          >
            New to Pypliot?{" "}
            <Link style={{ textDecoration: "none" }} to="/signup">
              Join now
            </Link>
          </Typography>
        </Card>
      </Container>
      </Box>
      <Notify open={notify} setOpen={setNotify} severity={msg.severity}  msg={msg.message}/>
    </div>
  );
}
