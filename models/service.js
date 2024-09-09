import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;