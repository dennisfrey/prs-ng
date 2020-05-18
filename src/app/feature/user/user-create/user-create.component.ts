import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  title: string = "User-Create";
  user: User = new User();
  submitBtnTitle: string = "Create";
  loggedInUser: User = new User;

  constructor(private userSvc: UserService, private sysSvc: SystemService, private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
  }

  save(){
    this.userSvc.create(this.user).subscribe(jr => {
      if (jr.errors == null){
        this.router.navigateByUrl("/user/list");
      }
      else{
        console.log("***Error creating new user:", this.user, jr.errors);
      }
    });
  }
}
