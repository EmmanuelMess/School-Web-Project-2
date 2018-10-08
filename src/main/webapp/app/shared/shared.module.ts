import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { SchoolWebProjectSharedLibsModule, SchoolWebProjectSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [SchoolWebProjectSharedLibsModule, SchoolWebProjectSharedCommonModule, MatToolbarModule, BrowserAnimationsModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [SchoolWebProjectSharedCommonModule, MatToolbarModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolWebProjectSharedModule {}
