import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUser, IDatos } from '../interfaces/users';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  public url = 'https://us-central1-eljumper-f9478.cloudfunctions.net';

  constructor(
    private httpClient: HttpClient,
    private fireStore: AngularFirestore
  ) { }

  addUser(user: IUser): any {
    const url = `${this.url}/addUser`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const body = {
      user
    };
    return this.httpClient.post(url, body, { headers }).pipe(map(res => {
      return res;
    })).toPromise();
  }

  sendEmailtoUser(email: string): any {
    const url = `${this.url}/sendEmailtoUser`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const body = {
      email,
    };
    return this.httpClient.post(url, body, { headers }).pipe(map(res => {
      return res;
    })).toPromise();
  }

  userSignIn(user: IUser): any {
    const url = `${this.url}/userSignIn`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const body = {
      user
    };
    return this.httpClient.post(url, body, { headers }).pipe(map(res => {
      return res;
    })).toPromise();
  }

  saveDatos(dato: IDatos): any {
    const url = `${this.url}/saveDatos`;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const body = {
      dato
    };
    return this.httpClient.post(url, body, { headers }).pipe(map(res => {
      return res;
    })).toPromise();
  }
}


