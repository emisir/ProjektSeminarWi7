import { AfterRenderPhase, Component, OnDestroy, OnInit, afterRender } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PortfolioDetail } from 'src/app/shared/models/portfolioDetail';

@Component({
  selector: 'app-buyItem',
  templateUrl: './buyItem.component.html',
  styleUrls: ['./buyItem.component.scss']
})

export class BuyItemComponent implements OnInit, OnDestroy {

  private toDestroy$: Subject<void> = new Subject<void>();

  // Hier erstellen Sie ein separates Datenobjekt, um nur die benötigten Felder zu speichern

  currentPortfolioItem: PortfolioDetail = JSON.parse(localStorage.getItem('portfolioDetailItem') || '{}');



  formData: any = {
    name: this.currentPortfolioItem.name,
    isin: this.currentPortfolioItem.isin,
    description: this.currentPortfolioItem.description,
    type: this.currentPortfolioItem.type,
    quantity: '',
    purchaseDate: this.portfolioService.getCurrentDate(),

  };

  addedSuccessfully: boolean = false;


  constructor(private portfolioService: PortfolioService, private _snackBar: MatSnackBar,) {
    afterRender(() => {
      let inputName = document.getElementById('name') as HTMLInputElement | null;
      inputName?.setAttribute('value', this.currentPortfolioItem.name);

      let inputisin = document.getElementById('isin') as HTMLInputElement | null;
      inputisin?.setAttribute('value', this.currentPortfolioItem.isin);

      let inputDescription = document.getElementById('description') as HTMLInputElement | null;
      inputDescription?.setAttribute('value', this.currentPortfolioItem.description);

      let inputType = document.getElementById('type') as HTMLInputElement | null;
      inputType?.setAttribute('value', this.currentPortfolioItem.type);
    })
  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    this.portfolioService.buyItem(1, this.formData).subscribe({
      next: (response) => {
        // Erfolgreiche Antwort vom Server
        console.log('Erfolgreich hinzugefügt', response);
        this.addedSuccessfully = true;
      },
      error: (error) => {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe", "Schließen")
      }
    });

  }


  clean() {

    this.formData.quantity = '';
    this.formData.purchasePrice = '';

    let inputQuantity = document.getElementById('quantity') as HTMLInputElement | null;
    inputQuantity?.setAttribute('value', '');

    let inputPurchasePrice = document.getElementById('purchasePrice') as HTMLInputElement | null;
    inputPurchasePrice?.setAttribute('value', '');

    this.addedSuccessfully = false;
  }


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}