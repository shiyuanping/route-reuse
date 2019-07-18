import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd';

// ctrl+p  第一个 然后命名
// :前面加?为可选
export interface ResetInfo {
  account:  string;
  password: string;
  code:     string;
}


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetInfo2: ResetInfo;
  resetForm: FormGroup;
  isSend = false;
  resendTime = 60;
  isConfirm = false;
  get email() {
      return this.resetForm.get('email');
  }
  get code() {
      return this.resetForm.get('code');
  }
  get password() {
      return this.resetForm.get('password');
  }
  get confirm() {
      return this.resetForm.get('confirm');
  }
  constructor(
      private msgSrv: NzMessageService,
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
  ) {}
  ngOnInit() {
      this.resetForm = this.fb.group({
          email: ['', [ Validators.required ] ],
          code: [ '', [ Validators.pattern('^[0-9]{6}') ] ],
          password: [ null, [ Validators.required ] ],
          confirm: [ null, [ Validators.required, this.confirmationValidator ] ]
      });
  }

  updateConfirmValidator(): void {
      /** wait for refresh value */
      Promise.resolve().then(() => this.confirm.updateValueAndValidity());
    }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.password.value) {
        return { confirm: true, error: true };
      }
    }

  sendCode() {
      this.isSend = true;
      this.authService.getCode(this.email.value).subscribe(
          res => {
              console.log(res);
              this.msgSrv.success('验证码已发送至邮箱，请尽快查收！');
              // this.alertMsg = res.toString();
              // this.isAlertSuccess = true;
              // setTimeout(() => {
              //     this.isAlertSuccess = false;
              // }, 5000);
          },
          err => {
              // console.log(err);
              if (err.status === 404) {
                  this.msgSrv.error(err.error);
                  // this.alertMsg = err.error;
                  // this.isAlert = true;
                  // setTimeout(() => {
                  //     this.isAlert = false;
                  // }, 5000);
              }
          }
      );
      const resend = setInterval(() => {
          // console.log('abc');
          if (this.resendTime > 1) {
              this.resendTime -= 1;
          } else {
              clearInterval(resend);
              this.resendTime = 60;
              this.isSend = false;
          }
      }, 1000);
  }
  reset() {
      const resetInfo: ResetInfo = {
        account: this.email.value,
        code: this.code.value,
        password: this.password.value
      };
      console.log(resetInfo);
      this.authService.resetPassword(resetInfo).subscribe(
          res => {
              console.log(res);
              this.router.navigate(['/auth/login']);
              // this.alertMsg = res.toString();
              // this.isAlertSuccess = true;
              // setTimeout(() => {
              //     this.isAlertSuccess = false;
              //     this.backLogin();
              // }, 3000);
          },
          err => {
              console.log(err);
              if (err.status === 400) {
                  this.msgSrv.error(err.error);
              //     this.alertMsg = err.error;
              //     this.isAlert = true;
              //     setTimeout(() => {
              //         this.isAlert = false;
              //     }, 5000);
              }
          }
      );
  }

}
