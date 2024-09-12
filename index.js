import mongoose from 'mongoose';
import generateInfo from './generateClients.js'
import logger from './logger.js';
import config from './config.js';
import Client from './models/client.js';
import Service from './models/service.js';
import Visit from './models/visit.js';

async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongoURI);
    logger.info('Успешно подключено к MongoDB');

    const { clients, services, visits } = generateInfo();

    await Client.deleteMany();
    await Service.deleteMany({});
    await Visit.deleteMany({});

    await Client.insertMany(clients)
    await Service.insertMany(services);
    await Visit.insertMany(visits);

    logger.info('Данные успешно вставлены');
  } catch (err) {
    logger.error('Не удалось подключиться к MongoDB', err);
  } finally {
    await mongoose.disconnect();
    logger.info('Отключение от MongoDB');
  }
}

connectToDatabase();
