import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faCode,
  faBookOpen,
  faTasks,
  faSignInAlt,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../pypilot.png";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {
  const navigate = useNavigate()
  return (
    <div>
      <AppBar color="grey">
        <Toolbar>
          <img src={logo} width="30" height="30" alt="PyPilot Logo" />
          <Button variant="h5" onClick={()=>navigate("/")} sx={{textTransform:"none" }} >PyPilot</Button>

          <div style={{ flexGrow: 0.7 }}></div>
          <Button href="/quizzes" sx={{ color: "black" }}>
            Quizzes
          </Button>
          <Button href="/code-editor" sx={{ color: "black" }}>
            Code Editor
          </Button>
          <Button href="/tutorials" sx={{ color: "black" }}>
            Tutorials
          </Button>
          <Button href="/exercises" sx={{ color: "black" }}>
            Exercises
          </Button>
          <Button href="/contact" sx={{ color: "black" }}>
            Contact us
          </Button>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            sx={{ mr: 3 }}
            onClick={()=>navigate("/profile")}
            color="inherit"
          >
            <AccountCircle sx={{ fontSize: 40 }} />
          </IconButton>
          <Button sx={{ textTransform: "none", color: "white" }} onClick={() => {
            localStorage.removeItem("Token")
            navigate("/")
          }} variant='contained'>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

    </div>
  );
};

export default Header;
