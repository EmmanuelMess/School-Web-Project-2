import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { JhiLoginModalComponent } from 'app/shared/login/login.component';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
    private isOpen = false;
    constructor(private modalService: NgbModal) {}

    open(callback?: () => void): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(JhiLoginModalComponent);
        modalRef.result.then(
            result => {
                if(callback != null) {
                    callback();
                }
                this.isOpen = false;
            },
            reason => {
                if(callback != null) {
                    callback();
                }
                this.isOpen = false;
            }
        );
        return modalRef;
    }
}
