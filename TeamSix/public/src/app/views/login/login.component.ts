import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthCoreService } from 'src/app/shared/auth-core/auth-core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public durationInSeconds = 3;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthCoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.openSnackBar('Try to login ...');
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response) => {
          // Handle successful login response here
          console.log('Login successful', response);
          this.router.navigate(['home']);
        },
        (error) => {
          // Handle login error here
          console.error('Login error', error);
          this.router.navigate(['home']);
          this.openSnackBar('Login error ...', 'Close');
        }
      );
    }
  }

  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
