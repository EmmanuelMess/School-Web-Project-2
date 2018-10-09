import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    weapons = Array<Weapon>(50);

    constructor(private principal: Principal, private loginModalService: LoginModalService, private eventManager: JhiEventManager) {
        for (let i = 0; i < 50; i++) {
            this.weapons[i] = new Weapon(i.toString(), 'AAAAaaaa', 'sdfasdfasdfasd');
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
}
class Weapon {
    public readonly imageUrl: String;

    constructor(imageName: String, public name: String, public description: String) {
        this.imageUrl = '../../content/images/weapons/' + imageName + '.jpg';
    }
}
