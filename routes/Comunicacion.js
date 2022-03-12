const express = require('express');
const router = express.Router();
const ComunicacionService = require('../services/ComunicacionService');

const service = new ComunicacionService();
// ---------------------- Comunicacion ------------------------------

// Get all readings
router.get('/readings', async (req, res, next) => {
	try {
		const readings = await service.getAllReadings();
		res.status(200).json(readings);
	} catch (error) {
		next(error);
	}
});
// Get one reading by Id
router.get('/readings/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const reading = await service.getReadingById(id);
		res.status(200).json(reading);
	} catch (error) {
		next(error);
	}
});

// Get Videos
router.get('/videos/', async (req, res, next) => {
	try {
		const { q } = req.query;
		if (q) {
			const videos = await service.getVideosByTopic(q);
			res.status(200).json(videos);
		} else {
			const videos = await service.getVideosByTopic('Comunicacion');
			res.status(200).json(videos);
		}
	} catch (error) {
		next(error);
	}
});

// Get Videos by Topic

// Get all quizes
router.get('/quizes', async (req, res, next) => {
	try {
		const quizes = await service.res.status(200).json(quizes);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
