const express = require('express');
const router = express.Router();
const {
    getStartups,
    getStartupById,
    createStartup,
    updateStartup,
    deleteStartup
} = require('../controllers/startupController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getStartups)
    .post(createStartup);

router.route('/:id')
    .get(getStartupById)
    .put(protect, updateStartup)
    .delete(protect, deleteStartup);

module.exports = router;
