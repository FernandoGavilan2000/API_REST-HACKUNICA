const { auth } = require('../firebase/firebase');

class UserService {
	constructor() {
		this.auth = auth;
	}

	async getAllUsers() {
		let dataUsers = [];
		//Maximo usuarios a listar 1000
		const listAllUsers = async (nextPageToken) => {
			const response = await this.auth
				.listUsers(1000, nextPageToken)
				.then((listUsersResult) => {
					listUsersResult.users.forEach((userRecord) => {
						dataUsers.push(this.cleanRecord(userRecord));
					});
					return dataUsers;
				})
				.catch((error) => {
					throw new Error('Error al listar a todos los usuarios');
				});
			return response;
		};
		const users = await listAllUsers();
		return users;
	}

	cleanRecord(userRecord) {
		const { email, displayName, photoURL, metadata } = userRecord.toJSON();
		const userData = {
			userEmail: email || '',
			userName: displayName || '',
			userPhoto: photoURL || '',
			userLastLogin: metadata.lastSignInTime || 'Sin Registro',
			userDateCreated: metadata.creationTime || 'Sin Registro',
		};
		return userData;
	}

	async getUserById(userId) {
		const data = await this.auth
			.getUser(userId)
			.then((userRecord) => {
				const userData = this.cleanRecord(userRecord);
				return userData;
			})
			.catch((error) => {
				throw new Error('Error al conseguir la info del usuario: ' + userId);
			});
		return data;
	}

	async updateProfile(userId, userNewName, userNewEmail, userNewPassword, userNewUrl) {
		const updatedUser = await this.auth
			.updateUser(userId, {
				email: userNewEmail || '',
				password: userNewPassword || '',
				displayName: userNewName || '',
				photoURL: userNewUrl || '',
			})
			.then((userRecord) => this.cleanRecord(userRecord))
			.catch((error) => {
				console.log(error);
				throw new Error('Error: ' + error.errorInfo.message);
			});
		return updatedUser;
	}

	/*
	async updatePhotoUrl(userId, newURL) {
		const updatedUser = await this.auth
			.updateUser(userId, {
				photoURL: newURL,
			})
			.then((userRecord) => this.cleanRecord(userRecord))
			.catch((error) => {
				throw new Error('Error al actualizar photoUrl de: ' + userId);
			});
		return updatedUser;
	}

	*/
}
module.exports = UserService;
