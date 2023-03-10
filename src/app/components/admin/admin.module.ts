import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalComponent} from "./components/modal/modal.component";
import {IconsModule} from "../../icons/icons.module";


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        AdminDashboardComponent,
        ModalComponent,
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule
  ]
})
export class AdminModule { }
