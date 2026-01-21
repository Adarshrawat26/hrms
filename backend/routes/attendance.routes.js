const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('employeeId', 'firstName lastName');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attendance by employee ID
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const attendance = await Attendance.find({ employeeId: req.params.employeeId });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark attendance
router.post('/', async (req, res) => {
  try {
    const { employeeId, date, checkIn, status } = req.body;
    
    const attendance = new Attendance({
      employeeId,
      date,
      checkIn,
      status
    });
    
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check out
router.put('/:id', async (req, res) => {
  try {
    const { checkOut } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { checkOut, status: 'present' },
      { new: true }
    );
    if (!attendance) return res.status(404).json({ error: 'Attendance record not found' });
    res.json({ message: 'Check out recorded', attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
