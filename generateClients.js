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

	const clients = Array.from({ length: getRandomInt(10, 50) }).map(() => {
		return {
		_id: faker.string.uuid(),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		middleName: faker.person.middleName(),
		dateOfBirth: faker.date.past(60, new Date(2005, 0, 1)).toISOString().split('T')[0],
		phoneNumber: faker.phone.number({ style: 'national' })
	  }});

	const services = Array.from({length: getRandomInt(5, 10)}).map(() => {
		const serviceName = serviceNames[Math.floor(Math.random() * serviceNames.length)]
		return {
			_id: faker.string.uuid(),
			name: serviceName,
			code: faker.string.alphanumeric(10),
			price: serviceTable[serviceName],
			description: faker.commerce.productDescription()
			}	
	})


	const visits = Array.from({length: getRandomInt(10, 100)}).map(() => {
		const plannedDateTime = faker.date.between({ from: faker.date.recent(), to: faker.date.soon() })
		const visitCheck = Math.random() < 0.5
		const currentDate = new Date();
		
		const plannedServices = Array.from({ length: getRandomInt(1, 3) }).map(() =>
		services[getRandomInt(0, services.length - 1)]._id
	);

		const visitStatus = visitCheck ? (currentDate > plannedDateTime ? statuses[1] : statuses[0]) : statuses[2];

		const actualDateTime = visitCheck && currentDate > plannedDateTime 
		? faker.date.between({ from: plannedDateTime, to: currentDate })
		: '';


		return {
			_id: faker.string.uuid(),
			client: clients[getRandomInt(0, (clients.length)-1)]._id,
			plannedDateTime: plannedDateTime,
			actualDateTime: actualDateTime,
			visitStatus: visitStatus,
			selectedKeys: plannedServices,
			price: calculatePriceSum(plannedServices, services)
		}	
	}) 

	return { clients, services, visits }

}

export default genetateInfo;