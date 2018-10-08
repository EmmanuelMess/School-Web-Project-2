/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { ThreadMessageDeleteDialogComponent } from 'app/entities/thread-message/thread-message-delete-dialog.component';
import { ThreadMessageService } from 'app/entities/thread-message/thread-message.service';

describe('Component Tests', () => {
    describe('ThreadMessage Management Delete Component', () => {
        let comp: ThreadMessageDeleteDialogComponent;
        let fixture: ComponentFixture<ThreadMessageDeleteDialogComponent>;
        let service: ThreadMessageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [ThreadMessageDeleteDialogComponent]
            })
                .overrideTemplate(ThreadMessageDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThreadMessageDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThreadMessageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
