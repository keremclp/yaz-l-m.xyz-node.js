const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const getAllJobs = async (req,res) =>{
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({ count:jobs.length, jobs })
}
const getSingleJob = async (req,res) =>{
    const { id: jobId } = req.params
    const job = await Job.findOne({ _id: jobId })
    if(!job) {
        throw new CustomError.NotFoundError(`No job with ID: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const createJob = async (req,res) =>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const deleteJob = async (req,res) =>{
    res.send('deleteJob')
}
const updateJob = async (req,res) =>{
    res.send('updateJob')
}

module.exports = {
    getAllJobs,
    getSingleJob,
    createJob,
    deleteJob,
    updateJob
}