import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';

@Component({
    selector: 'jhi-thread-delete-dialog',
    templateUrl: './thread-delete-dialog.component.html'
})
export class ThreadDeleteDialogComponent {
    thread: IThread;

    constructor(private threadService: ThreadService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.threadService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'threadListModification',
                content: 'Deleted an thread'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thread-delete-popup',
    template: ''
})
export class ThreadDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thread }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThreadDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.thread = thread;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
