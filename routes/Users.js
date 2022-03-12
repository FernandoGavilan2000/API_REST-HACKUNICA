const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const service = new UserService();
// ---------------------- Users ------------------------------

// Traer toda la informacion de los usuarios (Todos los Perfiles)
router.get('/', async (req, res, next) => {
	try {
		const dataUsers = await service.getAllUsers();
		res.status(200).json(dataUsers);
	} catch (error) {
		next(error);
	}
});

// Traer Informacion de un solo Usuario by ID (Mostrar Perfil)
router.get('/:uid', async (req, res, next) => {
	try {
		const { uid } = req.params;
		const dataUser = await service.getUserById(uid);
		res.status(200).json(dataUser);
	} catch (error) {
		next(error);
	}
});

router.put('/:uid', async (req, res, next) => {
	try {
		const { uid } = req.params;
		const { userNewName, userNewEmail, userNewPassword, userNewUrl } = req.body;
		const dataUser = await service.updateProfile(uid, userNewName, userNewEmail, userNewPassword, userNewUrl);
		res.status(200).json(dataUser);
	} catch (error) {
		next(error);
	}
});

/*
router.put('/photo/:uid', async (req, res, next) => {
	try {
		const { uid } = req.params;
		const { newPhotoUrl } = req.body;
		const updatedUser = await service.updatePhotoUrl(uid, newPhotoUrl);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
});

*/

module.exports = router;
