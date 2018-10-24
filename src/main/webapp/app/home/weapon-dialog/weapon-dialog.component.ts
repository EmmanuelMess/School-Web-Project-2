import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Weapon } from 'app/shared/model/weapon.model';

@Component({
    selector: 'jhi-weapon-dialog',
    templateUrl: './weapon-dialog.component.html',
    styleUrls: ['./weapon-dialog.scss']
})
export class WeaponDialogComponent {
    constructor(public dialogRef: MatDialogRef<WeaponDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Weapon) {}
}
