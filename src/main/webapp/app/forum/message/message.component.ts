import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'jhi-message',
    templateUrl: './message.component.html',
    styleUrls: ['message.scss']
})
export class MessageComponent {
    constructor(public dialogRef: MatDialogRef<MessageComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {}
}
