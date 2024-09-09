import { faker } from '@faker-js/faker';

const serviceTable = {
	'Массаж': 2,
	'Депиляция': 3,
	'Лазерное омоложение лица': 4,
	'Ультразвуковой лифтинг': 5,
	'Лазерное удаление сосудов': 6,
	'Коррекция мимических морщин': 8,
	'Лазерная эпиляция': 9
};

// const serviceNames = ['Массаж', 'Депиляция', 'Лазерное омоложение лица', 'Ультразвуковой лифтинг','Лазерное удаление сосудов', 'Коррекция мимических морщин',]
const serviceNames = Object.keys(serviceTable)
const statuses = ['Запланирован', 'Посетил', 'Отменил'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculatePriceSum(selectedKeys, items) {
	const selectedItems = items.filter(item => selectedKeys.includes(item._id));
	if (selectedItems.length === 0) {
	  return 0;
	}
	const totalSum = selectedItems.reduce((sum, item) => sum + item.price, 0);
	return totalSum;
  }

function genetateInfo() {
	const clients = []
	const numClient = getRandomInt(10, 50)
	const services = [];
	const numServices = getRandomInt(5, 10);
	const visits = []
	const numVisits = getRandomInt(10, 100)

	while(clients.length < numClient){
		const client = {
			_id: faker.string.uuid(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			middleName: faker.person.middleName(),
			dateOfBirth: faker.date.past(60, new Date(2005, 0, 1)).toISOString().split('T')[0],
			phoneNumber: faker.phone.number({ style: 'national' })
		  };
		clients.push(client);
	}

	while (services.length < numServices) {
		const serviceName = serviceNames[Math.floor(Math.random() * serviceNames.length)]
		const service = {
		  _id: faker.string.uuid(),
		  name: serviceName,
		  code: faker.string.alphanumeric(10),
		  price: serviceTable[serviceName],
		  description: faker.commerce.productDescription(),
		};
		if (!services.some(existingService => existingService.name === serviceName)) {
			services.push(service);
		}
	}

	while(visits.length < numVisits){
		const plannedDateTime = faker.date.between({ from: '2024-05-01T00:00:00.000Z', to: '2024-12-01T00:00:00.000Z' })
		let actualDateTime = ''
		const visitCheck = Math.random() < 0.5
		const currentDate = new Date();
		let visitStatus = ''
		const plannedServices = []

		while(plannedServices.length < getRandomInt(1, 3))
		plannedServices.push(services[getRandomInt(0, (services.length)-1)]._id)

		if(visitCheck){
			if(currentDate > plannedDateTime){
			actualDateTime = faker.date.between({ from: plannedDateTime, to: currentDate })
			visitStatus = statuses[1]
			}else {
			visitStatus = statuses[0]
			}
		}else{
			visitStatus = statuses[2]
		}

		// const sumValues = 


		const visit = {
			_id: faker.string.uuid(),
			client: clients[getRandomInt(0, (clients.length)-1)]._id,
			plannedDateTime: plannedDateTime,
			actualDateTime: actualDateTime,
			visitStatus: visitStatus,
			selectedKeys: plannedServices,
			price: calculatePriceSum(plannedServices, services)
		}	

		visits.push(visit)
	}  

	return { clients, services, visits }

}

export default genetateInfo;