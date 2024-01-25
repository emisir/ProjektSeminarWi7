import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, of, switchMap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { PortfolioDetail } from '../../models/portfolioDetail';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



/**
 * Komponente für den Dialog zum Kauf eines Portfolioelements.
 */
@Component({
  selector: 'app-buy-stock-item-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],

  templateUrl: './buy-stock-item-dialog.component.html',
  styleUrl: './buy-stock-item-dialog.component.scss',
})
export class BuyStockItemDialogComponent {
  public myForm: FormGroup; // Formulargruppe für den Kauf von Portfolioelementen
  public portfolioDetailItem: PortfolioDetail | undefined;
  loading: boolean = true; // Ladezustand der Komponente

  // Struktur für die Formulardaten
  formData: any = {
    name: "",
    isin: "",
    description: "",
    type: "",
    quantity: "",
    purchaseDate: this.portfolioService.getCurrentDate(),
  };

   /**
   * Konstruktor der Komponente.
   * @param portfolioService Service zur Interaktion mit Portfolio-Daten.
   * @param fb FormBuilder zur Erstellung von reaktiven Formularen.
   * @param _snackBar Service zur Anzeige von Benachrichtigungen.
   * @param dialogRef Referenz auf den aktuellen Dialog.
   * @param data Übergebene Daten an den Dialog (z.B. ISIN des Portfolioelements).
   */
  constructor(
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BuyStockItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Initialisierung des Formulars mit Validatoren
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      isin: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      quantity: ['', Validators.required]
    });

  }

   /**
   * Wird beim Initialisieren der Komponente aufgerufen.
   * Lädt die Details des Portfolioelements und initialisiert die Formulardaten.
   */
  ngOnInit(): void {
    const { isin } = this.data;
    if (isin) {
      this.portfolioService.getDetailPortfolioList(1, isin).subscribe(it => {
        if (it) {
          this.portfolioDetailItem = it;
          this.updateFormData();
        }
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

/**
 * Behandelt die Formularübermittlung.
 * Sendet die Formulardaten an den PortfolioService, um ein Portfolioelement zu kaufen.
 * Überprüft zuerst, ob das Formular gültig ist und ein Portfolioelement zur Bearbeitung vorhanden ist.
 */
onSubmit(): void {
  // Prüfung, ob das Formular gültig ist und ein Portfolioelement zur Bearbeitung vorhanden ist
  if (!this.portfolioDetailItem || !this.myForm.valid) return;

  // Zusammenstellen der Formulardaten für die Übermittlung
  this.formData = {
    ...this.formData,
    quantity: this.myForm.value.quantity,
    isin: this.portfolioDetailItem.isin,
    purchaseDate: this.portfolioService.getCurrentDate(),
  };

  // Aufruf des PortfolioService, um das Portfolioelement zu kaufen
  this.portfolioService.buyItem(1, this.formData.isin, this.formData).subscribe({
    next: (response) => {
      // Anzeigen einer Erfolgsmeldung und Schließen des Dialogs
      this._snackBar.open("Item erfolgreich hinzugefügt", "Schließen", {duration: 3000});
      console.log(response);
      this.dialogRef.close('added');
    },
    error: (error) => {
      // Anzeigen einer Fehlermeldung, wenn die Übermittlung fehlschlägt
      this._snackBar.open("Es gab einen Fehler bei der Eingabe", "Schließen", {duration: 3000});
      console.log(error);
    }
  });
}

   /**
   * Aktualisiert die Formulardaten basierend auf den Detaildaten des Portfolioelements.
   */
  private updateFormData() {
    if (this.portfolioDetailItem) {
      this.myForm.patchValue({
        name: this.portfolioDetailItem.name,
        isin: this.portfolioDetailItem.isin,
        description: this.portfolioDetailItem.description,
        type: this.portfolioDetailItem.type,
      });
    }
  }

}
