import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../services/http-request.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IDatos } from '../interfaces/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public PsidBasic = new FormControl('', Validators.required);
  public ValueBasic = new FormControl('', Validators.required);
  public PidHigh = new FormControl('', Validators.required);
  public PsidHigh = new FormControl('', Validators.required);
  public ValueHigh = new FormControl('', Validators.required);
  public formBasic: FormGroup;
  public alert: string;
  public message: string;
  public formHigh: FormGroup;
  public loader: boolean;
  public active: any;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpRequestService
  ) {
    this.formBasic = fb.group({
      psid: this.PsidBasic,
      value: this.ValueBasic,
    });
    this.formHigh = fb.group({
      pid: this.PidHigh,
      psid: this.PsidHigh,
      value: this.ValueHigh
    });
  }

  ngOnInit(): void {
  }

  onSubmitBasic(event) {
    if (!this.formBasic.valid) {
      console.log('form invalid');
      return;
    } else {
      this.loader = true;
      const datos: IDatos = {
        psid: this.formBasic.value.psid,
        value: this.formBasic.value.value,
        type: 'basic'
      };
      this.saveDatos(datos);
      console.log(datos, 'form valid');
    }
  }

  onSubmitHigh(event) {
    if (!this.formHigh.valid) {
      console.log('form invalid');
      return;
    } else {
      this.loader = true;
      const datos: IDatos = {
        psid: this.formHigh.value.psid,
        value: this.formHigh.value.value,
        pid: this.formHigh.value.pid,
        type: 'high'
      };
      this.saveDatos(datos);
      console.log(datos, 'form valid');
    }
  }

  saveDatos(datos: IDatos) {
    this.httpService.saveDatos(datos).then(data => {
      console.log(data, 'data');
      this.loader = false;
      this.alert = 'success';
      this.message = 'Datos han sido guardados';
      setTimeout(() => {
        this.message = null;
      }, 3000);
    }, (error: any) => {
      console.log(error, 'error');
    });
  }

}
