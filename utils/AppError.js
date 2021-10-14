class AppError extends Error {
	constructor(message, statusCode, raw) {
		super(message);

		this.statusCode = statusCode;
		this.status == `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;
		this.raw = raw;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;
