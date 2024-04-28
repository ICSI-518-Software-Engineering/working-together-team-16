import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faCode,
  faBookOpen,
  faTasks,
  faSignInAlt,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Header from "../Componnets/Header";
import Chatbot from "./gpt_assistant";
import BotContainer from "../gpt/main";
import AssistantIcon from "@mui/icons-material/Assistant";
import { API_KEY, OPENAI_BASE_URL } from "../Constants";

function Codeeditor() {
  const toggleChatbot = () => setShowChatbot(!showChatbot);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputData, setInputData] = useState("");

  const handleChange = (newValue) => {
    setCode(newValue);
  };

  const handleRun = async () => {
    setOutput("");
    setSuggestion("");
    const options = {
      method: "POST",
      url: "https://online-code-compiler.p.rapidapi.com/v1/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d84350a445msh360fc7b1aa2393ap1dedb3jsn81cd7cdc10ea",
        "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
      },
      data: {
        language: "python3",
        version: "latest",
        code: code,
        input: inputData,
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setOutput(response.data.output);
      sendMessageToAI(response.data.output, code);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessageToAI = (output, code) => {
    const apiKey = "sk-proj-ZhPobLeyjyM2ILxaYJslT3BlbkFJIzaPTDbw2YI6P63XK03Q";
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `see this  ${code}\n this is my output ${output} act as python expert and give helpfull suggestion to improve code or resolve error`,
        },
      ],
    };

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from API:", data);
        const suggestionMessage = data.choices[0].message.content;
        console.log("Received suggestion:", suggestionMessage);
        setSuggestion(suggestionMessage);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSuggestion("Error getting suggestion");
      });
  };

  const handleClear = () => {
    setCode("");
    setOutput("");
    setSuggestion("");
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <Container
        maxWidth
        sx={{ background: "white", p: 3, mt: 7, height: "93vh" }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <AceEditor
              height="86vh"
              width="100%"
              value={code}
              mode="python"
              theme="monokai"
              fontSize="18px"
              code={code}
              onChange={(value) => setCode(value)}
              highlightActiveLine={true}
              setOptions={{
                showLineNumbers: true,
                tabSize: 4,
              }}
            />
          </Grid>
          <Grid item container xs={12} md={6} sx={{ p: 2, height: "86vh" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
                width: "100%",
                height: 40,
              }}
            >
              <Button variant="contained" onClick={() => handleRun()}>
                Run Code
              </Button>
              <FormControlLabel
                control={
                  <Checkbox
                    value={showInput}
                    onClick={() => {
                      setShowInput(!showInput);
                    }}
                  />
                }
                label="Add Input"
              />
              <Typography variant="h4">Output</Typography>
            </div>
            <Grid item xs={12} sx={{ height: "30vh", overflow: "auto" }}>
              <Divider></Divider>
              {showInput && (
                <TextField
                  fullWidth
                  placeholder="Add your Input Fields"
                  multiline
                  minRows={2}
                  maxRows={3}
                  value={inputData}
                  onChange={(e) => {
                    setInputData(e.target.value);
                  }}
                />
              )}
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f5f5f5",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "left",
                    color: "black",
                    whiteSpace: "pre-wrap",
                    "&.MuiTypography-root": {
                      whiteSpace: "pre-wrap",
                    },
                  }}
                >
                  {output}
                </Typography>
              </Box>
            </Grid>
            <Typography variant="h4">Code Suggestions</Typography>
            <Grid item xs={12} sx={{ height: "41vh", overflow: "auto" }}>
              <Divider></Divider>
              <div>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#959695",
                    padding: "16px",
                    // display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  <Markdown>{suggestion}</Markdown>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <div
        className="chatbot-toggle"
        style={{ background: "black" }}
        onClick={toggleChatbot}
      >
        {/* Icon (can be an image or font icon) */}
        <AssistantIcon color="white" />
        {/* <FontAwesomeIcon color="white" icon={faRobot} size="2x" /> */}
      </div>
      {/* Conditionally render the Chatbot */}
      <div style={{ bottom: "12%", position: "fixed", right: "1%" }}>
        {showChatbot && <Chatbot className="chatbot-container" />}
      </div>
      {/* Footer Section */}
    </div>
  );
}

export default Codeeditor;
