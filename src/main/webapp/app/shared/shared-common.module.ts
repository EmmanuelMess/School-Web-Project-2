import { NgModule } from '@angular/core';

import { SchoolWebProjectSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SchoolWebProjectSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SchoolWebProjectSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SchoolWebProjectSharedCommonModule {}
