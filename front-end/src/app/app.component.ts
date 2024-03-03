import { Component } from '@angular/core';
// import { Customer } from './customer';
// import { CustomerService } from './customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "Agenda de Contatos";

  // query: string = '';
  // customers: Customer[] = [];

  // constructor(private customerService: CustomerService) { }
  constructor(){}

  ngOnInit(): void {
  }

  // searchCustomers(): void {
  //   if (this.query.trim()) {
  //     this.customerService.searchCustomers(this.query).subscribe(customers => {
  //       this.customers = customers;
  //     });
  //   } else {
  //     this.customers = [];
  //   }
  // }
}
