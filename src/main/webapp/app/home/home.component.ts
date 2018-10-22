import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import { LoginModalService, Principal, Account } from 'app/core';
import { WeaponDialogComponent } from 'app/home/weapon-dialog/weapon-dialog.component';
import { MatDialog, MatGridList } from '@angular/material';
import {IWeapon} from 'app/shared/model/weapon.model';
import {Subscription} from 'rxjs';
import {WeaponService} from 'app/entities/weapon';
import {ITEMS_PER_PAGE} from 'app/shared';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {IThread} from 'app/shared/model/thread.model';

const COLUMNS_BY_SIZE = { xl: 8, lg: 6, md: 5, sm: 3, xs: 1 };

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {
    @ViewChild('grid') grid: MatGridList;
    account: Account;
    modalRef: NgbModalRef;
    weapons: WeaponWithUrl[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private principal: Principal,
        private weaponService: WeaponService,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private observableMedia: ObservableMedia,
        private dialog: MatDialog
    ) {
        this.weapons = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWeapons();
    }

    ngAfterContentInit() {
        this.observableMedia.subscribe((change: MediaChange) => {
            this.grid.cols = COLUMNS_BY_SIZE[change.mqAlias];
        });
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

    onCardButtonClicked(weapon: WeaponWithUrl) {
        const dialogRef = this.dialog.open(WeaponDialogComponent, {
            data: weapon
        });
    }

    loadAll() {
        this.weaponService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IWeapon[]>) => this.paginateWeapons(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    reset() {
        this.page = 0;
        this.weapons = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWeapon) {
        return item.id;
    }

    registerChangeInWeapons() {
        this.eventSubscriber = this.eventManager.subscribe('weaponListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateWeapons(data: IWeapon[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            let w = new WeaponWithUrl(data[i].id, data[i].name, data[i].description, data[i].imageName, data[i].thread,
                '../../content/images/weapons/' + data[i].imageName + '.jpg');
            this.weapons.push(w);
        }
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

class WeaponWithUrl implements IWeapon {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public imageName?: string,
        public thread?: IThread,
        public imageUrl?: string
    ) {}
}
