const bcrypt = require("bcrypt");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");

const register = (name, password, done) =>{
    const saltRounds = 10;
    try{
        if(!name){
            throw new Error("A name wa not provided");
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.build({name, passwordHash: hash});

        try{
            await user.save();
            done(null, user);        
        }catch(error){
            done(null, {});
        }

    }catch(error){
        done(error);
    }
};
const verify = () =>{};
const login = () =>{};

const registerStrategy = new LocalStrategy({usernameField: 'name', passwordField: 'password'}, register);

modeule.exports = {
    registerStrategy
}