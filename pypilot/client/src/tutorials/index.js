import {React,useState} from 'react';
import logo from '../pypilot.png'; 
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Importing custom styles
import Header from '../Componnets/Header';

const videos = [
    'kqtD5dpn9C8', 'b093aqAZiPU', 'WcDaZ67TVRo',
    'FbBXtqtRnWU', '6i3e-j3wSf0', 'INGJh9DEaBM',

];
const Tutorials = () => {
    const createYouTubeUrl = (videoID) => `https://www.youtube.com/watch?v=${videoID}`;

    // Function to create thumbnail URL from videoID
    const createThumbnailUrl = (videoID) => `https://img.youtube.com/vi/${videoID}/0.jpg`;
    return (
        <div className="d-flex flex-column min-vh-100"> {/* Flex container */}
            {/* Navbar Section */}
            <Header />
            <div style={{height:"50px"}}></div>

           {/* Tutorials Section */}
           <Container className="my-5">
                <Row>
                    {videos.map((videoID, index) => (
                        <Col key={index} md={6} className="mb-4">
                            <iframe allow='fullScreen' id="ytplayer" type="text/html" width="640" height="360"
                                src={`https://www.youtube.com/embed/${videoID}?autoplay=1&`}
                                frameborder="0"></iframe>
                        </Col>
                    ))}
                </Row>
            </Container>
            <footer className="bg-light mt-auto"> {/* Pushed to the bottom */}
                <Container className="py-3">
                    <div className="text-center">
                        © 2024 PyPilot: All Rights Reserved
                    </div>
                    <div className="text-center">
                        <a href="#about-us">About Us</a>
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default Tutorials;