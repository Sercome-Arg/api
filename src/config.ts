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
	
	createBusiness: '4.1',
	deleteBusiness: '4.2',
	updateBusiness: '4.3',
	listBusiness: '4.4',

	createInstrument: '5.1',
	deleteInstrument: '5.2',
	updateInstrument: '5.3',
	listInstrument: '5.4',

	createCertificate: '6.1',
	deleteCertificate: '6.2',
	updateCertificate: '6.3',
	listCertificate: '6.4',

	createCalibration: '7.1',
	deleteCalibration: '7.2',
	updateCalibration: '7.3',
	listCalibration: '7.4',

	createArea: '8.1',
	deleteArea: '8.2',
	updateArea: '8.3',
	listArea: '8.4',

	createUnit: '9.1',
	deleteUnit: '9.2',
	updateUnit: '9.3',
	listUnit: '9.4',

	createAlert: '10.1',
	deleteAlert: '10.2',
	updateAlert: '10.3',
	listAlert: '10.4',
};

export default {
	TOKEN_SECRET: process.env.JWT_SECRET || 'TESTINMO',
	LIC_PASSWORD: process.env.LIC_SECRET || 'TESTINMOLIC',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/',
	CLUSTER: 'mongodb+srv://monty:some_pass@cluster0.vzota.mongodb.net',

	PERMISSIONS: permissions

};
