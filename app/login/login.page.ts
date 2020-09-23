import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Utilsateur } from '../Models/Utilsateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  typePassword = false;
  iconPassword = 'eye-outline';
  loginForm: FormGroup;
  message = '';


  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private route: Router) { }

  ngOnInit() {
    this.createForm();

  }
  voirPassword(): void {
    this.typePassword = !this.typePassword;

    if (this.iconPassword == 'eye-outline') {
      this.iconPassword = 'eye-off-outline';
    } else {
      this.iconPassword = 'eye-outline';
    }
  }

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.auth.login(email, password);
    // this.route.navigate(['/tabs/menu']);
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  resetPassword() {
    console.log("ici");
    this.route.navigate(['reset-password']);
  }
}
