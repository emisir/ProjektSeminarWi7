import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { UserEntity } from 'src/app/shared/models/userEntity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule

  ],

  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {
  public myForm: FormGroup;

  formData: any = {
    name: '',
    username: '',
    password: '',
    role: ''
  };

  addedSuccessfully: boolean = false;
  public userEntityList: UserEntity[] = [];

  constructor(private portfolioService: PortfolioService, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  clean() {
    this.formData = {
      name: '',
      username: '',
      password: '',
      role: ''

    }
    this.addedSuccessfully = false;
  }

  onSubmit(): void {
    this.portfolioService.addNewUserEntity(this.formData).subscribe({
      next: (response) => {
        console.log('Erfolgreich hinzugefügt', response);
        this.addedSuccessfully = true;
        this.clean();
      },
      error: (error) => {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe", "Schließen");
      }
    });
  }

}
