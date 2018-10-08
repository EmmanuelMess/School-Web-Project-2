import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWeapon } from 'app/shared/model/weapon.model';

@Component({
    selector: 'jhi-weapon-detail',
    templateUrl: './weapon-detail.component.html'
})
export class WeaponDetailComponent implements OnInit {
    weapon: IWeapon;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ weapon }) => {
            this.weapon = weapon;
        });
    }

    previousState() {
        window.history.back();
    }
}
