import { React, useEffect, useState } from "react";
import logo from "../pypilot.png";
import banner from "../banner.png"; // Update the path to your logo image
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
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css"; // Importing custom styles
import Chatbot from "../Chatbot";
import Header from "../Componnets/Header";
import axios from "axios";
import { BACKEND_URL } from "../Constants";
import LevelPopup from "./Levelpopup.js";


const HomePage = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showLevelPopup, setShowLevelPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [from,setfrom]=useState("")
  const [value,setvalue]=useState("")

  useEffect(() => {
    const token = localStorage.getItem("Token");
    axios.post(BACKEND_URL + "user/VerifyUser/" + token).then((res) => {
      console.log("USER: REsponse", res.data);
      setUser(res.data.user);
      if (!res.data.user.exp_level) {
        setShowLevelPopup(true);
      }
    });
  }, []);

  const change_exp_level = (level) => {
    const token = localStorage.getItem("Token"); 
    axios
      .post(BACKEND_URL + "user/level/", {
        "level": level,
      }, {
        headers: {
          auth_token: token,
        },
       
      })
      .then((res) => {
        setfrom("pop")
        setvalue(level)
        setShowChatbot(true)
        setUser(res.data);
        setShowLevelPopup(false);
      });
  };

  const toggleChatbot = () => {
    setfrom("")
    setShowChatbot(!showChatbot)
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      {" "}
      {/* Flex container */}
      <Header />
      {/* <div
        className="banner-section"
        style={{ backgroundImage: `url(${banner}) `,marginTop:70 }}
      >
        
      </div> */}
      <img src={banner} style={{height:650,marginTop:60}} />
      <LevelPopup
        open={showLevelPopup}
        onClose={() => {
          setShowLevelPopup(false);
        }}
        onSave={change_exp_level}
      />
      {/* Main Content Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={4} lg={2} className="feature-box">
            <Link to="/quizzes" className="feature-link">
              <FontAwesomeIcon icon={faQuestionCircle} size="3x" />
              <h5>Quizzes</h5>
            </Link>
          </Col>
          <Col md={4} lg={2} className="feature-box">
            <Link to="/code-editor" className="feature-link">
              <FontAwesomeIcon icon={faCode} size="3x" />
              <h5>Code Editor</h5>
            </Link>
          </Col>
          <Col md={4} lg={2} className="feature-box">
            <Link to="/tutorials" className="feature-link">
              <FontAwesomeIcon icon={faBookOpen} size="3x" />
              <h5>Tutorials</h5>
            </Link>
          </Col>
          <Col md={4} lg={2} className="feature-box">
            <Link to="/exercises" className="feature-link">
              <FontAwesomeIcon icon={faTasks} size="3x" />
              <h5>Exercises</h5>
            </Link>
          </Col>
        </Row>
      </Container>
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        {/* Icon (can be an image or font icon) */}
        <FontAwesomeIcon icon={faRobot} size="2x" />
      </div>
      {/* Conditionally render the Chatbot */}
    <div style={{top:"35%",position:"fixed",left:"2%"}}>
      {showChatbot && <Chatbot from={from} value={value} className="chatbot-container" />}
      </div>

      {/* Footer Section */}
      <footer className="bg-light mt-auto">
        {" "}
        {/* Pushed to the bottom */}
        <Container className="py-3">
          <div className="text-center">© 2024 PyPilot: All Rights Reserved</div>
          <div className="text-center">
            <a href="#about-us">About Us</a>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
