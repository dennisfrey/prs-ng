import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "Line-Item-Create";
  lineItem: LineItem = new LineItem();
  submitBtnTitle: string = "Create";
  requestId: number = 0;
  products: Product[] = [];
  loggedInUser: User = new User;

  constructor(private lineItemSvc: LineItemService, private productSvc: ProductService, private requestSvc: RequestService,
              private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    
    // get request from id passed in 
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.lineItem.request = jr.data as Request;
      console.log("Request Found! ", this.lineItem.request);
    });
  
    // get list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  save() {
    this.lineItemSvc.create(this.lineItem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/lines/" + this.requestId);
      }
      else {
        console.log("***Error creating new line item:", this.lineItem, jr.errors);
      }
    });
  }

}
