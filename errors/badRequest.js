const {StatusCodes} = require('http-status-codes')

class BadRequestError extends Error{
  constructor(message){
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = BadRequestError