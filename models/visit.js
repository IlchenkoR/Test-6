import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  client: { type: String, required: true, ref: 'Client' },
  plannedDateTime: { type: Date, required: true },
  actualDateTime: { type: Date },
  visitStatus: { type: String, required: true, enum: ['Запланирован', 'Посетил', 'Отменил'] },
  selectedKeys: [{ type: String, ref: 'Service' }],
  price: { type: Number, required: true }
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;