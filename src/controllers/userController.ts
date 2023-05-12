import { ApiError } from '../errors/ApiError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/models';
import IRegistration from './Interfaces/IRegistration';
import IUser from './Interfaces/IUser';
import ICheck from './Interfaces/ICheck';


const generateJwt = (id:number, login:string) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    

    async registration(req:IRegistration, res, next) {
        const {login, password} = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный login или password'))
        }
        const candidate:IUser = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким login уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user:IUser = await User.create({login,password: hashPassword})
        const token = generateJwt(user.id, user.login)
        return res.status(200).json({token})
    }


    async login(req:IRegistration, res, next) {
        const {login, password} = req.body
        const user:IUser= await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login)
        return res.status(200).json({token})
    }


    async check(req:ICheck, res, next) {
        const token = generateJwt(req.user.id, req.user.login)
        return res.status(200).json({token})
    }
}

module.exports = new UserController()
