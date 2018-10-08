import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IWeapon } from 'app/shared/model/weapon.model';
import { WeaponService } from './weapon.service';

@Component({
    selector: 'jhi-weapon-update',
    templateUrl: './weapon-update.component.html'
})
export class WeaponUpdateComponent implements OnInit {
    private _weapon: IWeapon;
    isSaving: boolean;

    constructor(private weaponService: WeaponService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ weapon }) => {
            this.weapon = weapon;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.weapon.id !== undefined) {
            this.subscribeToSaveResponse(this.weaponService.update(this.weapon));
        } else {
            this.subscribeToSaveResponse(this.weaponService.create(this.weapon));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWeapon>>) {
        result.subscribe((res: HttpResponse<IWeapon>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get weapon() {
        return this._weapon;
    }

    set weapon(weapon: IWeapon) {
        this._weapon = weapon;
    }
}
