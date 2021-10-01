const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User")


//convertir a cadena
passport.serializeUser((user,callback)=>{
    callback(null,user._id)
});
// convertir a objeto
passport.deserializeUser(async (id,callback)=>{
    try{
        const user = await  User.findById(id)
        callback(null,user)
    }catch(error){
        console.log("hubo un error deserializeUser")
        callback(error,null)
    }
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/google/callback"/*"http://www.example.com/auth/google/callback"*/
  },
  async (accesToken, refreshToken,profile,cb)=>{
    try{
        //verificamos si hay un googleID registrado
        const user = await User.findOne({ googleID: profile.id })

        //si ya esta registrado
        if(user){
            return cb(null, user)
        }

        const newUser = await User.create({
            googleID: profile.id,
            email:profile.emails[0].value,
        })
        return cb(null,newUser())
    } catch(error) {
        return cb(error,null)
    }
  }
));

module.exports  = passport