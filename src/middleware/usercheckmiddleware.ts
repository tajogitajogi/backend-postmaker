import { ApiError } from "../errors/ApiError";
import { Posts } from "../models/models";


interface Ireq{
    body:{
        userId:number
    },
    params:{
        id:number
    }
}


module.exports = async function (req:Ireq, res, next) {

    const {userId} = req.body
    const {id} = req.params
    const check = await Posts.findOne({where:{id:id}})
        if (check.userId!==userId){

            return next(ApiError.forbidden('Не твой пост'))
        }
        next()
};
export {}
