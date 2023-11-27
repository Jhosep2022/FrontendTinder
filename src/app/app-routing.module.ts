import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { ChatComponent } from './components/chat/chat.component';
import { MatchComponent } from './components/match/match.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { OcupationComponent } from './components/ocupation/ocupation.component';
import {AuthGuard} from "./guards/auth.guard";
import {ErrorComponent} from "./components/error/error.component";

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      { path: 'error', component: ErrorComponent },
      { path: 'matches', component: MatchComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'occupation', component: OcupationComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
