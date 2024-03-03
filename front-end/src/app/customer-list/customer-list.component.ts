import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  private getCustomers() {
    this.customerService.getCustomerList().subscribe(data => {
      console.log('Dados recebidos:', data);
      this.customers = data;
    });
  }

  updateCustomer(id: number) {
    this.router.navigate(['update-customer', id]);
  }

  customerProfile(id: number) {
    this.router.navigate(['customer-profile', id]);
  }

  deleteCustomer(id: number) {
    if (window.confirm('Tem certeza que deseja apagar este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe(data => {
        console.log(data);
        this.getCustomers();
      });
    }
  }
}
