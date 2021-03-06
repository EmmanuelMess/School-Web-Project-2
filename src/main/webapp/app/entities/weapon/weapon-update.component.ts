import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWeapon } from 'app/shared/model/weapon.model';
import { WeaponService } from './weapon.service';
import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from 'app/entities/thread';

@Component({
    selector: 'jhi-weapon-update',
    templateUrl: './weapon-update.component.html'
})
export class WeaponUpdateComponent implements OnInit {
    private _weapon: IWeapon;
    isSaving: boolean;

    threads: IThread[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private weaponService: WeaponService,
        private threadService: ThreadService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ weapon }) => {
            this.weapon = weapon;
        });
        this.threadService.query().subscribe(
            (res: HttpResponse<IThread[]>) => {
                this.threads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackThreadById(index: number, item: IThread) {
        return item.id;
    }
    get weapon() {
        return this._weapon;
    }

    set weapon(weapon: IWeapon) {
        this._weapon = weapon;
    }
}
