import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatFormFieldModule, MatInputModule } from '@angular/material';
import {IMessage, Message} from 'app/shared/model/message.model';
import {IThread} from 'app/shared/model/thread.model';
import {MessageService} from 'app/entities/message';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ThreadMessageService} from 'app/entities/thread-message';
import {IThreadMessage, ThreadMessage} from 'app/shared/model/thread-message.model';

@Component({
  selector: 'jhi-addmessage',
  templateUrl: './new-message.component.html',
  styleUrls: ['new-message.scss']
})
export class NewMessageComponent  {

    title: string;
    content: string;

    constructor(private messageService: MessageService,
                private threadMessageService: ThreadMessageService,
                public dialogRef: MatDialogRef<NewMessageComponent>,
                @Inject(MAT_DIALOG_DATA) public thread: IThread) {}

    onAcceptClick(title: string, content: string) {
        this.messageService
            .create(new Message(undefined, content, title))
            .subscribe((res: HttpResponse<IMessage>) => {
                this.threadMessageService
                    .create(new ThreadMessage(undefined, this.thread, res.body))
                    .subscribe((res: HttpResponse<IThreadMessage>) => {});

                this.dialogRef.close(res.body);
            });
    }
}
