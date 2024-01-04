import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-detail',
  templateUrl: './addPortfolioItem.component.html',
  styleUrls: ['./addPortfolioItem.component.scss']
})

export class AddPortfolioItemComponent implements OnInit, OnDestroy {
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioService: PortfolioService, private _snackBar: MatSnackBar) { }

  formData: any = {
    isin: '',
    quantity: '',
    purchaseDate: this.portfolioService.getCurrentDate()
  };

  addedSuccessfully: boolean = false;

  ngOnInit(): void { }

  onSubmit(): void {
    this.portfolioService.addPortfolioItems(1, this.formData).subscribe({
      next: (response) => {
        console.log('Erfolgreich hinzugefügt', response);
        this.addedSuccessfully = true;
      },
      error: (error) => {
        console.log(this.formData)
        this._snackBar.open("Dieses Portfolioitem mit der Isin " + this.formData.isin + " gibt es schon", "Schließen")
      }
    });

  }

  clean() {
    this.formData = {
      isin: '',
      purchaseDate: this.portfolioService.getCurrentDate(),
      quantity: '',

    }
    this.addedSuccessfully = false;
  }


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }

}
