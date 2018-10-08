import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThreadMessage } from 'app/shared/model/thread-message.model';
import { ThreadMessageService } from './thread-message.service';
import { ThreadMessageComponent } from './thread-message.component';
import { ThreadMessageDetailComponent } from './thread-message-detail.component';
import { ThreadMessageUpdateComponent } from './thread-message-update.component';
import { ThreadMessageDeletePopupComponent } from './thread-message-delete-dialog.component';
import { IThreadMessage } from 'app/shared/model/thread-message.model';

@Injectable({ providedIn: 'root' })
export class ThreadMessageResolve implements Resolve<IThreadMessage> {
    constructor(private service: ThreadMessageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((threadMessage: HttpResponse<ThreadMessage>) => threadMessage.body));
        }
        return of(new ThreadMessage());
    }
}

export const threadMessageRoute: Routes = [
    {
        path: 'thread-message',
        component: ThreadMessageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThreadMessages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thread-message/:id/view',
        component: ThreadMessageDetailComponent,
        resolve: {
            threadMessage: ThreadMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThreadMessages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thread-message/new',
        component: ThreadMessageUpdateComponent,
        resolve: {
            threadMessage: ThreadMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThreadMessages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thread-message/:id/edit',
        component: ThreadMessageUpdateComponent,
        resolve: {
            threadMessage: ThreadMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThreadMessages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const threadMessagePopupRoute: Routes = [
    {
        path: 'thread-message/:id/delete',
        component: ThreadMessageDeletePopupComponent,
        resolve: {
            threadMessage: ThreadMessageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThreadMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
