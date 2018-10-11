export interface IMessage {
    id?: number;
    content?: string;
    name?: string;
}

export class Message implements IMessage {
    constructor(public id?: number, public content?: string, public name?: string) {}
}
