import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
  title: string = "Vendor-Create";
  vendor: Vendor = new Vendor();
  submitBtnTitle: string = "Create";
  loggedInUser: User = new User;

  constructor(private vendorSvc: VendorService, private sysSvc: SystemService, private router: Router) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
  }

  save(){
    this.vendorSvc.create(this.vendor).subscribe(jr => {
      if (jr.errors == null){
        this.router.navigateByUrl("/vendor/list");
      }
      else{
        console.log("***Error creating new vendor:", this.vendor, jr.errors);
      }
    });
  }
}
