import {Component, OnInit} from '@angular/core';
import {IHome} from "./models/home";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {selectTokenApiKey, selectTokenValue} from "../../../../story/selectors";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: IHome[] = [];
  token: string;
  apiKey: string;

  constructor(
    private http: HttpClient,
    private store: Store<{ token: string }>,
  ) {}

  // ngOnInit в этих методах можно выполнить код когда загружается компонент
  ngOnInit(): void {
    // получаем токен из хранилища
    this.store.select(selectTokenValue).subscribe((r) => this.token = r);

    // получаем Апи ключ
    this.store.select(selectTokenApiKey).subscribe((r) => this.apiKey = r);

    if (this.token && this.apiKey) {

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.apiKey);

      const body = {
        token: this.token,
        search: '', // тут фильтруешь как тебе надо 'first_name=Иван'
        limit: 50,
        offset: 0,
      };

      let params = new HttpParams({fromObject: body});

      this.http.request('GET', 'https://api.asgk-group.ru/v1/' + this.token + '/passes?', {
        responseType:'json',
        headers,
        params,
      }).subscribe((response) => {
        // @ts-ignore
        this.users = response.passes;
      });
    }

    this.authorizationForm = new FormGroup({
      'user_id': new FormControl(null),
    })
  }

  authorizationForm!: FormGroup
  user_id: any;
  template: any;

  submitAuthorization(){
    console.log(this.authorizationForm.value);
  }
}
