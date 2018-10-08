/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { ThreadMessageComponent } from 'app/entities/thread-message/thread-message.component';
import { ThreadMessageService } from 'app/entities/thread-message/thread-message.service';
import { ThreadMessage } from 'app/shared/model/thread-message.model';

describe('Component Tests', () => {
    describe('ThreadMessage Management Component', () => {
        let comp: ThreadMessageComponent;
        let fixture: ComponentFixture<ThreadMessageComponent>;
        let service: ThreadMessageService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [ThreadMessageComponent],
                providers: []
            })
                .overrideTemplate(ThreadMessageComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ThreadMessageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThreadMessageService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ThreadMessage(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.threadMessages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
