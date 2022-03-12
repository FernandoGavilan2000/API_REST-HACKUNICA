function logErrors(err, req, res, next) {
	console.error(err.message);
	console.error(err.stack);
	next(err);
}

function errorHandler(err, req, res, next) {
	res.status(500).json({
		message: err.message,
	});
}
module.exports = { logErrors, errorHandler };
