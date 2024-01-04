import { AfterRenderPhase, Component, OnDestroy, OnInit, afterRender } from '@angular/core';
import { Subject, of, switchMap } from 'rxjs';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PortfolioDetail } from 'src/app/shared/models/portfolioDetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buyItem',
  templateUrl: './buyItem.component.html',
  styleUrls: ['./buyItem.component.scss']
})

export class BuyItemComponent implements OnInit, OnDestroy {

  private toDestroy$: Subject<void> = new Subject<void>();
  private portfolioId!: number;


  public portfolioDetailItem: PortfolioDetail | undefined;

  formData: any = {
    name: "",
    isin: "",
    description: "",
    type: "",
    quantity: "",
    purchaseDate: this.portfolioService.getCurrentDate(),
  };

  addedSuccessfully: boolean = false;


  constructor(private portfolioService: PortfolioService, private _snackBar: MatSnackBar, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.pipe(switchMap(it => {
      this.portfolioId = it['id'];
      const itemIsin = it['isin']
      if (this.portfolioId && itemIsin) {
        return this.portfolioService.getDetailPortfolioList(this.portfolioId, itemIsin)
      } else {
        return of(null);
      }
    })).subscribe(it => {
      if (it) {
        this.portfolioDetailItem = it;
        this.updateFormData();
      }
    })
  }


  onSubmit(): void {
    if (!this.portfolioDetailItem) return;
    this.portfolioService.buyItem(this.portfolioId, this.portfolioDetailItem.isin, this.formData).subscribe({
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


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }

  private updateFormData() {
    this.formData = {
      name: this.portfolioDetailItem?.name,
      isin: this.portfolioDetailItem?.isin,
      description: this.portfolioDetailItem?.description,
      type: this.portfolioDetailItem?.type,
    }
  }
}