const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  username: {
    type:String,
    required: [true, 'You must provide a username ']
  },
  email: {
    type:String,
    required: [true, 'You must provide a email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'provide a valid email'],
    unique: true
  },
  password: {
    type:String,
    required: [true, 'You must provide a password']
  }
})

UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.generateToken = async function(){
  return jwt.sign({username:this.username, cool:true, userId:this._id}, process.env.JWT_SECRET, {expiresIn: "20d"})
}

UserSchema.methods.comparePasswords = function(candidatePssword){
  return bcrypt.compare(candidatePssword, this.password)
}

module.exports = mongoose.model('User', UserSchema)