import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: string = "Product-List";
  products: Product[] = [];
  loggedInUser: User = new User;

  constructor(private productSvc: ProductService, private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("List of Products", this.products);
    });
  }

}
