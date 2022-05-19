const express = require('express');
const router = express.Router();
const CourseService = require('../services/CourseService');

const service = new CourseService();
// ---------------------- CienciaSociales ------------------------------

// Get all readings
router.get('/readings', async (req, res, next) => {
	try {
		const readings = await service.getAllReadings('Sociales');
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

// Get all quizzes
router.get('/quizzes', async (req, res, next) => {
	try {
		const quizes = await service.getAllQuizzes('Sociales');
		res.status(200).json(quizes);
	} catch (error) {
		next(error);
	}
});

// Get one Quizz By ID
router.get('/quizzes/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const quizz = await service.getQuizzByID(id);
		res.status(200).json(quizz);
	} catch (error) {
		next(error);
	}
});

// Get Questions from Quizz ID
router.get('/quizzes/:id/questions', async (req, res, next) => {
	try {
		const { id } = req.params;
		const quizz = await service.getQuestionsFromQuizz(id);
		res.status(200).json(quizz);
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
			const videos = await service.getVideos('Ciencia Sociales Peru Temas Primaria');
			res.status(200).json(videos);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
