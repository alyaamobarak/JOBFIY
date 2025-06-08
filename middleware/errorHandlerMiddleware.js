import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'Something went wrong, please try again later';
    console.error(err.stack);
    res.status(statusCode).json({ msg});
}

export default errorHandlerMiddleware;