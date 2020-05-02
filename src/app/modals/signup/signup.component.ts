import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IUser } from '../../interfaces/users';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailPattern: RegExp =
    // tslint:disable-next-line: max-line-length
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[0-9])(.{8,}$)/;
  public form: FormGroup;
  public message: string;
  public alert: string;
  public UserName = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]);
  public Email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
  public Password = new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]);
  public ConfirmPassword = new FormControl('', Validators.required);
  public user: IUser;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = fb.group({
      username: this.UserName,
      email: this.Email,
      password: this.Password,
      confirmPassword: this.ConfirmPassword,
    }, {
      validator: this.MatchPassword
    });
  }

  ngOnInit() {
  }

  onSubmit(event) {
    if (!this.form.valid) {
      console.log('form invalid');
      return;
    } else {
      this.alert = 'success';
      this.message = 'success';
      this.user = {};
      this.user.username = this.form.value.username;
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password;
      this.user.verified = false;
      this.createUser(this.user);
      console.log('form valid', this.user);
    }
  }

  createUser(user: IUser) {

  }

  MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

}
