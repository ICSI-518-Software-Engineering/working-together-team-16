const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const UserRoutes = require('./Routes/UserRoutes');
const QuizRoutes = require("./Routes/quizRoutes")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

mongoose.connect('mongodb+srv://pypilot5:Ud4eKsvZsq4OMhAN@codejudge.vb7cka3.mongodb.net/?retryWrites=true&w=majority&appName=codejudge', { useNewUrlParser: true }).then(()=>{
  console.log("database connected")
}).catch((err)=>{
  console.log(err)
})

app.use("/user",UserRoutes)
app.use("/quiz",QuizRoutes)

// Start the server
app.listen(9001, () => {
  console.log('Server is running ');
});
