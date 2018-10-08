import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Thread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';
import { ThreadComponent } from './thread.component';
import { ThreadDetailComponent } from './thread-detail.component';
import { ThreadUpdateComponent } from './thread-update.component';
import { ThreadDeletePopupComponent } from './thread-delete-dialog.component';
import { IThread } from 'app/shared/model/thread.model';

@Injectable({ providedIn: 'root' })
export class ThreadResolve implements Resolve<IThread> {
    constructor(private service: ThreadService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((thread: HttpResponse<Thread>) => thread.body));
        }
        return of(new Thread());
    }
}

export const threadRoute: Routes = [
    {
        path: 'thread',
        component: ThreadComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Threads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thread/:id/view',
        component: ThreadDetailComponent,
        resolve: {
            thread: ThreadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Threads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thread/new',
        component: ThreadUpdateComponent,
        resolve: {
            thread: ThreadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Threads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'thread/:id/edit',
        component: ThreadUpdateComponent,
        resolve: {
            thread: ThreadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Threads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const threadPopupRoute: Routes = [
    {
        path: 'thread/:id/delete',
        component: ThreadDeletePopupComponent,
        resolve: {
            thread: ThreadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Threads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
