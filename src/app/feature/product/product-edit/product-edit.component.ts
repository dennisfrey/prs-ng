import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Product-Edit";
  submitBtnTitle: string = "Save";
  product: Product = new Product();
  productId: number = 0;
  vendors: Vendor[] = [];
  loggedInUser: User = new User;
  
  constructor(private productSvc: ProductService, private vendorSvc: VendorService, private sysSvc: SystemService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(jr => {
      this.product = jr.data as Product;
    });
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
    });
  }

  save(){
    this.productSvc.edit(this.product).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/product/list");
      }
      else {
        console.log("***Error editing product.", this.product, jr.errors);
      }
    });
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }

}
