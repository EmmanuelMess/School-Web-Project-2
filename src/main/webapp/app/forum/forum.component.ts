import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageComponent } from 'app/forum/message/message.component';
import { IThread, Thread } from 'app/shared/model/thread.model';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ThreadService } from 'app/entities/thread';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { IUser, Principal } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IMessage } from 'app/shared/model/message.model';

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

    constructor(
        private dialog: MatDialog,
        private threadService: ThreadService,
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
        this.threadService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IThread[]>) => this.paginateThreads(res.body, res.headers),
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
        this.router.navigate(['/thread'], {
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
        this.eventSubscriber = this.eventManager.subscribe('threadListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateThreads(data: IThread[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.threads = this.addMessagesToThreads(data);
    }

    private addMessagesToThreads(threads: IThread[]): ThreadWithMessages[] {
        return threads.map(function(value, index, array) {
            return new ThreadWithMessages(value.id, value.title, value.user, []);
        });
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    onChipClick() {
        this.dialog.open(MessageComponent, {
            width: '75%',
            height: '75%',
            data: 0
        });
    }
}

export class ThreadWithMessages implements IThread {
    constructor(public id?: number, public title?: string, public user?: IUser, public messages?: IMessage[]) {}
}
