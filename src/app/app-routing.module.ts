import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [{
  path: '', 
  component: ListComponent
},{
  path: '**', 
  component: RecipeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
