import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/notification-services/message.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [
    SharedModule,
  ],

})
export class FooterComponent {


  mngForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private notificationManService: MessageService,
  ) {

  }


  ngOnInit(): void {
    this.mngForm = this._fb.group({
      // email: [''], //Pick this from the session storage
      response: ['', [Validators.required, Validators.maxLength(3000)]],
    })
  }

  onSendEmail(): void {
    if (this.mngForm.value.response != null) {
      const username = sessionStorage.getItem("username");
      this.notificationManService.showNotificationMessage(`Thank you ${username} for your feedback`, 'snackbar-success');
    } else {
      this.notificationManService.showNotificationMessage(`Kindly fill the form`, 'snackbar-success');
    }
  }


}
