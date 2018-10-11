import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORUM_ROUTE, ForumComponent } from './';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatListModule, MatChipsModule } from '@angular/material';
import { SchoolWebProjectSharedModule } from 'app/shared';
import { MessageComponent } from './message/message.component';

@NgModule({
    imports: [
        SchoolWebProjectSharedModule,
        CommonModule,
        MatCardModule,
        MatListModule,
        MatChipsModule,
        RouterModule.forChild([FORUM_ROUTE])
    ],
    declarations: [ForumComponent, MessageComponent],
    entryComponents: [MessageComponent]
})
export class SchoolWebProjectForumModule {}
