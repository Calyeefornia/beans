import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {
  FormBuilder,
  FormGroup,
  Validators,
  EmailValidator
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register: FormGroup;
  login: FormGroup;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.register = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.min(8)
        ]
      ],
      confirm_password: ['', [Validators.required]]
    });
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.min(8)
        ]
      ]
    });
  }
  get name() {
    return this.register.get('name');
  }
  get email() {
    return this.register.get('email');
  }
  get password() {
    return this.register.get('password');
  }
  get confirmPassword() {
    return this.register.get('confirm_password');
  }
  get loginEmail() {
    return this.login.get('email');
  }
  get loginPassword() {
    return this.login.get('password');
  }

  onRegister() {
    this.authService
      .register(this.register.value.email, this.register.value.password)
      .then(res => {
        let userId = '';
        this.authService.getAuth().subscribe(auth => {
          if (auth) {
            userId = auth.uid;
            const username = this.register.value.name;
            this.authService.updateUserInfo(userId, username, this.register.value.email);
          }
        });


        this.flashMessagesService.show('New user registered', {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessagesService.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/login']);
      });
  }
  onLogin() {
    this.authService
      .login(this.login.value.email, this.login.value.password)
      .then(res => {
        this.flashMessagesService.show('You are logged in', {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessagesService.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/login']);
      });
  }
}
