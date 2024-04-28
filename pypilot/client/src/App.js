import React from 'react';
import './App.css';
import Login from './Public/Login';
import Signup from './Public/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PythonExerciseList from './PythonExercisesList';
import ForgotPassword from './Public/ForgotPassword';
import CheckToken from './Public/CheckToken';
import Quiz from './quiz'
import Codeeditor from './code_editor/index';
import Tutorials from './tutorials';
import { SnackbarProvider } from 'notistack';
import HomePage from './Home';
import Profile from './private/Profile';
import ContactUs from './private/ContactUs';

import BotContainer from "./gpt/main"

function App() {
  return (
    <SnackbarProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<CheckToken />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/signup" element={< Signup/>} />
      <Route path="/code-editor" element={<BotContainer.Provider><Codeeditor /></BotContainer.Provider>} />
      <Route path="/quizzes" element={<Quiz />} />
      <Route path="/exercises" element={<PythonExerciseList />} />
      <Route path="/tutorials" element={<Tutorials />} />
    </Routes>
  </BrowserRouter>
  </SnackbarProvider>
  );
}

export default App;
