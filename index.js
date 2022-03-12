const express = require('express');
const routerApp = require('./routes/index');
const { logErrors, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

//Router Principal de nuestra API-Rest
routerApp(app);

//Middleware de errores
app.use(logErrors);
app.use(errorHandler);

//App Listen
app.listen(port, () => {
	console.log('My port: ' + port);
});
