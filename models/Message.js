export default class Message {
    result: any;
    message: string;

    constructor(result = undefined, message = '') {
        this.result = result;
        this.message = message;
    }
}