const {StatusCodes} = require('http-status-codes')
const User = require('../models/userModel.js')
const BadRequestError = require('../errors/badRequest.js')
const NotFoundError = require('../errors/notFound.js')
const UnauthorizedError = require('../errors/Unauthorized')

const register = async (req, res)=>{

  const user = await User.create({...req.body})

  const token = await user.generateToken()

  res.status(StatusCodes.CREATED).json({message: "Created User", user, token})
}

const login = async (req, res)=>{

  const {
    email,
    password
  } = req.body
  if(!email || !password){
    throw new BadRequestError('You must provide an email and a password')
  }
  const user = await User.findOne({email})

  if(!user){
    throw new NotFoundError('User with the email was not Found')
  }

  const passwordCorrect = await user.comparePasswords(password)
  if(!passwordCorrect){
    throw new UnauthorizedError('Wrong password')
  }
  const token = await user.generateToken()

  res.status(StatusCodes.OK).json({message: `Welcome back ${user.username}`, user, token})

}

module.exports = {
  register,
  login
}