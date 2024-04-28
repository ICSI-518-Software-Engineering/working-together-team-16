import React from 'react';
import ChatBot from 'react-simple-chatbot';
// import {Segment} from 'semantic-ui-react';
import './App.css';
import { Card, Divider, Typography, Box } from '@mui/material'
function App({from,value}) {

  const steps1 = [
    {
      id: 'Greet',
      message: 'Hello, welcome to pypilot',
      trigger: value
    },
    {
      id: "beginner",
      message: 'career path',
      trigger: 'path1',
    },
    {
      id: "path1",
      message: 'Tutorials => Quizees = > Exercises => Use code editor and solve problems',
      end:true
    },
    
    {
      id: "intermediate",
      message: 'Career path',
      trigger: 'path2',
    },
    {
      id: "path2",
      message: 'Quizees = > Exercises => Use code editor and solve problems',
      end:true
    },
    {
      id: "advanced",
      message: 'Career path',
      trigger: 'path3',
    },
    {
      id: "path3",
      message: 'Exercises => Use code editor and solve problems',
      end:true
    },
  ]
  
  const steps = [
    {
      id: 'Greet',
      message: 'Hello, welcome to pypilot',
      trigger: 'askname'
    },
    {
      id: "askname",
      message: 'please enter your name!',
      trigger: 'Done',
    },
    {
      id: "Done",
      user: true,
      trigger: "Name",
    },
    {
      id: "Name",
      message: "Hi {previousValue} , please select your issue",
      trigger: "issues",
    },
    {
      id: "issues",
      options: [
        {
          value: "how to use code editor?",
          label: "how to use code editor?",
          trigger: "how to use code editor?",
        },
        {
          value: "how to contact?",
          label: "how to contact?",
          trigger: "contact",
        },
      ],
    },
    {
      id: "how to use code editor?",
      message: "In the Menu Bar Click on code editor , you will be navigated to code editor . In left hand side you can write the code you want to excute the code after completion of writing your code click on Run code",
      end: true,
    },
    {
      id: "contact",
      message: "In the Menu Bar  click on the Contact us and Drop us a mail",
      end: true,
    },
  ]
  return (

    <ChatBot steps={from=="pop"?steps1:steps} />

  )
}
export default App;