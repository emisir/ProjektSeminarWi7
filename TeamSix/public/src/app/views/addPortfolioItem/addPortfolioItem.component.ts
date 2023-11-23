import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioItem } from 'src/app/shared/models/portfolioItem';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './addPortfolioItem.component.html',
  styleUrls: ['./addPortfolioItem.component.scss']
})
export class AddPortfolioItemComponent implements OnInit, OnDestroy {
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioService: PortfolioService) { }

  portfolioItem : PortfolioItem [] = [];

  ngOnInit(): void {}

  onSubmit(): void{
    // // Beispiel für das Hinzufügen eines Portfolio-Elements
    // let newPortfolioItem: PortfolioItem = {
    //     id: 1,
    //     wkn: "123456",
    //     name: "Beispielaktie",
    //     description: "Beschreibung der Aktie",
    //     category:"asdasd",
    //     purchasePrice: 100123,
    //     quantity: 10,
    //     purchaseDate: new Date(),
    // };

    // this.portfolioService.addPortfolioItems(1, newPortfolioItem)
    //   .subscribe(
    //     (response) => {
    //       console.log('Portfolio Item hinzugefügt', response);
    //     },
    //     (error) => {
    //       console.error('Fehler beim Hinzufügen des Portfolio-Items', error);
    //     }
    //   );
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
