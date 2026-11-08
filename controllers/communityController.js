import Alumni from '../models/Alumni.js';
import Membership from '../models/Membership.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

export const registerAlumni = async (req, res, next) => { try { new ApiResponse(201, await Alumni.create(req.body), 'Registered').send(res); } catch(e){ next(e); } };
export const getAlumni = async (req, res, next) => { try { new ApiResponse(200, await Alumni.find()).send(res); } catch(e){ next(e); } };
export const deleteAlumni = async (req, res, next) => { try { await Alumni.findByIdAndDelete(req.params.id); new ApiResponse(200, null, 'Deleted').send(res); } catch(e){ next(e); } };

export const applyMembership = async (req, res, next) => { try { new ApiResponse(201, await Membership.create(req.body), 'Applied').send(res); } catch(e){ next(e); } };
export const getMemberships = async (req, res, next) => { try { new ApiResponse(200, await Membership.find().sort({createdAt:-1})).send(res); } catch(e){ next(e); } };
export const updateMembership = async (req, res, next) => { try { new ApiResponse(200, await Membership.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new:true}), 'Updated').send(res); } catch(e){ next(e); } };
