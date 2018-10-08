/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { WeaponDeleteDialogComponent } from 'app/entities/weapon/weapon-delete-dialog.component';
import { WeaponService } from 'app/entities/weapon/weapon.service';

describe('Component Tests', () => {
    describe('Weapon Management Delete Component', () => {
        let comp: WeaponDeleteDialogComponent;
        let fixture: ComponentFixture<WeaponDeleteDialogComponent>;
        let service: WeaponService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [WeaponDeleteDialogComponent]
            })
                .overrideTemplate(WeaponDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WeaponDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeaponService);
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
