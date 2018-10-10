import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { WeaponDialogComponent } from 'app/home/weapon-dialog/weapon-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    weapons = Array<Weapon>(50);

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private dialog: MatDialog
    ) {
        for (let i = 0; i < 50; i++) {
            this.weapons[i] = new Weapon(i.toString(), 'Rithmio', 'At Rithmio I...');
        }
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    onCardButtonClicked(weapon: Weapon) {
        const dialogRef = this.dialog.open(WeaponDialogComponent, {
            data: weapon
        });
    }
}

class Weapon {
    public readonly imageUrl: String;

    constructor(imageName: String, public name: String, public description: String) {
        this.imageUrl = '../../content/images/weapons/' + imageName + '.jpg';
    }
}
