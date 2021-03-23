var permissions = {

	listPermission: '1.4',

	createRol: '2.1',
	deleteRol: '2.2',
	updateRol: '2.3',
	listRol: '2.4',

	createMagnitude: '3.1',
	deleteMagnitude: '3.2',
	updateMagnitude: '3.3',
	listMagnitude: '3.4',

	createInstrument: '4.1',
	deleteInstrument: '4.2',
	updateInstrument: '4.3',
	listInstrument: '4.4',
	
};

export default {
	TOKEN_SECRET: process.env.JWT_SECRET || 'TESTINMO',
	LIC_PASSWORD: process.env.LIC_SECRET || 'TESTINMOLIC',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/',
	CLUSTER: 'mongodb+srv://monty:some_pass@cluster0.vzota.mongodb.net',

	PERMISSIONS: permissions

};
