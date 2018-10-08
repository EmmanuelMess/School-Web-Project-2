import { IUser } from 'app/core/user/user.model';

export interface IThread {
    id?: number;
    title?: string;
    content?: string;
    user?: IUser;
}

export class Thread implements IThread {
    constructor(public id?: number, public title?: string, public content?: string, public user?: IUser) {}
}
