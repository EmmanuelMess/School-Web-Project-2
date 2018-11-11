import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MessageComponent} from 'app/forum/message/message.component';
import {IThread} from 'app/shared/model/thread.model';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ThreadService} from 'app/entities/thread';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {IUser, Principal} from 'app/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ITEMS_PER_PAGE} from 'app/shared';
import {IMessage, Message} from 'app/shared/model/message.model';
import {MessageService} from 'app/entities/message';
import {NewMessageComponent} from 'app/forum/addmessage/new-message.component';
import {ThreadMessageService} from 'app/entities/thread-message';
import {IThreadMessage, ThreadMessage} from 'app/shared/model/thread-message.model';
import {WeaponService} from 'app/entities/weapon';
import {IWeapon} from 'app/shared/model/weapon.model';

@Component({
    selector: 'jhi-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['forum.scss']
})
export class ForumComponent implements OnInit {
    currentAccount: any;
    threads: ThreadWithMessages[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    private messagesToThreadMap: Map<number, number>;

    constructor(
        private dialog: MatDialog,
        private weaponService: WeaponService,
        private messageService: MessageService,
        private threadService: ThreadService,
        private threadMessageService: ThreadMessageService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.weaponService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IWeapon[]>) => this.paginateThreads(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/forum'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInThreads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThread) {
        return item.id;
    }

    registerChangeInThreads() {
        this.eventSubscriber = this.eventManager.subscribe('weaponListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateThreads(data: IWeapon[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.threads = this.addMessagesToThreads(data);
    }

    private addMessagesToThreads(weapons: IWeapon[]): ThreadWithMessages[] {
        const newThreads = weapons.map(function(value, index, array) {
            return new ThreadWithMessages(value.thread.id, value.name, []);
        }, this);

        this.messageService
            .query()
            .subscribe(
                (res: HttpResponse<IMessage[]>) => {
                    const messages = res.body;

                    if(this.messagesToThreadMap === undefined) {
                        this.threadMessageService
                            .query()
                            .subscribe(
                                (res: HttpResponse<IThreadMessage[]>) => {
                                    this.processThreadMessages(res.body);

                                    newThreads.forEach((value, index, array) => {
                                        this.addMessage(value, messages);
                                    });
                                },
                                (res: HttpErrorResponse) => this.onError(res.message)
                            );
                    } else {
                        newThreads.forEach((value, index, array) => {
                            this.addMessage(value, messages);
                        });
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        return newThreads;
    }

    private addMessage(thread: ThreadWithMessages, messages: Message[]) {
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];

            if (thread.id === this.messagesToThreadMap.get(message.id)) {
                thread.messages.push(message);
            }
        }
    }

    private processThreadMessages(threadMessages: IThreadMessage[]) {
        this.messagesToThreadMap = new Map<number, number>();
        threadMessages.forEach((value, index, array) => {
            this.messagesToThreadMap.set(value.message.id, value.thread.id);
        });
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    onChipClick(message: IMessage) {
        this.dialog.open(MessageComponent, {
            width: '75%',
            height: '75%',
            data: message
        });
    }

    onAddClick(thread: ThreadWithMessages) {
        this.dialog.open(NewMessageComponent, {
            width: '50%',
            data: thread
        }).afterClosed().subscribe(result => {
            if(result === undefined) {
                return;
            }
            thread.messages.push(result);
        });
    }
}

export class ThreadWithMessages implements IThread {
    constructor(public id?: number, public title?: string, public messages?: IMessage[]) {}
}
