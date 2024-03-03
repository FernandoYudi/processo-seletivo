import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { CustomerFormState, CustomerFormStateModel } from 'state/customer.state';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  errorMessage: string = ''; // Mensagem de erro para exibir ao usuário
  customerForm: FormGroup; // Defina o FormGroup


  constructor(private customerService: CustomerService, private router: Router,
              private formBuilder: FormBuilder) { 
    this.customerForm = this.formBuilder.group({ // Crie o FormGroup no construtor
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      phoneNumber: [''],
      address: [''],
      cep: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

//   validateCPF(cpf: string): boolean {
//     if (!cpf) return false;

//     cpf = cpf.replace(/\D/g, '');

//     if (cpf.length !== 11) return false;

//     if (/^(\d)\1{10}$/.test(cpf)) return false;

//     let sum = 0;
//     for (let i = 0; i < 9; i++) {
//         sum += parseInt(cpf.charAt(i)) * (10 - i);
//     }
//     let digit = 11 - (sum % 11);
//     if (digit > 9) digit = 0;

//     if (parseInt(cpf.charAt(9)) !== digit) return false;

//     sum = 0;
//     for (let i = 0; i < 10; i++) {
//         sum += parseInt(cpf.charAt(i)) * (11 - i);
//     }
//     digit = 11 - (sum % 11);
//     if (digit > 9) digit = 0;

//     if (parseInt(cpf.charAt(10)) !== digit) return false;

//     return true;
// }


//   validateCEP(cep: string): boolean {
//     const cleanedCEP = cep.replace(/\D/g, '');

//     if (cleanedCEP.length !== 8) {
//         return false;
//     }
//     return true;
// }

//   saveCustomer(){
//     if (!this.customer.firstName || !this.customer.lastName || !this.customer.emailId) {
//       this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
//       return;
//     }
    
//     if (!this.customer.cpf && !this.validateCPF(this.customer.cpf)) {
//         this.errorMessage = 'CPF inválido. Por favor, preencha o CPF corretamente.';
//         return;
//     }

//     if (!this.customer.cep && !this.validateCEP(this.customer.cep)) {
//         this.errorMessage = 'CEP inválido. Por favor, preencha o CEP corretamente.';
//         return;
//     }
//       this.customerService.createCustomer(this.customer).subscribe(
//         data => {
//             console.log(data);
//             this.redirectRouteCustomerList();
//         },
//         error => {
//             console.log(error);
//             this.errorMessage = 'Ocorreu um erro ao cadastrar o contato. Por favor, tente novamente.';
//         }
//     );
//   }


saveCustomer() {

  this.customerService.createCustomer(this.customer).subscribe(
    data => {
      console.log(data);
      this.redirectRouteCustomerList();
    },
    error => {
      console.log(error);
      this.errorMessage = 'Ocorreu um erro ao cadastrar o contato. Por favor, tente novamente.';
    }
  );
}

  redirectRouteCustomerList(){
    this.router.navigate(['/customers']);
  }

  onSubmit(){
    
    console.log(this.customer);
    this.saveCustomer();
  }

}
