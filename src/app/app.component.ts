import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Login';
  userName: string = '';
  response: any;
  constructor(private http: HttpClient) {

  }
  search(){
    this.http.get('https://api.asgk-group.ru/test-auth-only' + this.userName)
      .subscribe((response)=>{
        this.response = response;
        console.log(this.response);
      })
  }
}
