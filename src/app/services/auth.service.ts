import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {AuthorizationComponent} from "../components/authorization/authorization.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  setToken(token: string){
    localStorage.setItem('token', token)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(){
    return this.getToken() !== null;
  }
  login(userInfo:{response: string}): Observable<string | boolean>{
    if (userInfo.response = 'auth_token'){
      this.setToken('token')
      return of(true)
    }
    return throwError(() => Error('Failed Login'))
  }
}
