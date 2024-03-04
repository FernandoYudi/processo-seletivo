import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  id: number = 0;
  customer: Customer = new Customer();
  errorMessage: string = '';
  emailSent: boolean = false;

  constructor(private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.customer = data;
    }, error => console.log(error));
  }

  validateCPF(cpf: string): boolean {
    if (!cpf) return false;

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;

    if (parseInt(cpf.charAt(9)) !== digit) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;

    if (parseInt(cpf.charAt(10)) !== digit) return false;

    return true;
  }

  validateCEP(cep: string): boolean {
    const cleanedCEP = cep.replace(/\D/g, '');

    if (cleanedCEP.length !== 8) {
        return false;
    }
    return true;
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

  onSubmit(){
    if (!this.customer.firstName || !this.customer.lastName || !this.customer.emailId) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    if (!this.customer.cpf && !this.validateCPF(this.customer.cpf)) {
      this.errorMessage = 'CPF inválido. Por favor, preencha o CPF corretamente.';
      return;
    }

    if (!this.customer.cep && !this.validateCEP(this.customer.cep)) {
      this.errorMessage = 'CEP inválido. Por favor, preencha o CEP corretamente.';
      return;
    } 

    this.customerService.updateCustomer(this.id, this.customer).subscribe(data =>{
      this.emailSent = true;
      this.sendNotificationEmail();
      this.redirectRouteCustomerList();
    }, error => console.log(error));
  }

  redirectRouteCustomerList() {
    setTimeout(() => {
      this.router.navigate(['/customers']);
    }, 1500);
  }
}
