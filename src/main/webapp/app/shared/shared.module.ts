import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { SchoolWebProjectSharedLibsModule, SchoolWebProjectSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

import { MatButtonModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        SchoolWebProjectSharedLibsModule,
        SchoolWebProjectSharedCommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule
    ],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        SchoolWebProjectSharedCommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolWebProjectSharedModule {}
