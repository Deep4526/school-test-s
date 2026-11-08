
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import examRoutes from './routes/examRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import miscRoutes from './routes/miscRoutes.js';
import portalRoutes from './routes/portalRoutes.js';
import classRoutes from './routes/classRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import academicRoutes from './routes/academicRoutes.js';

const app = express();

// Connect Database
connectDB();

// Allowed frontend origins
const allowedOrigins = [
  'https://school-test-f.deeproy789.workers.dev',
  'http://localhost:5173',
  ...(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
];

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without Origin header
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`Blocked CORS origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],

  optionsSuccessStatus: 204
};

// Apply CORS before other middleware
app.use(cors(corsOptions));

// Security Headers
app.use(helmet());

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Backend is running'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/academics', academicRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Allowed CORS origins:', allowedOrigins);
});
