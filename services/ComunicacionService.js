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
}
module.exports = ComunicacionService;
