import { ApiError } from '../errors/ApiError';
import {Posts} from '../models/models';
import { MyResponse } from '../response/Response';
import IСreate from './Interfaces/ICreate';
import IDelete from './Interfaces/IDelete';
import IGet from './Interfaces/IGet';
import IPost from './Interfaces/IPost';
import IUpdate from './Interfaces/IUpdate';

const path = require('path')
const uuid = require('uuid')


class PostController {
    async create (req:IСreate,res,next){
        const {title,userId,author} = req.body
        let {description} = req.body
        let namefile:string = null 
        try{
            const img = req.files.name
            let fileName = uuid.v4()+'.jpg'
            namefile=fileName
            img.mv(path.resolve(__dirname,'..','static',fileName)) 
        }catch(e){}
         
        if (!title && !description ) {
            return next(ApiError.badRequest('Некорректныe вводимые данные'))
        }
        if (description === ''){
            description = null
        }
        const post:IPost = await Posts.create({title,description,userId,img:namefile,author})
        return next(MyResponse.created(String(post.id)))
    }


    async update (req:IUpdate,res,next){
        const {title, description} = req.body
        const {id} = req.params
        let namefile:string = null 
        try{
            const img = req.files.name
            let fileName = uuid.v4()+'.jpg'
            namefile=fileName
            img.mv(path.resolve(__dirname,'..','static',fileName)) 
        }catch(e){}
        if (!title && !description) {
            return next(ApiError.badRequest('Некорректныe вводимые данные'))
        }
        
        const post:IPost = await Posts.update({ title: title, description:description, img:namefile }, { where:{ id : id }})
        return next(MyResponse.okey('Updated'))
    }
    

    async delete (req:IDelete,res,next){
        const {id} = req.params
        const post:IPost = await Posts.destroy({ where:{ id : id }})
        return next(MyResponse.okey('Deleted'))
    }
    
    async getpost (req:IGet,res){
        const {offset}=req.params
        
        const posts:IPost[] =await Posts.findAll({
            limit:20,
            offset:offset})
        return res.status(200).json({posts})
    }
    

}

module.exports = new PostController()
