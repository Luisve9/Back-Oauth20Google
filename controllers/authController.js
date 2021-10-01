const bcrypt = require("bcrypt");
const User = require("../models/User")
const passport = require("../helpers/passport"); // <--- importamos passport


exports.googleInit = passport.authenticate("google",{
    scope:[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ]
});


exports.googleCallback = (req,res,next)=>{
    console.log("callback in")
    passport.authenticate(  "google", { scope: [ "profile" , "email" ] }, 
        (error,user)=>{
            if(error){
                return res.status(400).json({ error })
            }

            req.login(user, err=>{
                if(err){
                    return res.status(400).json({ error:err })
                }
                //res.status(200).json({ result: user })
                res.redirect("http://localhost:3001/profile")

            })
        } 
    )(req,res,next)
};