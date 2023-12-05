import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
    selector: 'app-buyItem',
    templateUrl: './buyItem.component.html',
    styleUrls: ['./buyItem.component.scss']
  })

  export class BuyItemComponent implements OnInit, OnDestroy {
    private toDestroy$: Subject<void> = new Subject<void>();
  
    constructor(private portfolioService: PortfolioService, private _snackBar: MatSnackBar) { }
   // Hier erstellen Sie ein separates Datenobjekt, um nur die benötigten Felder zu speichern
  formData: any = {
    name:'',
    wkn: '',
    description: '',
    category: '',
    quantity: '',
    purchasePrice: ''

    // Fügen Sie hier weitere Felder hinzu, die Sie benötigen
  };

  addedSuccessfully: boolean = false;

  ngOnInit(): void {
    
   }


  onSubmit(): void {
    this.portfolioService.addPortfolioItems(1, this.formData).subscribe({
      next: (response) => {
        // Erfolgreiche Antwort vom Server
        console.log('Erfolgreich hinzugefügt', response);
        this.addedSuccessfully = true;
      },
      error: (error) => {
        this._snackBar.open("Es gab ein Fehler bei der Eingabe","Schließen")
      }
    });

  }

  clean() {
    this.formData = {
      name: '',
      wkn: '',
      description: '',
      category: '',
      quantity: '',
      purchasePrice: ''

    }
    this.addedSuccessfully = false;
  }


  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
