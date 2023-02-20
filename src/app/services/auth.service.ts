import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: unknown = '';

  constructor(
    private router: Router,
    private store: Store<{ token: string }>,
  ) {}
}
