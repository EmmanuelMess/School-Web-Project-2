import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolWebProjectSharedModule } from 'app/shared';
import {
    ThreadMessageComponent,
    ThreadMessageDetailComponent,
    ThreadMessageUpdateComponent,
    ThreadMessageDeletePopupComponent,
    ThreadMessageDeleteDialogComponent,
    threadMessageRoute,
    threadMessagePopupRoute
} from './';

const ENTITY_STATES = [...threadMessageRoute, ...threadMessagePopupRoute];

@NgModule({
    imports: [SchoolWebProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThreadMessageComponent,
        ThreadMessageDetailComponent,
        ThreadMessageUpdateComponent,
        ThreadMessageDeleteDialogComponent,
        ThreadMessageDeletePopupComponent
    ],
    entryComponents: [
        ThreadMessageComponent,
        ThreadMessageUpdateComponent,
        ThreadMessageDeleteDialogComponent,
        ThreadMessageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolWebProjectThreadMessageModule {}
