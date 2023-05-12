export default interface IСreate{
    headers:{
        authorization:string
    },
    body:{
        title:string,
        description?:string,
        userId:number,
        author:string
        
    },
    files?:{
        name?
    }
}