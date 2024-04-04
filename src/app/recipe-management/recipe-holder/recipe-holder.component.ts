import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../zarchitecture/shared/shared/shared.module';
import { Recipe } from '../../../assets/db-arrays/interfaces';
import Swal from 'sweetalert2';
import { MessageService } from '../../zarchitecture/services/notification-services/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentsSectionComponent } from '../../zarchitecture/layout/comments-section/comments-section.component';
import { Router } from '@angular/router';

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
  @Output() comments = new EventEmitter<string>();
  @Output() share = new EventEmitter<string>();
  currentHoveredCardId: number | null = null;

  constructor(
  ) {

  }

  /*** placeholder for hover state logic */
  isBeingHovered(recipeId: number): boolean {
    this.showRating = this.currentHoveredCardId === recipeId ? true : false;
    return this.currentHoveredCardId === recipeId;
  }

  hoverUnderline = false; // Flag for underline on hover

  onMouseEnter(recipeId: number) {
    this.currentHoveredCardId = recipeId;
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

  callCommentsDialog(title: string) {
    this.comments.emit(title);
  }

  onShare(title: string) {
    this.share.emit(title);
  }

}
