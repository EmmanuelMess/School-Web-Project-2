/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SchoolWebProjectTestModule } from '../../../test.module';
import { WeaponUpdateComponent } from 'app/entities/weapon/weapon-update.component';
import { WeaponService } from 'app/entities/weapon/weapon.service';
import { Weapon } from 'app/shared/model/weapon.model';

describe('Component Tests', () => {
    describe('Weapon Management Update Component', () => {
        let comp: WeaponUpdateComponent;
        let fixture: ComponentFixture<WeaponUpdateComponent>;
        let service: WeaponService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SchoolWebProjectTestModule],
                declarations: [WeaponUpdateComponent]
            })
                .overrideTemplate(WeaponUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WeaponUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeaponService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Weapon(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.weapon = entity;
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
                    const entity = new Weapon();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.weapon = entity;
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
