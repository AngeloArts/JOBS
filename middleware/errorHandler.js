const {StatusCodes} = require('http-status-codes')

const errorHandler = async (err, req, res, next)=>{

  console.log(err)
  const customError = {
    message : err.message || 'Something went wrong internally',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }

  if(err.code === 11000){
    customError.message = `That ${Object.keys(err.keyValue)} already exists, create another one`
    customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
  if(err.name === 'ValidationError'){
    customError.message = Object.values((err.errors)).map((error)=>error.message)
    customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
  if(err.name === 'CastError'){
    customError.message = `The item ${err.value} does not exist`
  }

  res.status(customError.statusCode).json({message: customError.message})
}

module.exports = errorHandler
