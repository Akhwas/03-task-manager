
const Job = require("../models/Job")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError,NotFoundError} = require("../errors")


const getAllJobs = async(req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
    // res.send('get all jobs')
}
const getJob = async(req,res)=>{
    const {user:{userId},params:{id:jobId}}= req
    const job = await Job.findOne({_id:jobId, createdBy:userId})
    if(!job){
        throw new NotFoundError(`no such job exists with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
    
    // res.send('get single jobs')
}
const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId
    const job =await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job}) 
    // res.json(req.user)
}
const deleteJob = async(req,res)=>{
    const {user:userId,params:{id:jobId}} = req
    const job = await Job.findOneAndDelete({_id:jobId})
    if(!job){
        throw new NotFoundError(`The job with id:${jobId} never existed `)
    }
    res.status(StatusCodes.OK).send('Job Successfully Deleted')
    // res.send('job deleted')
}
const editJob = async(req,res)=>{
    const {user:{userId},params:{id:jobId}}=req
    const {company,position} = req.body
    if(!req.body.company || !req.body.position ){
        throw new BadRequestError("please provide both company & position")
    }
    const job =  await Job.findOneAndUpdate({_id:jobId},req.body)

    if(!job){
        throw new NotFoundError(`no job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json(job)
    // res.send('job edited')
}

module.exports = {getAllJobs,
                getJob,
                createJob,
                deleteJob,
                editJob}

