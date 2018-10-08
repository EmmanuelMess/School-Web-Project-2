/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { ThreadMessageUpdateComponent } from 'app/entities/thread-message/thread-message-update.component';
import { ThreadMessageService } from 'app/entities/thread-message/thread-message.service';
import { ThreadMessage } from 'app/shared/model/thread-message.model';

describe('Component Tests', () => {
    describe('ThreadMessage Management Update Component', () => {
        let comp: ThreadMessageUpdateComponent;
        let fixture: ComponentFixture<ThreadMessageUpdateComponent>;
        let service: ThreadMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [ThreadMessageUpdateComponent]
            })
                .overrideTemplate(ThreadMessageUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThreadMessageUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThreadMessageService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ThreadMessage(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.threadMessage = entity;
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
                    const entity = new ThreadMessage();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.threadMessage = entity;
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
