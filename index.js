const express = require('express');
const cors = require('cors');
const routerApp = require('./routes/index');
const { logErrors, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//Router Principal de nuestra API-Rest
routerApp(app);

//Middleware de errores
app.use(logErrors);
app.use(errorHandler);

//App Listen
app.listen(port, () => {
	console.log('My port: ' + port);
});
