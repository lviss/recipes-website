import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as recipeRoutes from '../assets/recipes/recipes.json';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val)
        this.sidenav.close();
    });
  }
}
