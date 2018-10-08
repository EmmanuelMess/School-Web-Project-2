import { IThreadMessage } from 'app/shared/model//thread-message.model';

export interface IMessage {
    id?: number;
    content?: string;
    threadMessage?: IThreadMessage;
}

export class Message implements IMessage {
    constructor(public id?: number, public content?: string, public threadMessage?: IThreadMessage) {}
}
