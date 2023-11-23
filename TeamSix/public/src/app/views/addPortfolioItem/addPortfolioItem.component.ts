import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './addPortfolioItem.component.html',
  styleUrls: ['./addPortfolioItem.component.scss']
})
export class AddPortfolioItemComponent implements OnInit, OnDestroy {
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioService: PortfolioService) { }

  // Hier erstellen Sie ein separates Datenobjekt, um nur die benötigten Felder zu speichern
  formData: any = {
    name: '',
    wkn: '',
    description: '',
    category: '',
    quantity: '',
    purchasePrice: ''
    // Fügen Sie hier weitere Felder hinzu, die Sie benötigen
  };

  addedSuccessfully: boolean = false;

  ngOnInit(): void { }

  onSubmit(): void {
    this.portfolioService.addPortfolioItems(1, this.formData).subscribe({
      next: (response) => {
        // Erfolgreiche Antwort vom Server
        console.log('Erfolgreich hinzugefügt', response);
        this.addedSuccessfully = true;
      },
      error: (error) => {
        // Fehlerbehandlung
        console.error('Fehler beim Hinzufügen', error);
        this.addedSuccessfully = false;
      }
    });
  }



  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
