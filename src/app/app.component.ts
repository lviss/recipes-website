import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as recipeRoutes from '../assets/recipes/recipes.json';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('nav') sidenav;
  dashes = /-/g;
  title = 'recipes';
  recipeNav = (recipeRoutes as any).default;
  isDarkTheme: boolean = false;

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    public snackBar: MatSnackBar,
    private meta: Meta
  ) { 
    // check for service worker updates
    if (swUpdate.isEnabled) {
      interval(60 * 60 * 1000).subscribe(() => swUpdate.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
    this.swUpdate.available.subscribe(event => this.promptUpdate());
    this.isDarkTheme = localStorage.getItem('isDarkTheme') === 'true' ?? false;
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val)
        this.sidenav.close();
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
}
