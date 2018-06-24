import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProfileComponent } from '../components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ], exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    RegisterComponent,
    ProfileComponent,
    LoginComponent
  ]
})
export class SharedModule { }
