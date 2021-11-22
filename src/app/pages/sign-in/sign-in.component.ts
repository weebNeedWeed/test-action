import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from './../../services/toast.service';
import { ApiService } from './../../services/api.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(signInForm: NgForm) {
    const { username, password } = signInForm.value;

    this.apiService.signInUser(username, password).subscribe({
      error: (error) => {
        if (typeof error.error === 'string') {
          this.toastService.add(JSON.parse(error.error).title);

          return;
        }

        let errors = Object.values(error.error.errors);

        errors = errors.map((element: any) => element.join('. '));

        errors.forEach((element: any) => this.toastService.add(element));
      },
      next: (tokenString) => {
        this.cookieService.set('token', tokenString);

        this.toastService.add('Success');

        setTimeout(() => this.router.navigate(['/']), 2000);
      },
    });
  }
}
