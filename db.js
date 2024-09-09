const mongoose = require("mongoose");
const generateInfo = require('./generateClients');
const mongoURI = 'mongodb://localhost:27017/Task-6';

// Определите схемы и модели Mongoose
const clientSchema = new mongoose.Schema({  
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  phoneNumber: { type: String, required: true }});

const serviceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
});

const visitSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  client: { type: String, required: true, ref: 'Client' }, 
  plannedDateTime: { type: Date, required: true },
  actualDateTime: { type: Date },
  visitStatus: { type: String, required: true, enum: ['Запланирован', 'Посетил', 'Отменил'] },
  selectedKeys: [{ type: String, ref: 'Services' }],
  price: { type: Number, required: true }
});

const Clients = mongoose.model('Сlients', clientSchema);
const Service = mongoose.model('Services', serviceSchema);
const Visit = mongoose.model('Visits', visitSchema);

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Успешно подключено к MongoDB');

    const { clients, services, visits } = generateInfo();
    // const services = generateInfo().services;
    // const visits = generateInfo().visits

    await Clients.deleteMany();
    await Service.deleteMany({});
    await Visit.deleteMany({});

    await Clients.insertMany(clients)
    await Service.insertMany(services);
    await Visit.insertMany(visits);

    console.log('Данные успешно вставлены');
  } catch (err) {
    console.error('Не удалось подключиться к MongoDB', err);
  } finally {
    await mongoose.disconnect();
  }
}

connectToDatabase();
