import { Component, Inject, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RecipeCardsComponent } from '../../../recipe-management/recipe-cards/recipe-cards.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Comment {
  sender: string;
  text: string;
}

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
  comments: Comment[] = [];
  newComment: string = '';

  constructor(
    public dialogRef: MatDialogRef<RecipeCardsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {
    console.log("RECEIVED DATA:::", this.data);
    this.title = this.data.selectedCard;
    this.comments = [
      { sender: 'John', text: 'Hello, how are you?' },
      { sender: 'Alice', text: "I'm doing great, thanks!" },
      { sender: 'John', text: "Would you like to grab some coffee?" },
      { sender: 'Alice', text: "Sure, let's meet at the cafe downtown." },
      { sender: 'John', text: "Sounds good. See you there!" }
    ];
  }

  addComment(): void {
    if (this.newComment.trim() !== '') {
      this.comments.push({ sender: 'You', text: this.newComment });
      this.newComment = '';
    }
  }

}
