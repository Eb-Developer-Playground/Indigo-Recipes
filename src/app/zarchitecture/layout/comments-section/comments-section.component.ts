import { Component, Inject, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RecipeCardsComponent } from '../../../waste-components/recipe-cards/recipe-cards.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe, Comment } from '../../../../assets/db-arrays/interfaces';
import { CardManagementService } from '../../../recipe-management/aa-data/services/card-management.service';




@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
  ],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.scss'
})
export class CommentsSectionComponent {
  title!: string;

  newComment: string = '';
  username: string | null;
  comments!: Comment[]


  constructor(
    public dialogRef: MatDialogRef<RecipeCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardManService: CardManagementService,
  ) {
    this.username = sessionStorage.getItem('username')
  }

  ngOnInit(): void {
    console.log("RECEIVED DATA:::", this.data);
    this.title = this.data.selectedCard;
    // this.comments = [
    //   { sender: 'John', text: 'Hello, how are you?' },
    //   { sender: 'Alice', text: "I'm doing great, thanks!" },
    //   { sender: 'John', text: "Would you like to grab some coffee?" },
    //   { sender: 'Alice', text: "Sure, let's meet at the cafe downtown." },
    //   { sender: 'John', text: "Sounds good. See you there!" }
    // ];

    const allRecipes = this.cardManService.recipeSample;
    const recipe = this.searchRecipesByTitle(allRecipes, this.title);
    console.log("RECIPE::", recipe);
    this.comments = recipe[0].comments;

  }

  addComment(): void {
    if (this.newComment.trim() !== '') {
      this.comments.push({ sender: `${this.username}`, text: this.newComment });
      this.newComment = '';

    }
  }

  searchRecipesByTitle(recipes: Recipe[], searchTerm: string): Recipe[] {
    if (!searchTerm) {
      return recipes;
    }
    searchTerm = searchTerm.toLowerCase(); // Make the search case-insensitive
    return recipes.filter(recipe => {
      return recipe.title?.toLowerCase().includes(searchTerm);
    });
  }

}















































































