import { Component, Inject } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';








// This component is used to add a new item to the list.
// It is used in the overview.component.html.
// It is a standalone component.

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
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss',
})
export class UpdateUserDialogComponent {
  public myForm: FormGroup;

  formData: any = {
    name: '',
    username: '',
    password: '',
    role: ''
  };

  public userEntityList: UserEntity[] = [];

  constructor(private portfolioService: PortfolioService, private fb: FormBuilder, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: UserEntity,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.initializeForm(data);
  }

  private initializeForm(userData: UserEntity): void {
    this.myForm.patchValue({
      name: userData.name,
      username: userData.username,
      password: userData.password,
      role: userData.role
    });

    this.formData = { ...userData };
  }

  onSubmit(): void {
    this.portfolioService.updateUserEntity(this.formData.username, this.formData).subscribe({
      next: (response) => {
        console.log('Erfolgreich Bearbeitet', response);
        this.dialogRef.close('added');
      },
      error: (error) => {
        console.error('Error:', error);
        this._snackBar.open("Es gab ein Fehler bei der Eingabe", "Schließen");
      }
    });
  }

}
