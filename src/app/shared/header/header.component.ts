import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router , NavigationEnd, ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
/**
* This class represents the toolbar component.
*/
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: []
})
export class HeaderComponent implements OnInit {
	// public title: string='Dashboard'
	public ngOnInit() {

	}
	constructor(private router: Router) {
    this.title = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.getDeepestTitle(this.router.routerState.snapshot.root));
  }

  title: Observable<string>;
  subtitle: string;
  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
    var title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
    this.subtitle = routeSnapshot.data.subtitle;
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}