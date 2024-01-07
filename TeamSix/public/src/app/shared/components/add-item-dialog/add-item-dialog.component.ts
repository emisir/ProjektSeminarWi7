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
  public myForm: FormGroup;

  formData: any = {
    isin: '',
    quantity: '',
    purchaseDate: this.portfolioService.getCurrentDate()
  };

  constructor(private portfolioService: PortfolioService, private fb: FormBuilder, private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddItemDialogComponent>) {
    this.myForm = this.fb.group({
      isin: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.portfolioService.addPortfolioItems(1, this.formData).subscribe({
      next: (response) => {
        this._snackBar.open("Item Erfolgreich Hinzugefügt" + response, "Schließen");
        this.dialogRef.close('added');
      },
      error: (error) => {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe" + error, "Schließen")
      }
    });
  }

}
