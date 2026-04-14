import express from 'express';
import {
  getStartups,
  getStartupById,
  createStartup,
  updateStartup,
  deleteStartup,
  getPendingStartups,
  sendOtp,
  verifyOtp
} from '../controllers/startupController';

const router = express.Router();

router.get('/', getStartups);
router.get('/pending', getPendingStartups);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/:id', getStartupById);
router.post('/', createStartup);
router.put('/:id', updateStartup);
router.delete('/:id', deleteStartup);

export default router;
