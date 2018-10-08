import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThreadMessage } from 'app/shared/model/thread-message.model';
import { ThreadMessageService } from './thread-message.service';

@Component({
    selector: 'jhi-thread-message-delete-dialog',
    templateUrl: './thread-message-delete-dialog.component.html'
})
export class ThreadMessageDeleteDialogComponent {
    threadMessage: IThreadMessage;

    constructor(
        private threadMessageService: ThreadMessageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.threadMessageService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'threadMessageListModification',
                content: 'Deleted an threadMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thread-message-delete-popup',
    template: ''
})
export class ThreadMessageDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ threadMessage }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThreadMessageDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.threadMessage = threadMessage;
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
