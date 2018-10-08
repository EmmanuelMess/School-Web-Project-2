import { IThread } from 'app/shared/model//thread.model';

export interface IWeapon {
    id?: number;
    name?: string;
    description?: string;
    imageName?: string;
    thread?: IThread;
}

export class Weapon implements IWeapon {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public imageName?: string,
        public thread?: IThread
    ) {}
}
