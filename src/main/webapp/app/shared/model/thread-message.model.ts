import { IThread } from 'app/shared/model//thread.model';

export interface IThreadMessage {
    id?: number;
    thread?: IThread;
}

export class ThreadMessage implements IThreadMessage {
    constructor(public id?: number, public thread?: IThread) {}
}
