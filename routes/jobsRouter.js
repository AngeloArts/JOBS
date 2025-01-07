const express = require('express')
const router = express.Router()

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobsController.js')

router.route('/').post(createJob).get(getAllJobs)
router.route('/:Id').get(getJob).patch(updateJob).delete(deleteJob)


module.exports = router