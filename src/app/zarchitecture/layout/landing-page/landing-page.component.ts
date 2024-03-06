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

  viewPortHeight!: number;

  constructor(
  ) {
  }


  ngOnInit(): void {
    this.viewPortHeight = window.innerHeight / 4; //Get viewpoer height
  }

}
