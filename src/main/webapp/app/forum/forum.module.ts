import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORUM_ROUTE, ForumComponent } from './';
import { RouterModule } from '@angular/router';
import {
    MatCardModule,
    MatListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
} from '@angular/material';
import { SchoolWebProjectSharedModule } from 'app/shared';
import { MessageComponent } from './message/message.component';
import { NewMessageComponent } from './addmessage/new-message.component';

@NgModule({
    imports: [
        SchoolWebProjectSharedModule,
        CommonModule,
        MatDialogModule,
        MatCardModule,
        MatListModule,
        MatChipsModule,
        MatInputModule,
        MatFormFieldModule,
        RouterModule.forChild([FORUM_ROUTE])
    ],
    declarations: [ForumComponent, MessageComponent, NewMessageComponent],
    entryComponents: [MessageComponent, NewMessageComponent]
})
export class SchoolWebProjectForumModule {}
