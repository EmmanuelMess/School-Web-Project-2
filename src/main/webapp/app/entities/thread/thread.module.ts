import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolWebProjectSharedModule } from 'app/shared';
import { SchoolWebProjectAdminModule } from 'app/admin/admin.module';
import {
    ThreadComponent,
    ThreadDetailComponent,
    ThreadUpdateComponent,
    ThreadDeletePopupComponent,
    ThreadDeleteDialogComponent,
    threadRoute,
    threadPopupRoute
} from './';

const ENTITY_STATES = [...threadRoute, ...threadPopupRoute];

@NgModule({
    imports: [SchoolWebProjectSharedModule, SchoolWebProjectAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ThreadComponent, ThreadDetailComponent, ThreadUpdateComponent, ThreadDeleteDialogComponent, ThreadDeletePopupComponent],
    entryComponents: [ThreadComponent, ThreadUpdateComponent, ThreadDeleteDialogComponent, ThreadDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolWebProjectThreadModule {}
