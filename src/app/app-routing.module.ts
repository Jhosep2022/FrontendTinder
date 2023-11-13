import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { ChatComponent } from './components/chat/chat.component';
import { MatchComponent } from './components/match/match.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';



const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      { path: 'matches', component: MatchComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'profile', component: ProfileComponent },
      {path: 'home', component: HomeComponent},
      { path: 'home', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
