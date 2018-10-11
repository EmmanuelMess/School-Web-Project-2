import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMessage } from 'app/shared/model/message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'jhi-message-update',
    templateUrl: './message-update.component.html'
})
export class MessageUpdateComponent implements OnInit {
    private _message: IMessage;
    isSaving: boolean;

    constructor(private messageService: MessageService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ message }) => {
            this.message = message;
        });
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
    get message() {
        return this._message;
    }

    set message(message: IMessage) {
        this._message = message;
    }
}
