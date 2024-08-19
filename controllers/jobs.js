const getAllJobs = async (req,res) =>{
    res.send('getAllJobs')
}
const getSingleJob = async (req,res) =>{
    res.send('getSingleJob')
}
const createJob = async (req,res) =>{
    res.send('createJob')
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