import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Input() recipe;
  constructor() { }

  imagePath(recipe, extension) {
    return recipe.image ?
      'assets/recipes/' + recipe.path + '.' + extension :
      'assets/noImage.png';
  }
  ngOnInit(): void {
  }

}
