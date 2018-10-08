/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { ThreadUpdateComponent } from 'app/entities/thread/thread-update.component';
import { ThreadService } from 'app/entities/thread/thread.service';
import { Thread } from 'app/shared/model/thread.model';

describe('Component Tests', () => {
    describe('Thread Management Update Component', () => {
        let comp: ThreadUpdateComponent;
        let fixture: ComponentFixture<ThreadUpdateComponent>;
        let service: ThreadService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [ThreadUpdateComponent]
            })
                .overrideTemplate(ThreadUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThreadUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThreadService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Thread(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thread = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Thread();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.thread = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
