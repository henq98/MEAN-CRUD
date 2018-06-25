import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return this.flashMessagesService.show('Preencha todos os campos', { 
        cssClass: 'alert-danger', 
        timeout: 1500 });
    }
    if (this.form.valid) {
      const user = {
        username: this.form.value.username,
        password: this.form.value.password
      };
      this.authService.athenticateUser(user).subscribe(data => {
        if (!data.success) {
          return this.flashMessagesService.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 1000
          });
        }
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessagesService.show(`Bem vindo(a) ${user.username}`, {
            cssClass: 'alert-success',
            timeout: 1000
          });
          this.router.navigate(['/profile']);
        }
      });
    }
  }
}
