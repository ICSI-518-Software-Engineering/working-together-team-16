import React, { useEffect, useState } from "react";
import "./quiz.css"; // Import the CSS file for styling
import { API_KEY, OPENAI_BASE_URL, BACKEND_URL } from "../../src/Constants";
import { json } from "react-router-dom";
import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import SyntaxHighLighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Header from "../Componnets/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Quiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [api_error, setApiError] = useState(null);

  const [Answered, setAnswered] = useState([])
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [correctly_answered, setCorrectly_answered] = useState(0);
  const [selectedOption, setselectedOption] = useState(-1);
  const [questionBackground, setquestionBackground] = useState("white");
  const [index, setindex] = useState(0)
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  console.log("ans", Answered, index)
  const ex_level = "Pro";

  console.log(selectedOption, "selected")

  const handleAnswerClick = (option, location) => {

    if (option === questionData.answer) {
      enqueueSnackbar('Correct Answer', { variant: 'success' });
      UpdateBackend("correct", location);
    } else {
      UpdateBackend("incorrect", location);
      enqueueSnackbar('Incorrect Answer', { variant: 'error' });
    }
    // load_question();
  };

  const UpdateBackend = (mode, location) => {
    console.log("updateBa", selectedOption)
    const token = localStorage.getItem("Token");
    if (!token) {
      console.log("Token not found - navigating to login page");
      navigate("/login");
    } else {
      axios
        .get(BACKEND_URL + `quiz/${mode}/${index}/${location}`, {
          headers: {
            auth_token: token,
          },
        })
        .then((res) => {
          setindex(res.data.Questions.length)
          load_question_from_server(index + 1)
          setAnswered(res.data.Questions)
          setselectedOption(-1)

          // setTotalQuestion(res.data.total_answered);
          setCorrectly_answered(res.data.correctly_answered);
        });
    }
  };

  // const resetQuiz = () => {
  //   setCurrentQuestion(0);
  //   setScore(0);
  //   setShowResult(false);
  // };

  useEffect(() => {
    // load_question();
    const token = localStorage.getItem("Token")
    axios.post(BACKEND_URL + "user/VerifyUser/" + token).then((res) => {
      console.log("USER: REsponse", res.data)
      setTotalQuestion(res.data.user.total_answered)
      setindex(res.data.user.Questions.length)
      setCorrectly_answered(res.data.user.correctly_answered)
      setAnswered(res.data.user.Questions)
      load_question_from_server(res.data.user.Questions.length)
    })
  }, []);

  const load_question_from_server = async (id) => {
    id = id % 100;
    await axios.get(BACKEND_URL + "quiz/q/" + id).then((res) => {
      setQuestionData(res.data)
    })
  }

  const load_question = () => {
    setIsLoading(true);
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Act as a python quiz app : for experience level : [${ex_level}] , send a quiz question with possible options and a correct option in json format, and options in list form and correct_option will be the index, if the question need code snippet , send that code separately in new key code_snippet `,
        },
      ],
    };

    fetch(OPENAI_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from API:", data);
        if (data.choices[0].message.content) {
          console.log(JSON.parse(data.choices[0].message.content));
          setQuestionData(JSON.parse(data.choices[0].message.content));
          setselectedOption(-1);
          setquestionBackground("white");
        } else {
          setApiError("Error in Loading Question");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setApiError("Error in Loading Question");
      });
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <Container>
        <div
          style={{
            marginTop: "10%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">
            {`Correctly Answered : ${correctly_answered} / ${Answered.length}`}
          </Typography>
          <Typography variant="h5">{`Your Accuracy : ${correctly_answered /
            Answered.length}`}</Typography>
        </div>
        {isLoading ? (
          <div className="loading-container">
            <div>Loading .....</div>
          </div>
        ) : (
          questionData && (
            <div
              className={` ${isLoading ? "fade-out" : "question-container"}`}
              style={{ background: { questionBackground } }}
            >
              <h2>Question {index + 1}</h2>
              <Typography variant="h5">{questionData.question}</Typography>
              {questionData.code_snippet && (
                <div style={{ textAlign: "left" }}>
                  <SyntaxHighLighter style={dracula} language="python">
                    {questionData.code_snippet}
                  </SyntaxHighLighter>
                </div>
              )}
              <ul className="options-list">
                {questionData.options.map((option, i) => (
                  <li
                    key={i}
                    className="option"

                    style={{ backgroundColor: selectedOption !== -1 ? option === questionData.answer ? "green" : "red" : "", color: selectedOption !== -1 ? "white" : "" }}
                    onClick={() => {
                      if (index === Answered.length) {
                        setselectedOption(i)
                        handleAnswerClick(option, i)
                      }
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <Stack spacing={2} sx={{ justifyContent: "space-between", px: 2 }} direction="row">
                <Button variant="contained" disabled={index === 0 ? true : false} onClick={async () => {
                  load_question_from_server(index - 1)
                  setindex(index - 1)
                  for (let i = 0; i < Answered.length; i++) {

                    if ((index - 1).toString() === Answered[i].qno) {
                      setselectedOption(Answered[i].qans)
                      return

                    }
                  }

                }} >Previous</Button>
                <Button variant="contained" disabled={index >= Answered.length ? true : false} onClick={() => {
                  load_question_from_server(index + 1)
                  setindex(index + 1)
                  for (let i = 0; i < Answered.length; i++) {
                    console.log(index, Answered[i].qno)
                    if ((index + 1).toString() === Answered[i].qno) {
                      setselectedOption(Answered[i].qans)
                      return
                    }
                  }
                  setselectedOption(-1)
                }} >Next</Button>
              </Stack>
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default Quiz;