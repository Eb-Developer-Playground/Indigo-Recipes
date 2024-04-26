import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../assets/db-arrays/interfaces';
import { AuthServiceService } from '../../../user/auth-services/auth-service.service';
import { HeaderComponent } from '../../../../architecture/layout/header/header.component';
import { MessageService } from '../../../../architecture/services/notification-services/message.service';
import { SharedModule } from '../../../../architecture/shared/shared/shared.module';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent
  ],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss'
})
export class ProfileUpdateComponent implements OnInit {
  /**************************************** Varaible Declaration ******************************************************** */
  updateForm!: FormGroup
  mngForm!: FormGroup
  existingUsers!: User[];
  userEmail: string | null;
  currentUser: any;

  /**************************************** Dependency Injection ******************************************************* */
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private authManService: AuthServiceService,
    private notificationManService: MessageService,
  ) {
    this.userEmail = sessionStorage.getItem('email');
  }

  /**************************************** Lifecycles ***************************************************************** */
  ngOnInit(): void {
    this.existingUsers = this.authManService.users;
    this.currentUser = this.fetchUserByEmail(this.userEmail)[0];
    console.log(this.currentUser);

    this.initFormWithData();
  }

  /**************************************** Methods ******************************************************************* */
  /**** Generate Update Form */

  initFormWithData(): void {
    this.updateForm = this._fb.group({
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      username: [this.currentUser.username, Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }



  /****** Submission of the form */
  onSubmit(): void {
    console.log("Updated User::", this.updateForm.value);
    if (!this.updateForm.value.oldPassword == this.currentUser.password) {
      this.notificationManService.showNotificationMessage("Input the correct old password!!", "snackbar-danger");
    } else {
      if (!this.updateForm.value.password == this.updateForm.value.confirmPassword) {
        this.notificationManService.showNotificationMessage("Kindly confirm that your new passwords match!!", "snackbar-danger");
      } else {
        const updatedUser = this.updateForm.value;
        const updatedUsersArray = this.existingUsers.map((user: User) => user == this.currentUser ? {
          ...updatedUser
        } : user)

        this.existingUsers = updatedUsersArray;
        console.log("New Existing Users::", this.existingUsers);
        /******** New User saved but not persisted to db, so... */

        this.router.navigate(['/home']);
      }
    }
  }

  /**** Fetch User based on the username */
  fetchUserByEmail(email: string | null): User[] {
    return this.existingUsers.filter(user => user.email == email);
  }


}
