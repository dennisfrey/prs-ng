import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';

import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request-Create";
  request: Request = new Request();
  submitBtnTitle: string = "Create";

  constructor(private requestSvc: RequestService, private sysSvc: SystemService, private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
  }

  save() {
    this.requestSvc.create(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("***Error creating new product:", this.request, jr.errors);
      }
    });
  }

}
