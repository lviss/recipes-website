import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as recipeRoutes from '../assets/recipes/recipes.json';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { map, filter} from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  currentNavItem;
  dashes = /-/g;
  title = 'recipes';
  recipeNav = (recipeRoutes as any).default;
  isDarkTheme: boolean = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    public snackBar: MatSnackBar,
    private meta: Meta,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
  ) { 
    // check for service worker updates
    if (swUpdate.isEnabled) {
      interval(60 * 60 * 1000).subscribe(() => swUpdate.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
    this.swUpdate.available.subscribe(event => this.promptUpdate());
    this.isDarkTheme = localStorage.getItem('isDarkTheme') === 'true' ?? false;

    // determine if we're on a small screen
    this.mobileQuery = media.matchMedia('(max-width: 1300px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentNavItem = this.recipeNav.find(i => '/' + i.path === this.router.url);
      if (this.mobileQuery.matches)
        this.sidenav.close();
      // update browser title
      let pageTitle = this.router.url.substring(1, this.router.url.length).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (pageTitle.length < 1) pageTitle = 'List';
      this.titleService.setTitle('Recipe - ' + pageTitle);
    });
  }

  private promptUpdate(): void {
    console.log('updating to new version');
    let snack = this.snackBar.open('A new version is available!', 'Update', { duration: undefined });
    snack.onAction().subscribe(() => {
      this.swUpdate.activateUpdate().then(() => document.location.reload());
    });
  }

  darkTheme(checked) {
    this.isDarkTheme = checked;
    localStorage.setItem('isDarkTheme', checked);
    this.meta.updateTag({ content: checked ? '#388e3c' : '#7B1FA2' }, 'name=theme-color');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
