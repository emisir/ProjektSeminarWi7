import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  public userEntityList: UserEntity[] = [];

  formData: any = {
    name: '',
    username: '',
    password: '',
    role: ''
  };

  constructor(private portfolioService: PortfolioService, private fb: FormBuilder, private _snackBar: MatSnackBar,     private dialogRef: MatDialogRef<AddUserDialogComponent>,
    ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.portfolioService.addNewUserEntity(this.formData).subscribe({
      next: (response) => {
        this._snackBar.open("Benutzer Erfolgreich Hinzugefügt", "Schließen");
        console.log('Erfolgreich hinzugefügt ', response);
        this.dialogRef.close('added');

      },
      error: (error) => {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe", "Schließen");
        console.log('Fehler bei der eingabe ', error);

      }
    });
  }

}
