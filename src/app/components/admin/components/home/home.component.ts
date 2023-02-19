import {Component, Input, OnInit} from '@angular/core';
import {IHome} from "./models/home";
import {home as data} from './data/home'
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: IHome[] = [{user_id: 5, title: 'test'}];

  constructor(
    private http: HttpClient,
  ) {}

  // ngOnInit в этих методах можно выполнить код когда загружается компонент
  ngOnInit(): void {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', '9f6befe40b796f854ef7f8ceed08869d');

    const body = {
      token: '9f6befe40b796f854ef7f8ceed08869d',
      search: 'first_name=Иван,last_name=Иванов',
      limit: 50,
      offset: 0,
    };

    let params = new HttpParams({fromObject: body});

    this.http.request('GET', 'https://api.asgk-group.ru/v1/9f6befe40b796f854ef7f8ceed08869d/passes?', {
      responseType:'json',
      headers,
      params,
    }).subscribe((response) => {
      this.users = data;
      console.log(response);
    });
  }
}
