const express = require('express');
const router = express.Router();

const Job = require('../models/Job');
const Application = require('../models/Application');
const authMiddleware = require('../middleware/authMiddleware');


// ================= CREATE JOB =================
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: "Only recruiters can create jobs" });
    }

    const { title, company, location, salary, description } = req.body;

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      description,
      createdBy: req.user.id
    });

    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: newJob
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ================= GET MY JOBS (MOVE ABOVE /:id) =================
router.get('/my-jobs', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: "Only recruiters allowed" });
    }

    const jobs = await Job.find({ createdBy: req.user.id });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ================= GET ALL JOBS =================
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name email');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ================= DELETE JOB =================
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ================= UPDATE JOB =================
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, company, location, salary, description } = req.body;

    job.title = title || job.title;
    job.company = company || job.company;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.description = description || job.description;

    await job.save();

    res.json({
      message: "Job updated successfully",
      job
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
