import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit{
  title = 'Login';

  login: string = '';
  password: string = '';
  public response: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {
  }

  buttonEnter(){
    this.http.post('https://api.asgk-group.ru/test-auth-only', {login:'test', password:'test'})
      .subscribe((response) =>  {
        this.response = response;
        console.log(this.response);
      })
  }


  authorizationForm!: FormGroup

  submitAuthorization(){
    this.authService.login(this.authorizationForm.value).subscribe({
    next: () => this.router.navigate(['admin']),
    error:(err) => alert(err.message)
  })
  }
  ngOnInit(): void{
 this.authorizationForm = new FormGroup({
   'login': new FormControl(null, Validators.required),
   'password': new FormControl(null, Validators.required)
 })
  }


}
