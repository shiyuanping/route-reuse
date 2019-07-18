import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;


  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      account: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
    });
  }


  get account() {
      return this.validateForm.get('account');
  }
  get password() {
      return this.validateForm.get('password');
  }


  signIn() {
      this.authService.login(this.validateForm.value).subscribe(
          res => {
            console.log(res);
              this.authService.token = res.token;
              console.log(this.authService.token);
              // setTimeout(() => {
              this.router.navigate(['']);
              // }, 1000);
          },
          error => {
              console.log(error);
          }
      );
  }
}
