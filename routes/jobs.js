const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

const { authorizePermissions } = require("../middleware/authentication");
router
  .route("/")
  .post(authorizePermissions('admin'), createJob)
  .get(getAllJobs);

  router.
    route("/:id")
    .get(getSingleJob)
    .delete(authorizePermissions('admin'),deleteJob)
    .patch(authorizePermissions('admin'),updateJob);

module.exports = router;
