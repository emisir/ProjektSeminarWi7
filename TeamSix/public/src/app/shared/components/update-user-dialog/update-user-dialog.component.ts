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


@Component({
  selector: 'app-update-user-dialog',
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
  public myForm: FormGroup; // Formulargruppe für das Aktualisieren von Benutzern

  // Struktur für die Formulardaten
  formData: any = {
    name: '',
    username: '',
    password: '',
    role: ''
  };

  public userEntityList: UserEntity[] = [];


   /**
   * Konstruktor der Komponente.
   * Initialisiert das Formular und setzt die erforderlichen Validatoren.
   * @param portfolioService Service zur Interaktion mit Portfolio-Daten.
   * @param fb FormBuilder zur Erstellung von reaktiven Formularen.
   * @param _snackBar Service zur Anzeige von Benachrichtigungen.
   * @param data Übergebene Daten an den Dialog (Benutzerdaten zur Aktualisierung).
   * @param dialogRef Referenz auf den aktuellen Dialog.
   */
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

   /**
   * Initialisiert das Formular mit den übergebenen Benutzerdaten.
   * @param userData Die Daten des Benutzers, die aktualisiert werden sollen.
   */
  private initializeForm(userData: UserEntity): void {
    this.myForm.patchValue({
      name: userData.name,
      username: userData.username,
      password: userData.password,
      role: userData.role
    });

    this.formData = { ...userData };
  }

  /**
   * Behandelt die Formularübermittlung.
   * Sendet die aktualisierten Benutzerdaten an den PortfolioService.
   */
  onSubmit(): void {
    this.portfolioService.updateUserEntity(this.formData.username, this.formData).subscribe({
      next: (response) => {
        this._snackBar.open('Erfolgreich Bearbeitet', 'Schließen', {duration: 3000})
        console.log('Erfolgreich Bearbeitet', response);
        this.dialogRef.close('added');
      },
      error: (error) => {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe", "Schließen", {duration: 3000});
        console.error('Error:', error);
      }

    });
  }

}
