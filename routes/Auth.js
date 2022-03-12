const express = require('express');
//const auth = require('../firebase/firebase');
const router = express.Router();
const AuthService = require('../services/AuthService');

const service = new AuthService();

// ---------------------- Auth ------------------------------

// Registrar nuevo usuario
router.post('/register', async (req, res, next) => {
	try {
		const { userName, userEmail, userPassword } = req.body;
		const userRecord = await service.CreateUser(userName, userEmail, userPassword);
		res.status(200).json({
			Estado: 'Usuario Registrado Correctamente',
			ID_Usuario: userRecord.uid,
			Email_Usuario: userRecord.email,
		});
	} catch (error) {
		next(error);
	}
});

// Eliminar usuario
router.delete('/delete/:uid', async (req, res, next) => {
	try {
		const { uid } = req.params;
		const response = await service.DeleteUser(uid);
		if (response) {
			res.status(200).json({
				Estado: 'Usuario ' + uid + ' Eliminado',
			});
		}
	} catch (error) {
		next(error);
	}
});

//Hacer Login
//No se permite en el Backend, se debe hacer login desde el lado del cliente(flutter)
router.get('/login', (req, res) => {
	res.status(405).send('Esta ruta no esta disponible');
});

module.exports = router;
