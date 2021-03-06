import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent extends BaseComponent implements OnInit {
  request: Request = new Request();
  title: string = 'Purchase Request Line Items';
  titleLineItems: string = 'Line Items';
  submitBtnTitle: string = "Submit";
  requestId: number = 0;
  lineItems: LineItem[] = [];
  loggedInUser: User = new User;

  constructor(private requestSvc: RequestService, private lineItemSvc: LineItemService, private sysSvc: SystemService,
              private router: Router, private route: ActivatedRoute) {
                super();
               }

  ngOnInit(): void {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found! ", this.request);
    });
    this.lineItemSvc.listLineItemsForRequest(this.requestId).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
      console.log("List of Line Items", this.lineItems);
    });
  }

  delete(lineItemId: number){
    this.lineItemSvc.delete(lineItemId).subscribe(jr => {
      if (jr.errors == null){
        console.log(jr.data);
        // Refresh Request 
        this.requestSvc.get(this.requestId).subscribe(jr => {
          this.request = jr.data as Request;
          console.log("Request Found! ", this.request);
        });
        // Refresh Line Items
        this.lineItemSvc.listLineItemsForRequest(this.requestId).subscribe(jr => {
          this.lineItems = jr.data as LineItem[];
          console.log("List of Line Items", this.lineItems);
        });
      }
      else{
        console.log("***Error deleting Line Item!", lineItemId, jr.errors);
      }
    });
  }

  submitForReview(){
    this.requestSvc.submitForReview(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("***Error submitting request.", this.request, jr.errors);
      }
    });
  }

}
