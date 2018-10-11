import { IThread } from 'app/shared/model//thread.model';
import { IMessage } from 'app/shared/model//message.model';

export interface IThreadMessage {
    id?: number;
    thread?: IThread;
    message?: IMessage;
}

export class ThreadMessage implements IThreadMessage {
    constructor(public id?: number, public thread?: IThread, public message?: IMessage) {}
}
