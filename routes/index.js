const Users = require('./Users');
const Auth = require('./Auth');
const Comunicacion = require('./Comunicacion');

const RouterApp = (app) => {
	app.use('/users', Users);
	app.use('/auth', Auth);
	app.use('/comunicacion', Comunicacion);
};

module.exports = RouterApp;
