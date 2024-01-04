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
  public myForm: FormGroup;
  public portfolioDetailItem: PortfolioDetail | undefined;
  loading: boolean = true;


  formData: any = {
    name: "",
    isin: "",
    description: "",
    type: "",
    quantity: "",
    purchaseDate: this.portfolioService.getCurrentDate(),
  };

  addedSuccessfully: boolean = false;
  constructor(
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BuyStockItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      isin: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      quantity: ['', Validators.required]
    });

  }

  clean() {
    this.formData = {
      name: "",
      isin: "",
      description: "",
      type: "",
      quantity: "",
      purchaseDate: this.portfolioService.getCurrentDate(),
    }
    this.addedSuccessfully = false;
  }

  ngOnInit(): void {
    const { isin } = this.data;
    if (isin) {
      this.portfolioService.getDetailPortfolioList(1, isin).subscribe(it => {
        if (it) {
          this.portfolioDetailItem = it;
          this.updateFormData();
        }
        this.loading = false; // Data is loaded, hide the spinner
      });
    } else {
      this.loading = false; // No ISIN provided, hide the spinner
    }
  }
  onSubmit(): void {
    if (!this.portfolioDetailItem || !this.myForm.valid) return;

    this.formData = {
      ...this.formData,
      quantity: this.myForm.value.quantity,
      isin: this.portfolioDetailItem.isin,
      purchaseDate: this.portfolioService.getCurrentDate(),
    };

    this.portfolioService.buyItem(1, this.formData.isin, this.formData).subscribe({
      next: (response) => {
        console.log('Erfolgreich hinzugefügt', response);
        this.dialogRef.close('added');
      },
      error: (error) => {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe", "Schließen")
      }
    });
  }


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
