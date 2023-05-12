export default interface IUpdate{
    params:{
        id:number
    }
    body:{
        title:string,
        description?:string,
    }
    files?:{
        name?
    }
}