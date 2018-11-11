/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { ThreadDeleteDialogComponent } from 'app/entities/thread/thread-delete-dialog.component';
import { ThreadService } from 'app/entities/thread/thread.service';

describe('Component Tests', () => {
    describe('Thread Management Delete Component', () => {
        let comp: ThreadDeleteDialogComponent;
        let fixture: ComponentFixture<ThreadDeleteDialogComponent>;
        let service: ThreadService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [ThreadDeleteDialogComponent]
            })
                .overrideTemplate(ThreadDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThreadDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThreadService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
