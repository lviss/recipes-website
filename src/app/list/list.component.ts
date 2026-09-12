import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as recipeRoutes from '../../assets/recipes/recipes.json';

const BREAKPOINTS = {
  phone: '(max-width: 599px)',
  tablet: '(min-width: 600px) and (max-width: 959px)'
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) { }

  dashes = /-/g;
  recipes = (recipeRoutes as any).default;

  // 2 cols on phone (unchanged), 3 on tablet, 4 on desktop/wide screens.
  cols$: Observable<number> = this.breakpointObserver
    .observe([BREAKPOINTS.phone, BREAKPOINTS.tablet])
    .pipe(
      map(result => {
        if (result.breakpoints[BREAKPOINTS.phone]) return 2;
        if (result.breakpoints[BREAKPOINTS.tablet]) return 3;
        return 4;
      }),
      startWith(2)
    );

  ngOnInit(): void {
  }

}
