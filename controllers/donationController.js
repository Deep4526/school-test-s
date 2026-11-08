import Donation from '../models/Donation.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const createDonation = async (req, res, next) => {
  try {
    const donation = await Donation.create(req.body);
    new ApiResponse(201, donation, 'Donation recorded').send(res);
  } catch (error) { next(error); }
};

export const getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    new ApiResponse(200, donations).send(res);
  } catch (error) { next(error); }
};
