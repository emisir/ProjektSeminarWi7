import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { WknTable } from 'src/app/shared/models/wknTable';
import { WknTableService } from 'src/app/shared/services/http/wknTable.service';


@Component({
  selector: 'app-wknTable',
  templateUrl: './wknTable.component.html',
  styleUrls: ['./wknTable.component.scss'],
})

export class wknTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wkn', 'purchaseDate', 'quantity', 'purchasePrice'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public wknTableList: WknTable[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private wknTableService: WknTableService) { } // private productsHttpService: ProductHttpService

  ngOnInit(): void {
    this.wknTableService
      .getWknTableList()
      .subscribe((response: WknTable[]) => {
        this.wknTableList = response;
      });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
