import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import mongoose from 'mongoose';
import User from './models/User.js';
import connectDB from './config/db.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@madrasha.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('ℹ️ Admin user already exists.');
      console.log('-----------------------------------');
      console.log(`Email:    ${adminEmail}`);
      console.log(`Password: AdminPassword123 (or previously set password)`);
      console.log('Role:     admin');
      console.log('-----------------------------------');
      process.exit(0);
    }

    const admin = await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: 'AdminPassword123',
      role: 'admin',
      status: 'active',
      phone: '1234567890'
    });

    console.log('✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log(`Email:    ${admin.email}`);
    console.log(`Password: AdminPassword123`);
    console.log(`Role:     ${admin.role}`);
    console.log('-----------------------------------');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();

