import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
  title: string = "Line-Item-Edit";
  submitBtnTitle: string = "Change";
  lineItem: LineItem = new LineItem();
  lineItemId: number = 0;
  products: Product[] = [];
  loggedInUser: User = new User;

  constructor(private lineItemSvc: LineItemService, private productSvc: ProductService,
              private sysSvc: SystemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;

    this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
    this.lineItemSvc.get(this.lineItemId).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
    });
    // get list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  save() {
    this.lineItemSvc.edit(this.lineItem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/lines/" + this.lineItem.request.id);
      }
      else {
        console.log("***Error editing line item.", this.lineItem, jr.errors);
      }
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }


}
