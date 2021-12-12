const express = require('express')
const router = express.Router()

const {getAllJobs,
    getJob,
    createJob,
    deleteJob,
    editJob} = require ('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).delete(deleteJob).patch(editJob)

module.exports = router

