import {Component, OnInit} from '@angular/core';
import {IHome} from "./models/home";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {selectTokenApiKey, selectTokenValue} from "../../../../story/selectors";
import {FormControl, FormGroup} from "@angular/forms";

export type GetDataType = {
  search: string, // тут фильтруешь как тебе надо 'first_name=Иван'
  limit: number,
  offset: number,
}

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

  // получаем список
  getData(body: GetDataType): void{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.apiKey);

    const bodyParams = Object.assign(body, {token: this.token});

    let params = new HttpParams({fromObject: bodyParams});

    this.http.request('GET', 'https://api.asgk-group.ru/v1/' + this.token + '/passes?', {
      responseType:'json',
      headers,
      params,
    }).subscribe((response) => {
      // @ts-ignore
      this.users = response.passes;
    });
  }

  // ngOnInit в этих методах можно выполнить код когда загружается компонент
  ngOnInit(): void {
    // получаем токен из хранилища
    this.store.select(selectTokenValue).subscribe((r) => this.token = r);

    // получаем Апи ключ
    this.store.select(selectTokenApiKey).subscribe((r) => this.apiKey = r);

    if (this.token && this.apiKey) {
       this.getData({search: '', limit: 50, offset: 0});
    }

    this.authorizationForm = new FormGroup({
      user_id: new FormControl(null),
      template: new FormControl(null),
      fio: new FormControl(null),
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      pat_name: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      birthday: new FormControl(null),
      loyalty_level: new FormControl(null),
    })
  }

  authorizationForm!: FormGroup

  submitAuthorization(){
    const FormValues = this.authorizationForm.value;
    Object.keys(FormValues).forEach((k) => (FormValues[k] == '' || FormValues[k] == null) && delete FormValues[k]);

    let search = '';
    for (const key of Object.keys(FormValues)) {
      search += (key + '=' + FormValues[key])
    }

    this.getData({search: search, limit: 50, offset: 0});
  }
}
