const {StatusCodes} = require('http-status-codes')
const Job = require('../models/jobModel.js')
const BadRequestError = require('../errors/badRequest.js')

const createJob = async (req, res)=>{

  req.body.createdBy = req.user.userId

  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json({message: "created Job", job})
}

const getAllJobs = async (req, res)=>{
  const {
    user: {userId}
  } = req
  
  const jobs = await Job.find({createdBy:userId})
  const jobCount = jobs.length

  res.status(StatusCodes.OK).json({message: 'Here are your jobs', jobCount, jobs})
}

const getJob = async (req, res)=>{

  const {
    user: {userId},
    params: {Id: jobId}
  } = req

  const job = await Job.findOne({createdBy:userId, _id:jobId})

  res.status(StatusCodes.OK).json({messag: 'Here is your job', job})
  
}

const updateJob = async (req, res)=>{
  const {
    user: {userId},
    params: {Id:jobId},
    body: {company, position}
  } = req

  if(!company, !position){
    throw new BadRequestError('You must provide a company and position')
  }

  const job = await Job.findOneAndUpdate(
    {createdBy:userId, _id:jobId},
    req.body,
    {new:true, runValidators: true}
  )

  res.status(StatusCodes.OK).json({message:'Job updates', job})
}

const deleteJob = async (req, res)=>{
  const {
    params: {Id: jobId},
    user: {userId}
  } = req
  
  const job = await Job.findOneAndDelete({createdBy:userId, _id:jobId})

  res.status(StatusCodes.OK).json({message: "Job deleted"})
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}