import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


/**
 * Komponente für den Dialog zum Hinzufügen eines neuen Portfolioelements.
 */
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

  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss',
})
export class AddItemDialogComponent {
  public myForm: FormGroup; // Formulargruppe für das Hinzufügen von Elementen

  formData: any = {
    isin: '',
    quantity: '',
    purchaseDate: this.portfolioService.getCurrentDate()
  };

    /**
   * Konstruktor der Komponente.
   * Initialisiert das Formular und setzt die erforderlichen Validatoren.
   * @param portfolioService Service zur Interaktion mit Portfolio-Daten.
   * @param fb FormBuilder zur Erstellung von reaktiven Formularen.
   * @param _snackBar Service zur Anzeige von Benachrichtigungen.
   * @param dialogRef Referenz auf den aktuellen Dialog.
   */
  constructor(private portfolioService: PortfolioService, private fb: FormBuilder, private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddItemDialogComponent>) {

    // Initialisierung des Formulars
    this.myForm = this.fb.group({
      isin: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  /**
   * Behandelt die Formularübermittlung.
   * Sendet die Formulardaten an den PortfolioService, um ein neues Element hinzuzufügen.
   */
  onSubmit(): void {
    // Aufruf des PortfolioService, um das Element hinzuzufügen
    this.portfolioService.addPortfolioItems(1, this.formData).subscribe({
      next: (response) => {
        // Anzeigen einer Erfolgsmeldung und Schließen des Dialogs
        this._snackBar.open("Item erfolgreich hinzugefügt", "Schließen");
        console.log(response);
        this.dialogRef.close('added');
      },
      error: (error) => {
        // Anzeigen einer Fehlermeldung, wenn die Übermittlung fehlschlägt
        this._snackBar.open("Es gab einen Fehler bei der Eingabe", "Schließen");
        console.log(error);
      }
    });
  }

}
