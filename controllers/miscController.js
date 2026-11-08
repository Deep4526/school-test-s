import Gallery from '../models/Gallery.js';
import Download from '../models/Download.js';
import PressRelease from '../models/PressRelease.js';
import Event from '../models/Event.js';
import Department from '../models/Department.js';
import Magazine from '../models/Magazine.js';
import Feedback from '../models/Feedback.js';
import Committee from '../models/Committee.js';
import Donation from '../models/Donation.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Generic CRUD helper
const createCRUD = (Model) => ({
  getAll: async (req, res, next) => { try { new ApiResponse(200, await Model.find().sort({createdAt:-1})).send(res); } catch(e){ next(e); } },
  create: async (req, res, next) => { try { new ApiResponse(201, await Model.create(req.body), 'Created').send(res); } catch(e){ next(e); } },
  delete: async (req, res, next) => { try { await Model.findByIdAndDelete(req.params.id); new ApiResponse(200, null, 'Deleted').send(res); } catch(e){ next(e); } }
});

const galleryCtrl = createCRUD(Gallery);
const downloadCtrl = createCRUD(Download);
const pressCtrl = createCRUD(PressRelease);
const eventCtrl = createCRUD(Event);
const deptCtrl = createCRUD(Department);
const magazineCtrl = createCRUD(Magazine);
const committeeCtrl = createCRUD(Committee);

// Feedback (No delete for public, just create and admin get)
export const createFeedback = async (req, res, next) => { try { new ApiResponse(201, await Feedback.create(req.body), 'Feedback sent').send(res); } catch(e){ next(e); } };
export const getFeedbacks = async (req, res, next) => { try { new ApiResponse(200, await Feedback.find().sort({createdAt:-1})).send(res); } catch(e){ next(e); } };
export const updateFeedbackStatus = async (req, res, next) => { try { new ApiResponse(200, await Feedback.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new:true}), 'Updated').send(res); } catch(e){ next(e); } };

// Public Donor Panel (Get non-anonymous donations)
export const getPublicDonors = async (req, res, next) => { try { 
  const donors = await Donation.find({ isAnonymous: false, status: 'Completed' }).select('donorName amount type createdAt').sort({createdAt:-1});
  new ApiResponse(200, donors).send(res); 
} catch(e){ next(e); } };

// Export all
export const getGalleries = galleryCtrl.getAll; export const createGallery = galleryCtrl.create; export const deleteGallery = galleryCtrl.delete;
export const getDownloads = downloadCtrl.getAll; export const createDownload = downloadCtrl.create; export const deleteDownload = downloadCtrl.delete;
export const getPress = pressCtrl.getAll; export const createPress = pressCtrl.create; export const deletePress = pressCtrl.delete;
export const getEvents = eventCtrl.getAll; export const createEvent = eventCtrl.create; export const deleteEvent = eventCtrl.delete;
export const getDepts = deptCtrl.getAll; export const createDept = deptCtrl.create; export const deleteDept = deptCtrl.delete;
export const getMagazines = magazineCtrl.getAll; export const createMagazine = magazineCtrl.create; export const deleteMagazine = magazineCtrl.delete;
export const getCommittees = committeeCtrl.getAll; export const createCommittee = committeeCtrl.create; export const deleteCommittee = committeeCtrl.delete;
