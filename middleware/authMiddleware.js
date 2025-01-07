const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');

const authMiddleware = async (req, res, next)=>{
  
  const authHeader = req.headers.authorization  
  if(!authHeader){
    throw new UnauthorizedError('You do not hav a token, login to get access')
  }
  const token = authHeader.split(' ')[1]
  console.log(token)
  try {
    const payLoad = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      username: payLoad.username,
      userId: payLoad.userId,
      cool: true
    }
    next()
  } catch (error) {
    console.log(error)
    throw new UnauthorizedError('You are not authorized to access this information')
  }
}

module.exports = authMiddleware