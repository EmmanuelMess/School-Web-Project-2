import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThreadMessage } from 'app/shared/model/thread-message.model';

@Component({
    selector: 'jhi-thread-message-detail',
    templateUrl: './thread-message-detail.component.html'
})
export class ThreadMessageDetailComponent implements OnInit {
    threadMessage: IThreadMessage;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ threadMessage }) => {
            this.threadMessage = threadMessage;
        });
    }

    previousState() {
        window.history.back();
    }
}
