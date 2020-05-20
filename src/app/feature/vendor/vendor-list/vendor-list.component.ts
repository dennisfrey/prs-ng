import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/service/vendor.service';
import { Vendor } from 'src/app/model/vendor.class';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends BaseComponent implements OnInit {
  title: string = "Vendor-List";
  vendors: Vendor[] = [];
  loggedInUser: User = new User;

  constructor(private vendorSvc: VendorService, private sysSvc: SystemService) { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
      console.log("List of Vendors", this.vendors);
    });
  }

}
