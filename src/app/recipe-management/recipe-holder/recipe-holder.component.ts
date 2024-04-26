import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../assets/db-arrays/interfaces';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedModule } from '../../architecture/shared/shared/shared.module';

@Component({
  selector: 'app-recipe-holder',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './recipe-holder.component.html',
  styleUrl: './recipe-holder.component.scss'
})
export class RecipeHolderComponent {
  @Input() cards: Recipe[] | null = null
  // @Input() card!: Recipe;
  @Input() showRating = false;
  @Output() like = new EventEmitter<string>();
  @Output() selectRecipe = new EventEmitter<number>();
  @Output() comments = new EventEmitter<number>();
  @Output() share = new EventEmitter<string>();
  @Output() edit = new EventEmitter<number>();
  currentHoveredCardId: number | null = null;

  constructor(
  ) {

  }

  /*** placeholder for hover state logic */
  isBeingHovered(id: number): boolean {
    this.showRating = this.currentHoveredCardId === id ? true : false;
    return this.currentHoveredCardId === id;
  }

  hoverUnderline = false; // Flag for underline on hover

  onMouseEnter(id: number) {
    this.currentHoveredCardId = id;
  }

  onMouseLeave() {
    this.currentHoveredCardId == null;
  }


  /**** Events Emitted for output data */
  onLike(title: string) {
    this.like.emit(title);
  }

  onSelectSingleRecipe(recipeId: number) {
    this.selectRecipe.emit(recipeId);
  }

  callCommentsDialog(id: number) {
    this.comments.emit(id);
  }

  onShare(title: string) {
    this.share.emit(title);
  }

  onEdit(id: number): void {
    this.edit.emit(id);
  }

}

