import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  emailSent: boolean = false;

  constructor(private customerService: CustomerService, private router: Router,
    private location: Location) { }

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

  sendNotificationEmail() {
    this.customerService.sendNotificationEmail().subscribe(
      response => {
        console.log('Email enviado com sucesso:', response);
      },
      error => {
        console.error('Erro ao enviar email:', error);
      }
    );
  }

  deleteCustomer(id: number) {
    if (window.confirm('Tem certeza que deseja apagar este cliente?')) {
      this.customerService.deleteCustomer(id).subscribe(data => {
        console.log(data);
        this.emailSent = true;
        this.sendNotificationEmail();
        this.getCustomers();
      });
    }
  }

  redirectRouteCustomerList() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
