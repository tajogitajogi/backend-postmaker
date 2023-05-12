export class MyResponse extends Error{

    status: number;
    message:string
    constructor(status:number, message:string) {
        super();
        this.status = status
        this.message = message
    }

    static created(message:string) {
        return new MyResponse(201, message)
    }

    static okey(message:string) {
        return new MyResponse(200, message)
    }

}
