import { State, Action, StateContext } from '@ngxs/store';

export interface CustomerFormStateModel {
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  address: string;
  cep: string;
  cpf: string;
  errorMessage: string;
}

@State<CustomerFormStateModel>({
  name: 'customerForm',
  defaults: {
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    address: '',
    cep: '',
    cpf: '',
    errorMessage: ''
  }
})
export class CustomerFormState {
  constructor() {}

  @Action(ValidateForm)
  validateForm(ctx: StateContext<CustomerFormStateModel>) {
    const state = ctx.getState();
    let errorMessage = '';

    // Validar campos obrigatórios
    if (!state.firstName || !state.lastName || !state.emailId) {
      errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    }

    // Validar CPF
    if (state.cpf && !this.validateCPF(state.cpf)) {
      errorMessage = 'CPF inválido. Por favor, preencha o CPF corretamente.';
    }

    // Validar CEP
    if (state.cep && !this.validateCEP(state.cep)) {
      errorMessage = 'CEP inválido. Por favor, preencha o CEP corretamente.';
    }

    // Atualizar o estado com a mensagem de erro, se houver
    ctx.patchState({
      errorMessage: errorMessage
    });
  }

  // Função para validar CPF
  private validateCPF(cpf: string): boolean {
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

  // Função para validar CEP
  private validateCEP(cep: string): boolean {
    const cleanedCEP = cep.replace(/\D/g, '');

    if (cleanedCEP.length !== 8) {
        return false;
    }
    return true;
  }
}

export class ValidateForm {
  static readonly type = '[CustomerForm] Validate Form';
}
