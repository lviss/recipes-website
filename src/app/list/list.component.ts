import { Component, OnInit } from '@angular/core';
import * as recipeRoutes from '../../assets/recipes/recipes.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  dashes = /-/g;
  recipes = (recipeRoutes as any).default;
  ngOnInit(): void {
  }

}
