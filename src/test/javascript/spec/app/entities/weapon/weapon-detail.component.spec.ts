/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { WeaponDetailComponent } from 'app/entities/weapon/weapon-detail.component';
import { Weapon } from 'app/shared/model/weapon.model';

describe('Component Tests', () => {
    describe('Weapon Management Detail Component', () => {
        let comp: WeaponDetailComponent;
        let fixture: ComponentFixture<WeaponDetailComponent>;
        const route = ({ data: of({ weapon: new Weapon(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [WeaponDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WeaponDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WeaponDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.weapon).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
