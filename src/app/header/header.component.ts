import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../modals/signin/signin.component';
import { SignupComponent } from '../modals/signup/signup.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../interfaces/users';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: IUser;
  public email: string;

  constructor(
    private modalService: NgbModal,
    private fireStore: AngularFirestore
  ) {}

  ngOnInit() {
    this.fireStore.doc(`users/${this.email}`).get().toPromise().then((snap) => {
      this.user = snap.data();
    });
  }

  signIn() {
    const modal: NgbModalRef = this.modalService.open(SigninComponent);
  }

  signUp() {
    const modal: NgbModalRef = this.modalService.open(SignupComponent);
  }
}
