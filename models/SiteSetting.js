import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Madrasha Site' },
  tagline: { type: String, default: 'Knowledge • Character • Excellence' },
  logoUrl: { type: String, default: '' },
  email: { type: String, default: 'connect@madrasha.org' },
  phone: { type: String, default: '+91 99320 63119' },
  address: { type: String, default: 'Village- Moushal, South 24 Parganas' },
  facebook: { type: String, default: '#' },
  youtube: { type: String, default: '#' },
  instagram: { type: String, default: '#' },
  twitter: { type: String, default: '#' },
  mapEmbedUrl: { type: String, default: '' },
  footerAbout: { type: String, default: 'Building a brighter future through quality Islamic and modern education.' },
}, { timestamps: true });

export default mongoose.model('SiteSetting', siteSettingSchema);

