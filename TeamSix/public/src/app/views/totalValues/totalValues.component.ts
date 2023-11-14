import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { TotalValues } from 'src/app/shared/models/totalValues';
import { TotalValuesService } from 'src/app/shared/services/http/totalValues.service';


@Component({
  selector: 'app-totalValues',
  templateUrl: './totalValues.component.html',
  styleUrls: ['./totalValues.component.scss'],
})

export class totalValuesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wkn', 'totalQuantity', 'averagePrice', 'totalPrice'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public totalValuesList: TotalValues[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private totalValueService: TotalValuesService) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.totalValueService
      .getTotalValuesList()
      .subscribe((response: TotalValues[]) => {
        this.totalValuesList = response;
      });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
