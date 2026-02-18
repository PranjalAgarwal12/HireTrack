const express = require('express');
const router = express.Router();

const Application = require('../models/Application');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');


// ================= VIEW MY APPLICATIONS (CANDIDATE) =================
router.get('/my', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== 'candidate') {
      return res.status(403).json({ message: "Only candidates can view their applications" });
    }

    const applications = await Application.find({
      applicant: req.user.id
    }).populate('job');

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ================= RECRUITER VIEW APPLICANTS FOR A JOB =================
router.get('/job/:jobId', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: "Only recruiters can view applicants" });
    }

    const applications = await Application.find({
      job: req.params.jobId
    }).populate('applicant', 'name email');

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ================= APPLY TO JOB =================
router.post('/:jobId', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== 'candidate') {
      return res.status(403).json({ message: "Only candidates can apply to jobs" });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    const newApplication = new Application({
      job: req.params.jobId,
      applicant: req.user.id
    });

    await newApplication.save();

    res.status(201).json({
      message: "Applied successfully",
      application: newApplication
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ================= UPDATE APPLICATION STATUS (NEW) =================
router.put('/status/:applicationId', authMiddleware, async (req, res) => {
  try {

    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: "Only recruiters can update application status" });
    }

    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.applicationId).populate('job');

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // 🔥 SECURITY: recruiter can only update applications of their own jobs
    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated",
      application
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
