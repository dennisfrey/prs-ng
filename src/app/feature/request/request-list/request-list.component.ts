import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title: string = "Request-List";
  requests: Request[] = [];
  loggedInUser: User = new User;

  constructor(private requestSvc: RequestService, private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log("List of Request", this.requests);
    });
  }

}
