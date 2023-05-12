import { ApiError } from '../errors/ApiError';

module.exports = function (err:ApiError, req, res, next) {
    if (err) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}