import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import Startup from '../models/Startup';
import Otp from '../models/Otp';

// @desc    Get all startups (with filters)
// @route   GET /api/startups
export const getStartups = async (req: Request, res: Response) => {
  try {
    const { search, industry, fundingStage, foundedYear } = req.query;

    let query: any = { status: 'approved' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { founderName: { $regex: search, $options: 'i' } },
        { about: { $regex: search, $options: 'i' } },
      ];
    }

    if (industry) query.industry = industry;
    if (fundingStage) query.fundingStage = fundingStage;
    if (foundedYear) query.foundedYear = Number(foundedYear);

    const startups = await Startup.find(query).sort({ createdAt: -1 });
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single startup
// @route   GET /api/startups/:id
export const getStartupById = async (req: Request, res: Response) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add new startup
// @route   POST /api/startups
export const createStartup = async (req: Request, res: Response) => {
  try {
    const newStartup = new Startup({
      ...req.body,
      status: 'pending', // Default to pending as per requirement
    });
    const savedStartup = await newStartup.save();
    res.status(201).json(savedStartup);
  } catch (error) {
    res.status(400).json({ message: 'Validation Error', error });
  }
};

// @desc    Get pending startups (for admin)
// @route   GET /api/startups/pending
export const getPendingStartups = async (req: Request, res: Response) => {
  try {
    const startups = await Startup.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update startup
// @route   PUT /api/startups/:id
export const updateStartup = async (req: Request, res: Response) => {
  try {
    const startup = await Startup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(400).json({ message: 'Update Error', error });
  }
};

// @desc    Delete startup
// @route   DELETE /api/startups/:id
export const deleteStartup = async (req: Request, res: Response) => {
  try {
    const startup = await Startup.findByIdAndDelete(req.params.id);
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json({ message: 'Startup deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Send OTP for Startup registration
// @route   POST /api/startups/send-otp
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP for ${email}: ${otp}`); // For testing purposes
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save/Update in DB
    await Otp.findOneAndUpdate({ email }, { otp: hashedOtp, createdAt: new Date() }, { upsert: true });

    let transporter;
    let previewUrl = '';

    // Use Ethereal test account for reliable OTP delivery
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'HydPortal <test@hydportal.dev>',
      to: email,
      subject: 'Your HydPortal Verification Code',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      previewUrl = nodemailer.getTestMessageUrl(info) || '';
      if (previewUrl) {
        console.log(`\n📬 OTP Email Preview URL: ${previewUrl}`);
        console.log(`🔑 OTP for ${email}: ${otp}\n`);
      }
    } catch (mailErr: any) {
      // If Gmail fails, fall back to Ethereal automatically
      console.warn('Gmail failed, switching to Ethereal test mode:', mailErr.message);
      const testAccount = await nodemailer.createTestAccount();
      const fallbackTransport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: { user: testAccount.user, pass: testAccount.pass }
      });
      const info = await fallbackTransport.sendMail(mailOptions);
      previewUrl = nodemailer.getTestMessageUrl(info) || '';
      console.log(`\n📬 OTP Email Preview URL: ${previewUrl}`);
      console.log(`🔑 OTP for ${email}: ${otp}\n`);
    }

    res.json({ message: 'OTP sent successfully', previewUrl: previewUrl || undefined });
  } catch (error) {
    console.error('OTP Send Error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// @desc    Verify OTP
// @route   POST /api/startups/verify-otp
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return res.status(400).json({ message: 'OTP expired or not found' });

    const isMatch = await bcrypt.compare(otp.toString(), otpRecord.otp);
    if (!isMatch) return res.status(400).json({ message: 'Invalid OTP' });

    // Delete OTP after verification
    await Otp.deleteOne({ email });

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('OTP Verify Error:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};
