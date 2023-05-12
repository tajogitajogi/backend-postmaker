import Idecode from "../controllers/Interfaces/IDecode";


const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {

    const token:string = req.headers.authorization.split(' ')[1]
    const decoded:Idecode = jwt.verify(token, process.env.SECRET_KEY)
    req.body.author = decoded.login
    next()

};
export {}
