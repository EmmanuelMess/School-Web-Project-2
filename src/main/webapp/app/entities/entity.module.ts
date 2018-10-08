import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SchoolWebProjectWeaponModule } from './weapon/weapon.module';
import { SchoolWebProjectThreadModule } from './thread/thread.module';
import { SchoolWebProjectMessageModule } from './message/message.module';
import { SchoolWebProjectThreadMessageModule } from './thread-message/thread-message.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SchoolWebProjectWeaponModule,
        SchoolWebProjectThreadModule,
        SchoolWebProjectMessageModule,
        SchoolWebProjectThreadMessageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolWebProjectEntityModule {}
