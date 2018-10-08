import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThreadMessage } from 'app/shared/model/thread-message.model';
import { Principal } from 'app/core';
import { ThreadMessageService } from './thread-message.service';

@Component({
    selector: 'jhi-thread-message',
    templateUrl: './thread-message.component.html'
})
export class ThreadMessageComponent implements OnInit, OnDestroy {
    threadMessages: IThreadMessage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private threadMessageService: ThreadMessageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.threadMessageService.query().subscribe(
            (res: HttpResponse<IThreadMessage[]>) => {
                this.threadMessages = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInThreadMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThreadMessage) {
        return item.id;
    }

    registerChangeInThreadMessages() {
        this.eventSubscriber = this.eventManager.subscribe('threadMessageListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
