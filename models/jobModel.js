const mongoose = require('mongoose')

const jobModel = mongoose.Schema({
  company:{
    type: String,
    required: [true, 'You must prove a company']
  },
  status:{
    type: String,
    required: [true, 'You must prove a status'],
    enum:{
      values: ['pending', 'accepetd'],
      message: "{VALUE} is not accepted"
    },
    default: 'pending'
  },
  position: {
    type: String,
    required: [true, 'You must provide a position']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'You must provide who created the job']
  }
}, {timestamps: true})

module.exports = mongoose.model('Job', jobModel)