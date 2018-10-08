import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThread } from 'app/shared/model/thread.model';

@Component({
    selector: 'jhi-thread-detail',
    templateUrl: './thread-detail.component.html'
})
export class ThreadDetailComponent implements OnInit {
    thread: IThread;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thread }) => {
            this.thread = thread;
        });
    }

    previousState() {
        window.history.back();
    }
}
