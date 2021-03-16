var permissions = {

	listPermission: '1.4',

	createRol: '2.1',
	deleteRol: '2.2',
	updateRol: '2.3',
	listRol: '2.4',

	createLink: '3.1',
	deleteLink: '3.2',
	updateLink: '3.3',
	listLink: '3.4',

	viewHome: '10.1',
	viewAgenda: '10.2',
	viewOneSanofi: '10.3',
	viewGenMed: '10.4',
	viewPasteur: '10.5',
	viewSpecialtyCare: '10.6',
	
};

export default {
	TOKEN_SECRET: process.env.JWT_SECRET || 'TESTINMO',
	LIC_PASSWORD: process.env.LIC_SECRET || 'TESTINMOLIC',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/',
	CLUSTER: 'mongodb+srv://monty:some_pass@cluster0.vzota.mongodb.net',

	PERMISSIONS: permissions

};
