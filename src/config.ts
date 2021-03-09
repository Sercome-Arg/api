var permissions = {

	createPermission: '1.1',
	deletePermission: '1.2',
	updatePermission: '1.3',
	listPermission: '1.4',

	createRol: '2.1',
	deleteRol: '2.2',
	updateRol: '2.3',
	listRol: '2.4',

	createMail: '3.1',
	deleteMail: '3.2',
	updateMail: '3.3',
	listMail: '3.4',

	createPayment: '4.1',
	deletePayment: '4.2',
	updatePayment: '4.3',
	listPayment: '4.4',

	createSubscription: '5.1',
	deleteSubscription: '5.2',
	updateSubscription: '5.3',
	listSubscription: '5.4',

	createCourse: '6.1',
	deleteCourse: '6.2',
	updateCourse: '6.3',
	listCourse: '6.4',

	createLink: '7.1',
	deleteLink: '7.2',
	updateLink: '7.3',
	listLink: '7.4',

	createFile: '8.1',
	deleteFile: '8.2',
	updateFile: '8.3',
	listFile: '8.4',

	createStudent: '9.1',
	deleteStudent: '9.2',
	updateStudent: '9.3',
	listStudent: '9.4',

	createTest: '12.1',
	deleteTest: '12.2',
	updateTest: '12.3',
	listTest: '12.4',

	createQuiz: '13.1',
	deleteQuiz: '13.2',
	updateQuiz: '13.3',
	listQuiz: '13.4',

	viewHome: '10.1',

	viewLink: '10.2',
	
	viewListCourse: '10.3',
	viewCreateCourse: '10.31',

	viewListFile: '10.4',
	viewCreateFile: '10.41',

	viewListLink: '10.5',
	viewCreateLink: '10.51',

	viewListTest: '10.6',
	viewCreateTest: '10.61',

	viewListUser: '10.7',
	viewCreateUser: '10.71',

	viewListPayment: '10.8',
	viewCreatePayment: '10.9',

	viewListQuiz: '11.10',
	viewCreateQuiz: '11.11',
	
};

export default {
	TOKEN_SECRET: process.env.JWT_SECRET || 'TESTINMO',
	LIC_PASSWORD: process.env.LIC_SECRET || 'TESTINMOLIC',
	MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/',
	CLUSTER: 'mongodb+srv://monty:some_pass@cluster0.vzota.mongodb.net',

	PERMISSIONS: permissions

};
