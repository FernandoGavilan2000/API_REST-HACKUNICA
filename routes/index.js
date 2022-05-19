const Users = require('./Users');
const Auth = require('./Auth');
const Comunicacion = require('./Comunicacion');
const Ingles = require('./Ingles');
const CienciaSociales = require('./CienciasSociales');
const Matematicas = require('./Matematicas');
const RouterApp = (app) => {
	app.use('/users', Users);
	app.use('/auth', Auth);
	app.use('/comunicacion', Comunicacion);
	app.use('/ingles', Ingles);
	app.use('/sociales', CienciaSociales);
	app.use('/matematicas', Matematicas);
};

module.exports = RouterApp;
