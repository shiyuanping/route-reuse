import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs/Observable';

import { Observable } from 'rxjs';

import { HttpTool } from '../@core/utils/HttpTool';
import { HttpClient, HttpParams } from '@angular/common/http';

const CLIENT_URL = `${HttpTool.oaApiHost}/`; // cas-client address

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
    ) {}

    login(body: any): Observable<any> {
        // window.location.href = `${CLIENT_URL}/login?returnUrl=${window.location.href}`;
        return this.http.get(`${HttpTool.oaApiHost}/api/v1/accounts/login`, {
            observe: 'body',
            params: new HttpParams().set('account', body.account).set('password', body.password)
        });
    }

    logout() {
        // this.token = null;
        // window.location.href = `${CLIENT_URL}/logout?returnUrl=${window.location.href}`;
        // console.log(this.token);
        return this.http.delete(`${HttpTool.oaApiHost}/api/v1/accounts/logout`, {
            observe: 'body',
            params: new HttpParams().set('token', this.token),
        });
    }

    getCode(account: string): Observable<Object> {
        return this.http.get(`${HttpTool.oaApiHost}/api/v1/accounts/send-forget-email?account=${account}`);
    }

    resetPassword(body: any): Observable<Object> {
        return this.http.put(`${HttpTool.oaApiHost}/api/v1/accounts/reset-password`, body);
    }

    set token(token: string) {

        if (!token) {
            localStorage.removeItem('_user');
        } else {
            const user = {
                access_token: token
            };
            localStorage.setItem('_user', JSON.stringify(user));
        }
    }

    get token() {
        const user = JSON.parse(localStorage.getItem('_user')) || {'access_token': ''};
        return user['access_token'] || false;
    }

}
