const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req,res) =>{
    res.send('getAllJobs')
}
const getSingleJob = async (req,res) =>{
    res.send('getSingleJob')
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