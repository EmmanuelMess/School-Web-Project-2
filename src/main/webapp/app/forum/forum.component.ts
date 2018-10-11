import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageComponent } from 'app/forum/message/message.component';

@Component({
    selector: 'jhi-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['forum.scss']
})
export class ForumComponent {
    weapons = Array<Thread>(50);

    constructor(private dialog: MatDialog) {
        for (let i = 0; i < 50; i++) {
            this.weapons[i] = new Thread(i.toString(), 'Rithmio', 'At Rithmio I...');
        }
    }

    onChipClick() {
        this.dialog.open(MessageComponent, {
            width: '75%',
            height: '75%',
            data: 0
        });
    }
}

class Thread {
    public readonly imageUrl: String;

    constructor(imageName: String, public name: String, public description: String) {
        this.imageUrl = '../../content/images/weapons/' + imageName + '.jpg';
    }
}
