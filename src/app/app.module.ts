import { FilterService } from './services/filter.service';
import { AuthService } from './services/auth.service';
import {ItemsService} from './services/items.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { MetaModule } from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule
} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AddlistingComponent } from './components/addlisting/addlisting.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { SellerItemDetailsComponent } from './components/seller-item-details/seller-item-details.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'addlisting', component: AddlistingComponent, canActivate: [AuthGuard]},
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'item/:seller/:id', component: SellerItemDetailsComponent }
];


@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, LoginComponent, SidebarComponent, ProfileComponent, AddlistingComponent, ItemDetailComponent, SellerItemDetailsComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFireDatabase, AuthService, AuthGuard, ItemsService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
