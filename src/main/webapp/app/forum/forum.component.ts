import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['forum.scss']
})
export class ForumComponent implements OnInit {
    weapons = Array<Weapon>(50);

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.weapons[i] = new Weapon(i.toString(), 'Rithmio', 'At Rithmio I...');
        }
    }

    ngOnInit() {}
}

class Weapon {
    public readonly imageUrl: String;

    constructor(imageName: String, public name: String, public description: String) {
        this.imageUrl = '../../content/images/weapons/' + imageName + '.jpg';
    }
}
