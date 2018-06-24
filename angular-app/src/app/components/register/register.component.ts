import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.controls.email.valid) {
      this.flashMessagesService.show('E-mail inválido.', { cssClass: 'alert-danger', timeout: 1000 });
    } else if (!this.form.valid) {
      this.flashMessagesService.show('Preencha todos os campos.', { cssClass: 'alert-danger', timeout: 1000 });
    }
    if (this.form.valid) {
      const user = {
        name: this.form.value.name,
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password
      };
      this.authService.registerUser(user).subscribe(data => {
        if (!data.success) {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
        }else {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 1000 });
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
