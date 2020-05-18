import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  request: Request = new Request();
  title: string = 'Request-Detail';
  requestId: number = 0;
  loggedInUser: User = new User;

  constructor(private requestSvc: RequestService, private sysSvc: SystemService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found! ", this.request);
    });
  }

  delete(){
    this.requestSvc.delete(this.requestId).subscribe(jr => {
      if (jr.errors == null){
        console.log(jr.data);
        this.router.navigateByUrl("/request/list");
      }
      else{
        console.log("***Error deleting request!", this.requestId, jr.errors);
      }
    });
  }


}
