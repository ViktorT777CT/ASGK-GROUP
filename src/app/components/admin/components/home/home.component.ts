import { Component, Input } from '@angular/core';
import {IHome} from "./models/home";
import {home as data} from './data/home'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  home: IHome[] = data;
  @Input() homes: IHome
}
