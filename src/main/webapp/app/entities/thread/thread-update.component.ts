import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';

@Component({
    selector: 'jhi-thread-update',
    templateUrl: './thread-update.component.html'
})
export class ThreadUpdateComponent implements OnInit {
    private _thread: IThread;
    isSaving: boolean;

    constructor(private threadService: ThreadService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thread }) => {
            this.thread = thread;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.thread.id !== undefined) {
            this.subscribeToSaveResponse(this.threadService.update(this.thread));
        } else {
            this.subscribeToSaveResponse(this.threadService.create(this.thread));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IThread>>) {
        result.subscribe((res: HttpResponse<IThread>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get thread() {
        return this._thread;
    }

    set thread(thread: IThread) {
        this._thread = thread;
    }
}
