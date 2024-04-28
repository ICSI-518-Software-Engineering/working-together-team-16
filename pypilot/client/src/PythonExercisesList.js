import React, { useState } from 'react';
import './PythonExerciseList.css';
import Header from './Componnets/Header';
import { toturials } from './Componnets/Totorials';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Box from "@mui/material/Box";
import { Card, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CodeIcon from '@mui/icons-material/Code';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from "react-router-dom";

const PythonExerciseList = () => {
  
  const navigate = useNavigate()
  const [desc, serDesc] = useState(toturials[0].description)
  const [code, setcode] = useState(toturials[0].code)
  const [solution,setsolution]=useState(toturials[0].solution)
  return (
    <div style={{}} >
      <Header />
      <Box sx={{ mt: 8, display: "flex", alignItems: "start", p: 2 }}>

        <Box sx={{ width: "25%", overflow: "scroll", scrollbarWidth: 2, height: "90vh", position: 'fixed',px:1 }}  >
          {toturials.map((each) => <Box  sx={{ cursor: "pointer", py: 1,backgroundColor:each.description===desc?"blue":"" ,borderRadius:2,boxShadow:2}} onClick={() => {
            serDesc(each.description)
            setcode(each.code)
            setsolution(each.solution)
          }}>
            <Typography sx={{ color:each.description===desc?"white":"black", textAlign: "start", p: 1 }}>{each.title}</Typography>

          </Box>
          )}

        </Box>
        <Box sx={{ color: "black", textAlign: "start", width: "50%", mt: 10, fontWeight: "bold", ml: "40%" }}>
          <Box sx={{ justifyContent: "end", width: "100%", display: "flex", mb: 2 }}>
            <Button variant='contained' onClick={()=>{
              navigate("/code-editor")
            }} sx={{ justifyContent: "end", display: "flex" }} startIcon={<CodeIcon />} > solve</Button>
          </Box>
          <div dangerouslySetInnerHTML={{ __html: desc }}></div>


          <Accordion sx={{mt:4}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Solution
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ textAlign: "start" }}>
                <SyntaxHighlighter language="python" style={docco}>
                  {code}
                </SyntaxHighlighter>
              </Box>
              <div dangerouslySetInnerHTML={{ __html: solution }}></div>
            </AccordionDetails>
          </Accordion>
        </Box>






      </Box>
    </div>
  );
};

export default PythonExerciseList;
