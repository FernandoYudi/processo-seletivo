import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  id: number = 0;
  customer: Customer = new Customer();
  constructor(private router: ActivatedRoute, 
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    this.customer = new Customer();
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.customer = data;
    })
  }

}
