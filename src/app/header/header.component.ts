import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../modals/signin/signin.component';
import { SignupComponent } from '../modals/signup/signup.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) {}

  signIn() {
    const modal: NgbModalRef = this.modalService.open(SigninComponent);
  }

  signUp() {
    const modal: NgbModalRef = this.modalService.open(SignupComponent);
  }

  ngOnInit() {
  }

}
