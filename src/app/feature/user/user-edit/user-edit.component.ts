import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string = "User-Edit";
  submitBtnTitle: string = "Save";
  user: User = new User();
  userId: number = 0;
  loggedInUser: User = new User;

  constructor(private userSvc: UserService, private sysSvc: SystemService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.userId = parms["id"]);
    this.userSvc.get(this.userId).subscribe(jr => {
      this.user = jr.data as User;
    });
  }

  save(){
    this.userSvc.edit(this.user).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/user/list");
      }
      else {
        console.log("***Error editing movie.", this.user, jr.errors);
      }
    });
  }

}
