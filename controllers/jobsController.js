const {StatusCodes} = require('http-status-codes')


const createJob = async (req, res)=>{

  res.status(StatusCodes.CREATED).json({message: "created Job"})
}

const getAllJobs = async (req, res)=>{
  
}

const getJob = async (req, res)=>{
  
}

const updateJob = async (req, res)=>{
  
}

const deleteJob = async (req, res)=>{
  
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}