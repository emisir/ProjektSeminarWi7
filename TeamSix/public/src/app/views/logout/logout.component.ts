import { Component, OnInit } from '@angular/core';
import { AuthCoreService } from 'src/app/shared/auth-core/auth-core.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthCoreService) {}

  ngOnInit() {
    this.auth.logout();
  }
}
