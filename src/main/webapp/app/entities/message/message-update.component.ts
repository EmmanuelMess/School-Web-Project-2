import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMessage } from 'app/shared/model/message.model';
import { MessageService } from './message.service';
import { IThreadMessage } from 'app/shared/model/thread-message.model';
import { ThreadMessageService } from 'app/entities/thread-message';

@Component({
    selector: 'jhi-message-update',
    templateUrl: './message-update.component.html'
})
export class MessageUpdateComponent implements OnInit {
    private _message: IMessage;
    isSaving: boolean;

    threadmessages: IThreadMessage[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private messageService: MessageService,
        private threadMessageService: ThreadMessageService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ message }) => {
            this.message = message;
        });
        this.threadMessageService.query({ filter: 'message-is-null' }).subscribe(
            (res: HttpResponse<IThreadMessage[]>) => {
                if (!this.message.threadMessage || !this.message.threadMessage.id) {
                    this.threadmessages = res.body;
                } else {
                    this.threadMessageService.find(this.message.threadMessage.id).subscribe(
                        (subRes: HttpResponse<IThreadMessage>) => {
                            this.threadmessages = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.message.id !== undefined) {
            this.subscribeToSaveResponse(this.messageService.update(this.message));
        } else {
            this.subscribeToSaveResponse(this.messageService.create(this.message));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMessage>>) {
        result.subscribe((res: HttpResponse<IMessage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackThreadMessageById(index: number, item: IThreadMessage) {
        return item.id;
    }
    get message() {
        return this._message;
    }

    set message(message: IMessage) {
        this._message = message;
    }
}
