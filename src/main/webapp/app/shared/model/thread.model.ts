export interface IThread {
    id?: number;
}

export class Thread implements IThread {
    constructor(public id?: number) {}
}
