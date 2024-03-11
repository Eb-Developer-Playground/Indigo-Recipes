import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { MessageService } from '../../services/notification-services/message.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  imports: [
    HeaderComponent,
    SharedModule,
    FooterComponent,
  ]
})
export class LandingPageComponent implements OnInit {


  cards: any[] = [
    { id: 1, imageUrl: './../../../../assets/political.png', name: 'Image 1' },
    { id: 2, imageUrl: './../../../../assets/political.png', name: 'Image 2' },
    { id: 3, imageUrl: './../../../../assets/political.png', name: 'Image 3' }
  ];
  currentlyHoveredCardId: number | null = null;


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
    this._notificationManService.showNotificationMessage("ASSSSS", "snackbar-success");
  }

  isHovering(cardId: number): boolean {
    return this.currentlyHoveredCardId === cardId;
  }


  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';

  toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }

}
