import { Route } from '@angular/router';

import { ForumComponent } from './';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';

export const FORUM_ROUTE: Route = {
    path: 'forum',
    component: ForumComponent,
    data: {
        authorities: [],
        defaultSort: 'id,asc',
        pageTitle: 'Foro!'
    },
    resolve: {
        pagingParams: JhiResolvePagingParams
    },
    canActivate: [UserRouteAccessService]
};
