require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session")
const passport = require("./helpers/passport");

const app = express();

const authRouter = require('./routes/auth');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use(
    cors({
      origin: ["http://localhost:3001","http://localhost:3000"],
      credentials: true,
    })
  );


app.use(
    session({
        secret : process.env.SECRET,
        saveUninitialized:true,
        resave:true
    })
)

app.use( passport.initialize() )
app.use( passport.session() )

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Routes config

app.use('/', authRouter);

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
  
module.exports = app;
