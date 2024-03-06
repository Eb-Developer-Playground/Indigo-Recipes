import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { MessageService } from '../../services/notification-services/message.service';

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

  cards: any[] = [
    { title: 'Indigo Recipes', description: 'Embark on a gastronomic journey...' },
    // Add your card data for the second card here:
    { title: 'Another Great Recipe', description: 'Try out this delicious recipe!', description2: 'This is an optional second description for the second card.' }
  ];

  viewPortHeight!: number;

  constructor(
    private _notificationManService: MessageService
  ) {
  }


  ngOnInit(): void {
    this.viewPortHeight = window.innerHeight / 4; //Get viewpoer height
  }


  /**************************************************************************************** */
  /********************************** FUNCTIONS******************************************** */
  /***************************************************************************************** */

  /**** Setting the country */
  setCountry(country: string): void {
    this._notificationManService.showNotificationMessage("ASSSSS", "snackbar-danger")

  }

}
