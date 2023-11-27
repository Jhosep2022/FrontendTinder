import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { MatchComponent } from './components/match/match.component';
import { PrifleDisplayComponent } from './components/prifle-display/prifle-display.component';
import { MessageComponent } from './components/message/message.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { RegisterComponent } from './components/register/register.component';
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { AuthGuard } from './guards/auth.guard';
import { initializeKeycloak } from './init/keycloak.init';
import { MatCardModule } from '@angular/material/card';
import { MatchComponentComponent } from './components/match-component/match-component.component';
import { OcupationComponent } from './components/ocupation/ocupation.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ErrorComponent} from "./components/error/error.component";
import { RegisterUpdateComponent } from './components/register-update/register-update.component';
import {ConfirmationDialogComponent} from "./components/confirmation-dialog/confirmation-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ChatComponent,
    MatchComponent,
    PrifleDisplayComponent,
    MessageComponent,
    MenuLateralComponent,
    RegisterComponent,
    MatchComponentComponent,
    OcupationComponent,
    ErrorComponent,
    RegisterUpdateComponent,
      ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirestoreModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatAutocompleteModule,
    MatDividerModule,
    KeycloakAngularModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
