const bcrypt = require("bcrypt");
const User = require("../models/User")
const passport = require("../helpers/passport"); 

exports.googleInit = 
    passport.authenticate("google",{
        scope:[
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ]
    });

exports.googleCallback = (req,res,next)=>{
    passport.authenticate(  "google", { scope: [ "profile" , "email" ] }, 
        (error,user)=>{
            if(error){
                return res.status(400).json({ error})
            }

            req.login(user, err=>{
                if(err){
                    return res.status(400).json({ error:err })
                }
                res.redirect("http://localhost:3000/home")

            })
        } 
    )(req,res,next)
};
