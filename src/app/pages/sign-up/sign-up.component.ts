import { User } from './../../models/user.model';
import { ToastService } from './../../services/toast.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router
  ) {}

  onSubmit(signUpForm: NgForm) {
    const { username, password, confirmPassword } = signUpForm.value;

    this.apiService.signUpUser(username, password, confirmPassword).subscribe({
      next: () => {
        this.toastService.add('Success. Please login to your new account!');

        setTimeout(() => {
          this.router.navigate(['signin']);
        }, 2000);
      },
      error: (error) => {
        if (error.error.title) {
          this.toastService.add(error.error.title);
        }

        let errors = Object.values(error.error.errors);

        errors = errors.map((element: any) => element.join('. '));

        errors.forEach((element: any) => this.toastService.add(element));
      },
    });
  }
}
