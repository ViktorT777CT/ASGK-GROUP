import { Component } from '@angular/core';
import {ResetToken} from "../../../../story/actions";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  logOut(){
    this.store.dispatch(ResetToken());
    this.router.navigate(['/'])
  }
}
