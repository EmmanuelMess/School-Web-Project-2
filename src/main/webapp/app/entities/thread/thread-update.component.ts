import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-thread-update',
    templateUrl: './thread-update.component.html'
})
export class ThreadUpdateComponent implements OnInit {
    private _thread: IThread;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private threadService: ThreadService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thread }) => {
            this.thread = thread;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get thread() {
        return this._thread;
    }

    set thread(thread: IThread) {
        this._thread = thread;
    }
}
