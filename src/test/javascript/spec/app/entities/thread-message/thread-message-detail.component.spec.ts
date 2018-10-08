/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { ThreadMessageDetailComponent } from 'app/entities/thread-message/thread-message-detail.component';
import { ThreadMessage } from 'app/shared/model/thread-message.model';

describe('Component Tests', () => {
    describe('ThreadMessage Management Detail Component', () => {
        let comp: ThreadMessageDetailComponent;
        let fixture: ComponentFixture<ThreadMessageDetailComponent>;
        const route = ({ data: of({ threadMessage: new ThreadMessage(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [ThreadMessageDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ThreadMessageDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ThreadMessageDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.threadMessage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
