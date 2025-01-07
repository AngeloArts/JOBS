const {StatusCodes} = require('http-status-codes')

const register = async (req, res)=>{

  res.status(StatusCodes.CREATED).json({message: "Created User"})
}

const login = async (req, res)=>{


}

module.exports = {
  register,
  login
}