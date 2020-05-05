import { Component, OnInit } from '@angular/core';
import { HttpRequestService} from '../../services/http-request.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IUser } from '../../interfaces/users';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public Email = new FormControl('', Validators.required);
  public Password = new FormControl('', Validators.required);
  public form: FormGroup;
  public failedMessage: string;
  public user: IUser;
  public loader: boolean;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpRequestService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.form = fb.group({
      email: this.Email,
      password: this.Password,
    });
  }

  ngOnInit() {
  }

  onSubmit(event) {
    if (!this.form.valid) {
      console.log('form invalid');
      return;
    } else {
      this.loader = true;
      console.log('form valid');
      const user = {
        email: this.form.value.email,
        password: this.form.value.password
      };
      this.httpService.userSignIn(user).then(data => {
        this.loader = false;
        this.user = data[0];
        if (!this.user) {
          this.failedMessage = 'Usuario o contraseña incorrecta.';
        } else if (this.user.verified === false) {
          this.failedMessage = 'Usuario no ha sido verificado.';
        } else {
          console.log(this.user, 'usuario verificado');
          this.modalService.dismissAll();
          this.router.navigate([`dashboard`]);
        }
      }).catch((err: any) => {
        console.log(err, 'error');
      });
    }
  }

}
