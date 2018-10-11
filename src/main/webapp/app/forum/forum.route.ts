import { Route } from '@angular/router';

import { ForumComponent } from './';

export const FORUM_ROUTE: Route = {
    path: 'forum',
    component: ForumComponent,
    data: {
        authorities: [],
        pageTitle: 'Welcome, Java Hipster!'
    }
};
