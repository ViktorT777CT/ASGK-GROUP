import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit{
  authorizationForm!: FormGroup
  constructor(
    private router: Router,
    private authService: AuthService) {
  }
  submitAuthorization(){
this.authService.login(this.authorizationForm.value).subscribe({
  next: () => this.router.navigate(['admin']),
  error:(err) => alert(err.message)
})
  }
  ngOnInit(): void{
 this.authorizationForm = new FormGroup({
   'name': new FormControl(null, Validators.required),
   'password': new FormControl(null, Validators.required)
 })
  }
}
