import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as recipeRoutes from '../../assets/recipes/recipes.json';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipeId: string;
  haveImage: boolean;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.handleRecipeChange();
    this.router.events.subscribe((val) => {
      if (val)
        this.handleRecipeChange();
    });
  }

  handleRecipeChange() {
    this.recipeId = this.router.url.substring(1, this.router.url.length);
    const recipeInfo = (recipeRoutes as any).default.find(r => r.path == this.recipeId);
    if (recipeInfo)
      this.haveImage = recipeInfo.image;
  }

}
