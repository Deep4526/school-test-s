import Certificate from '../models/Certificate.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

// Admin: Generate Certificate
export const generateCertificate = async (req, res, next) => {
  try {
    const certNo = `CERT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const certificate = await Certificate.create({ ...req.body, certificateNo: certNo });
    new ApiResponse(201, certificate, 'Certificate generated').send(res);
  } catch (error) { next(error); }
};

// Admin: Get All Certificates
export const getCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find().populate('student', 'name class').sort({ createdAt: -1 });
    new ApiResponse(200, certs).send(res);
  } catch (error) { next(error); }
};

// Public: Verify Certificate
export const verifyCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.findOne({ certificateNo: req.params.id }).populate('student', 'name class');
    if (!cert) throw new ApiError(404, 'Invalid Certificate ID');
    new ApiResponse(200, cert, 'Certificate is Valid').send(res);
  } catch (error) { next(error); }
};
