import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, ResolveStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'jhi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['sidenav.scss']
})
export class SidenavComponent {
    public selectedInDrawer: number;

    constructor(router: Router) {
        router.events.subscribe((e) => {
            if(e instanceof NavigationEnd) {
                switch (e.url) {
                    case '/':
                        this.selectedInDrawer = 0;
                        break;
                    case '/forum':
                        this.selectedInDrawer = 1;
                        break;
                    default:
                        break;
                }
            }
        });
    }

}
