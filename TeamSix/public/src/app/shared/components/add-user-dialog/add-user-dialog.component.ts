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
  selector: 'app-user-item-dialog',
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
  public myForm: FormGroup; // Formulargruppe für das Hinzufügen von Benutzern
  public userEntityList: UserEntity[] = [];

  // Struktur für die Formulardaten
  formData: any = {
    name: '',
    username: '',
    password: '',
    role: ''
  };

    /**
   * Konstruktor der Komponente.
   * Initialisiert das Formular und setzt die erforderlichen Validatoren.
   * @param portfolioService Service zur Interaktion mit Portfolio-Daten.
   * @param fb FormBuilder zur Erstellung von reaktiven Formularen.
   * @param _snackBar Service zur Anzeige von Benachrichtigungen.
   * @param dialogRef Referenz auf den aktuellen Dialog.
   */
  constructor(private portfolioService: PortfolioService, private fb: FormBuilder, private _snackBar: MatSnackBar,     private dialogRef: MatDialogRef<AddUserDialogComponent>,
    ) {

    // Initialisierung des Formulars mit Validatoren
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  /**
   * Behandelt die Formularübermittlung.
   * Sendet die Formulardaten an den PortfolioService, um einen neuen Benutzer hinzuzufügen.
   */
  onSubmit(): void {
    // Aufruf des PortfolioService, um den neuen Benutzer hinzuzufügen
    this.portfolioService.addNewUserEntity(this.formData).subscribe({
      next: (response) => {
        // Anzeigen einer Erfolgsmeldung und Schließen des Dialogs
        this._snackBar.open("Benutzer erfolgreich hinzugefügt", "Schließen");
        console.log('Erfolgreich hinzugefügt', response);
        this.dialogRef.close('added');
      },
      error: (error) => {
        // Anzeigen einer Fehlermeldung, wenn die Übermittlung fehlschlägt
        this._snackBar.open("Es gab einen Fehler bei der Eingabe", "Schließen");
        console.log('Fehler bei der Eingabe', error);
      }
    });
  }

}
