import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizationComponent} from "./components/authorization/authorization.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: 'authorization', component: AuthorizationComponent},
  {path: '', redirectTo: '/authorization', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
