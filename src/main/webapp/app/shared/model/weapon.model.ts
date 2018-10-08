export interface IWeapon {
    id?: number;
    name?: string;
    description?: string;
    imageName?: string;
}

export class Weapon implements IWeapon {
    constructor(public id?: number, public name?: string, public description?: string, public imageName?: string) {}
}
