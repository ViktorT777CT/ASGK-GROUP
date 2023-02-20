import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {SetApiKey, SetToken} from "../../story/actions";
import {Observable, of, throwError} from "rxjs";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})

export class AuthorizationComponent implements OnInit, OnChanges {
  title = 'Login';

  login: string = '';
  password: string = '';
  public response: any;
  token: unknown;

  constructor(
    private store: Store<{ token: string }>,
    private http: HttpClient,
    private router: Router,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
     console.log(changes.token);
  }

  authorizationForm!: FormGroup


  loginAction(userInfo: {login: string, password: string}): Observable<string | boolean> {
    if (userInfo.login && userInfo.password){
      return of(true)
    }
    return throwError(() => Error('Failed Login'))
  }

  submitAuthorization() {
    this.loginAction(this.authorizationForm.value).subscribe({
      next: () => {

        // тут получаем тестовый идентификатор apiKey
        this.http.post('https://api.asgk-group.ru/test-auth-only', {login: 'test', password: 'test'})
          .subscribe(async (response) => {
            this.response = response;
            await this.store.dispatch(SetApiKey({apiKey: this.response.auth_token}));

            const headers = new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Authorization', this.response.auth_token);

            // тут получаем токен для запросов
            this.http.request('GET', 'https://api.asgk-group.ru/v1/authorization', {
              responseType: 'json',
              headers,
            }).subscribe(async (response): Promise<any> => {
              // @ts-ignore
              const token = response.tokens[0].token;

              // пишем токен в хранилище
              await this.store.dispatch(SetToken({token: token}));
              await this.router.navigate(['admin'])
            });
          })
      },
      error: (err) => alert(err.message)
    })
  }

  ngOnInit(): void {
    this.authorizationForm = new FormGroup({
      'login': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }
}
