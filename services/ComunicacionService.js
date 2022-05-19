require('dotenv').config();
const { db } = require('../firebase/firebase');
const axios = require('axios');
class ComunicacionService {
	constructor() {}

	async getReadingById(idReading) {
		const readings = await this.getAllReadings();
		const reading = readings.find(({ id }) => idReading == id);
		if (reading) {
			return reading;
		}
	}

	async getVideosByTopic(topic) {
		const baseApiUrl = 'https://www.googleapis.com/youtube/v3';
		const url = `${baseApiUrl}/search?key=${process.env.APIKEY_YOUTUBE}&type=video&part=snippet&q=${topic}`;
		const response = await axios.get(url);
		const results = response.data.items.map((item) => ({
			url: `https://youtu.be/${item.id.videoId}`,
			titulo: item.snippet.title,
			desc: item.snippet.description,
			imagen: item.snippet.thumbnails.medium.url,
		}));
		return results;
	}

	async getAllReadings() {
		const querySnapshot = await db.collection('Readings').where('categoria', '==', 'Comunicacion').get();
		if (querySnapshot.empty) {
			throw new Error('No hay readings de Comunicacion');
		}

		let dataCollection = [];
		dataCollection = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			titulo: doc.data().titulo,
			contenido: doc.data().contenido,
			imagen: doc.data().imagen,
		}));
		return dataCollection;
	}

	async getAllQuizzes() {
		const querySnapshot = await db.collection('Quizzes').where('categoria', '==', 'Comunicacion').get();
		if (querySnapshot.empty) {
			throw new Error('No hay quizes de Comunicacion');
		}
		let dataCollection = [];
		dataCollection = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			titulo: doc.data().title,
			about: doc.data().about,
		}));
		return dataCollection;
	}

	async getQuizzByID(id_doc) {
		const quizzRef = await db.collection('Quizzes').doc(id_doc);
		const doc = await quizzRef.get();
		if (!doc.exists) {
			throw new Error('No existe el quizz');
		} else {
			let data = {
				id: doc.id,
				titulo: doc.data().title,
				about: doc.data().about,
				categoria: doc.data().categoria,
			};
			return data;
		}
	}
	async getQuestionsFromQuizz(id_quizz) {
		const QuizzesRef = db.collection('Quizzes');
		const querySnapshot = await QuizzesRef.doc(id_quizz).collection('questions').get();
		if (querySnapshot.empty) {
			throw new Error('El quizz no tiene preguntas');
		}
		let questions = [];
		questions = querySnapshot.docs.map((doc) => ({
			titulo: doc.data().title,
			options: doc.data().options,
			index: doc.data().index,
		}));
		return questions;
	}
}
module.exports = ComunicacionService;
