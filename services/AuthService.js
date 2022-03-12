const { auth } = require('../firebase/firebase');

class AuthService {
	constructor() {
		this.auth = auth;
	}
	async CreateUser(userName, userEmail, userPassword) {
		try {
			const newUser = this.auth
				.createUser({
					email: userEmail,
					password: userPassword,
					displayName: userName,
					photoURL:
						'https://firebasestorage.googleapis.com/v0/b/api-hackunica.appspot.com/o/assets%2F200d72a18492cf3d7adac8a914ef3520.jpg?alt=media&token=abfea32c-7c2a-4890-9f6e-4f7f08e81f51',
					disabled: false,
				})
				.then((userRecord) => userRecord);
			return newUser;
		} catch (e) {
			throw new Error('No se puede crear un nuevo usuario');
		}
	}

	async DeleteUser(userId) {
		const response = await this.auth
			.deleteUser(userId)
			.then(() => {
				return true;
			})
			.catch(() => {
				throw new Error('No se pudo eliminar al usuario: ' + userId);
			});
		return response;
	}
}
module.exports = AuthService;
