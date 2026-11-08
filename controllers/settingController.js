import SiteSetting from '../models/SiteSetting.js';
import { ApiResponse } from '../utils/apiResponse.js';

// GET public settings (used by frontend components)
export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) settings = await SiteSetting.create({});
    new ApiResponse(200, settings).send(res);
  } catch (error) { next(error); }
};

// PUT update settings (admin only)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(req.body);
    } else {
      settings = await SiteSetting.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    new ApiResponse(200, settings, 'Settings updated successfully').send(res);
  } catch (error) { next(error); }
};
