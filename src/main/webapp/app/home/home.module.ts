import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { SchoolWebProjectSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { WeaponDialogComponent } from './weapon-dialog/weapon-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        SchoolWebProjectSharedModule,
        FlexLayoutModule,
        MatGridListModule,
        MatCardModule,
        MatDialogModule,
        RouterModule.forChild([HOME_ROUTE])
    ],
    declarations: [HomeComponent, WeaponDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [WeaponDialogComponent]
})
export class SchoolWebProjectHomeModule {}
