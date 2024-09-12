import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const Client = mongoose.model('Client', clientSchema);

export default Client;