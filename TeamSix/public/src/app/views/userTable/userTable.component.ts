import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/shared/models/userEntity';


@Component({
  selector: 'app-userTable',
  templateUrl: './userTable.component.html',
  styleUrls: ['./userTable.component.scss'],
})
export class UserTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'username', 'password'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public userEntityList: UserEntity[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(private portfolioService: PortfolioService, private router: Router) { } // private productsHttpService: ProductHttpService




  ngOnInit(): void {
    this.portfolioService.getUserEntity().subscribe((response: UserEntity[]) => {
      this.userEntityList = response;
      console.log('Daten empfangen:', this.userEntityList);
    });


  }
  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }


  maskPassword(password: string): string {
    return '●●●●●●●●';
  }
}
