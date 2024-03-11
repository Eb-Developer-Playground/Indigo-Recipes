import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  ){}


  ngOnInit(): void {
    this.mngForm = this._fb.group({
      email: [''], //Pick this from the session storage
      response: ['', [Validators.required, Validators.maxLength(3000)]], 
    })
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }


}
