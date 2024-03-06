import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../../shared/shared/shared.module';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports: [
    HeaderComponent,
    SharedModule
  ]
})
export class LandingPageComponent implements OnInit {

  /** Access mat-card and Get a list of all mat-card components */
  @ViewChild('homeCard') homeCard!: ElementRef;
  @ViewChildren('homeCard') homeCards!: QueryList<ElementRef>;

  viewPortHeight: number;

  constructor(
    private _elementRef: ElementRef,
  ) {
    this.viewPortHeight = this._elementRef.nativeElement.offsetHeight;
  }


  ngOnInit(): void {
    if (this.homeCards && this.homeCards.length > 0) {
      this.homeCards.changes.subscribe(() => {
        const firstCard = this.homeCards.first;
        const cardHeight = firstCard.nativeElement.offset;
        const viewPortHeight = this.viewPortHeight;

        if (cardHeight > viewPortHeight) {
          this.homeCard.nativeElement.style.top = `-${cardHeight - viewPortHeight}px`
        } else {
          this.homeCard.nativeElement.style.top = `0px`;
        }
      });
    }
  }
}
