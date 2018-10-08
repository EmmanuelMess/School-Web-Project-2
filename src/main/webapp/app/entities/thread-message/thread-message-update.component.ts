import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IThreadMessage } from 'app/shared/model/thread-message.model';
import { ThreadMessageService } from './thread-message.service';
import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from 'app/entities/thread';

@Component({
    selector: 'jhi-thread-message-update',
    templateUrl: './thread-message-update.component.html'
})
export class ThreadMessageUpdateComponent implements OnInit {
    private _threadMessage: IThreadMessage;
    isSaving: boolean;

    threads: IThread[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private threadMessageService: ThreadMessageService,
        private threadService: ThreadService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ threadMessage }) => {
            this.threadMessage = threadMessage;
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
        if (this.threadMessage.id !== undefined) {
            this.subscribeToSaveResponse(this.threadMessageService.update(this.threadMessage));
        } else {
            this.subscribeToSaveResponse(this.threadMessageService.create(this.threadMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThreadMessage>>) {
        result.subscribe((res: HttpResponse<IThreadMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get threadMessage() {
        return this._threadMessage;
    }

    set threadMessage(threadMessage: IThreadMessage) {
        this._threadMessage = threadMessage;
    }
}
