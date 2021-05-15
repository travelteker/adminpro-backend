const express = require('express');
const userRoutes = require('./users');
const authRoutes = require('./auth');
const hospitalRoutes = require('./hospitals');
const medicosRoutes = require('./medicos');
const searchRoutes = require('./searchs');
const uploadRoutes = require('./upload');
const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/login', authRoutes);
router.use('/api/hospitals', hospitalRoutes);
router.use('/api/medicos', medicosRoutes);
router.use('/api/search', searchRoutes);
router.use('/api/upload/', uploadRoutes);

module.exports = router;
