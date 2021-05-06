const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const jwtSecret = "loadweb";

const userSchema = new mongoose.Schema({
    email:{
        type:String, 
        required:true,
        minlength:1,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    session:[{
        token:{type:String,required:true},
        expiresAt:{type:Number,required:true}
    }]
});


userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    return _.omit(userObject,['password','session']);
}


userSchema.methods.createSession = function(){
    let user = this;
    return user.refreshToken().then(refreshToken =>{
        return saveSessionToDatabase(user,refreshToken);
    }).then(refreshToken =>{
        return refreshToken;
    }).catch(e=>{
        return Promise.reject('Failed to save sesstion to database...  ' + e);
    })
}


userSchema.methods.generateToken = function(){
    const user = this;
    return new Promise((resolve,reject)=>{
        jwt.sign( {_id:user._id.toHexString()} ,jwtSecret,{expiresIn:"15m"}, (err,token)=>{
            if(!err){
                resolve(token);
            }else{
                reject();
            }

        } );
    })
}

userSchema.methods.refreshToken = function(){
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(64,(err,buf)=>{
            if(!err){
                let token = buf.toString('hex');
                return resolve(token);
            }
        })
    })
}

 



let saveSessionToDatabase = (user,refreshToken)=>{
    return new Promise((resolve,reject)=>{
        let expiresAt = generateRefreshTokenExpireyTime();
        user.session.push({'token':refreshToken,expiresAt});

        user.save().then(()=>{
            return resolve(refreshToken);
        }).catch((e)=>{
            reject(e);
        })
         
    })
}


let generateRefreshTokenExpireyTime  = ()=>{
    let daysUntilExpires = '10';
    let secondsUntilExpires = ((daysUntilExpires * 24)*60)*60;
    return ((Date.now() / 1000) + secondsUntilExpires);
}


const User = mongoose.model('User',userSchema);

module.exports = User; 