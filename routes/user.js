const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const profile = async(req, res, next) =>{
    res.status(200).json({msg: "Profile", user: req.user, token: req.query.secret_token});
};

const register = async(req, res, next) =>{
    req.user.name ? res.status(200).json({msg: "registered successfully", user: req.user}): res.status(401).json({msg:"User already exists"});
};

const login = async(req, res, next) => {
    const session = {session: false};

    passport.authenticate("login", async(err, user, info)=>{
        try{
            if (err){
                res.status(500).json({msg:"Internal Server Error"});
            }else if (!user){
                res.status(401).json({msg: "User not found"});
            }else{
                req.login(user, session, async(error)=> error ? next(error): res.status(200).json({user, token: jwt.sign({user: {id: user.id, name: user.name}})}));
            }
        }catch (error){
            return next(error);
        }
    })(req, res, next);
};

router.post("/register", register);
router.get("/profile", profile);
router.post("/login", login);


module.exports = router;